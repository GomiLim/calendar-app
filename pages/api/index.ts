import * as helper from '../../utils/helpers'
import {
  FilterType,
  TestDataType,
  TestIconDataType,
  UserType,
} from '../../utils/types'
import {
  testIconData,
  testScheduleData,
  testUserData,
} from './testScheduleData'

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

  switch (duty) {
    case 'manager':
      return no
        ? data.managers?.some((manager) => manager === no) && baseFilter
        : name
        ? data.managers
            ?.map((manager) => testUserData.find((user) => user.no === manager))
            .some(
              (manager) =>
                manager &&
                manager.name
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(name.replace(/ /g, '').toLowerCase()),
            ) && baseFilter
        : email
        ? data.managers
            ?.map((manager) => testUserData.find((user) => user.no === manager))
            .some(
              (manager) =>
                manager &&
                manager.email
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(email.replace(/ /g, '').toLowerCase()),
            ) && baseFilter
        : baseFilter
    case 'creator':
      return no
        ? data.writerNo === no && baseFilter
        : name
        ? testUserData.find((user) => user.no === data.writerNo)
          ? String(testUserData.find((user) => user.no === data.writerNo)?.name)
              .replace(/ /g, '')
              .toLowerCase()
              .includes(name.replace(/ /g, '').toLowerCase()) && baseFilter
          : baseFilter
        : email
        ? testUserData.find((user) => user.no === data.writerNo)
          ? String(
              testUserData.find((user) => user.no === data.writerNo)?.email,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(email.replace(/ /g, '').toLowerCase()) && baseFilter
          : baseFilter
        : baseFilter
    case 'assignee':
      return type === 'schedule' || type === 'todo'
        ? no
          ? data.members?.some((member) => member.no === no) && baseFilter
          : name
          ? data.members?.some(
              (member) =>
                String(member.name)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .indexOf(name.replace(/ /g, '').toLowerCase()) > -1,
            ) && baseFilter
          : email
          ? data.members?.some(
              (member) =>
                member.email
                  .replace(/ /g, '')
                  .toLowerCase()
                  .indexOf(email.replace(/ /g, '').toLowerCase()) > -1,
            ) && baseFilter
          : baseFilter
        : false
    default:
      return no
        ? data.members?.some((member) => member.no === no) && baseFilter
        : name
        ? data.members?.some(
            (member) =>
              String(member.name)
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(name.replace(/ /g, '').toLowerCase()) > -1,
          ) && baseFilter
        : email
        ? data.members?.some(
            (member) =>
              member.email
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(email.replace(/ /g, '').toLowerCase()) > -1,
          ) && baseFilter
        : baseFilter
  }
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
        .replace(/ /g, '')
        .toLowerCase()
        .indexOf(filter.channel.label.replace(/ /g, '').toLowerCase()) > -1 &&
      baseFilter
    : baseFilter

  const channelData = data.channel
    ? testIconData.channels.find(
        (channel) =>
          channel.no === data.channel?.no &&
          (filter.channel.closed === undefined
            ? true
            : filter.channel.closed === !!channel.closed),
      )
    : true

  return (
    (filter.channel.closed === undefined
      ? result
      : filter.channel.closed === !!data.channel?.closed) &&
    result &&
    !!channelData
  )
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
        .replace(/ /g, '')
        .toLowerCase()
        .indexOf(filter.card.label.replace(/ /g, '').toLowerCase()) > -1 &&
      baseFilter
    : baseFilter

  const cardFound = data.cardNo
    ? testIconData.cards.some(
        (card) =>
          card.no === data.cardNo &&
          (filter.card.closed === undefined
            ? true
            : filter.card.closed === !!card.closed),
      )
    : true

  return (
    (filter.card.closed === undefined
      ? result
      : filter.card.closed === !!data.closed) &&
    result &&
    cardFound
  )
}

const todoFilter = (filter: FilterType, data: TestIconDataType) => {
  const result = filter.todo.no
    ? data.no === filter.todo.no
    : filter.todo.label
    ? String(data.name)
        .replace(/ /g, '')
        .toLowerCase()
        .indexOf(filter.todo.label.replace(/ /g, '').toLowerCase()) > -1
    : true

  return filter.todo.done === undefined
    ? result
    : filter.todo.done === !!data.done && result
}

export const filteredScheduleData = (
  baseData: TestDataType[],
  filter: FilterType,
): TestDataType[] =>
  filter.schedule.show
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
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(
                  filter.schedule.label.replace(/ /g, '').toLowerCase(),
                ) > -1,
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

export const filteredIconData = (
  baseData: {
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  },
  filter: FilterType,
): {
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
} => ({
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
                  .replace(/ /g, '')
                  .toLowerCase()
                  .indexOf(
                    filter.channel.label.replace(/ /g, '').toLowerCase(),
                  ) > -1
              : !!data.closed === filter.channel.closed &&
                  data.name
                    .replace(/ /g, '')
                    .toLowerCase()
                    .indexOf(
                      filter.channel.label.replace(/ /g, '').toLowerCase(),
                    ) > -1,
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
    ? baseData.cards.filter((data) =>
        memberFilter(
          'card',
          filter,
          data,
          channelFilter(filter, data, cardFilter(filter, data, true)),
        ),
      )
    : [],
  todos: filter.todo.show
    ? baseData.todos.filter((data) =>
        memberFilter(
          'todo',
          filter,
          data,
          cardFilter(
            filter,
            data,
            channelFilter(filter, data, todoFilter(filter, data)),
          ),
        ),
      )
    : [],
})

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
            ? user.name.replace(/ /g, '').indexOf(keyword.replace(/ /g, '')) >
              -1
            : filter === 'email'
            ? user.email.replace(/ /g, '').indexOf(keyword.replace(/ /g, '')) >
              -1
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
          (schedule) =>
            schedule.name.replace(/ /g, '').indexOf(keyword.replace(/ /g, '')) >
            -1,
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
          (channel) =>
            channel.name.replace(/ /g, '').indexOf(keyword.replace(/ /g, '')) >
            -1,
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
          (card) =>
            card.name.replace(/ /g, '').indexOf(keyword.replace(/ /g, '')) > -1,
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
          (todo) =>
            todo.name.replace(/ /g, '').indexOf(keyword.replace(/ /g, '')) > -1,
        ),
      )
    }, 1000)
  })
}
