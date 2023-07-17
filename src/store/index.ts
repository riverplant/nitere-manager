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
    userId: 0,
    profiledID: '0',
    userEmail: 'admin@nihaitao.com',
    code: 'MTL001',
    phone: '5146666666',
    pickupPoint: 'montreal',
    delivreAddress: '',
    role: 0,
    state: 0,
    createTime: '',
    userImg: '',
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
