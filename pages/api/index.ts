import { FilterType, UserType } from '../../utils/types'
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
    closed?: boolean
  }
  name: string
  writerNo: number
  writerName: string
  startDate: Date | string
  endDate?: Date | string
  subStartDate?: Date | string
  subEndDate?: Date | string
  members?: Array<{
    no: number
    name?: string
    email: string
  }>
  managers?: Array<{
    no: number
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
    closed?: boolean
  }
  writerNo?: number
  writerName?: string
  managers?: Array<{
    no: number
  }>
  cardName?: string
  done?: boolean
  closed?: boolean
  members?: Array<{
    no: number
    name?: string
    email: string
  }>
}

const memberFilter = <T extends TestDataType | TestIconDataType>(
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

export const testScheduleApi = (filter?: FilterType) => {
  return new Promise<TestDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(
        filter
          ? filter.schedule.show
            ? testScheduleData.filter((data) => {
                if (filter.schedule.no) {
                  return channelFilter(
                    filter,
                    data,
                    data.no === filter.schedule.no,
                  )
                }
                if (filter.schedule.label) {
                  return channelFilter(
                    filter,
                    data,
                    data.name
                      .trim()
                      .toLowerCase()
                      .indexOf(filter.schedule.label.trim().toLowerCase()) > -1,
                  )
                }
                return channelFilter(filter, data, true)
              })
            : []
          : testScheduleData,
      )
    }, 2000)
  })
}

export const testIconApi = (filter?: FilterType) => {
  return new Promise<{
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  }>((resolve) => {
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

    setTimeout(() => {
      resolve(
        filter
          ? {
              ...testIconData,
              channels: filter.channel.show
                ? testIconData.channels.filter((data) => {
                    if (filter.channel.no) {
                      return filter.channel.closed === undefined
                        ? data.no === filter.channel.no
                        : !!data.closed === filter.channel.closed &&
                            data.no === filter.channel.no
                    }
                    if (filter.channel.label) {
                      return filter.channel.closed === undefined
                        ? data.name
                            .trim()
                            .toLowerCase()
                            .indexOf(
                              filter.channel.label.trim().toLowerCase(),
                            ) > -1
                        : !!data.closed === filter.channel.closed &&
                            data.name
                              .trim()
                              .toLowerCase()
                              .indexOf(
                                filter.channel.label.trim().toLowerCase(),
                              ) > -1
                    }
                    return filter.channel.closed === undefined
                      ? true
                      : filter.channel.closed === !!data.closed
                  })
                : [],
              cards: filter.card.show
                ? testIconData.cards.filter((data) => {
                    if (filter.card.no) {
                      return channelFilter(
                        filter,
                        data,
                        data.no === filter.card.no,
                      )
                    }
                    if (filter.card.label) {
                      return channelFilter(
                        filter,
                        data,
                        data.name
                          .trim()
                          .toLowerCase()
                          .indexOf(filter.card.label.trim().toLowerCase()) > -1,
                      )
                    }
                    return channelFilter(filter, data, true)
                  })
                : [],
              todos: filter.todo.show
                ? testIconData.todos.filter((data) => {
                    if (filter.todo.no) {
                      return cardFilter(
                        filter,
                        data,
                        channelFilter(filter, data, data.no === filter.todo.no),
                      )
                    }
                    if (filter.todo.label) {
                      return cardFilter(
                        filter,
                        data,
                        channelFilter(
                          filter,
                          data,
                          data.name
                            .trim()
                            .toLowerCase()
                            .indexOf(filter.todo.label.trim().toLowerCase()) >
                            -1,
                        ),
                      )
                    }
                    return cardFilter(
                      filter,
                      data,
                      channelFilter(filter, data, true),
                    )
                  })
                : [],
            }
          : testIconData,
      )
    }, 2000)
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
