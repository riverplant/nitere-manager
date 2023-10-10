/**
 * 工具函数封装
 */

import { Menu } from '@/types/api'

export const formatMoney = (num?: number | string ) => {
  if (!num) return '0.00'
  const money = parseFloat(num.toString())
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(money) // '$100.00'
  //return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CAD' })
}

export const formatNum = (num?: number | string) => {
  if (!num) return 0
  // '/ /g' : 代表全局查找
  const pattern1 = /(\d{0,2})(?=(\d{3})+\.)/g
  const pattern2 = /(\d)(?=(\d{3})+$)/g
  const str = num.toString()
  return str.indexOf('.') > -1 ? str.replace(pattern1, '$1,') : str.replace(pattern2, '$1,')
}

//格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString()
  return curDate.toLocaleString()
}

//用户角色转换
export const formatRole = (role: number) => {
  if (role === 1) return '超级管理员'
  if (role === 2) return '国内仓库管理员'
  if (role === 3) return '普通用户'
}

//用户状态转换
export const formatState = (role: number) => {
  if (role === 1) return '正常状态'
  if (role === 2) return '停用状态'
}

//获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
  }, [])
}

// 递归获取路由对象
export const searchRoute:any = (path:string, routes:any[])=>{
  console.log('routes:', routes)
  for(const item of routes) {
    if(item === path) return item
    if(item.children) {
      return searchRoute(path, item.children)
    }
  }
  return ''
}

// 手机号加密
export const formateMobile = (mobile?: number)=>{
  if (!mobile) return '-'
  const phone = mobile.toString()
   return phone.replace(/(\d{3})\d*(\d{4})/,`$1****$2`)
}
