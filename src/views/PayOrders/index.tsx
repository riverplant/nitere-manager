import { PageParams, PayOrders } from '@/types/api'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import api from '@/api'
import { formatDate, formatMoney } from '@/utils'
import { IAction } from '@/types/modal'
import CreatePayOrders from './CreatePayOrders'

export default function PayOrder() {
  //初始化表单
  const [form] = Form.useForm()
  const [data, setData] = useState<PayOrders.PayOrdersItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })


  const payOrderRef = useRef<{
    open: (type: IAction, data?: PayOrders.EditParams ) => void
  }>()

  const handleEdit = (record: PayOrders.PayOrdersItem) => {
    payOrderRef.current?.open('update', record)
  }
  
  useEffect(() => {
    getPayOrdersList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [pagination.current, pagination.pageSize])

  //搜索
  const handleSearch = () => {
    getPayOrdersList({
      pageNum: 1,
    })
  }
  //重置表单
  const handleRest = () => {
    form.resetFields()
  }
  //获取用户列表

  const getPayOrdersList = async (params: PageParams) => {
    //获得所有的表单值
    const values = form.getFieldsValue()
    console.log('value:',values)
    const data = await api.getPayOrdersList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize || pagination.pageSize,
    })


    setData(data.list)
    setTotal(data.page.total)
    setPageCount(data.page.pageCount)

    setPagination({
      current: data.page.pageNum,
      pageSize: data.page.pageSize,
    })
  }

  const columns: ColumnsType<PayOrders.PayOrdersItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用戶提取码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '提货仓库',
      dataIndex: 'pName',
      key: 'pName',
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render(price) {
        return formatMoney(price)
    }
    },
    {
      title: '订单来源',
      dataIndex: 'comeFrom',
      key: 'comeFrom',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      },
    },
    {
      title: '最後更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      },
    },
    {
      title: '支付方式',
      dataIndex: 'payMethod',
      key: 'payMethod',
      render(payMethod: number) {
        return {
          1: '微信支付',
          2: 'e-transfer'
        }[payMethod]
      },
    },
    {
      title: '状态',
      dataIndex: 'payStatus',
      key: 'payStatus',
      render(payStatus: number) {
        return {
          10: '未支付',
          20: '已支付',
          30: '支付失败',
          40: '已退款',
        }[payStatus]
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
    <div className='user-list'>
      <Form className='search-form' form={form} layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='code' label='用戶提貨码'>
          <Input placeholder='请输入提貨码'></Input>
        </Form.Item>
        <Form.Item name='payStatus' label='状态'>
          <Select style={{ width: 120 }} >
          <Select.Option value={0} >全部</Select.Option>
            <Select.Option value={10}>未支付</Select.Option>
            <Select.Option value={20}>已支付</Select.Option>
            <Select.Option value={30}>支付失败</Select.Option>
            <Select.Option value={40}>已退款</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='payMethod' label='支付方式'>
          <Select style={{ width: 120 }}>
          <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>微信支付</Select.Option>
            <Select.Option value={2}>e-transfer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleRest}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>支付订单列表</div>

        </div>

        <Table
          bordered
          rowKey='id'
          dataSource={data}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pageCount,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
              return `总共: ${total} 条`
            },
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize,
              })
            },
          }}
        />
      </div>
      <CreatePayOrders mRef={payOrderRef}  update={() => {
          getPayOrdersList({
            pageNum: 1,
          })
        }}/>
    </div>
  )
 
}
