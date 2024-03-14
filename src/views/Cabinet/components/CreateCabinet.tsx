import api from "@/api";
import { Cabinet } from "@/types/api";
import { IAction, IModalProp } from "@/types/modal";
import {Button, Modal, Space} from "antd";

import Table, { ColumnsType } from "antd/es/table";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import CreateUserCabinet from "./CreateUserCabinet";
export default function CreateCabinet(props:IModalProp<Cabinet.Item>) {

const [, setAction] = useState<IAction>('create')
 const [visible, setVisible] = useState(false)


 const[cabinetVoList, setCabinetVoList] = useState<Cabinet.Vo[]>([])

  // 为了保证有open方法所以这里需要定义一个泛型，里面有open
 const usercabinetRef = useRef<{ open:(type: IAction, data?: Cabinet.Vo)=>void }>()

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

 const exportAddress = async (record: Cabinet.Vo) =>{
  console.log('record:',record)
  api.exportAddress(record.userCabinetVos)
}

const handleGroupByUser = (record:Cabinet.Vo)=>{
  usercabinetRef.current?.open('update', record)
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
      width:105,
    },
    {
      title: '提貨點',
      dataIndex: 'pName',
      key: 'pName',
      width:105,
    },
    {
      title: '顧客數',
      dataIndex: 'clientCount',
      key: 'clientCount',
      width:100
    },
    {
        title: '箱數',
        dataIndex: 'boxCount',
        key: 'boxCount',
        width:105,
      },
   
    {
      title: '其中:混箱',
      dataIndex: 'boxMixCount',
      key: 'boxMixCount',
      width:105,
     
    },
    {
        title: '包裹數',
        dataIndex: 'orderCount',
        key: 'orderCount',
        width:105,
       
      },
      {
        title: '总体积/m³',
        dataIndex: 'pVolumeTotal',
        key: 'pVolumeTotal',
        width:105,
       
      },
      {
        title: '总重量/Kg',
        dataIndex: 'pWeightTotal',
        key: 'pWeightTotal',
        width:105,
       
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render(_, record) {
          return (
            <Space>
              <Button type='primary' onClick={() => exportAddress(record)}>
                导出该提货点用户地址
              </Button>
              <Button type='primary' onClick={() => handleGroupByUser(record)}>
                提用户汇总
              </Button>
            </Space>
          )
        },
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

      <CreateUserCabinet mRef={usercabinetRef}  update={() => {
         
        }}/>
 </Modal>
 
}