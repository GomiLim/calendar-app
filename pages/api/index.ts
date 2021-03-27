import * as helper from '../../utils/helpers'
import { FilterType, UserType } from '../../utils/types'
import {
  testIconData,
  testScheduleData,
  testUserData,
} from './testScheduleData'

export type MemberType = {
  no: number
  name?: string
  email: string
  attend?: boolean
  assigned?: boolean
}

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
    closed?: boolean
  }
  name: string
  writerNo: number
  writerName: string
  startDate: Date | string
  endDate?: Date | string
  subStartDate?: Date | string
  subEndDate?: Date | string
  members?: Array<MemberType>
  managers?: Array<number>
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
    closed?: boolean
  }
  writerNo?: number
  writerName?: string
  managers?: Array<number>
  cardName?: string
  done?: boolean
  closed?: boolean
  members?: Array<MemberType>
}

const findUserByNo = (no?: number) => {
  if (!no) return undefined
  return testUserData.find((user) => user.no === no)
}

const memberFilter = <T extends TestDataType | TestIconDataType>(
  type: 'schedule' | 'channel' | 'card' | 'todo',
  filter: FilterType,
  data: T,
  baseFilter: boolean,
) => {
  if (!filter.member) return baseFilter
  const { no, name, email, duty } = filter.member
  if (!no && !name && !email && !duty) return baseFilter

  const result = no
    ? data.members?.some((member) => member.no === no) && baseFilter
    : name
    ? data.members?.some(
        (member) =>
          String(member.name)
            .trim()
            .toLowerCase()
            .indexOf(name.trim().toLowerCase()) > -1,
      ) && baseFilter
    : email
    ? data.members?.some(
        (member) =>
          member.email
            .trim()
            .toLowerCase()
            .indexOf(email.trim().toLowerCase()) > -1,
      ) && baseFilter
    : baseFilter

  if (duty) {
    if (no) {
      return duty === 'creator'
        ? data.writerNo === no && result
        : duty === 'manager'
        ? data.managers?.find((managerNo) => managerNo === no) && result
        : type === 'schedule' || type === 'todo'
        ? data.members?.find(
            (user) => (!!user.attend || !!user.assigned) && user.no === no,
          ) && result
        : result
    }
    if (name) {
      return duty === 'creator'
        ? String(findUserByNo(data.writerNo)?.name)
            .trim()
            .toLowerCase()
            .indexOf(name.trim().toLowerCase()) > -1 && result
        : duty === 'manager'
        ? data.managers?.some(
            (manager) =>
              String(findUserByNo(manager)?.name)
                .trim()
                .toLowerCase()
                .indexOf(name.trim().toLowerCase()) > -1,
          ) && result
        : type === 'schedule' || type === 'todo'
        ? data.members?.find(
            (user) =>
              (!!user.attend || !!user.assigned) &&
              String(user.name)
                .trim()
                .toLowerCase()
                .indexOf(name.trim().toLowerCase()) > -1,
          ) && result
        : result
    }
    if (email) {
      return duty === 'creator'
        ? String(findUserByNo(data.writerNo)?.email)
            .trim()
            .toLowerCase()
            .indexOf(email.trim().toLowerCase()) > -1 && result
        : duty === 'manager'
        ? data.managers?.some(
            (manager) =>
              String(findUserByNo(manager)?.email)
                .trim()
                .toLowerCase()
                .indexOf(email.trim().toLowerCase()) > -1,
          ) && result
        : type === 'schedule' || type === 'todo'
        ? data.members?.find(
            (user) =>
              (!!user.attend || !!user.assigned) &&
              String(user.email)
                .trim()
                .toLowerCase()
                .indexOf(email.trim().toLowerCase()) > -1,
          ) && result
        : result
    }
  }
  return result
}

const channelFilter = <T extends TestDataType | TestIconDataType>(
  filter: FilterType,
  data: T,
  baseFilter: boolean,
) => {
  const result = filter.channel.no
    ? data.channel?.no === filter.channel.no && baseFilter
    : filter.channel.label
    ? String(data.channel?.name)
        .trim()
        .toLowerCase()
        .indexOf(filter.channel.label.trim().toLowerCase()) > -1 && baseFilter
    : baseFilter

  return filter.channel.closed === undefined
    ? result
    : filter.channel.closed === !!data.channel?.closed && result
}

const cardFilter = (
  filter: FilterType,
  data: TestIconDataType,
  baseFilter: boolean,
) => {
  const result = filter.card.no
    ? data.no === filter.card.no && baseFilter
    : filter.card.label
    ? String(data.name)
        .trim()
        .toLowerCase()
        .indexOf(filter.card.label.trim().toLowerCase()) > -1 && baseFilter
    : baseFilter

  return filter.card.closed === undefined
    ? result
    : filter.card.closed === !!data.closed && result
}

export const filteredScheduleData = (
  baseData: TestDataType[],
  filter?: FilterType,
): TestDataType[] =>
  filter
    ? filter.schedule.show
      ? baseData.filter((data) => {
          if (filter.schedule.no) {
            return memberFilter(
              'schedule',
              filter,
              data,
              channelFilter(filter, data, data.no === filter.schedule.no),
            )
          }
          if (filter.schedule.label) {
            return memberFilter(
              'schedule',
              filter,
              data,
              channelFilter(
                filter,
                data,
                data.name
                  .trim()
                  .toLowerCase()
                  .indexOf(filter.schedule.label.trim().toLowerCase()) > -1,
              ),
            )
          }
          return memberFilter(
            'schedule',
            filter,
            data,
            channelFilter(filter, data, true),
          )
        })
      : []
    : [...baseData]

export const filteredIconData = (
  baseData: {
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  },
  filter?: FilterType,
): {
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
} =>
  filter
    ? {
        ...baseData,
        channels: filter.channel.show
          ? baseData.channels.filter((data) => {
              if (filter.channel.no) {
                return memberFilter(
                  'channel',
                  filter,
                  data,
                  filter.channel.closed === undefined
                    ? data.no === filter.channel.no
                    : !!data.closed === filter.channel.closed &&
                        data.no === filter.channel.no,
                )
              }
              if (filter.channel.label) {
                return memberFilter(
                  'channel',
                  filter,
                  data,
                  filter.channel.closed === undefined
                    ? data.name
                        .trim()
                        .toLowerCase()
                        .indexOf(filter.channel.label.trim().toLowerCase()) > -1
                    : !!data.closed === filter.channel.closed &&
                        data.name
                          .trim()
                          .toLowerCase()
                          .indexOf(filter.channel.label.trim().toLowerCase()) >
                          -1,
                )
              }
              return memberFilter(
                'channel',
                filter,
                data,
                filter.channel.closed === undefined
                  ? true
                  : filter.channel.closed === !!data.closed,
              )
            })
          : [],
        cards: filter.card.show
          ? baseData.cards.filter((data) => {
              if (filter.card.no) {
                return memberFilter(
                  'card',
                  filter,
                  data,
                  channelFilter(filter, data, data.no === filter.card.no),
                )
              }
              if (filter.card.label) {
                return memberFilter(
                  'card',
                  filter,
                  data,
                  channelFilter(
                    filter,
                    data,
                    data.name
                      .trim()
                      .toLowerCase()
                      .indexOf(filter.card.label.trim().toLowerCase()) > -1,
                  ),
                )
              }
              return memberFilter(
                'card',
                filter,
                data,
                channelFilter(filter, data, true),
              )
            })
          : [],
        todos: filter.todo.show
          ? baseData.todos.filter((data) => {
              if (filter.todo.no) {
                return memberFilter(
                  'todo',
                  filter,
                  data,
                  cardFilter(
                    filter,
                    data,
                    channelFilter(filter, data, data.no === filter.todo.no),
                  ),
                )
              }
              if (filter.todo.label) {
                return memberFilter(
                  'todo',
                  filter,
                  data,
                  cardFilter(
                    filter,
                    data,
                    channelFilter(
                      filter,
                      data,
                      data.name
                        .trim()
                        .toLowerCase()
                        .indexOf(filter.todo.label.trim().toLowerCase()) > -1,
                    ),
                  ),
                )
              }
              return memberFilter(
                'todo',
                filter,
                data,
                cardFilter(filter, data, channelFilter(filter, data, true)),
              )
            })
          : [],
      }
    : { ...baseData }

export const testScheduleApi = (baseDates: Date[]) => {
  const baseData = testScheduleData.filter((data) =>
    baseDates.some((d) => helper.checkScheduleInMonth(data, d)),
  )

  return new Promise<TestDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(baseData)
    }, 300)
  })
}

export const testIconApi = (baseDates: Date[], filter?: FilterType) => {
  return new Promise<{
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  }>((resolve) => {
    const baseData = {
      channels: testIconData.channels.filter((data) =>
        baseDates.some((d) => helper.compareMonth(data.date, d)),
      ),
      cards: testIconData.cards.filter((data) =>
        baseDates.some((d) => helper.compareMonth(data.date, d)),
      ),
      todos: testIconData.todos.filter((data) =>
        baseDates.some((d) => helper.compareMonth(data.date, d)),
      ),
    }

    setTimeout(() => {
      resolve(baseData)
    }, 1000)
  })
}

export const testUserAutoApi = (keyword: string, filter?: 'name' | 'email') => {
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
    }, 1000)
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
    }, 1000)
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
    }, 1000)
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
    }, 1000)
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
    }, 1000)
  })
}
