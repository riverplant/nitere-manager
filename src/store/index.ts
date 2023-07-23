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
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    mobile: '',
    deptId: '',
    deptName: '',
    role: 0,
    roleList:'',
    code:'',
    state:0,
    userImg: '',
    createTime:''
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
