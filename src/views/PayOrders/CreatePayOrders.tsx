import { IAction, IModalProp } from '@/types/modal'
import { useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { PayOrders } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import FormItem from 'antd/es/form/FormItem'
export default function CreatePayOrders(props: IModalProp<PayOrders.PayOrdersItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  

  useImperativeHandle(props.mRef, () => ({
    open,
  }))

  //打开弹窗函数
  const open = (type: IAction, data?: PayOrders.PayOrdersItem ) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
        const params: PayOrders.EditParams = { ...form.getFieldsValue() }
        await api.updatePayOrder(params)
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
      title='更新支付订单状态'
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

        <FormItem label='支付金额' name='price' >
          <Input  disabled />
        </FormItem>

        <FormItem label='所属仓库' name='pName' >
          <Input  disabled />
        </FormItem>

        <FormItem label='支付方式' name='payMethod'>
          <Radio.Group>
            <Radio value={1}>微信支付</Radio>
            <Radio value={2}>E-Transfer</Radio>
          </Radio.Group>
        </FormItem>
        
        <FormItem label='状态' name='payStatus'>
          <Radio.Group>
            <Radio value={10}>未支付</Radio>
            <Radio value={20}>已支付</Radio>
            <Radio value={30}>支付失败</Radio>
            <Radio value={40}>已退款</Radio>
          </Radio.Group>
        </FormItem>


       
      </Form>
    </Modal>
  )
}
