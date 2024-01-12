import { IAction, IModalProp } from '@/types/modal'
import { useImperativeHandle, useState } from 'react'
import { DatePicker, DatePickerProps, Form, Input, Modal, Radio } from 'antd'
import { Coupon } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import dayjs from "dayjs";
import FormItem from 'antd/es/form/FormItem'
export default function CreateCoupon(props: IModalProp<Coupon.Vo>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [expiry, setExpiry] = useState('')
  

  useImperativeHandle(props.mRef, () => ({
    open,
  }))

  //打开弹窗函数
  const open = (type: IAction, data?: Coupon.EditParams ) => {
    setAction(type)
    setVisible(true)
    if (type === 'update' && data) {   
      form.setFieldValue('id', data.id)
      form.setFieldValue('name', data.name)
      form.setFieldValue('couponType', data.couponType)
      form.setFieldValue('value', data.value)
      form.setFieldValue('status', data.status)
      if(data.expiryDate != null )
        form.setFieldValue('expiryDate', dayjs(data.expiryDate))

}
  }

  const dateFormat = 'YYYY/MM/DD';


  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        const params: Coupon.CreateParams = { ...form.getFieldsValue() }

        await api.createCoupon(params)
      } else {
        const params: Coupon.EditParams = { ...form.getFieldsValue() }
       console.log(params)
        

        await api.editCoupon(params)
      }
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
      title={action === 'create' ? '创建' : '编辑'}
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
        <FormItem label='優惠碼名稱' name='name' >
          <Input />
        </FormItem>

        <FormItem label='優惠碼類型' name='couponType'>
          <Radio.Group>
            <Radio value={1}>百分比</Radio>
            <Radio value={2}>金額</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('couponType') === 1 ? (
              <FormItem label='優惠百分比%' name='value'>
                <Input  />
              </FormItem>
            ) : (
              <FormItem label='優惠金額' name='value'>
              <Input />
            </FormItem>
            )
          }}
        </FormItem>
  
        <FormItem name="expiryDate" label="有效日期">
           <DatePicker   format={dateFormat} />
        </FormItem>

        <FormItem label='狀態' name='status'>
          <Radio.Group>
            <Radio value={1}>啓用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </FormItem>

      </Form>
    </Modal>
  )
}
