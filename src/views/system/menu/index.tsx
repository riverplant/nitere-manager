import api from '@/api'
import { Button, Form, Input, Modal, Select, Space, Table, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import FormItem from 'antd/es/form/FormItem'
import { formatDate } from '@/utils'
import { Menu } from '@/types/api'
import CreateMenu from './CreateMenu'

export default function MenuList() {
  const [form] = useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])
  const menuListRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
  }
  //创建提货点
  const handleCreate = () => {
    menuListRef.current?.open('create', { orderBy: data.length })
  }

  const handleSubCreate = (recode: Menu.MenuItem) => {
    menuListRef.current?.open('create', { parentId: recode.id, orderBy: recode.children?.length })
  }

  const handleEdit = (record: Menu.MenuItem) => {
    menuListRef.current?.open('update', record)
  }
  //删除菜单
  const handleDelet = (record: Menu.MenuItem) => {
    let text = ''
    if (record.menuType === 1) text = '菜单'
    if (record.menuType === 2) text = '按钮'
    if (record.menuType === 3) text = '页面'
    Modal.confirm({
      title: '确认',
      content: `确认删除该${text}吗?`,
      onOk() {
        handleDelSubmit(record.id)
      },
    })
  }

  //删除提货点提交
  const handleDelSubmit = async (id: string) => {
    await api.deleteMenu({ id: id })
    message.success('删除成功')
    getMenuList()
  }

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[menuType]
      },
    },

    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '创建时间',
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
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelet(record)} danger>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form} initialValues={{ menuState: 1 }}>
        <FormItem label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </FormItem>
        <FormItem label='菜单状态' name='menuStatus'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' className='mr10' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateMenu mRef={menuListRef} update={getMenuList} />
    </div>
  )
}
