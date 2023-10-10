import { create } from 'zustand'
import { User } from '@/types/api'

export const useStore = create<{
  token: string
  userInfo: User.UserInfo
  collapsed: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserInfo) => void
  updateCollapsed: () => void
}>(set => ({
  token: '',
  userInfo: {
    id: '',
    userName: '',
    wxnumber: '',
    email: '',
    code:'',
    mobile: '',
    deptId: '',
    ppName: '',
    userStatus:1,
    userRoles: 3,
    roleList:'',
    formatted_address:'',
    openId:'',
    isDeleted: false,
    userImg: '',
    createTime:'',
    updateTime:'',
  },
  collapsed: false,
  updateToken: token => set({ token }),
  updateUserInfo: (userInfo: User.UserInfo) => set({ userInfo }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed,
      }
    }),
}))
