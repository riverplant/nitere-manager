import api from '@/api'
import { getMenuPath } from '@/utils'

export default async function AuthLoader() {
  const data = await api.getPermissionList()
  const menuPathList = getMenuPath(data.menuList)
  console.log('buttonList:', data.buttonList)
  console.log('menuList:', data.menuList)
  console.log('menuPathList:', menuPathList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList: menuPathList,
  }
}
