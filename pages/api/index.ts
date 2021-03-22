import { UserType } from '../../utils/types'
import {
  testIconData,
  testScheduleData,
  testUserData,
} from './testScheduleData'

export type TestDataType = {
  type: 'sub' | 'main'
  parentNo?: number
  parentName?: string
  subNo?: number[]
  no: number
  channel: {
    no: number
    name: string
    color: string
  }
  name: string
  writerName: string
  startDate: Date | string
  endDate?: Date | string
  subStartDate?: Date | string
  subEndDate?: Date | string
  members?: Array<{
    no: number
    email: string
  }>
}

export type TestIconDataType = {
  no: number
  name: string
  date: Date | string
  newCnt?: number
  curMsg?: string
  color?: string
  modTime?: Date | string
  channel?: {
    no: number
    name: string
  }
  writerName?: string
  cardName?: string
  done?: boolean
  members?: Array<{
    no: number
    email: string
  }>
}

export const testScheduleApi = (params: any) => {
  return new Promise<TestDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(testScheduleData)
    }, 2000)
  })
}

export const testIconApi = (params: any) => {
  return new Promise<{
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  }>((resolve) => {
    setTimeout(() => {
      resolve(testIconData)
    }, 3000)
  })
}

export const testUserApi = (keyword: string, filter?: 'name' | 'email') => {
  return new Promise<UserType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        testUserData.filter((user) =>
          filter === 'name'
            ? user.name.trim().indexOf(keyword.trim()) > -1
            : filter === 'email'
            ? user.email.trim().indexOf(keyword.trim()) > -1
            : true,
        ),
      )
    }, 2000)
  })
}

export const testScheduleAutoApi = (keyword: string) => {
  return new Promise<TestDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        testScheduleData.filter(
          (schedule) => schedule.name.trim().indexOf(keyword.trim()) > -1,
        ),
      )
    }, 2000)
  })
}

export const testChannelAutoApi = (keyword: string) => {
  return new Promise<TestIconDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        testIconData.channels.filter(
          (channel) => channel.name.trim().indexOf(keyword.trim()) > -1,
        ),
      )
    }, 2000)
  })
}

export const testCardAutoApi = (keyword: string) => {
  return new Promise<TestIconDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        testIconData.cards.filter(
          (card) => card.name.trim().indexOf(keyword.trim()) > -1,
        ),
      )
    }, 2000)
  })
}

export const testTodoAutoApi = (keyword: string) => {
  return new Promise<TestIconDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        testIconData.todos.filter(
          (todo) => todo.name.trim().indexOf(keyword.trim()) > -1,
        ),
      )
    }, 2000)
  })
}
