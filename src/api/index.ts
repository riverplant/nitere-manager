import { Dashboard, Login, Menu, PickPoint, Role, User } from '@/types/api'
import request from '@/utils/request'

export default {
  //登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params)
  },
  //获取用户信息
  getUserInfo() {
    return request.get<User.UserInfo>('/users/getUserInfo')
  },

  //获取用户权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
  },

  //获取dashbord报表汇总数据
  getPackageReportData() {
    //DashBoard.PackageReportData
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },

  //获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getReportData')
  },

  getPieCityData() {
    return request.get<Dashboard.PieElement[]>('/order/dashboard/getPieCityData')
  },

  getPieAgeData() {
    return request.get<Dashboard.PieElement[]>('/order/dashboard/getPieAgeData')
  },

  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },

  //用户管理
  getUserList(params: User.Params) {
    return request.get<Dashboard.ResultData<User.UserInfo>>('/users/list', params)
  },

  //创建用户
  createUser(params: User.CreateParams) {
    return request.post<Dashboard.ResultData<User.UserInfo>>('/users/create', params)
  },

  //创建用户
  updateUser(params: User.EditParams) {
    return request.post<Dashboard.ResultData<User.UserInfo>>('/users/edit', params)
  },

  //删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  //提货点管理
  //查询提货点列表
  getPickPointsList(params?: PickPoint.Params) {
    return request.get<PickPoint.PickPointItem[]>('/dept/list', params)
  },

  createPickPoints(params: PickPoint.CreateParams) {
    return request.post('/dept/create', params)
  },

  editPickPoints(params: PickPoint.EditParams) {
    return request.post('/dept/edit', params)
  },

  //获取所有管理员
  getAllAdminList() {
    return request.get<User.UserInfo[]>('/users/all/list')
  },

  //删除指定提货点
  deletePickPoint(params: PickPoint.DeleteParams) {
    return request.post('/dept/delete', params)
  },

  //菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },

  //创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },

  //编辑菜单
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },

  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  },

  //获取角色管理
  getRoleList(params?: Role.Params) {
    return request.get<Dashboard.ResultData<Role.RoleItem>>('/roles/list', params)
  },

  //创建角色
  createRole(params: Role.CreateParams) {
    return request.post('/roles/create', params)
  },

  //更新角色
  editRole(params: Role.EditParams) {
    return request.post('/roles/edit', params)
  },

  //删除角色
  delRole(params: { _id: string }) {
    return request.post('/roles/delete', params)
  },
}
