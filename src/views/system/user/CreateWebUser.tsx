import api from '@/api'
import { Role, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Form, Input, Modal, Select, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useImperativeHandle, useState } from 'react'


const CreateWebUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([])
  //暴露子组件的open
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
  useEffect(() => {
    getAllRoleList()
  }, [])


  const getAllRoleList = async () => {
    const data = await api.getRoleList()
    setRoleList(data)
  }

  

  //调用弹窗显示方法
  const open = (type: IAction, data?: User.UserInfo) => {
    setAction(type)
    setVisible(true)
    if (type === 'update' && data) {
      form.setFieldValue('id', data.id)
      form.setFieldValue('email', data.email)
      form.setFieldValue('role', data.role)
      form.setFieldValue('userStatus', data.userStatus)
      form.setFieldValue('userName', data.userName)
    }
  }

  const handleSubmit = async () => {
   
    const valid = await form.validateFields()
    if (valid) { 
      const params = { ...form.getFieldsValue()}
      console.log('create param:', params)
      if (action === 'create') {
        await api.createWebUser(params)
        message.success('创建成功')
      } else {
        await api.updateWebUser(params)
        message.success('更新成功')
      }
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
    title={action === 'create' ? '创建用户' : '编辑用户'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} className='login-form' labelCol={{ span: 4 }} labelAlign='right'>
        <FormItem name='id' hidden>
          <Input />
        </FormItem>

        <FormItem label='用戶名' name='userName' rules={[{ required: true, message: '请輸入用戶名' }]}>
          <Input placeholder='请輸入用戶名'/>
          </FormItem>

         <FormItem label='郵箱地址' name='email' rules={[{ required: true, message: '请輸入郵箱地址' }]}>
          <Input placeholder='请输入郵箱地址'/>

        </FormItem>
        <FormItem label='用户密碼' name='password' rules={[{ required: true, message: '密碼不能爲空' }]}>
          <Input placeholder='请输入用户密碼' />
        </FormItem>
      
        <FormItem label='用户权限' name='role' rules={[{ required: true, message: '请选择用户权限' }]}>
         {
           <Select placeholder='请选择角色'>
            {roleList.map(item=> {
                return (
                <Select.Option value={item.id} key={item.id}>
                  {item.roleName}
                  </Select.Option>
                )
              })}

          </Select>
          }
  
        </FormItem>
        <FormItem label='用户状态' name='userStatus' rules={[{ required: true, message: '请选择用户状态' }]}>
          <Select>
            <Select.Option value={1}>正常状态</Select.Option>
            <Select.Option value={2}>停用状态</Select.Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default CreateWebUser
