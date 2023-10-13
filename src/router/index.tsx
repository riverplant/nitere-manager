import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/login/Login'
import NotFound from '@/views/404'
import Forbidden from '@/views/403'
import Welcome from '@/views/welcome'
import Dashbord from '@/views/dashbord'
import User from '@/views/system/user'
import PickPoint from '@/views/system/pickPoint'
import Layout from '@/layout'
import Menu from '@/views/system/menu'
import AuthLoader from './AuthLoader'
import Role from '@/views/system/role'
import OrderList from '@/views/order/OrderList'

export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: <Navigate to='/404' />,
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
        meta:{
          auth: false // 访问首页不需要验证用户权限
        }
      },
      {
        path: '/dashboard',
        element: <Dashbord />,
      },
      {
        path: '/userList',
        element: <User />,
      },
      {
        path: '/pickPointList',
        element: <PickPoint />,
      },
      {
        path: '/menuList',
        element: <Menu />,
      },
      {
        path: '/roleList',
        element: <Role />,
      },
      {
        path: '/orderList',
        element: <OrderList />,
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
]
export default createBrowserRouter(router)
