import api from "@/api";
import { Order } from "@/types/api";
import { IDetailProp } from "@/types/modal";
import { formatDate, formatMoney, formateMobile } from "@/utils";
import { Descriptions, Modal } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import { useImperativeHandle, useState } from "react";

export default function OrderDetail(props:IDetailProp){
    const [visible, setVisible] = useState(false)
    const [detail,setDetail] = useState<Order.OrderItem>()

    useImperativeHandle(props.mRef,()=>{
        return {
            open
        }
    })

    const open = async(orderId:string) =>{
        setVisible(true)
        const detail = await api.getOrderDetail(orderId)
        setDetail(detail)

    }
    //关闭弹框
    const handleCancel = ()=>{
        setVisible(false)
    }
    return <Modal title="订单详情" width={800} open={visible} footer={false} onCancel={handleCancel}>
    <Descriptions column={2} style={{padding:'10px, 30px'}}>
     <DescriptionsItem label='包裹ID'> {detail?.orderId} </DescriptionsItem>
     <DescriptionsItem label='箱子编号'> {detail?.cityName} </DescriptionsItem>
     <DescriptionsItem label='顾客ID'> {detail?.userName} </DescriptionsItem>
     <DescriptionsItem label='手机号码'> {formateMobile(detail?.mobile)} </DescriptionsItem>
     <DescriptionsItem label='商品类型'> {detail?.vehicleName} </DescriptionsItem>
     <DescriptionsItem label='订单状态'> {detail?.state == 1? '未支付' :(detail?.state == 2? '已支付' : (detail?.state == 3? '支付超时':'已退款'))} </DescriptionsItem>
     <DescriptionsItem label='支付方式'> {detail?.payType === 1? '微信支付' : 'Interac'} </DescriptionsItem>
     <DescriptionsItem label='订单金额'> {formatMoney(detail?.orderAmount)} </DescriptionsItem>
     <DescriptionsItem label='优惠金额'> {formatMoney(detail?.userPayAmount)} </DescriptionsItem>
     <DescriptionsItem label='实际支付金额'> {formatMoney(detail?.driverAmount)} </DescriptionsItem>
     <DescriptionsItem label='出海时间'> {formatDate(detail?.useTime) } </DescriptionsItem>
     <DescriptionsItem label='预计送货时间'> {formatDate(detail?.endTime)} </DescriptionsItem>
    </Descriptions>
    </Modal>
}