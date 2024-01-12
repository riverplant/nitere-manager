import api from '@/api'
import { Button, Form, Modal, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import { Coupon } from '@/types/api'
import CreateCoupon from './CreateCoupon'
import FormItem from 'antd/es/form/FormItem'

export default function CouponList() {
  const [form] = useForm()
  const [data, setData] = useState<Coupon.Vo[]>([])
  const couponRequestListRef = useRef<{
    open: (type: IAction, data?: Coupon.Vo) => void
  }>()

  useEffect(() => {
    getCouponList()
  }, [])

  const getCouponList = async () => {
    const data = await api.getCouponList( form.getFieldsValue() )
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
  }
  
  //创建優惠碼
  const handleCreate = () => {
    couponRequestListRef.current?.open('create')
  }

  const handleEdit = (record: Coupon.Vo) => {
    couponRequestListRef.current?.open('update', record)
  }

  const handleDelet = (id: string) => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该優惠碼吗?',
      onOk() {
        handleDelSubmit(id)
      },
    })
  }

  //删除類型提交
  const handleDelSubmit = async (id: string) => {
    await api.delCoupon
    ({ id: id }).then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  
    getCouponList()
  }

  const columns: ColumnsType<Coupon.Vo> = [
    {
      title: '優惠碼名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '優惠碼類型',
      dataIndex: 'couponType',
      key: 'couponType',
      render(couponType: number) {
        return {
          1: '百分比',
          2: '金額'
        }[couponType]
      },
    },
    {
      title: '優惠值',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: '有效期',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status: number) {
        return {
          1: '有效',
          2: '停用'
        }[status]
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
            <Button type='text' onClick={() => handleDelet(record.id)} danger>
                删除
              </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <FormItem label='状态' name='status'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' className='mr10' onClick={getCouponList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>優惠碼列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateCoupon mRef={couponRequestListRef} update={getCouponList} />
    </div>
  )
}
