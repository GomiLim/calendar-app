import Recoil from 'recoil'
import { TestDataType, TestIconDataType } from '../pages/api'
import { FilterType } from '../utils/types'

export const scheduleDataState = Recoil.atom<TestDataType[]>({
  key: 'scheduleDataState',
  default: [],
})

export const iconDataState = Recoil.atom<{
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
}>({
  key: 'iconDataState',
  default: {
    channels: [],
    cards: [],
    todos: [],
  },
})

export const initFilter = {
  channel: { show: true },
  schedule: { show: true },
  card: { show: true },
  todo: { show: true },
}

export const filterState = Recoil.atom<FilterType>({
  key: 'filterState',
  default: initFilter,
})
