import api from '@/api';
import { Order } from '@/types/api';
import { formatDate, formatMoney } from '@/utils';
import { useAntdTable } from 'ahooks';
import { Button, Form, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRef } from 'react';
import CreateOrder from '../components/CreateOrder';
import OrderDetail from '../components/OrderDetail';
import { IAction } from '@/types/modal';

export default function OrderList() {
      //初始化表单
  const [form] = Form.useForm()
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Order.SearchParams) => {
    return api
      .getOrderList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list,
        }
      })
  }
  // 为了保证有open方法所以这里需要定义一个泛型，里面有open
  const orderRef = useRef<{ open:(type: IAction, data?: Order.OrderItem)=>void }>()

  const detailRef = useRef<{ open:(orderId:string)=>void }>()


  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultParams:[
        {current:1,pageSize:10},
        {orderStatus:0,  payStatus:0, orderNumber: '', code:''}
       
    ]
  })

  const columns: ColumnsType<Order.OrderItem> = [
    {
      title: '包裹号码',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
        title: '提货码',
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
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={()=>handleDetail(record)}>
              编辑包裹信息
            </Button>
          </Space>
        )
      },
    },
  ]

  //创建订单
 /**
  * const handleCreate = ()=>{
    orderRef.current?.open('create')
  }
  *  */ 

  //订单详情
  const handleDetail = (record:Order.OrderItem)=>{
  /**if(new Date(record.departureDate).getTime() < new Date().getTime()) {
        detailRef.current?.open(record.orderNumber)
    }else {
        orderRef.current?.open('update', record)
    }**/
    orderRef.current?.open('update', record)
    
  }

    return (
    <div className="OrderList">
        <Form className='search-form' form={form} layout='inline' initialValues={{ orderStatus: 0, payStatus:0 }}>
        <Form.Item name='orderNumber' label='包裹号码'>
          <Input placeholder='请输入包裹号码' />
        </Form.Item>
        <Form.Item name='code' label='提货码'>
          <Input placeholder='请输入顾客提货码'></Input>
        </Form.Item>
        <Form.Item name='payStatus' label='支付状态'>
          <Select style={{ width: 120 }}>
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
            <Button type='primary' >
              搜索
            </Button>
            <Button type='default' >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>包裹列表</div>
         {/**
          * <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增 
            </Button>
            <Button type='primary' onClick={handleExport}>
              导出 
            </Button>
          </div>
          */}  
        </div>

        <Table
          bordered
          rowKey='id'     
          columns={columns}
         {...tableProps}
        />
      </div>
      {/**创建订单组件 */}
      <CreateOrder mRef={orderRef} update={search.submit}/>
       {/**订单详情 */}
      <OrderDetail mRef={detailRef}/>
    </div>
    )
}