//接口类型定义

export interface Result<T = any> {
  code: number
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

export namespace User {
  export interface UserInfo {
    _id: string
    userId: number
    userName: string
    profiledID: string
    userEmail: string
    code: string
    mobile: string
    deptId: string
    deptName: string
    role: number
    state: number
    createTime: string
    userImg: string
  }

  export interface Params extends PageParams {
    userId?: number
    code?: string
    state?: number
  }

  export interface CreateParams {
    userName: string
    code: string
    phone?: string
    pickupPoint: string
    delivreAddress: string
    role: number
    state: number
    createTime: string
    userImg: string
  }

  export interface EditParams extends CreateParams {
    userId: number
    _id: string
    profiledID: string
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
    deptName?: string
  }
  export interface PickPointItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    address: string
    parentId: string
    userName: string
    children: PickPointItem[]
  }

  export interface CreateParams {
    parentId?: string
    deptName: number
    address: string
    userName: string
    createTime: string
    updateTime: string
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DeleteParams {
    _id: string
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
    menuState: number // 1. 正常 2: 停用
    menuCode?: string // 按钮权限标识
    parentId?: string // 父级菜单ID
    path?: string //菜单路径
    component?: string //组件名称
    orderBy: number // 组件排序
  }

  export interface EditParams extends CreateParams {
    _id?: string
  }

  export interface DelParams {
    _id?: string
  }

  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
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
    _id: string
  }

  export interface DelParams {
    _id: string
  }

  export interface RoleItem extends CreateParams {
    _id: string
    permissionList: {
      checkedKeys: string[]
    }
    updateTime: string
    createTime: string
  }

  export interface CreatePermission {
    _id: string
    permissionList: {
      checkedKeys: string[]
    }
  }
}
