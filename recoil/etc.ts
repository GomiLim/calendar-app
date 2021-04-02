import Recoil from 'recoil'

// 화면 전체 로딩
export const loadingState = Recoil.atom({
  key: 'loadingState',
  default: true,
})
