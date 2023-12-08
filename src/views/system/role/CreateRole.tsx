import api from '@/api'
import { Role } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Input, Modal } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useImperativeHandle, useState } from 'react'

export default function CreateRole(propos: IModalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [form] = Form.useForm()
  useImperativeHandle(propos.mRef, () => {
    //暴露组件的方法
    return {
      open,
    }
  })

  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }
  // 提交
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = form.getFieldsValue()
      if (action === 'create') {
        await api.createRole(params)
      } else {
        await api.editRole(params)
      }
      message.success('操作成功')
      handleCancel()
      propos.update()
    }
  }
  // 取消
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <Modal
      title={action === 'create' ? '新增角色' : '编辑角色'}
      width={700}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <FormItem name='id' hidden>
          <Input />
        </FormItem>
        <FormItem
          name='roleName'
          label='角色名称'
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
        >
          <Input placeholder='请输入角色名称' />
        </FormItem>

        <FormItem name='remark' label='角色备注'>
          <Input.TextArea placeholder='请输入备注' />
        </FormItem>
      </Form>
    </Modal>
  )
}
