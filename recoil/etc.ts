import Recoil from 'recoil'

export const loadingState = Recoil.atom({
  key: 'loadingState',
  default: true,
})
