import api from "@/api";
import { Order } from "@/types/api";
import { IDetailProp } from "@/types/modal";
import { formatDate, formatMoney } from "@/utils";
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

    const open = async(id:string) =>{
        setVisible(true)
        const detail = await api.getOrderDetail(id)
        setDetail(detail)

    }
    //关闭弹框
    const handleCancel = ()=>{
        setVisible(false)
    }
    return <Modal title="订单详情" width={800} open={visible} footer={false} onCancel={handleCancel}>
    <Descriptions column={2} style={{padding:'10px, 30px'}}>
     <DescriptionsItem label='包裹ID'> {detail?.id} </DescriptionsItem>
     <DescriptionsItem label='箱子编号'> {detail?.orderNumber} </DescriptionsItem>
     <DescriptionsItem label='用户提货码'> {detail?.code} </DescriptionsItem>
     <DescriptionsItem label='取货仓库'> {detail?.pName} </DescriptionsItem>
     <DescriptionsItem label='商品类型'> {detail?.catName} </DescriptionsItem>
     <DescriptionsItem label='订单状态'> {detail?.payStatus == 10? '未支付' :(detail?.payStatus == 20? '已支付' : (detail?.payStatus == 30? '支付超时':'已退款'))} </DescriptionsItem>
     <DescriptionsItem label='支付方式'> {detail?.payMethod === 1? '微信支付' : 'Interac'} </DescriptionsItem>
     <DescriptionsItem label='订单金额'> {formatMoney(detail?.amount)} </DescriptionsItem>
     <DescriptionsItem label='优惠金额'> {formatMoney(detail?.discount)} </DescriptionsItem>
     <DescriptionsItem label='实际支付金额'> {formatMoney(detail?.price)} </DescriptionsItem>
     <DescriptionsItem label='出海时间'> {formatDate(detail?.departureDate) } </DescriptionsItem>
     {/**<DescriptionsItem label='预计送货时间'> {formatDate(detail?.endTime)} </DescriptionsItem> **/}
    </Descriptions>
    </Modal>
}