import React from 'react'

const hasChildren = (node) =>
  node && (node.children || (node.props && node.props.children))

const getChildren = (node) =>
  node && node.children ? node.children : node.props && node.props.children

const renderNodes = (reactNodes) => {
  if (typeof reactNodes === 'string') {
    return reactNodes
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key]
    const isElement = React.isValidElement(child)

    if (typeof child === 'string') {
      return child
    }
    if (hasChildren(child)) {
      const inner = renderNodes(getChildren(child))
      return React.cloneElement(child, { ...child.props, key: i }, inner)
    }
    if (typeof child === 'object' && !isElement) {
      return Object.keys(child).reduce(
        (str, childKey) => `${str}${child[childKey]}`,
        '',
      )
    }

    return child
  })
}

const Months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const Days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

const locales = {
  ko: {
    translation: {
      datetime: {
        ok: '선택',
        time: '시간',
      },
      calendar: {
        schedule: '일정',
        channel: '마감 채널',
        card: '마감 카드',
        todo: '마감 할일',
        dueto: '{{date}} 마감',
        nodata: '해당 날짜에 조회된 건이 없습니다.',
        create: '일정 생성',
        january: '1월',
        february: '2월',
        march: '3월',
        april: '4월',
        may: '5월',
        june: '6월',
        july: '7월',
        august: '8월',
        september: '9월',
        october: '10월',
        november: '11월',
        december: '12월',
        sunday: '일',
        monday: '월',
        tuesday: '화',
        wednesday: '수',
        thursday: '목',
        friday: '금',
        saturday: '토',
        yearMonth: '{{year}}년 {{month}}',
        day1: '{{day}}일',
        day2: '{{day}}일',
        day3: '{{day}}일',
        day: '{{day}}일',
        moreSchedule: '그 외 {{count}}건...',
        before: '{{time}} 전',
        hour: '{{hour}}시간',
        minute: '{{minute}}분',
        mainSchedule: '주',
        subSchedule: '보',
        header: {
          title: '캘린더',
          filter: {
            selector: {
              channel: {
                inprogress: '진행중인 채널',
                closed: '종료 보관된 채널',
                placeholder: '채널 명을 입력하세요',
              },
              schedule: {
                placeholder: '일정을 입력하세요',
              },
              card: {
                inprogress: '진행중인 카드',
                closed: '종료된 카드',
                placeholder: '카드 명을 입력하세요',
              },
              todo: {
                inprogress: '진행중인 할일',
                done: '완료된 할일',
                placeholder: '할일을 입력하세요',
              },
              member: {
                title: '사용자',
                name: '사용자 명',
                email: '사용자 이메일',
                duty: {
                  title: '사용자 구분',
                  manager: '관리자',
                  creator: '생성자',
                  assignee: '참석자(일정)/담당자(할일)',
                },
                placeholder: {
                  name: '사용자 명을 입력하세요',
                  email: '사용자 이메일을 입력하세요',
                },
              },
              autocomplete: {
                nodata: '검색어에 해당하는 데이터가 없습니다',
              },
            },
            display: {
              all: '전체',
              channel: '채널',
              schedule: '일정',
              card: '카드',
              todo: '할일',
            },
          },
        },
      },
    },
  },
  eng: {
    translation: {
      datetime: {
        ok: 'Select',
        time: 'Time',
      },
      calendar: {
        schedule: 'Schedules',
        channel: 'Channels to be closed',
        card: 'Due Cards',
        todo: 'Due Tasks',
        dueto: 'Due to {{date}}',
        nodata: 'No data has been found within this date.',
        create: 'Create Schedule',
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
        sunday: 'Sun',
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        yearMonth: '{{month}} {{year}}',
        day1: '{{day}}st',
        day2: '{{day}}nd',
        day3: '{{day}}rd',
        day: '{{day}}th',
        moreSchedule: 'And {{count}} more...',
        before: '{{time}} before',
        hour: '{{hour}}hrs',
        minute: '{{minute}}mins',
        mainSchedule: 'M',
        subSchedule: 'S',
        header: {
          title: 'Calendar',
          filter: {
            selector: {
              channel: {
                inprogress: 'Channel in progress',
                closed: 'Closed channel',
                placeholder: 'Please insert channel name',
              },
              schedule: {
                placeholder: 'Please insert schedule label',
              },
              card: {
                inprogress: 'Card in progress',
                closed: 'Closed card',
                placeholder: 'Please insert card name',
              },
              todo: {
                inprogress: 'Task in progress',
                done: 'Done task',
                placeholder: 'Please insert task label',
              },
              member: {
                name: 'User name',
                email: 'User email',
                duty: {
                  manager: 'Manager',
                  creator: 'Creator',
                  assignee: 'Attender(for Schedule)/Assignee(for Task)',
                },
                placeholder: {
                  name: 'Please insert member name',
                  email: 'Please insert member email',
                },
              },
              autocomplete: {
                nodata: 'There is no data found along with the keywords',
              },
            },
            display: {
              all: 'All',
              channel: 'Channels',
              schedule: 'Schedules',
              card: 'Cards',
              todo: 'Tasks',
            },
          },
        },
      },
    },
  },
}

const useMock: any = [(k) => k, {}]
useMock.t = (k) => (k) => k
useMock.i18n = { lng: 'ko', fallbackLng: 'ko', resources: { ...locales } }

module.exports = {
  useTranslation: () => useMock,
}
