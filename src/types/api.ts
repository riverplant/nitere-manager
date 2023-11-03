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
  export interface Params extends PageParams {
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
    roleList:string
    userStatus: number
    createTime: string
    userImg: string
    formatted_address: string
    openid: string
    isDeleted: boolean
    updateTime: string

  }

  export interface Params extends PageParams {
    code?: string
    userStatus?: number
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
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
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
    orderId?: string
    userName?:string
    state?:number
  }

  export enum PayStatus {
    //nopay = 10,
    doing = 1,
    //payed = 20,
    done = 2,
    //payfaild = 30,
    timeout = 3,
    //refunded = 40
    cance = 4
  }

  export interface CreateParams {
    cityName:string,
    userName:string,
    mobile:number,
    startAddress:string,
    endAddress:string,
    orderAmount:number, // 订单金额
    userPayAmount:number, // 支付金额
    driverAmount:number, // 支付金额
    payType: number, // 1. 微信 2. 支付宝
    driverName:string,
    vehicleName:string,
    state: PayStatus,
    useTime:string,
    endTime:string,
    //realWeight:string,
    //volum:string,
    //volumWeight:string

  }

  export interface OrderItem extends CreateParams {
    id:string,
    orderId:string,
    route:Array<{lng:string; lat:string}>,
    createTime:string,
    remark:string
  }

  export interface SearchParams {
    orderId?:string,
    userName?:string,
    state?:number
  }

  export interface Params extends PageParams{
    orderId?:string,
    userName?:string,
    state?:number
  }

  export interface DictItem {
    id:number,
    name:string
  }

}
