//接口类型定义
export interface Result<T = any> {
  status: number
  data: T
  msg: string
}
export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}
export interface PageParams {
  pageNum: number | undefined
  pageSize?: number | undefined
}

export namespace Role {
  export interface Params {
    roleName?: string
  }

  export interface CreateParams {
    roleName: string
    remark?: string
  }

  export interface EditParams extends CreateParams {
    id: string
  }

  export interface DelParams {
    id: string
  }

  export interface RoleItem extends CreateParams {
    id: string
    permissionList: {
      checkedKeys: string[],
      halfCheckedKeys:string[]
    }
    updateTime: string
    createTime: string
  }

  export interface CreatePermission {
    id: string
    permissionList: {
      checkedKeys: string[],
      halfCheckedKeys:string[]
    }
  }
}

export namespace User {
  export interface UserInfo {
    id: string
    userName: string
    wxnumber: string
    email: string
    code: string
    mobile: string
    ppName: string
    userRoles: number
    userStatus: number
    createTime: string
    userImg: string
    formatted_address: string
    openid: string
    isDeleted: boolean
    updateTime: string
    password: string
    role:string
    couponName: String 
    couponExpireDate: string

  }

  export interface Params extends PageParams {
    code?: string
    userStatus?: number
    userId?: string
  }

  export interface CreateParams {
    userName: string
    code: string
    mobile?: string
    wxnumber: string
    ppName: string
    pid: string
    formatted_address: string
    userRoles: number
    userStatus: number
    createTime: string
    userImg: string
    url: string
    place_id:string
    couponId:string
    
  }

  export interface CreateWebParams {
    email: string
    password: string
    role: string
    userStatus: number
    userName: string
 
  }

  export interface EditWebParams extends CreateWebParams{
    id: string
  }

  export interface EditParams extends CreateParams {
    id: string
  }
}

export namespace Dashboard {
  //包裹信息
  export interface PackageReportData {
    packageCount: number
    packageAccepteCount: number
    packageAccepteWeight: string
    packageAccepteVolum: string
    packageUnkonwCount: number
    wetChatTotalPaymentAmount: ''
    eTransferTotalPaymentAmount: ''
    packageRefuseCount: number
  }
  export interface ReportData {
    orderCount:      number
	  // 通過驗證的包裹數量
	  orderValideCount: number
	  // 未通過驗證的包裹數量
	  orderInValideCount:number
	   // 待认领
	   claimCount:number

	// 验货通过包裹总重量
	   weightTotal: number
	// 验货通过包裹总体积
	   volumTotal: number
	// Wechat支付
	  payByWXTotal: number
	// e-Transfer支付
   payByETransferTotal: number

   	// 通過驗證的包裹數量
	 orderNotPayCount: number

	// 未通過驗證的包裹數量
	 orderPayCount: number

  }

  export interface LineData {
    label: string[] // 12个月
    order: number[] // 订单数量
    amount: number[] // 流水金额
  }

  export interface PieElement {
    value: number
    name: string
  }

  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: [
      {
        name: string
        value: number[]
      }
    ]
  }

  export interface ResultData<T = any> {
    list: T[]
    page: {
      pageNum: number
      pageSize: number
      total: number | 0
    }
  }
}

export namespace PickPoint {
  export interface Params {
    ppName?: string
    pickPointStatus?: number
  }
  export interface PickPointItem {
    id: string
    createTime: string
    updateTime: string
    startTime:string
    endTime:string
    ppName: string
    formatted_address: string
    place_id:string
    parentId: string
    userId: string
    ppCode:string
    couponName: String 
    couponExpireDate: string
    pickPointStatus:number
    nRandom:number
    children: PickPointItem[]
  }

  export interface CreateParams {
    parentId?: string
    ppName: number
    place_id: string
    formatted_address:string
    createTime: string
    updateTime: string
    startTime:string
    endTime:string
    ppCode:string
    userId:string
    city:string
    url:string
    couponId:string
    nRandom: number
  }

  export interface EditParams extends CreateParams {
    id: string
  }

  export interface DeleteParams {
    id: string
  }
}

export namespace Menu {
  export interface Params {
    menuName?: string
    menuState?: number // 1. 正常 2: 停用
  }

  export interface CreateParams {
    menuName: string // 菜单名称
    icon?: string //菜单图标
    menuType: number // 1:菜单 2:按钮 3:页面
    menuStatus: number // 1. 正常 2: 停用
    menuCode?: string // 按钮权限标识
    parentId?: string // 父级菜单ID
    path?: string //菜单路径
    component?: string //组件名称
    orderBy: number // 组件排序
  }

  export interface EditParams extends CreateParams {
    id?: string
  }

  export interface DelParams {
    id?: string
  }

  export interface MenuItem extends CreateParams {
    id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
}

export namespace PayOrders {
  export interface Params {
    code?: string
    payMethod?: number // 1. 微信小程序支付 2. e-transfer
    payStatus?:number // 10：未支付 20：已支付 30: 支付失败 40： 已退款
    dateStart?:string
    dateEnd?:string
    userId?:string
  }

  export interface CreateParams {
	  openId: string
	  userId: string
    code:   string
	  // 实际支付价格
    price: string
	// 提货仓库

	  payMethod: number
	/**
	 * 10：未支付 20：已支付 30: 支付失败 40： 已退款
	 */
	  payStatus: number
  }

  export interface EditParams extends CreateParams {
    id?: string
  }


  export interface PayOrdersItem  {
    openId: string
	  userId: string
    code:   string
	  // 实际支付价格
    price: string
	  // 提货仓库
	  pName:   string
	  payMethod: number
	/**
	 * 10：未支付 20：已支付 30: 支付失败 40： 已退款
	 */
	  payStatus: number
    transactionTime:string
  }
}


export namespace Category {
  export interface Params {
    name?: string
    catStatus?: number // 1. 正常 2: 停用
  }

  export interface CreateParams {
    name: string // 類型名称
    catStatus: number // 1. 正常 2: 停用
    enName?: string // 组件名称
    parentId?: string // 父级菜单ID
    orderBy: number // 组件排序
  }

  export interface EditParams extends CreateParams {
    id?: string
  }

  export interface DelParams {
    id?: string
  }

  export interface CategoryItem extends CreateParams {
    id: string
    createTime: string
    updateTime: string
    name: string
    enName?: string
    CatStatus: number
    parentId?: string
    children: CategoryItem[]

  }
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
    pageCount: number | 0
  }
}

export namespace ClaimRequest {

  export interface Params extends PageParams{
    code?: string
    status?: number // 0.全部 1.處理中 2. 正常 3: 包裹丟失
    isDelete?: number
    userId?: string
  } 

  export interface ClaimRequestItem {
    id:             string
    createTime:     string
    updateTime:     string
    trackingNumber: string
    openid:         string
    ImageUrlList:   string[] 
    code:           string
	  //上下架状态 上下架状态,1:處理中 2:處理完成 3:丟失
    status:         number
    //逻辑删除状态,1:正常 2:已删除
    isDelete:       number
  }

}

export namespace ChangeWarehouseRequest {
  export interface Params {
    code?: string
    isAccepted?: number // 0.審核中 1. 正常 2: 停用
  }

  export interface CreateParams {
    pidOlderName: string 
    pidNewName: string 
    isAccepted: number 
    code: string
    openId: string 
  }

  export interface EditParams extends CreateParams {
    id: string
    msg?: string
   
  }

  export interface DelParams {
    id?: string
  }

  export interface ChangeWarehouseRequestItem extends CreateParams {
    id: string
    createTime: string
    updateTime: string
  }
}

export namespace Order {
  export interface Params extends PageParams {
    orderNumber?: string
    code?:string
    orderStatus?:number
    payStatus?:number
    userId?:string
  }

  export interface SearchParams {
    orderNumber?:string,
    code?:string,
    orderStatus?:number
    payStatus?:number
  }
  export interface CreateParams {
	  code: string
    trackingNumber:string
    pLong:number
    pWidth:number
    pWeight:number
    pHeight:number
    pWeightByVolume:number
    pVolume:number
    price:number
    payMethod:number
    amount:number
    postPrice:number
    discount:number
    catName:string
    createTime:string
    updateTime:string
    orderNumber:string
    departureDate:string
    orderStatus:number
    payStatus:number
    pId:string
    pName:string
    boxId:string
    formatted_address:string
    deliverDate:string
  }

  export interface EditParams extends CreateParams {
    id: string
   
  }

  export interface OrderItem extends CreateParams {
    id:string,
  }

  export interface DictItem {
    id:string,
    name:string
  }

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace Cabinet {

  export interface Params extends PageParams {
    dateStart?: string
    dateEnd?:string
  }

  export interface ExportParams  {
    id: string

  }


  export interface Item {
  id: string
  departureDate:string
	boxs: BoxItem[]
	createTime: string
	updateTime: string
	// 0.全部 1.未出海 2. 已出海
	Status: number
	// 1.未刪除 2. 已刪除
	isDelete: number
	cabinetNumber: number
	pid: string
  pName: string
	// 合計重量
   weightTotal: number
	// 合計體積
	volumTotal: number
	// 合计价格
	priceTotal: number
	// 包裹數量
	orderCount: number

  amountTotal: number
  }

  export interface Vo {
    id:number
    departureDate:string
    pName: string
    clientCount: number
    boxCount: number
    boxMixCount:number
    orderCount: number
    pVolumeTotal: number
    pWeightTotal: number
    userCabinetVos: UserCabinetVo[]
    }

    export interface UserCabinetVo {
      code             :string
      mobile           :string
      formatted_address:string
      boxCount         :number
      orderCount       :number
      }

  export interface BoxItem {
    id: string
    pName: string
    code: string
    boxNumber: number
    // 取貨點
    pid: string
    // 裝箱狀態: 1. 未封箱 2. 已封箱
    boxStatus: number
    // 箱子類型: 1. 獨立包裹 2. 合裝箱
    boxType: number
    // 合計重量
    weightTotal:number
    // 合計體積
    volumTotal: number 
    // 合计价格
    priceTotal: number
    // 包裹數量
    orderCount: number
    // 封箱日期
    SealingDate: string
    // 所屬櫃子ID
    cabinetId: string
  
    /**
     * 逻辑删除状态,1:正常 2:已删除
     */
    isDelete: number
  
    createTime: string
  
    updateTime: string

  
    orderInfos: Order.OrderItem[]
  }

}

export namespace Coupon {

  export interface Vo {
    name: string

    value: number
  
    expiryDate: string
  
    id: string
  
    createTime: string
  
    updateTime: string
  
    // 優惠碼類型: 1.百分比 2. 數值 3. 無
    couponType:number

    status: number
  }

  export interface Params {
    status?: number
  }

  export interface CreateParams {
    name: string

    value: number
  
    expiryDate: string
   // 優惠碼類型: 1.百分比 2. 數值 3. 無
   couponType:number

   status: number
  }

  export interface EditParams extends CreateParams {
    id: string
  }


}
