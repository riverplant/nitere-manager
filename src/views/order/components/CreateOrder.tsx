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


 let total:number = 0
 useEffect(()=>{
    getInitData()
 }, [])

 const getInitData =async () => {
   const boxList = await api.getBoxList(); 
   setBoxList(boxList)
 }

 useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
//打开弹框
 const open = (type: IAction, data: Order.OrderItem)=>{ 
    setAction(type)
    setVisible(true);
  if (type === 'update' && data) {   
        form.setFieldValue('id', data.id)
        form.setFieldValue('orderNumber', data.orderNumber)
        form.setFieldValue('boxId', data.boxId)
        form.setFieldValue('catName', data.catName)
        form.setFieldValue('code', data.code)
        form.setFieldValue('trackingNumber', data.trackingNumber)
        form.setFieldValue('amount', data.amount)
        form.setFieldValue('discount', data.discount)
        form.setFieldValue('price', data.price)
        form.setFieldValue('formatted_address', data.formatted_address)
        form.setFieldValue('payMethod', data.payMethod)
        form.setFieldValue('payStatus', data.payStatus)
        if(data.departureDate != null )
          form.setFieldValue('departureDate', dayjs(data.departureDate))
        if(data.deliverDate != null )
          form.setFieldValue('deliverDate', dayjs(data.deliverDate))
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
    console.log('params:',params)
    await api.updateOrder(params)
    message.success('更新订单成功')
    handleCancel()
    props.update()
  }
 }

 const setDriverAmount = ()=>{
    let oa:number = form.getFieldValue('amount') || 0
    let up:number = form.getFieldValue('discount') || 0
    total = oa - up
    form.setFieldValue('price', total)
 }

 const openValide = ()=>{
    if( form.getFieldValue('price') !== total )
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

 return <Modal title="更新订单" width={800} open={visible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
<Form form={form} layout="horizontal" labelAlign="right" labelCol={{span:8}} wrapperCol={{span:16}} initialValues={initFormValues}>
<FormItem name='id' hidden>
          <Input />
        </FormItem>
        <Row>
    <Col span={12}>
    <FormItem name='orderNumber' label="包裹編號">
          <Input disabled={true} />
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="boxId" label="箱号" rules={[{required:true, message:'请选择箱号'}]}>
            <Select placeholder="请选择箱号">
                {
                   boxList.map(item=>{
                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                   }) 
                }
            </Select>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="catName" label="商品类型" >
         <Input disabled={true} />
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="code" label="用户提货码">
           <Input placeholder="请输入用户提货码"></Input>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="trackingNumber" label="快递单号">
           <Input disabled={true}></Input>
        </FormItem>
    </Col>
</Row>

<Row>
    <Col span={12}>
        <FormItem name="amount" label="订单金额">
           <Input type='number' placeholder="请输入订单金额" onChange={setDriverAmount}></Input>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="discount" label="优惠金额" >
           <Input type='number' placeholder="请输入优惠金额" onChange={setDriverAmount}></Input>
        </FormItem>
    </Col>
</Row>

<Row>
<Col span={12}>
        <FormItem name="price" label="实际支付金额" help="实际支付金 = 订单金额 - 优惠金额">{}
           <Input type='number' placeholder="请输入下单金额" onBlur={openValide} />
        </FormItem>
    </Col>
    <Col span={12}>
        <FormItem name="formatted_address" label="送货地址">
           <Input disabled={true}></Input>
        </FormItem>
    </Col>
</Row>

{/**<Row>
    <Col span={12}>
        <FormItem name="payMethod" label="支付方式">
            <Select placeholder="请选择支付方式">
                <Select.Option value={1}>微信支付</Select.Option>
                <Select.Option value={2}>Interac</Select.Option>
            </Select>
        </FormItem>
    </Col>
    <Col span={12}>
    <FormItem name="payStatus" label="订单状态">
            <Select placeholder="请选择订单状态">
                <Select.Option value={10}>进行中</Select.Option>
                <Select.Option value={20}>已支付</Select.Option>
                <Select.Option value={30}>支付失败</Select.Option>
                <Select.Option value={40}>退款</Select.Option>
            </Select>
        </FormItem>
    </Col>
</Row>
            **/}

<Row>
<Col span={12}>
        <FormItem name="departureDate" label="出海时间">
           <DatePicker />
        </FormItem>
    </Col>

    <Col span={12}>
    <FormItem name="deliverDate" label="预计送货时间">
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