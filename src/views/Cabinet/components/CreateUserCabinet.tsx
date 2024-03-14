import { Cabinet } from "@/types/api";
import { IAction, IModalProp } from "@/types/modal";
import {Modal} from "antd";

import Table, { ColumnsType } from "antd/es/table";

import { useEffect, useImperativeHandle, useState } from "react";
export default function CreateUserCabinet(props:IModalProp<Cabinet.Vo>) {

const [, setAction] = useState<IAction>('create')
 const [visible, setVisible] = useState(false)


 const[userCabinetVoList, setUserCabinetVoList] = useState<Cabinet.UserCabinetVo[]>([])

 useEffect(()=>{
   
 }, [])

 const getInitData =(data:Cabinet.Vo) => {
   
  setUserCabinetVoList(data.userCabinetVos)
 }

 useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
//打开弹框
 const open = (type: IAction, data:Cabinet.Vo)=>{ 
    getInitData(data)
    setAction(type)
    setVisible(true);

 }
 
//弹框关闭
 const handleCancel = ()=>{
    setVisible(false)  
 }


 const columns: ColumnsType<Cabinet.UserCabinetVo> = [

    {
      title: '提貨码',
      dataIndex: 'code',
      key: 'code',
      width:105,
    },
    {
        title: '箱數',
        dataIndex: 'boxCount',
        key: 'boxCount',
        width:105,
      },
    {
        title: '包裹數',
        dataIndex: 'orderCount',
        key: 'orderCount',
        width:105,
       
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
        width:105,
       
      },
      {
        title: '地址',
        dataIndex: 'formatted_address',
        key: 'formatted_address',
        width:105,
       
      }

  ]



 return <Modal  width={1200} open={visible}  footer={false}  onCancel={handleCancel}>
<div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>按用户汇总</div>
        </div>

        <Table
          bordered
          rowKey='id'
          dataSource={userCabinetVoList}
          columns={columns}
          pagination={false}
        />
      </div>
 </Modal>
 
}