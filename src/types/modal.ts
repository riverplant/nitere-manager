import { MutableRefObject } from 'react'
import { User } from './api'

export type IAction = 'create' | 'update' | 'delete'

export interface IModalProp<T = User.UserInfo> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>
  update: () => void
}
