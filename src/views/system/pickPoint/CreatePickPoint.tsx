import { IAction, IModalProp } from '@/types/modal'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, Select, TreeSelect, DatePicker, message, TimePicker } from 'antd'
import { PickPoint, User } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import moment from 'moment'
import api from '@/api'
import FormItem from 'antd/es/form/FormItem'
import PlaceComponent from '@/utils/addressCompleteAuto'
import storage from '@/utils/storage'

export default function CreatePickPoint(props: IModalProp<PickPoint.PickPointItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [pickPoints, setPickPoints] = useState<PickPoint.PickPointItem[]>([])
  const [admins, setAdmins] = useState<User.UserInfo[]>([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [pickPointAddress, setPickPointAddress] = useState('')

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
    if (data) {
      form.setFieldsValue(data)
    }
  }
  useImperativeHandle(props.mRef, () => ({
    open,
  }))
  const handleSubmit = async () => {
    const address = storage.get('pickPointAddress')
    if (address) setPickPointAddress(address)
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        const params: PickPoint.CreateParams = { ...form.getFieldsValue() }
        console.log('create', params)
        if (pickPointAddress) params.address = pickPointAddress
        //if (startTime) params.createTime = startTime
        //if (endTime) params.updateTime = endTime
        console.log('params', params)
        await api.createPickPoints(params)
        message.success('创建成功')
      } else {
        const params: PickPoint.EditParams = { ...form.getFieldsValue() }
        console.log('edit', params)
        //if (startTime) params.createTime = startTime
        //if (endTime) params.updateTime = endTime
        if (pickPointAddress) params.address = pickPointAddress
        console.log('params', params)
        await api.editPickPoints(params)
        message.success('更新成功')
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
        <FormItem name='_id' hidden>
          <Input />
        </FormItem>
        <FormItem label='所属提货点' name='parentId'>
          <TreeSelect
            placeholder='请选择所属提货点'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={pickPoints}
          />
        </FormItem>
        <FormItem label='提货点名称' name='deptName' rules={[{ required: true, message: '请输入提货点名称' }]}>
          <Input placeholder='请输入提货点名称' />
        </FormItem>
        <FormItem label='负责人' name='userName' rules={[{ required: true, message: '请选择该提货点的负责人' }]}>
          <Select>
            {admins.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </FormItem>
        <FormItem label='提货点地址' name='address'>
          <PlaceComponent />
        </FormItem>
        <FormItem label='提货点开始时间' name='startTime'>
          <TimePicker onChange={changStartTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
        </FormItem>
        <FormItem label='提货点结束时间' name='endTime'>
          <TimePicker onChange={changEndTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
        </FormItem>
      </Form>
    </Modal>
  )
}
