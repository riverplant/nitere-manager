import { Cabinet, Category, ChangeWarehouseRequest, ClaimRequest, Dashboard, Login, Menu, Order, PayOrders, PickPoint, Result, ResultData, Role, User } from '@/types/api'
import request from '@/utils/request'

export default {
  //登录
  login(params: Login.params) {
    return request.post<Result>('http://47.254.14.210/users/login', params)
  },
     //菜单管理
     getMenuList(params?: Menu.Params) {
      return request.get<Menu.MenuItem[]>('http://47.254.14.210/menu/list', params)
    },
  
    //创建菜单
    createMenu(params: Menu.CreateParams) {
      return request.post('http://47.254.14.210/menu', params)
    },
  
    //编辑菜单
    editMenu(params: Menu.EditParams) {
      return request.put('http://47.254.14.210/menu', params)
    },
  
    deleteMenu(params: Menu.DelParams) {
      return request.post('http://47.254.14.210/menu/delete', params)
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //提货点管理
  //查询提货点列表
  getPickPointsList(params?: PickPoint.Params) {
    return request.get<PickPoint.PickPointItem[]>('http://47.254.14.210/pickPoint/list', params)
  },

  createPickPoints(params: PickPoint.CreateParams) {
    return request.post('http://47.254.14.210/pickPoint', params)
  },

  editPickPoints(params: PickPoint.EditParams) {
    return request.put('http://47.254.14.210/pickPoint/edit', params)
  },

  //删除指定提货点
  deletePickPoint(params: PickPoint.DeleteParams) {
    return request.post('http://47.254.14.210/pickPoint/delete', params)
  },


  //查询類型列表
  getCategoryList(params?: Category.Params) {
    return request.get<Category.CategoryItem[]>('http://47.254.14.210/cat/list', params)
  },

  createCategory(params: Category.CreateParams) {
    return request.post('http://47.254.14.210/cat', params)
  },

  editCategory(params: Category.EditParams) {
    return request.put('http://47.254.14.210/cat', params)
  },

  //删除類型
  deleteCategory(params: Category.DelParams) {
    return request.post('http://47.254.14.210/cat/delete', params)
  },

 //////////////////////////////////////////////////////////////////////////////////////////
 
   //查询類型列表
   getWarehouseRequest( params:ChangeWarehouseRequest.Params) {
    return request.get<ChangeWarehouseRequest.ChangeWarehouseRequestItem[]>('http://47.254.14.210/warehouseRequest/getWarehouseRequest', params)
  },

 
  editWarehouseRequest(params: ChangeWarehouseRequest.EditParams) {
    return request.put('http://47.254.14.210/warehouseRequest/updateWarehouseRequest', params)
  },


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //获取用户信息
  getUserInfo() {
    return request.get<User.UserInfo>('http://47.254.14.210/users/admin')
  },

  //获取用户权限列表
  getPermissionList(id:string) {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('http://47.254.14.210/users/getPermissionList/'+id)
  },

  //获取dashbord报表汇总数据
  getReportData() {
    //DashBoard.PackageReportData
    return request.get<Dashboard.ReportData>('http://47.254.14.210/orders/dashboard/getReportData')
  },

  //获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('http://47.254.14.210/orders/dashboard/getReportData')
  },

  getPieCityData() {
    return request.get<Dashboard.PieElement[]>('http://47.254.14.210/orders/dashboard/getPieCityData')
  },

  getPieAgeData() {
    return request.get<Dashboard.PieElement[]>('http://47.254.14.210/orders/dashboard/getPieAgeData')
  },

  //用户管理
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserInfo>>('http://47.254.14.210/users/list', params)
  },

  //创建用户
  createUser(params: User.CreateParams) {
    return request.post('http://47.254.14.210/users', params)
  },

  //创建用户
  updateUser(params: User.EditParams) {
    return request.put('http://47.254.14.210/users', params)
  },

    //创建用户
    createWebUser(params: User.CreateWebParams) {
      return request.post('http://47.254.14.210/users/web/create', params)
    },
  
    //创建用户
    updateWebUser(params: User.EditWebParams) {
      return request.put('http://47.254.14.210/users/web/update', params)
    },

  //删除用户
  delUser(params: { userIds: string[] }) {
    return request.delete('http://47.254.14.210/users/'+ params.userIds)
  },



 

  //获取所有管理员
  getAllAdminList() {
    return request.get<User.UserInfo[]>('http://47.254.14.210/users/admin/list')
  },

  
 

  //获取所有角色管理
  getRoleList(params?: Role.Params) {
    return request.get<Role.RoleItem[]>('http://47.254.14.210/roles/list', params)
  },

  getAllRoleList() {
    return request.get<Role.RoleItem[]>('http://47.254.14.210/roles/list')
  },

  //创建角色
  createRole(params: Role.CreateParams) {
    return request.post('http://47.254.14.210/roles', params)
  },

  //更新角色
  editRole(params: Role.EditParams) {
    return request.put('http://47.254.14.210/roles', params)
  },

  //删除角色
  delRole(params: { id: string }) {
    return request.post('http://47.254.14.210/roles/delete', params)
  },

  //更新权限列表
  updatePermission(params: Role.CreatePermission) {
    return request.post('http://47.254.14.210/roles/update/permission', params)
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////////
 //获取订单列表
  getOrderList(params:Order.Params){
    console.log('params:',params)
    return request.get<ResultData<Order.OrderItem>>('http://47.254.14.210/orders/list', params)
  },

  //获取城市列表
  getBoxList() {
    return request.get<Order.DictItem[]>('http://47.254.14.210/box/list')
  },


    //获取商品类型列表
    getProductTypeList() {
      return request.get<Order.DictItem[]>('http://47.254.14.210/order/vehicList')
    },

      //用户管理
     getClaimList(params: ClaimRequest.Params) {
    return request.get<ResultData<ClaimRequest.ClaimRequestItem>>('http://47.254.14.210/claim/list', params)
  },

        //获取微信订单
     getPayOrdersList(params: PayOrders.Params) {
    return request.get<ResultData<PayOrders.PayOrdersItem>>('http://47.254.14.210/payorder/list', params)
  },

    //更新订单
    updatePayOrder(params:PayOrders.EditParams) {
      return request.put('http://47.254.14.210/payorder/update', params)
    },

    //创建订单
    createOrder(params:Order.CreateParams) {
      return request.post('http://47.254.14.210/order/create', params)
    },

    //更新订单
    updateOrder(params:Order.EditParams) {
      return request.put('http://47.254.14.210/orders/updateForWeb', params)
    },

    //获取订单详情
    getOrderDetail(id:string) {
       return request.get<Order.OrderItem>(`http://47.254.14.210/orders/detail/${id}`)
    },

      //////////////////////////////////////////////////////////////////////////////////////////////////////
   //获取柜子列表
   getCabinetList(params:Cabinet.Params){
    return request.get<ResultData<Cabinet.Item>>('http://47.254.14.210/cabinet/list', params)
  },


    //导出数据
     exportExcelById(id:string) {
        return request.downloadFile(id)
    },

    //提貨點匯總
    getOrderInfoListGroupByPid(id:string){
    return request.get<Cabinet.Vo[]>('http://47.254.14.210/cabinet/getOrderInfoListGroupByPid?id='+id)
  },
   

}
