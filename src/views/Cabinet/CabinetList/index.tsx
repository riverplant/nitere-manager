import { Cabinet, Order, PageParams } from '@/types/api'
import { Button, DatePicker, Form, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import api from '@/api'
import { formatDate, formatMoney } from '@/utils'
import { IAction } from '@/types/modal'
import CreateOrder from '../components/CreateCabinet'
import CreateCabinet from '../components/CreateCabinet'

export default function CabinetList() {
  //初始化表单
  const [form] = Form.useForm()
  const [data, setData] = useState<Cabinet.Item[]>([])
  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

    // 为了保证有open方法所以这里需要定义一个泛型，里面有open
    const cabinetRef = useRef<{ open:(type: IAction, data?: Cabinet.Item)=>void }>()

    const detailRef = useRef<{ open:(orderId:string)=>void }>()

  const handleEdit = (record: Cabinet.Item) => {
    if( record.departureDate != null && new Date(record.departureDate).getTime() < new Date().getTime()) {
            detailRef.current?.open(record.id)
        }else {
          cabinetRef.current?.open('update', record)
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
    const values = {dateStart: startDate, dateEnd: endDate}
    const data = await api.getCabinetList({
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

  const exportExcelById = async (id: string) =>{
    console.log('exportExcelById................')
    api.exportExcelById(id)


  }

  const changStartDate = (value: any, dateString: string) => {
    setStartDate(dateString)
  }
  const changeEnddate = (value: any, dateString: string) => {
    setEndDate(dateString)
  }

  const columns: ColumnsType<Cabinet.Item> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width:195,
    },
    {
      title: '出海日期 | 包裹数',
      dataIndex: 'departureDate',
      key: 'departureDate',
      width:195,
      render(_,record) {
          return <div>
              <p>出海日期: {record.departureDate}</p>
              <p>包裹数: {record.orderCount}</p>
          </div>
      }
    },
    {
      title: '总重量 | 体积',
      dataIndex: 'weightTotal',
      key: 'weightTotal',
      width:195,
      render(_,record) {
          return <div>
              <p>日期重量合计: {record.weightTotal}</p>
              <p>体积合计: {record.volumTotal}</p>
          </div>
      }
    },
    {
      title: '按包裹统计',
      dataIndex: 'priceTotal',
      key: 'priceTotal',
      width:195,
      render(_,record) {
          return <div>
              <p>包裹计费合计: {record.amountTotal}</p>
              <p>确认收费合计: {record.priceTotal}</p>
          </div>
      }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width:195,
      },
   
    {
      title: '最后更新',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width:195,
     
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='primary' onClick={() => exportExcelById(record.id)}>
              导出清单
            </Button>
            <Button type='primary' onClick={() => handleEdit(record)}>
              提货点汇总
            </Button>
            <Button type='primary' onClick={() => handleEdit(record)}>
              路径规划
            </Button>
          </Space>
        )
      },
    },

  ]

  return (
    <div className='cabinet-List'>
      <Form className='search-form' form={form} layout='inline' initialValues={{ orderStatus: 0, payStatus:0 }}>

        <Form.Item name='dateStart' label='开始日期'>
        <DatePicker onChange={changStartDate}/>
        </Form.Item>

        <Form.Item name='dateEnd' label='结束日期'>
        <DatePicker onChange={changeEnddate}/>
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
          <div className='title'>柜子列表</div>

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
     
     <CreateCabinet mRef={cabinetRef}  update={() => {
          getTableData({
            pageNum: 1,
          })
        }}/>
       
    </div>
  )
 
}
