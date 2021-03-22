import Recoil from 'recoil'
import { UserType } from '../utils/types'

const initUser = {
  no: 10,
  name: '마이크로프트',
  email: 'ceo@rocket.is',
}

export const sessionState = Recoil.atom<UserType>({
  key: 'sessionState',
  default: initUser,
})
