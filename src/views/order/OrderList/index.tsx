import { Order, PageParams, PayOrders } from '@/types/api'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import api from '@/api'
import { formatDate, formatMoney } from '@/utils'
import { IAction } from '@/types/modal'
import CreateOrder from '../components/CreateOrder'
import OrderDetail from '../components/OrderDetail'

export default function OrderList() {
  //初始化表单
  const [form] = Form.useForm()
  const [data, setData] = useState<Order.OrderItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

    // 为了保证有open方法所以这里需要定义一个泛型，里面有open
    const orderRef = useRef<{ open:(type: IAction, data?: Order.OrderItem)=>void }>()

    const detailRef = useRef<{ open:(orderId:string)=>void }>()

  const handleEdit = (record: Order.OrderItem) => {
    if( record.departureDate != null && new Date(record.departureDate).getTime() < new Date().getTime()) {
         detailRef.current?.open(record.id)
        }else {
          console.log('update')
            orderRef.current?.open('update', record)
        }
  }


  useEffect(() => {
    getTableData({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [pagination.current, pagination.pageSize])

  //搜索
  const handleSearch = () => {
    getTableData({
      pageNum: 1,
    })
  }
  //重置表单
  const handleRest = () => {
    form.resetFields()
  }
  //获取用户列表

  const getTableData = async (params: PageParams) => {
    //获得所有的表单值
    const values = form.getFieldsValue()
    const data = await api.getOrderList({
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

  const columns: ColumnsType<Order.OrderItem> = [
    {
      title: '包裹号码',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '用戶提取码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '快递单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    {
      title: '箱号',
      dataIndex: 'boxNumber',
      key: 'boxNumber',
      render(boxNumber) {
        if(boxNumber === 0) return '未裝箱'
        else return   boxNumber 
       }
    },
    {
        title: '商品类型',
        dataIndex: 'catName',
        key: 'catName',
      },
    {
        title: '送货地址',
        dataIndex: 'formatted_address',
        key: 'formatted_address',
        width:195,
        render(_,record) {
            return <div>
                <p>送货地址: {record.formatted_address}</p>
            </div>
        }
      },
    {
      title: '出海时间',
      dataIndex: 'departureDate',
      key: 'departureDate',
      render(departureDate) {
        if(departureDate === null) return '未指定出海時間'
        else return   departureDate 
       }
    },

    {
      title: '订单金额',
      dataIndex: 'amount',
      key: 'amount',
      render(amount) {
        return formatMoney(amount)
    }
    },
    {
        title: '优惠金额',
        dataIndex: 'discount',
        key: 'discount',
        render(discount) {
            return formatMoney(discount)
        }
      },
      {
        title: '实际支付',
        dataIndex: 'price',
        key: 'price',
        render(price) {
            return formatMoney(price)
        }
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render(orderStatus) {
         if(orderStatus === 1) return '验货通过'
         if(orderStatus === 2) return '验货未通过'    
        }
      },
      {
        title: '支付方式',
        dataIndex: 'payMethod',
        key: 'payMethod',
        render(payMethod) {
         if(payMethod === 1) return '微信支付'
         if(payMethod === 2) return 'E-Transfer'   
        }
      },
    {
        title: '订单支付状态',
        dataIndex: 'payStatus',
        key: 'payStatus',
        render(payStatus) {
         if(payStatus === 10) return '未支付'
         if(payStatus === 20) return '已支付'
         if(payStatus === 30) return '支付超时'
         if(payStatus === 40) return '已退款'    
        }
      },
      {
        title: '实际重',
        dataIndex: 'pWeight',
        key: 'pWeight',
      },
      {
        title: '体积',
        dataIndex: 'pVolume',
        key: 'pVolume',
      },
      {
        title: '体积重',
        dataIndex: 'pWeightByVolume',
        key: 'pWeightByVolume',
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
    <div className='order-List'>
      <Form className='search-form' form={form} layout='inline' initialValues={{ orderStatus: 0, payStatus:0 }}>
      <Form.Item name='orderNumber' label='包裹号码'>
          <Input placeholder='包裹号码'></Input>
        </Form.Item>
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
        <Form.Item name='orderStatus' label='包裹状态'>
        <Select style={{ width: 120 }}>
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>驗貨通過</Select.Option>
            <Select.Option value={2}>驗貨未通過</Select.Option>
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
            total: total,
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
      <CreateOrder mRef={orderRef}  update={() => {
          getTableData({
            pageNum: 1,
          })
        }}/>
         <OrderDetail mRef={detailRef}/>
    </div>
  )
 
}
