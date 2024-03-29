import { Cabinet, Category, ChangeWarehouseRequest, ClaimRequest, Coupon, Dashboard, Login, Menu, Order, PayOrders, PickPoint, Result, ResultData, Role, User } from '@/types/api'
import request from '@/utils/request'

export default {
  //登录
  login(params: Login.params) {
    return request.post<Result>('http://aoaofast.cn/users/login', params)
  },
     //菜单管理
     getMenuList(params?: Menu.Params) {
      return request.get<Menu.MenuItem[]>('http://aoaofast.cn/menu/list', params)
    },
  
    //创建菜单
    createMenu(params: Menu.CreateParams) {
      return request.post('http://aoaofast.cn/menu', params)
    },
  
    //编辑菜单
    editMenu(params: Menu.EditParams) {
      return request.put('http://aoaofast.cn/menu', params)
    },
  
    deleteMenu(params: Menu.DelParams) {
      return request.post('http://aoaofast.cn/menu/delete', params)
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //提货点管理
  //查询提货点列表
  getPickPointsList(params?: PickPoint.Params) {
    return request.get<PickPoint.PickPointItem[]>('http://aoaofast.cn/pickPoint/list', params)
  },

  createPickPoints(params: PickPoint.CreateParams) {
    return request.post('http://aoaofast.cn/pickPoint', params)
  },

  editPickPoints(params: PickPoint.EditParams) {
    return request.put('http://aoaofast.cn/pickPoint/edit', params)
  },

  //删除指定提货点
  deletePickPoint(params: PickPoint.DeleteParams) {
    return request.post('http://aoaofast.cn/pickPoint/delete', params)
  },


  //查询類型列表
  getCategoryList(params?: Category.Params) {
    return request.get<Category.CategoryItem[]>('http://aoaofast.cn/cat/list', params)
  },

  createCategory(params: Category.CreateParams) {
    return request.post('http://aoaofast.cn/cat', params)
  },

  editCategory(params: Category.EditParams) {
    return request.put('http://aoaofast.cn/cat', params)
  },

  //删除類型
  deleteCategory(params: Category.DelParams) {
    return request.post('http://aoaofast.cn/cat/delete', params)
  },

 //////////////////////////////////////////////////////////////////////////////////////////
 
   //查询類型列表
   getWarehouseRequest( params:ChangeWarehouseRequest.Params) {
    return request.get<ChangeWarehouseRequest.ChangeWarehouseRequestItem[]>('http://aoaofast.cn/warehouseRequest/getWarehouseRequest', params)
  },

 
  editWarehouseRequest(params: ChangeWarehouseRequest.EditParams) {
    return request.put('http://aoaofast.cn/warehouseRequest/updateWarehouseRequest', params)
  },


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //获取用户信息
  getUserInfo() {
    return request.get<User.UserInfo>('http://aoaofast.cn/users/admin')
  },

  //获取用户权限列表
  getPermissionList(id:string) {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('http://aoaofast.cn/users/getPermissionList/'+id)
  },

  //获取dashbord报表汇总数据
  getReportData() {
    //DashBoard.PackageReportData
    return request.get<Dashboard.ReportData>('http://aoaofast.cn/orders/dashboard/getReportData')
  },

  //获取折线图数据
  getLineData() {
    //return request.get<Dashboard.LineData>('http://aoaofast.cn/orders/dashboard/getLineData')
    return request.get<Dashboard.LineData>('http://aoaofast.cn/orders/dashboard/getLineData')
  },

  getPieCityData() {
    //return request.get<Dashboard.PieElement[]>('http://aoaofast.cn/orders/dashboard/getPieCityData')
    return request.get<Dashboard.PieElement[]>('http://aoaofast.cn/orders/dashboard/getPieCityData')
  },

  getPieAgeData() {
    return request.get<Dashboard.PieElement[]>('http://aoaofast.cn/orders/dashboard/getPieAgeData')
  },

  //用户管理
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserInfo>>('http://aoaofast.cn/users/list', params)
  },

  //创建用户
  createUser(params: User.CreateParams) {
    return request.post('http://aoaofast.cn/users', params)
  },

  //创建用户
  updateUser(params: User.EditParams) {
    return request.put('http://aoaofast.cn/users', params)
  },

    //创建用户
    createWebUser(params: User.CreateWebParams) {
      return request.post('http://aoaofast.cn/users/web/create', params)
    },
  
    //创建用户
    updateWebUser(params: User.EditWebParams) {
      return request.put('http://aoaofast.cn/users/web/update', params)
    },

  //删除用户
  delUser(params: { userIds: string[] }) {
    return request.delete('http://aoaofast.cn/users/'+ params.userIds)
  },



 

  //获取所有管理员
  getAllAdminList() {
    return request.get<User.UserInfo[]>('http://aoaofast.cn/users/admin/list')
  },

  
 

  //获取所有角色管理
  getRoleList(params?: Role.Params) {
    return request.get<Role.RoleItem[]>('http://aoaofast.cn/roles/list', params)
  },

  getAllRoleList() {
    return request.get<Role.RoleItem[]>('http://aoaofast.cn/roles/list')
  },

  //创建角色
  createRole(params: Role.CreateParams) {
    return request.post('http://aoaofast.cn/roles', params)
  },

  //更新角色
  editRole(params: Role.EditParams) {
    return request.put('http://aoaofast.cn/roles', params)
  },

  //删除角色
  delRole(params: { id: string }) {
    return request.post('http://aoaofast.cn/roles/delete', params)
  },

  //更新权限列表
  updatePermission(params: Role.CreatePermission) {
    return request.post('http://aoaofast.cn/roles/update/permission', params)
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////////
 //获取订单列表
  getOrderList(params:Order.Params){
    console.log('params:',params)
    return request.get<ResultData<Order.OrderItem>>('http://aoaofast.cn/orders/list', params)
  },

  //获取城市列表
  getBoxList() {
    return request.get<Order.DictItem[]>('http://aoaofast.cn/box/list')
  },


    //获取商品类型列表
    getProductTypeList() {
      return request.get<Order.DictItem[]>('http://aoaofast.cn/order/vehicList')
    },

      //用户管理
     getClaimList(params: ClaimRequest.Params) {
    return request.get<ResultData<ClaimRequest.ClaimRequestItem>>('http://aoaofast.cn/claim/list', params)
  },

        //获取微信订单
     getPayOrdersList(params: PayOrders.Params) {
    return request.get<ResultData<PayOrders.PayOrdersItem>>('http://aoaofast.cn/payorder/list', params)
  },

    //更新订单
    updatePayOrder(params:PayOrders.EditParams) {
      return request.put('http://aoaofast.cn/payorder/update', params)
    },

    //创建订单
    createOrder(params:Order.CreateParams) {
      return request.post('http://aoaofast.cn/order/create', params)
    },

    //更新订单
    updateOrder(params:Order.EditParams) {
      return request.put('http://aoaofast.cn/orders/updateForWeb', params)
    },

    //获取订单详情
    getOrderDetail(id:string) {
       return request.get<Order.OrderItem>(`http://aoaofast.cn/orders/detail/${id}`)
    },

      //////////////////////////////////////////////////////////////////////////////////////////////////////
   //获取柜子列表
   getCabinetList(params:Cabinet.Params){
    return request.get<ResultData<Cabinet.Item>>('http://aoaofast.cn/cabinet/list', params)
  },


    //导出数据
     exportExcelById(id:string) {
        return request.downloadFile(id)
    },

    exportAddress( recod:Cabinet.UserCabinetVo[]) {
      console.log('recod:',recod)
      return request.exportAddress(recod)
    },

      //删除用户
      exportPayordersReportSubmit(payOrderIds: string[]) {
    return request.downloadPayorderFile(payOrderIds)
  },


    //提貨點匯總
    getOrderInfoListGroupByPid(id:string){
    return request.get<Cabinet.Vo[]>('http://aoaofast.cn/cabinet/getOrderInfoListGroupByPid?id='+id)
  },

  getCouponList( params:Coupon.Params ) {
    return request.get<Coupon.Vo[]>('http://aoaofast.cn/coupon/list', params)
  },
   
  createCoupon(params: Coupon.CreateParams) {
    return request.post('http://aoaofast.cn/coupon', params)
  },

  editCoupon(params: Coupon.EditParams) {
    return request.put('http://aoaofast.cn/coupon', params)
  },

    //删除
    delCoupon(params: { id: string }) {
      return request.post('http://aoaofast.cn/coupon/delete', params)
    },

    getAllActiveCoupons() {
      return request.get<Coupon.Vo[]>('http://aoaofast.cn/coupon/allActive')
    }

}
