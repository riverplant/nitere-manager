import api from '@/api'
import { PickPoint } from '@/types/api'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import CreatePickPoint from './CreatePickPoint'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import FormItem from 'antd/es/form/FormItem'

export default function PickPointList() {
  const [form] = useForm()
  const [data, setData] = useState<PickPoint.PickPointItem[]>([])
  const pickPointRef = useRef<{
    open: (type: IAction, data?: PickPoint.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getPickPointList()
  }, [])

  const getPickPointList = async () => {
    const data = await api.getPickPointsList(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
  }
  //创建提货点
  const handleCreate = () => {
    pickPointRef.current?.open('create')
  }

  const handleSubCreate = (id: string) => {
    pickPointRef.current?.open('create', { parentId: id })
  }

  const handleEdit = (record: PickPoint.PickPointItem) => {
    pickPointRef.current?.open('update', record)
  }

  const handleDelet = (id: string) => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该提货点吗?',
      onOk() {
        handleDelSubmit(id)
      },
    })
  }

  //删除提货点提交
  const handleDelSubmit = async (id: string) => {
    await api.deletePickPoint({ id: id }).then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
    getPickPointList()
  }

  const columns: ColumnsType<PickPoint.PickPointItem> = [
    {
      title: '提货点',
      dataIndex: 'ppName',
      key: 'ppName',
    },
    {
      title: '地址',
      dataIndex: 'formatted_address',
      key: 'formatted_address',
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: '开放时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '关闭时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '優惠碼',
      dataIndex: 'couponName',
      key: 'couponName',
      render(_, record) {
        return ( record.couponName ) ? record.couponName : '無優惠碼'
              },
    },
    {
      title: '優惠碼過期時間',
      dataIndex: 'couponExpireDate',
      key: 'couponExpireDate',
      render(_, record) {
        if(record.couponExpireDate) {

         return  ( new Date(record.couponExpireDate).valueOf() > Date.now().valueOf() ) ? record.couponExpireDate : '優惠碼已失效'
        }
        return ''
              },
    },
    {
      title: '提貨碼位數',
      dataIndex: 'nRandom',
      key: 'nRandom',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
if(record.pickPointStatus === 1) {
  return (
    <Space>
      <Button type='text' onClick={() => handleSubCreate(record.id)}>
        新增
      </Button>
      <Button type='text' onClick={() => handleEdit(record)}>
        编辑
      </Button>
      <Button type='text' onClick={() => handleDelet(record.id)} danger>
        删除
      </Button>
    </Space>
  )
}else {
  return (
    <Space>
      <Button type='text' onClick={() => handleEdit(record)}>
        编辑
      </Button>
    </Space>
  )
}
       
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <FormItem label='提货点' name={'ppName'}>
          <Input placeholder='提货点' />
        </FormItem>
        <FormItem label='状态' name='pickPointStatus'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' className='mr10' onClick={getPickPointList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>提货点列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreatePickPoint mRef={pickPointRef} update={getPickPointList} />
    </div>
  )
}
