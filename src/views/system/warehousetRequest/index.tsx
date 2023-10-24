import api from '@/api'
import { Button, Form, Input, Modal, Select, Space, Table, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import FormItem from 'antd/es/form/FormItem'
import { formatDate } from '@/utils'
import { ChangeWarehouseRequest, Menu } from '@/types/api'
import CreateWarehouseRequest from './CreateWarehouseRequest'

export default function WarehouseRequestList() {
  const [form] = useForm()
  const [data, setData] = useState<ChangeWarehouseRequest.ChangeWarehouseRequestItem[]>([])
  const changeWarehouseRequestListRef = useRef<{
    open: (type: IAction, data?: ChangeWarehouseRequest.ChangeWarehouseRequestItem) => void
  }>()

  useEffect(() => {
    getChangeWarehouseRequest()
  }, [])

  const getChangeWarehouseRequest = async () => {
    console.log('form:',form.getFieldsValue())
    const data = await api.getWarehouseRequest(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
  }
  


  const handleEdit = (record: ChangeWarehouseRequest.ChangeWarehouseRequestItem) => {
    changeWarehouseRequestListRef.current?.open('update', record)
  }

  const columns: ColumnsType<ChangeWarehouseRequest.ChangeWarehouseRequestItem> = [
    {
      title: '用戶提貨碼',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '當前倉庫',
      dataIndex: 'pidOlderName',
      key: 'pidOlderName',
    },
    {
      title: '申請倉庫',
      dataIndex: 'pidNewName',
      key: 'pidNewName'
    },
    {
      title: '審核狀態',
      dataIndex: 'isAccepted',
      key: 'isAccepted',
      render(isAccepted: number) {
        return {
          1: '審核中',
          2: '通過',
          3: '拒絕',
        }[isAccepted]
      },
    },
    {
      title: '申請时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form} >
        <FormItem label='用戶提貨碼' name='code'>
          <Input placeholder='菜单名称' />
        </FormItem>
        <FormItem label='審核状态' name='isAccepted'>
          <Select style={{ width: 100 }}>
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>審核中</Select.Option>
            <Select.Option value={2}>通過</Select.Option>
            <Select.Option value={3}>拒絕</Select.Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' className='mr10' onClick={getChangeWarehouseRequest}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>申請列表</div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateWarehouseRequest mRef={changeWarehouseRequestListRef} update={getChangeWarehouseRequest} />
    </div>
  )
}
