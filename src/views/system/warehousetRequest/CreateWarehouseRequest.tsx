import { IAction, IModalProp } from '@/types/modal'
import { useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { ChangeWarehouseRequest } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import FormItem from 'antd/es/form/FormItem'
export default function CreateWarehouseRequest(props: IModalProp<ChangeWarehouseRequest.ChangeWarehouseRequestItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  

  useImperativeHandle(props.mRef, () => ({
    open,
  }))

  //打开弹窗函数
  const open = (type: IAction, data?: ChangeWarehouseRequest.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
        const params: ChangeWarehouseRequest.EditParams = { ...form.getFieldsValue() }
        await api.editWarehouseRequest(params)
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    form.resetFields
    setVisible(false)
  }

  return (
    <Modal
      title='審核申請'
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }} initialValues={{ menuType: 1, menuState: 1 }}>
        <FormItem name='id' hidden>
          <Input />
        </FormItem>
        <FormItem name='openId' hidden>
          <Input />
        </FormItem>

        <FormItem label='用戶提貨碼' name='code' >
          <Input  disabled />
        </FormItem>

        <FormItem label='當前倉庫' name='pidOlderName' >
          <Input  disabled />
        </FormItem>

        <FormItem label='申請更換倉庫' name='pidNewName' >
          <Input  disabled />
        </FormItem>

        <FormItem label='審核' name='isAccepted'>
          <Radio.Group>
            <Radio value={2}>通過</Radio>
            <Radio value={3}>拒絕</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('isAccepted') === 3 ? (
              <FormItem label='拒絕理由' name='msg'>
                <Input placeholder='请输入拒絕理由' />
              </FormItem>
            ) : (
              <>
              </>
            )
          }}
        </FormItem>

       
      </Form>
    </Modal>
  )
}
