import { IAction, IModalProp } from '@/types/modal'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, Select, TreeSelect, DatePicker, message, TimePicker, InputNumber, Radio } from 'antd'
import { Menu } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import FormItem from 'antd/es/form/FormItem'
import { InfoCircleOutlined } from '@ant-design/icons'
export default function CreateMenu(props: IModalProp<Menu.MenuItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])

  useEffect(() => {
    getMenuList()
  }, [])

  //获得菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }

  useImperativeHandle(props.mRef, () => ({
    open,
  }))

  //打开弹窗函数
  const open = (type: IAction, data?: Menu.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getMenuList()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        const params: Menu.CreateParams = { ...form.getFieldsValue() }
        console.log('params', params)
        await api.createMenu(params)
        message.success('创建成功')
      } else {
        const params: Menu.EditParams = { ...form.getFieldsValue() }
        console.log('edit', params)
        //if (startTime) params.createTime = startTime
        //if (endTime) params.updateTime = endTime
        await api.editMenu(params)
        message.success('更新成功')
      }
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    form.resetFields
    setVisible(false)
  }

  return (
    <Modal
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }} initialValues={{ menuType: 1, menuState: 1 }}>
        <FormItem name='_id' hidden>
          <Input />
        </FormItem>
        <FormItem label='上级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择上级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
            treeData={menuList}
          />
        </FormItem>
        <FormItem label='菜单类型' name='menuType'>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </FormItem>
        <FormItem noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <FormItem label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识' />
              </FormItem>
            ) : (
              <>
                <FormItem label='菜单图标' name='icon'>
                  <Input placeholder='请输入提货点名称' />
                </FormItem>
                <FormItem label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </FormItem>
              </>
            )
          }}
        </FormItem>
        <FormItem label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </FormItem>
        <FormItem label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}>
          <InputNumber placeholder='请输入排序' />
        </FormItem>

        <FormItem label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  )
}
