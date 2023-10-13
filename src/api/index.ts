import { Dashboard, Login, Menu, Order, PickPoint, Result, Role, User } from '@/types/api'
import request from '@/utils/request'

export default {
  //登录
  login(params: Login.params) {
    return request.post<Result>('http://127.0.0.1:8080/users/login', params)
  },
     //菜单管理
     getMenuList(params?: Menu.Params) {
      return request.get<Menu.MenuItem[]>('http://127.0.0.1:8080/menu/list', params)
    },
  
    //创建菜单
    createMenu(params: Menu.CreateParams) {
      return request.post('http://127.0.0.1:8080/menu', params)
    },
  
    //编辑菜单
    editMenu(params: Menu.EditParams) {
      return request.put('http://127.0.0.1:8080/menu', params)
    },
  
    deleteMenu(params: Menu.DelParams) {
      return request.post('http://127.0.0.1:8080/menu/delete', params)
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //提货点管理
  //查询提货点列表
  getPickPointsList(params?: PickPoint.Params) {
    return request.get<PickPoint.PickPointItem[]>('http://127.0.0.1:8080/pickPoint/list', params)
  },

  createPickPoints(params: PickPoint.CreateParams) {
    return request.post('http://127.0.0.1:8080/pickPoint', params)
  },

  editPickPoints(params: PickPoint.EditParams) {
    return request.put('http://127.0.0.1:8080/pickPoint/edit', params)
  },

  //删除指定提货点
  deletePickPoint(params: PickPoint.DeleteParams) {
    return request.post('http://127.0.0.1:8080/pickPoint/delete', params)
  },




  //获取用户信息
  getUserInfo() {
    return request.get<User.UserInfo>('http://127.0.0.1:8080/users/admin')
  },

  //获取用户权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('http://127.0.0.1:8080/users/getPermissionList')
  },

  //获取dashbord报表汇总数据
  getPackageReportData() {
    //DashBoard.PackageReportData
    return request.get<Dashboard.ReportData>('http://127.0.0.1:8080/order/dashboard/getReportData')
  },

  //获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('http://127.0.0.1:8080/order/dashboard/getReportData')
  },

  getPieCityData() {
    return request.get<Dashboard.PieElement[]>('http://127.0.0.1:8080/order/dashboard/getPieCityData')
  },

  getPieAgeData() {
    return request.get<Dashboard.PieElement[]>('http://127.0.0.1:8080/order/dashboard/getPieAgeData')
  },

  getRadarData() {
    return request.get<Dashboard.RadarData>('http://127.0.0.1:8080/order/dashboard/getRadarData')
  },

  //用户管理
  getUserList(params: User.Params) {
    return request.get<Dashboard.ResultData<User.UserInfo>>('http://127.0.0.1:8080/users/list', params)
  },

  //创建用户
  createUser(params: User.CreateParams) {
    return request.post<Dashboard.ResultData<User.UserInfo>>('http://127.0.0.1:8080/users/create', params)
  },

  //创建用户
  updateUser(params: User.EditParams) {
    return request.post<Dashboard.ResultData<User.UserInfo>>('http://127.0.0.1:8080/users/edit', params)
  },

  //删除用户
  delUser(params: { userIds: string[] }) {
    return request.post('http://127.0.0.1:8080/users/delete', params)
  },



 

  //获取所有管理员
  getAllAdminList() {
    return request.get<User.UserInfo[]>('http://127.0.0.1:8080/users/admin/list')
  },

  
 

  //获取所有角色管理
  getRoleList(params?: Role.Params) {
    return request.get<Dashboard.ResultData<Role.RoleItem>>('http://127.0.0.1:8080/roles/list', params)
  },

  getAllRoleList() {
    return request.get<Role.RoleItem[]>('http://127.0.0.1:8080/roles/list')
  },

  //创建角色
  createRole(params: Role.CreateParams) {
    return request.post('http://127.0.0.1:8080/roles/create', params)
  },

  //更新角色
  editRole(params: Role.EditParams) {
    return request.post('http://127.0.0.1:8080/roles/edit', params)
  },

  //删除角色
  delRole(params: { _id: string }) {
    return request.post('http://127.0.0.1:8080/roles/delete', params)
  },

  //更新权限列表
  updatePermission(params: Role.CreatePermission) {
    return request.post('http://127.0.0.1:8080/roles/update/permission', params)
  },

 //获取订单列表
  getOrderList(params:Order.Params){
    return request.get<Dashboard.ResultData<Order.OrderItem>>('http://127.0.0.1:8080/order/list', params)
  },

  //获取城市列表
  getBoxList() {
    return request.get<Order.DictItem[]>('http://127.0.0.1:8080/order/cityList')
  },


    //获取商品类型列表
    getProductTypeList() {
      return request.get<Order.DictItem[]>('http://127.0.0.1:8080/order/vehicList')
    },

    //创建订单
    createOrder(params:Order.CreateParams) {
      return request.post('http://127.0.0.1:8080/order/create', params)
    },

    //更新订单
    updateOrder(params:Order.CreateParams) {
      return request.post('http://127.0.0.1:8080/order/create', params)
    },

    //获取订单详情
    getOrderDetail(orderId:string) {
       return request.get<Order.OrderItem>(`http://127.0.0.1:8080/order/detail/${orderId}`)
    },

    //导出数据
    exportData(params:Order.SearchParams) {
        return request.downloadFile('http://127.0.0.1:8080/order/orderExport', params, '订单列表.xlsx')
    }
    

}
