import api from '@/api'
import { Category } from '@/types/api'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import FormItem from 'antd/es/form/FormItem'
import CreateCategory from './CreateCategory'

export default function CategoryList() {
  const [form] = useForm()
  const [data, setData] = useState<Category.CategoryItem[]>([])
  const categoryRef = useRef<{
    open: (type: IAction, data?: Category.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = async () => {
    const data = await api.getCategoryList(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
  }
  //创建提货点
  const handleCreate = () => {
    categoryRef.current?.open('create')
  }

  const handleSubCreate = (id: string) => {
    categoryRef.current?.open('create', { parentId: id })
  }

  const handleEdit = (record: Category.CategoryItem) => {
    categoryRef.current?.open('update', record)
  }

  const handleDelet = (id: string) => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该類型吗?',
      onOk() {
        handleDelSubmit(id)
      },
    })
  }

  //删除類型提交
  const handleDelSubmit = async (id: string) => {
    await api.deleteCategory({ id: id }).then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  
    getCategoryList()
  }

  const columns: ColumnsType<Category.CategoryItem> = [
    {
      title: '類型',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '組件名稱',
      dataIndex: 'enName',
      key: 'enName',
      width: 350,
    },
  
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
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
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <FormItem label='類型' name={'name'}>
          <Input placeholder='name' />
        </FormItem>
        <FormItem label='状态' name='CatStatus'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type='primary' className='mr10' onClick={getCategoryList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>類型列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateCategory mRef={categoryRef} update={getCategoryList} />
    </div>
  )
}
