import api from "@/api";
import { Cabinet } from "@/types/api";
import { IAction, IModalProp } from "@/types/modal";
import {Modal} from "antd";

import Table, { ColumnsType } from "antd/es/table";

import { useEffect, useImperativeHandle, useState } from "react";
export default function CreateCabinet(props:IModalProp<Cabinet.Item>) {

const [, setAction] = useState<IAction>('create')
 const [visible, setVisible] = useState(false)


 const[cabinetVoList, setCabinetVoList] = useState<Cabinet.Vo[]>([])

 useEffect(()=>{
   
 }, [])

 const getInitData =async (id:string) => {
   const cabinetVoList = await api.getOrderInfoListGroupByPid(id); 
   setCabinetVoList(cabinetVoList)
 }

 useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
//打开弹框
 const open = (type: IAction, data:Cabinet.Item)=>{ 
    getInitData(data.id)
    setAction(type)
    setVisible(true);

 }
 
//弹框关闭
 const handleCancel = ()=>{
    setVisible(false)  
 }


 const columns: ColumnsType<Cabinet.Vo> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '出海日期',
      dataIndex: 'departureDate',
      key: 'departureDate',
      width:195,
    },
    {
      title: '提貨點',
      dataIndex: 'pName',
      key: 'pName',
    },
    {
      title: '顧客數',
      dataIndex: 'clientCount',
      key: 'clientCount',
    },
    {
        title: '箱數',
        dataIndex: 'boxCount',
        key: 'boxCount',
      },
   
    {
      title: '其中:混箱',
      dataIndex: 'boxMixCount',
      key: 'boxMixCount',
     
    },
    {
        title: '包裹數',
        dataIndex: 'orderCount',
        key: 'orderCount',
       
      },
      {
        title: '总体积/m³',
        dataIndex: 'pVolumeTotal',
        key: 'pVolumeTotal',
       
      },
      {
        title: '总重量/Kg',
        dataIndex: 'pWeightTotal',
        key: 'pWeightTotal',
        width:195,
       
      },

  ]



 return <Modal  width={1200} open={visible}  footer={false}  onCancel={handleCancel}>
<div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>按提貨點匯總</div>
        </div>

        <Table
          bordered
          rowKey='id'
          dataSource={cabinetVoList}
          columns={columns}
          pagination={false}
        />
      </div>
 </Modal>
 
}