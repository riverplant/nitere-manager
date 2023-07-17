import api from '@/api'
import { PickPoint, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useImperativeHandle, useState } from 'react'

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [pickPoints, setPickPoints] = useState<PickPoint.PickPointItem[]>([])
  //暴露子组件的open
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
  useEffect(() => {
    getPickPointList()
  }, [])
  const getPickPointList = async () => {
    const data = await api.getPickPointsList()
    setPickPoints(data)
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
      const params = { ...form.getFieldsValue() }
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
        <FormItem name='userId' hidden>
          <Input />
        </FormItem>
        <FormItem
          label='用户手机号'
          name='mobile'
          rules={[{ pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, message: '请输入有效的手机号' }]}
        >
          <Input type='number' placeholder='请输入手机号' />
        </FormItem>
        <FormItem label='用户名' name='userName' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder='请输入用户名' />
        </FormItem>
        <FormItem label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder='请输入用户邮箱' />
        </FormItem>

        <FormItem label='用户提货码' name='code' rules={[{ required: true, message: '请输入提货码' }]}>
          <Input placeholder='请输入提货码' />
        </FormItem>
        <FormItem label='提货点' name='deptId' rules={[{ required: true, message: '请选择提货点' }]}>
          <TreeSelect
            placeholder='请选择提货点'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={pickPoints}
          />
        </FormItem>
        <FormItem label='送货地址' name='deptName' rules={[{ required: true, message: '请输入送货地址' }]}>
          <Input placeholder='请输入送货地址' />
        </FormItem>
        <FormItem label='用户权限' name='role' rules={[{ required: true, message: '请选择用户权限' }]}>
          <Select>
            <Select.Option value={0}>超级管理员</Select.Option>
            <Select.Option value={1}>管理员</Select.Option>
            <Select.Option value={2}>用户</Select.Option>
          </Select>
        </FormItem>
        <FormItem label='用户状态' name='state' rules={[{ required: true, message: '请选择用户状态' }]}>
          <Select>
            <Select.Option value={0}>正常状态</Select.Option>
            <Select.Option value={1}>停用状态</Select.Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default CreateUser
