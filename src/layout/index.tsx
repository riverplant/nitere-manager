import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import router from '@/router'
const { Sider } = Layout

const App: React.FC = () => {
  const { collapsed, updateUserInfo } = useStore()
  const {pathname} = useLocation()
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  const route = searchRoute(pathname, router.routes)
 /**  if( !route || route.meta?.auth === true || route.meta?.auth === undefined) {
    //权限判断
    const data = useRouteLoaderData('layout') as IAuthLoader

    const staticPath = ['/welcom','/403', '/404']
    if(!data.menuPathList.includes(pathname) && !staticPath.includes(pathname))  {
      return <Navigate to={'/403'}/>
    }
  }*/
  
  return (
    <Watermark content='逆海淘'>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
