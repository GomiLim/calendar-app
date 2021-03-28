import Recoil from 'recoil'
import { filteredIconData, filteredScheduleData } from '../pages/api'
import { FilterType, TestDataType, TestIconDataType } from '../utils/types'

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

export const scheduleDataSelector = Recoil.selector({
  key: 'scheduleDataSelector',
  get: ({ get }) =>
    filteredScheduleData(get(scheduleDataState), get(filterState)),
})

export const iconDataSelector = Recoil.selector({
  key: 'iconDataSelector',
  get: ({ get }) => filteredIconData(get(iconDataState), get(filterState)),
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
