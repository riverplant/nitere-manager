import { ClaimRequest, PageParams } from '@/types/api'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'

export default function ClaimRequestList() {
  //初始化表单
  const [form] = Form.useForm()
  const [data, setData] = useState<ClaimRequest.ClaimRequestItem[]>([])
  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [pagination.current, pagination.pageSize])

  //搜索
  const handleSearch = () => {
    getUserList({
      pageNum: 1,
    })
  }
  //重置表单
  const handleRest = () => {
    form.resetFields()
  }
  //获取用户列表

  const getUserList = async (params: PageParams) => {
    //获得所有的表单值
    const values = form.getFieldsValue()

    const data = await api.getClaimList({
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

  const columns: ColumnsType<ClaimRequest.ClaimRequestItem> = [
    {
      title: '快遞單號',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    {
      title: '用戶提取码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '認領状态',
      dataIndex: 'status',
      key: 'status',
      render(status: number) {
        return {
          1: '處理中',
          2: '認領成功',
          3: '包裹丟失',
        }[status]
      },
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

  ]

  return (
    <div className='user-list'>
      <Form className='search-form' form={form} layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='id' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='code' label='提取码'>
          <Input placeholder='请输入提取码'></Input>
        </Form.Item>
        <Form.Item name='userStatus' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
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
          <div className='title'>認領請求列表</div>

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
    </div>
  )
}
