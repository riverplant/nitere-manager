import { PageParams, User } from '@/types/api'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
export default function UserList() {
  //初始化表单
  const [form] = Form.useForm()
  const [data, setData] = useState<User.UserInfo[]>([])
  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [userIds, setUserIds] = useState<string[]>([])
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserInfo) => void
  }>()

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

    const data = await api.getUserList({
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

  /**const handleCreate = () => {
    userRef.current?.open('create')
  } **/

  //更新用户
  const handleUpdate = (recode: User.UserInfo) => {
    userRef.current?.open('update', recode)
  }

  //删除用户
  const handleDel = (userId: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      },
    })
  }
  //公共删除用户接口
  const handleUserDelSubmit = async (ids: string[]) => {
    try {
      await api.delUser({ userIds: ids })
      message.success('删除成功')
      setUserIds([])
      getUserList({
        pageNum: 1,
      })
    } catch (error) {
      message.error('删除失败')
    }
  }

  //批量删除用户
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除所有选中的用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      },
    })
  }
  const columns: ColumnsType<User.UserInfo> = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'openId',
      dataIndex: 'openid',
      key: 'openid',
    },
    {
      title: '提取码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '提货点',
      dataIndex: 'ppName',
      key: 'ppName',
    },
    {
      title: '送货地址',
      dataIndex: 'formatted_address',
      key: 'formatted_address',
    },
    {
      title: '账户权限',
      dataIndex: 'userRoles',
      key: 'userRoles',
      render(userRoles: number) {
        return {
          1: '超级管理员',
          2: '管理员',
          3: '用户',
        }[userRoles]
      },
    },
    {
      title: '用户状态',
      dataIndex: 'userStatus',
      key: 'userStatus',
      render(userStatus: number) {
        return {
          1: '正常',
          2: '停用',
        }[userStatus]
      },
    },
    {
      title: '账户创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      },
    },
    {
      title: '操作',
      key: 'action',
      render(record: User.UserInfo) {
        if(record.userRoles != 1) { 
          return (
            <Space>
              <Button type='text' onClick={() => handleUpdate(record)}>
                编辑
              </Button>
              <Button type='text' danger onClick={() => handleDel(record.id)} >
               删除
             </Button> 
            </Space>
          )
        }


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
          <div className='title'>用户列表</div>
          <div className='action'>
            { /**<Button type='primary' onClick={handleCreate}>
              新增
            </Button> **/}
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>

        <Table
          bordered
          rowKey='id'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as string[])
            },
          }}
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
      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1,
          })
        }}
      />
    </div>
  )
}
