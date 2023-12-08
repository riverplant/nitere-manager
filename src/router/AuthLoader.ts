import api from '@/api'
import { Menu } from '@/types/api'
import { getMenuPath } from '@/utils'
import storage from '@/utils/storage'
export interface IAuthLoader{
  buttonList:string[],
  menuList:Menu.MenuItem[],
  menuPathList:string[]
}

export default async function AuthLoader() {
  const userinfo = storage.get('userInfo')
  const data = await api.getPermissionList(userinfo.id)
  const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList: menuPathList,
  }
}
