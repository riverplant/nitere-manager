import api from '@/api'
import { Coupon, PickPoint, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Form, Input, Modal, Select, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useImperativeHandle, useState } from 'react'


const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [, setPickPoints] = useState<PickPoint.PickPointItem[]>([])
  const [coupList, setCoupList] = useState<Coupon.Vo[]>([])
  //暴露子组件的open
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
  useEffect(() => {
    getPickPointList()
    getCouponList()

  }, [])

  const getPickPointList = async () => {
    const data = await api.getPickPointsList()
    setPickPoints(data)
  }

  const getCouponList = async () => {
    const data = await api.getAllActiveCoupons()
    setCoupList(data)
  }

  //调用弹窗显示方法
  const open = (type: IAction, data?: User.UserInfo) => {
    setAction(type)
    setVisible(true)
    if (type === 'update' && data) {
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
   
    const valid = await form.validateFields()
    if (valid) { 
      const params = { ...form.getFieldsValue()}
      if (action === 'create') {
        await api.createUser(params)
        message.success('创建成功')
      } else {
        await api.updateUser(params)
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value="1">+1</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Modal
     title='编辑用户'
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

        <FormItem
          label='用户手机号'
          name='mobile'
          rules={[{ pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, message: '请输入有效的手机号' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }}  type='number' disabled={true}/>
        </FormItem>

         <FormItem label='用户名' name='userName' >
          <Input placeholder='请输入用户名' disabled={true}/>

        </FormItem>
        <FormItem label='用户邮箱' name='email' >
          <Input placeholder='请输入用户邮箱' />
        </FormItem>
      
      <FormItem label='用户提货码' name='code'  >
          <Input placeholder='请输入提货码' disabled={true} />
        </FormItem>

        <FormItem label='優惠碼' name='couponId'>
         {
           <Select placeholder='请选择優惠碼' >
            {coupList.map(item=> {
                return (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                  </Select.Option>
                )
              })}

          </Select>
          }
        </FormItem>

         {/**
       *  <FormItem label='提货点' name='pid' rules={[{ required: true, message: '请选择提货点' }]}>
          <TreeSelect
            placeholder='请选择提货点'
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            fieldNames={{ label: 'deptName', value: 'id' }}
            treeData={pickPoints}
          />
        </FormItem>
       * 
       */}

        {/**
             <FormItem label='提货点' name='pid' >
          <TreeSelect
            placeholder='请选择提货点'
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            fieldNames={{ label: 'deptName', value: 'id' }}
            treeData={pickPoints}
          />
        </FormItem>
          */}

       
 {/**
  
        <FormItem label='送货地址' name='formatted_address'>
        <PlaceComponent />
        </FormItem>

 */}
     
        
        <FormItem label='用户权限' name='userRoles' rules={[{ required: true, message: '请选择用户权限' }]}>
         {/**
          * <Select placeholder='请选择角色'>
            {roleList.map(item=> {
                return (
                <Select.Option value={item.id} key={item.id}>
                  {item.roleName}
                  </Select.Option>
                )
              })}

          </Select>
          */}
          <Select placeholder='请选择角色'>
          <Select.Option value={2} key={2}>管理員</Select.Option>
          <Select.Option value={3} key={3}>用戶</Select.Option>
          </Select>
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

export default CreateUser
