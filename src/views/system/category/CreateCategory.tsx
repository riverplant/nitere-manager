import { IAction, IModalProp } from '@/types/modal'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, TreeSelect, Radio } from 'antd'
import { Category } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import FormItem from 'antd/es/form/FormItem'

export default function CreatCategory(props: IModalProp<Category.CategoryItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState<Category.CategoryItem[]>([])



  useEffect(() => {
    getCategoryList()

  }, [])

  const getCategoryList = async () => {
    const data = await api.getCategoryList()
    setCategory(data)
  }

  //打开弹窗函数
  const open = (type: IAction, data?: Category.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getCategoryList()
    if ( data  ) {   
        form.setFieldsValue(data)
    }

  }
  useImperativeHandle(props.mRef, () => ({
    open,
  }))
  const handleSubmit = async () => {

    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        const params: Category.CreateParams = { ...form.getFieldsValue() }

        await api.createCategory(params)
      } else {
        const params: Category.EditParams = { ...form.getFieldsValue() }
       
        

        await api.editCategory(params)
      }
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields
  }



 
  return (
    <Modal
      title={action === 'create' ? '创建類型' : '编辑類型'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <FormItem name='id' hidden>
          <Input />
        </FormItem>
        <FormItem label='父級類型' name='parentId'>
          <TreeSelect
            placeholder='请选择父級類型'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'name', value: 'id' }}
            treeData={category}
          />
        </FormItem>
        <FormItem label='名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder='请输入名称' />
        </FormItem>
        <FormItem label='類型代碼' name='enName' >
          <Input placeholder='请输入類型代碼' />
        </FormItem>
        <FormItem label='状态' name='catStatus'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  )
}


