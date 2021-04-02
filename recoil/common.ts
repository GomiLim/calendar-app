import Recoil from 'recoil'
import { filteredIconData, filteredScheduleData } from '../pages/api'
import { FilterType, TestDataType, TestIconDataType } from '../utils/types'

// 일정 데이터
export const scheduleDataState = Recoil.atom<TestDataType[]>({
  key: 'scheduleDataState',
  default: [],
})

// 채널/카드/할일 데이터
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

// 캘린더 검색 필터
export const filterState = Recoil.atom<FilterType>({
  key: 'filterState',
  default: initFilter,
})
