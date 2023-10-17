import { Menu } from 'antd'

import styles from './index.module.less'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { useStore } from '@/store'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'
import React from 'react'

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)
  const data: any = useRouteLoaderData('layout')
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { key } = useLocation()
  
  type MenuItem = Required<MenuProps>['items'][number]

  //生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      type,
    } as MenuItem
  }

  //创建图标
  function createIcon(name?: string) {
    if (!name) return <></>
    const myIcons: { [key: string]: any } = Icons
    const icon = myIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuStatus === 1) {
        if (item.buttons && item.buttons.length > 0) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
        )
      }
    })
    return treeList
  }

  // 初始化，获取接口的菜单列表
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([key])
  }, [])

  // 菜单点击
  const handleClickMenu = ({ key }: { Key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  return (
    <div>
      <div
        className={styles.logo}
        onClick={() => {
          navigate('/welcome')
        }}
      >
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>逆海淘</span>}
      </div>

      <Menu
        mode='inline'
        theme='dark'
        style={{ width: collapsed ? 80 : 'auto' }}
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
        items={menuList}
      ></Menu>
    </div>
  )
}
export default SideMenu
