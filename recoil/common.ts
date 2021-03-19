import Recoil from 'recoil'
import { TestDataType, TestIconDataType } from '../pages/api/testScheduleData'

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
