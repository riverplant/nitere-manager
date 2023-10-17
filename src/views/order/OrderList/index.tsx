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
        {state:1}
    ]
  })

  type DataType = Order.OrderItem

  const columns: ColumnsType<DataType> = [
    {
      title: '包裹ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
        title: '顾客ID',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '手机号码',
        dataIndex: 'mobile',
        key: 'mobile',
      },
    {
      title: '箱号',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
        title: '商品类型',
        dataIndex: 'vehicleName',
        key: 'vehicleName',
      },
    {
        title: '送货地址',
        dataIndex: 'endAddress',
        key: 'endAddress',
        width:195,
        render(_,record) {
            return <div>
                <p>仓库地址: 多伦多测试地址</p>
                <p>送货地址: {record.endAddress}</p>
            </div>
        }
      },
    {
      title: '出海时间',
      dataIndex: 'useTime',
      key: 'useTime',
      render(useTime: string) {
        return formatDate(useTime)
      },
    },
    {
        title: '预计送货时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render(endTime: string) {
          return formatDate(endTime)
        },
      },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount) {
        return formatMoney(orderAmount)
    }
    },
    {
        title: '优惠金额',
        dataIndex: 'userPayAmount',
        key: 'userPayAmount',
        render(userPayAmount) {
            return formatMoney(userPayAmount)
        }
      },
      {
        title: '实际支付',
        dataIndex: 'driverAmount',
        key: 'driverAmount',
        render(driverAmount) {
            return formatMoney(driverAmount)
        }
      },
    {
        title: '订单状态',
        dataIndex: 'state',
        key: 'state',
        render(state) {
         if(state === 1) return '未支付'
         if(state === 2) return '已支付'
         if(state === 3) return '支付超时'
         if(state === 4) return '已退款'    
        }
      },
      {
        title: '实际重',
        dataIndex: 'realWeight',
        key: 'realWeight',
      },
      {
        title: '体积',
        dataIndex: 'volum',
        key: 'volum',
      },
      {
        title: '体积重',
        dataIndex: 'volumWeight',
        key: 'volumWeight',
      },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={()=>handleDetail(record)}>
              详情
            </Button>
          </Space>
        )
      },
    },
  ]

  //创建订单
  const handleCreate = ()=>{
    orderRef.current?.open('create')
  }

  //订单详情
  const handleDetail = (record:Order.OrderItem)=>{
  if(new Date(record.useTime).getTime() < new Date().getTime()) {
        detailRef.current?.open(record.orderId)
    }else {
        orderRef.current?.open('update', record)
    }
    
  }

  // 文件导出
  const handleExport = ()=>{
     api.exportData(form.getFieldsValue())
  }

    return (
    <div className="OrderList">
        <Form className='search-form' form={form} layout='inline' initialValues={{ state: 1 }}>
        <Form.Item name='orderId' label='包裹ID'>
          <Input placeholder='请输入ID' />
        </Form.Item>
        <Form.Item name='userName' label='顾客ID'>
          <Input placeholder='请输入顾客ID'></Input>
        </Form.Item>
        <Form.Item name='payStatus' label='订单状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>未支付</Select.Option>
            <Select.Option value={2}>已支付</Select.Option>
            <Select.Option value={3}>支付失败</Select.Option>
            <Select.Option value={4}>已退款</Select.Option>
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
          <div className='title'>未支付订单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增 
            </Button>
            <Button type='primary' onClick={handleExport}>
              导出 
            </Button>


          </div>
        </div>

        <Table
          bordered
          rowKey='orderId'     
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