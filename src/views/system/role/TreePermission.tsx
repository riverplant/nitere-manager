import api from '@/api'
import { Menu, Role } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Modal, Tree } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useImperativeHandle, useState } from 'react'

export default function TreePermission(propos: IModalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permission, setPermission] = useState<Role.CreatePermission>()

  useEffect(()=>{
    getMenuList();
  },[])

  const getMenuList = async ()=>{
   const menuList =  await api.getMenuList()
   setMenuList(menuList)
  }

  useImperativeHandle(propos.mRef, () => {
    //暴露组件的方法
    return {
      open,
    }
  })

  const open = (type: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }
  // 提交
  const handleOk = async () => {
    if(permission) {
      await api.updatePermission(permission)
      message.success('权限设置成功')
      handleCancel()
      propos.update()
    }
    
  }
  // 取消
  const handleCancel = () => { 
    setVisible(false)
    setPermission(undefined)
  }

  const onCheck = (checkedKeysValues:any, item:any)=>{
    setCheckedKeys(checkedKeysValues)
    const checkdKeys:string[] = []
    const parentCheckdKeys:string[] = []
    item.checkedNodes.map((node:Menu.MenuItem)=>{
      if(node.menuType === 2) {
        checkdKeys.push(node._id)
      } else {
        parentCheckdKeys.push(node._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys: checkedKeysValues,
        halfCheckedKeys: parentCheckdKeys.concat(item.halfCheckedKeys)
      }
    })
  }

  return (
    <Modal
      title='设置权限' 
      width={600}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelAlign='right' labelCol={{ span: 4 }}>
       
        <FormItem label='角色名称'>
        {roleInfo?.roleName}
        </FormItem>

        <FormItem  label='权限'>
        <Tree
        checkable
        defaultExpandAll
        fieldNames={{title:'menuName',key:'_id'}}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={menuList}
      />

        </FormItem>
      </Form>
    </Modal>
  )
}
