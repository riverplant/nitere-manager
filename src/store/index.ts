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
    ppName: '',
    userStatus:1,
    userRoles: 3,
    role:'',
    formatted_address:'',
    openid:'',
    isDeleted: false,
    userImg: '',
    createTime:'',
    updateTime:'',
    password:''
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
