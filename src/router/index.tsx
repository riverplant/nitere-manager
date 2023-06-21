import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/login/Login'
import NotFound from '@/views/404'
import Forbidden from '@/views/403'
import Welcome from '@/views/Welcom'

const router = [
  {
    path: '/',
    element: <Welcome />,
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
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
]
export default createBrowserRouter(router)
