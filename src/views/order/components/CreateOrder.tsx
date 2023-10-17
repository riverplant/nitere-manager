import api from "@/api";
import { Order } from "@/types/api";
import { IAction, IModalProp } from "@/types/modal";
import { message } from "@/utils/AntdGlobal";
import {Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useEffect, useImperativeHandle, useState } from "react";
export default function CreateOrder(props:IModalProp<Order.OrderItem>) {
const [action, setAction] = useState<IAction>('create')
 const [visible, setVisible] = useState(false)
 const [modalValideOpen, setModalValideOpen] = useState(false)
 const[form] = Form.useForm();
 const[boxList, setBoxList] = useState<Order.DictItem[]>([])
 const[productTypeList, setProductTypeList] = useState<Order.DictItem[]>([])


 let total:number = 0
 useEffect(()=>{
    getInitData()
 }, [])

 const getInitData =async () => {
   const boxList = await api.getBoxList();
   //const pList = await api.getProductTypeList()
   setBoxList(boxList)
   //setProductTypeList(pList)
 }

 useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
//打开弹框
 const open = (type: IAction, data?: Order.OrderItem)=>{
    setAction(type)
    setVisible(true);
    console.log('data:', data)
  if (type === 'update' && data) {   
        form.setFieldValue('id', data.id)
        form.setFieldValue('orderId', data.orderId)
        form.setFieldValue('cityName', data.cityName)
        form.setFieldValue('vehicleName', data.vehicleName)
        form.setFieldValue('userName', data.userName)
        form.setFieldValue('mobile', data.mobile)
        form.setFieldValue('orderAmount', data.orderAmount)
        form.setFieldValue('userPayAmount', data.userPayAmount)
        form.setFieldValue('driverAmount', data.driverAmount)
        form.setFieldValue('endAddress', data.endAddress)
        form.setFieldValue('payType', data.payType)
        form.setFieldValue('state', data.state)
        form.setFieldValue('useTime', dayjs(data.useTime))
        form.setFieldValue('endTime', dayjs(data.endTime))


      }else {
       let orderId =  Math.floor(Math.random() * 100000000)
       form.setFieldValue('orderId', orderId)
      }



 }
//弹框关闭
 const handleCancel = ()=>{
    form.resetFields()
    setVisible(false)  
 }
//创建订单提交
 const handleOk = async ()=>{
  const valid = await form.validateFields()
  if(valid){
    const params = { ...form.getFieldsValue()}
    if (action === 'create') {
        await api.createOrder(params)
        message.success('创建订单成功')
      } else {
        await api.updateOrder(params)
        message.success('更新订单成功')
      }
    handleCancel()
    props.update()
  }
 }

 const setDriverAmount = ()=>{
    let oa:number = form.getFieldValue('orderAmount') || 0
    let up:number = form.getFieldValue('userPayAmount') || 0
    total = oa - up
    form.setFieldValue('driverAmount', total)
 }

 const openValide = ()=>{
    if( form.getFieldValue('driverAmount') !== total )
      setModalValideOpen(true)
 }

 const handleValideCancel = ()=>{
    setModalValideOpen(false)
    setDriverAmount()
 }

 const handleValideOk = ()=>{
    setModalValideOpen(false)
 }

 const initFormValues = {
    useTime: dayjs(),
    endTime: dayjs(),
  };

 return <Modal title="创建订单" width={800} open={visible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
<Form form={form} layout="horizontal" labelAlign="right" labelCol={{span:8}} wrapperCol={{span:16}} initialValues={initFormValues}>
<FormItem name='id' hidden>
          <Input />
        </FormItem>
        <Row>
    <Col span={12}>
    <FormItem name='orderId' label="包裹編號">
          <Input disabled={true} />
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="cityName" label="箱号" rules={[{required:true, message:'请选择箱号'}]}>
            <Select placeholder="请选择箱号">
                {
                   boxList.map(item=>{
                    return <Select.Option value={item.id} key={item.id}>{item.id}</Select.Option>
                   }) 
                }
            </Select>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="vehicleName" label="商品类型" >
            <Select placeholder="请选择商品类型">
            <Select.Option value='日用商品' key={1}>日用商品</Select.Option>
     {/**           {
                   productTypeList.map(item=>{
                    return <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
                   }) 
                }  
                
    */}
            </Select>
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="userName" label="用户名称">
           <Input placeholder="请输入用户名称"></Input>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="mobile" label="手机号">
           <Input placeholder="请输入下单手机号"></Input>
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="orderAmount" label="订单金额">
           <Input type='number' placeholder="请输入订单金额" onChange={setDriverAmount}></Input>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="userPayAmount" label="优惠金额" >
           <Input type='number' placeholder="请输入优惠金额" onChange={setDriverAmount}></Input>
        </FormItem>
    </Col>
</Row>

<Row>
<Col span={12}>
        <FormItem name="driverAmount" label="实际支付金额" help="实际支付金 = 订单金额 - 优惠金额">{}
           <Input type='number' placeholder="请输入下单金额" onBlur={openValide} />
        </FormItem>
    </Col>
    <Col span={12}>
        <FormItem name="endAddress" label="送货地址">
           <Input placeholder="请输入送货地址"></Input>
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="payType" label="支付方式">
            <Select placeholder="请选择支付方式">
                <Select.Option value={1}>微信支付</Select.Option>
                <Select.Option value={2}>Interac</Select.Option>
            </Select>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="state" label="订单状态">
            <Select placeholder="请选择订单状态">
                <Select.Option value={1}>进行中</Select.Option>
                <Select.Option value={2}>已支付</Select.Option>
                <Select.Option value={3}>支付失败</Select.Option>
                <Select.Option value={4}>退款</Select.Option>
            </Select>
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="useTime" label="出海时间">
           <DatePicker />
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="endTime" label="预计送货时间">
    <DatePicker />
        </FormItem>
    </Col>
</Row>


</Form>
<Modal title="Basic Modal" open={modalValideOpen} onOk={handleValideOk} onCancel={handleValideCancel}>
        <p>你输入的金额与实际金额不匹配</p>
        <p>你是否要接受你输入的金额?</p>
      </Modal>
 </Modal>
 
}