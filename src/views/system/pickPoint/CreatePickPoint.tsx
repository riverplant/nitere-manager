import { IAction, IModalProp } from '@/types/modal'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, Select, TreeSelect, TimePicker, Radio, InputNumber } from 'antd'
import { PickPoint, User } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import dayjs from "dayjs";
import api from '@/api'
import FormItem from 'antd/es/form/FormItem'
import PlaceComponent from '@/utils/addressCompleteAuto'
import storage from '@/utils/storage'
import { formatDate } from '@/utils'

export default function CreatePickPoint(props: IModalProp<PickPoint.PickPointItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [pickPoints, setPickPoints] = useState<PickPoint.PickPointItem[]>([])
  const [admins, setAdmins] = useState<User.UserInfo[]>([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    getPickPointList()
    getAllAdminList()
  }, [])

  const getPickPointList = async () => {
    const data = await api.getPickPointsList()
    setPickPoints(data)
  }

  const getAllAdminList = async () => {
    const data = await api.getAllAdminList()
    setAdmins(data)
  }
  //打开弹窗函数
  const open = (type: IAction, data?: PickPoint.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getPickPointList()
    if ( data  ) {   
        form.setFieldsValue(data)
    }

  }
  useImperativeHandle(props.mRef, () => ({
    open,
  }))
  const handleSubmit = async () => {
    const address = JSON.parse(storage.get('pickPointAddress')) 
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        const params: PickPoint.CreateParams = { ...form.getFieldsValue() }
        if (address){
          params.place_id = address.place_id
          params.formatted_address = address.formatted_address
          params.city = address.city
          params.url = address.url

        } 
        params.startTime = startTime
        params.endTime = endTime
        await api.createPickPoints(params)
      } else {
        const params: PickPoint.EditParams = { ...form.getFieldsValue() }
       
        if (address){
          params.place_id = address.place_id
          params.formatted_address = address.formatted_address
          params.city = address.city
          params.url = address.url
        } 
        params.startTime = startTime
        params.endTime = endTime
        await api.editPickPoints(params)
      }
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields
  }

  const changStartTime = (value: any, dateString: string) => {
    setStartTime(dateString)
  }
  const changEndTime = (value: any, dateString: string) => {
    setEndTime(dateString)
  }

 
  return (
    <Modal
      title={action === 'create' ? '创建提货点' : '编辑提货点'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <FormItem name='id' hidden>
          <Input />
        </FormItem>
        <FormItem label='所属提货点' name='parentId'>
          <TreeSelect
            placeholder='请选择所属提货点'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'ppName', value: 'id' }}
            treeData={pickPoints}
          />
        </FormItem>
        <FormItem label='提货点名称' name='ppName' rules={[{ required: true, message: '请输入提货点名称' }]}>
          <Input placeholder='请输入提货点名称' />
        </FormItem>
        <FormItem label='提货点代碼' name='ppCode' rules={[{ required: true, message: '请输入提货点代碼' }]}>
          <Input placeholder='请输入提货点代碼' />
        </FormItem>
        <FormItem label='负责人' name='userName' >
          <Select>
            {admins.map(item => {
              return (
                <Select.Option value={item.userName} key={item.id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </FormItem>
        <FormItem label='提货点地址' >
          <PlaceComponent />
        </FormItem>
        <FormItem label='提货点开始时间' name='startTime' >
          <TimePicker onChange={changStartTime}   />,
        </FormItem>
        <FormItem label='提货点结束时间' name='endTime'>
          <TimePicker onChange={changEndTime}  />,
        </FormItem>

        <FormItem label='随机码位数' name='nRandom' rules={[{ required: true, message: '请输入随机码位数' }]}>
          <InputNumber placeholder='请输入随机码位数' />
        </FormItem>

        <FormItem label='状态' name='pickPointStatus'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  )
}


