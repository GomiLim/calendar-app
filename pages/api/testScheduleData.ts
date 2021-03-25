import moment from 'moment'
import * as polished from 'polished'
import { TestDataType, TestIconDataType } from '.'
import theme from '../../styles/theme'
import { UserType } from '../../utils/types'

export const testScheduleData: TestDataType[] = [
  {
    type: 'sub',
    parentNo: 2,
    no: 1,
    channel: {
      no: 1,
      name: '채널1',
      color: theme.palette.main.turquoise,
      closed: false,
    },
    name: '새로운 일정 sub',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-07', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
    ],
  },
  {
    type: 'main',
    no: 2,
    channel: {
      no: 1,
      name: '채널1',
      color: theme.palette.main.turquoise,
      closed: false,
    },
    name: '새로운 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
  {
    type: 'main',
    no: 3,
    channel: {
      no: 1,
      name: '채널1',
      color: theme.palette.main.turquoise,
      closed: false,
    },
    name: '파란 채널 새로운 일정11',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-11', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
    ],
  },
  {
    type: 'sub',
    parentNo: 3,
    no: 4,
    channel: {
      no: 1,
      name: '채널1',
      color: theme.palette.main.turquoise,
      closed: false,
    },
    name: '파란 채널 새로운 일정1 sub',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-12', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: true },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: true },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
  {
    type: 'main',
    no: 5,
    channel: {
      no: 1,
      name: '채널1',
      color: theme.palette.main.turquoise,
      closed: false,
    },
    name: '파란 채널 새로운 일정2',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-05', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-15', 'YYYY-MM-DD').toDate().toJSON(),
  },
  {
    type: 'sub',
    no: 6,
    parentNo: 5,
    channel: {
      no: 1,
      name: '채널1',
      color: theme.palette.main.turquoise,
      closed: false,
    },
    name: '파란 채널 새로운 일정2 sub',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-14', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: false },
    ],
  },
  {
    type: 'sub',
    no: 7,
    parentNo: 8,
    channel: {
      no: 2,
      name: '채널2',
      color: theme.palette.main.yellow,
      closed: false,
    },
    name: '노란 채널의 다른 새로운 긴 일정 sub',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-14', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: true },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: false },
    ],
  },
  {
    type: 'main',
    no: 8,
    channel: {
      no: 2,
      name: '채널2',
      color: theme.palette.main.yellow,
      closed: false,
    },
    name: '노란 채널의 다른 새로운 긴 일정 substar 43argy ㅜ무ㅏ자딤수ㅏㅣㄷ',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-08', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: false },
    ],
  },
  {
    type: 'main',
    no: 9,
    channel: {
      no: 3,
      name: '채널3',
      color: theme.palette.main.red,
      closed: false,
    },
    name: '빨간 채널의 다른 새로 운 일정 틸발구 12 나나sl enlam',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-08', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: true },
    ],
  },
  {
    type: 'main',
    no: 10,
    channel: {
      no: 4,
      name: '채널4',
      color: theme.palette.main.pink,
    },
    name: '다른 새로운 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: false },
      { no: 4, email: 'surfer@rocket.is', name: '장민희' },
    ],
  },
  {
    type: 'sub',
    parentNo: 10,
    no: 11,
    channel: {
      no: 4,
      name: '채널4',
      color: theme.palette.main.pink,
    },
    name: '다른 새로운 일정 sub',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-12', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: false },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: false },
    ],
  },
  {
    type: 'sub',
    parentNo: 10,
    no: 110,
    channel: {
      no: 4,
      name: '채널4',
      color: theme.palette.main.pink,
    },
    name: '다른 새로운 일정 sub2',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    members: [],
  },
  {
    type: 'main',
    no: 12,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '다른 새로운 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
  },
  {
    type: 'main',
    no: 13,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-01-27', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-01-29', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: true },
    ],
  },
  {
    type: 'sub',
    no: 14,
    parentNo: 13,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 sub',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-01-26', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-02', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: true },
      { no: 4, email: 'surfer@rocket.is', name: '장민희' },
    ],
  },
  {
    type: 'sub',
    no: 15,
    parentNo: 13,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 sub2',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-01-29', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-03', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: false },
    ],
  },
  {
    type: 'main',
    no: 16,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc1',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: true },
    ],
  },
  {
    type: 'main',
    no: 17,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc2',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: false },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
  {
    type: 'main',
    no: 18,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc3',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: true },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: false },
    ],
  },
  {
    type: 'main',
    no: 19,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc4',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
  },
  {
    type: 'main',
    no: 20,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc5',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
    members: [],
  },
  {
    type: 'main',
    no: 21,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc6',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: false },
    ],
  },
  {
    type: 'main',
    no: 22,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
      closed: true,
    },
    name: '테스트 일정 etc7',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: true },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
  {
    type: 'main',
    no: 23,
    channel: {
      no: 5,
      name: '채널5 etc8',
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-11', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건' },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
  {
    type: 'main',
    no: 24,
    channel: {
      no: 5,
      name: '채널5 etc9',
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
    ],
  },
  {
    type: 'main',
    no: 25,
    channel: {
      no: 5,
      name: '채널5 etc10',
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: true },
    ],
  },
  {
    type: 'main',
    no: 26,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정 etc11',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-13', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
      { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: true },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
  {
    type: 'sub',
    no: 27,
    parentNo: 26,
    channel: {
      no: 5,
      name: '채널5',
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정 etc12',
    writerNo: 1,
    writerName: '조인효',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate().toJSON(),
    endDate: moment('2021-02-20', 'YYYY-MM-DD').toDate().toJSON(),
    members: [
      { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: false },
      { no: 3, email: 'bae@rocket.is', name: '배상건', attend: false },
      { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
    ],
  },
]

export const testIconData: {
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
} = {
  channels: [
    {
      no: 1,
      name: '채널1',
      date: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.blue,
      modTime: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 40,
      curMsg: '한줄 텍스트\n두줄텍스트\n세줄',
      closed: false,
      writerNo: 2,
      managers: [2],
    },
    {
      no: 2,
      name: '채널2',
      date: moment('2021-02-12', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.pink,
      modTime: moment('2021-02-12', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 20,
      curMsg: '한줄 텍스트\n두줄텍스트',
      closed: false,
      writerNo: 2,
      managers: [4, 5, 6],
    },
    {
      no: 3,
      name: '채널3',
      date: moment('2021-02-26', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.red,
      modTime: moment('2021-02-26', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 2,
      curMsg: '두줄텍스트 a434 343a3ha34 ha3h areh',
      closed: false,
      writerNo: 3,
      managers: [10],
    },
    {
      no: 4,
      name: '채널4',
      date: moment('2021-02-26', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.yellow,
      modTime: moment('2021-02-26', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 0,
      curMsg: '두줄텍스트',
      writerNo: 3,
      managers: [1, 3],
    },
    {
      no: 5,
      name: '채널5',
      date: moment('2021-02-06', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.turquoise,
      modTime: moment('2021-02-06', 'YYYY-MM-DD').toDate().toJSON(),
      curMsg: '두줄텍스트',
      closed: true,
      writerNo: 3,
    },
    {
      no: 6,
      name: '채널6',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.turquoise,
      modTime: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      curMsg: '한줄 텍스트\n두줄텍스트',
      writerNo: 4,
      managers: [1],
    },
    {
      no: 7,
      name: '채널7',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.pink,
      modTime: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 0,
      curMsg: '두줄텍스트',
      writerNo: 4,
    },
    {
      no: 8,
      name: '채널8',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.red,
      modTime: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 20,
      curMsg: '두줄텍스트',
      closed: true,
      writerNo: 4,
    },
    {
      no: 9,
      name: '채널9',
      date: moment('2021-02-24', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.yellow,
      modTime: moment('2021-02-24', 'YYYY-MM-DD').toDate().toJSON(),
      newCnt: 20,
      curMsg: '두줄텍스트 a3h3ha rharhaha3herhaerhr',
      closed: false,
      writerNo: 5,
      managers: [1, 3],
    },
    {
      no: 10,
      name: '채널10',
      date: moment('2021-03-09', 'YYYY-MM-DD').toDate().toJSON(),
      color: theme.palette.main.yellow,
      modTime: moment('2021-03-09', 'YYYY-MM-DD').toDate().toJSON(),
      curMsg: '두줄텍스트',
      closed: true,
      writerNo: 5,
      managers: [1, 3],
    },
  ],
  cards: [
    {
      no: 1,
      name: '카드1',
      date: moment('2021-02-24', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 1,
        name: '채널1',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
        { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
        { no: 3, email: 'bae@rocket.is', name: '배상건' },
        { no: 4, email: 'surfer@rocket.is', name: '장민희' },
      ],
      closed: false,
      managers: [1],
    },
    {
      no: 2,
      name: '카드2',
      date: moment('2021-02-24', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 1,
        name: '채널1',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      closed: false,
      managers: [2],
    },
    {
      no: 3,
      name: '카드3',
      date: moment('2021-02-02', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 1,
        name: '채널1',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
        { no: 4, email: 'surfer@rocket.is', name: '장민희' },
      ],
      closed: false,
    },
    {
      no: 4,
      name: '카드4',
      date: moment('2021-02-01', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 2,
        name: '채널2',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [
        { no: 3, email: 'bae@rocket.is', name: '배상건' },
        { no: 4, email: 'surfer@rocket.is', name: '장민희' },
      ],
      closed: true,
      managers: [4],
    },
    {
      no: 5,
      name: '카드5',
      date: moment('2021-02-22', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 2,
        name: '채널2',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [{ no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' }],
      closed: false,
      managers: [5],
    },
    {
      no: 6,
      name: '카드6',
      date: moment('2021-02-14', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 2,
        name: '채널2',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [{ no: 4, email: 'surfer@rocket.is', name: '장민희' }],
      managers: [6],
    },
    {
      no: 7,
      name: '카드7',
      date: moment('2021-02-02', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 2,
        name: '채널2',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [],
      closed: true,
    },
    {
      no: 8,
      name: '카드8',
      date: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 3,
        name: '채널3',
        closed: false,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
        { no: 3, email: 'bae@rocket.is', name: '배상건' },
        { no: 4, email: 'surfer@rocket.is', name: '장민희' },
      ],
      managers: [2, 8],
    },
    {
      no: 9,
      name: '카드9',
      date: moment('2021-02-28', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 4,
        name: '채널4',
      },
      writerNo: 1,
      writerName: '조인효',
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
        { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
      ],
      managers: [9],
    },
    {
      no: 10,
      name: '카드10',
      date: moment('2021-02-27', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 5,
        name: '채널5',
        closed: true,
      },
      writerNo: 1,
      writerName: '조인효',
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효' },
        { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
        { no: 3, email: 'bae@rocket.is', name: '배상건' },
        { no: 4, email: 'surfer@rocket.is', name: '장민희' },
      ],
      closed: false,
      managers: [1, 10],
    },
  ],
  todos: [
    {
      no: 1,
      name: '할일1',
      date: moment('2021-02-01', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 5,
        name: '채널5',
      },
      cardName: '카드2',
      closed: false,
      done: true,
      writerNo: 6,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
        { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
        { no: 3, email: 'bae@rocket.is', name: '배상건', assigned: true },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
      managers: [2],
    },
    {
      no: 2,
      name: '할일2',
      date: moment('2021-02-01', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 5,
        name: '채널5',
      },
      cardName: '카드1',
      closed: false,
      done: false,
      writerNo: 6,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
        { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
      managers: [1],
    },
    {
      no: 3,
      name: '할일3',
      date: moment('2021-02-11', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 1,
        name: '채널1',
      },
      cardName: '카드10',
      closed: false,
      done: false,
      writerNo: 7,
      managers: [1, 10],
    },
    {
      no: 4,
      name: '할일4',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 2,
        name: '채널2',
      },
      cardName: '카드9',
      done: true,
      writerNo: 7,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
        { no: 3, email: 'bae@rocket.is', name: '배상건', assigned: true },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
      managers: [9],
    },
    {
      no: 5,
      name: '할일5',
      date: moment('2021-02-25', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 2,
        name: '채널2',
      },
      cardName: '카드8',
      closed: false,
      done: false,
      writerNo: 8,
      members: [
        { no: 2, email: 'ceo@w-coms.com', name: 'hyuksu choi' },
        { no: 3, email: 'bae@rocket.is', name: '배상건', assigned: true },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
      managers: [8, 2],
    },
    {
      no: 6,
      name: '할일6',
      date: moment('2021-02-03', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 4,
        name: '채널4',
      },
      cardName: '카드7',
      closed: true,
      done: false,
      writerNo: 8,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
    },
    {
      no: 7,
      name: '할일7',
      date: moment('2021-02-16', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 4,
        name: '채널4',
      },
      cardName: '카드6',
      done: true,
      writerNo: 9,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
      managers: [6],
    },
    {
      no: 8,
      name: '할일8',
      date: moment('2021-02-25', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 4,
        name: '채널4',
      },
      cardName: '카드5',
      closed: false,
      done: false,
      writerNo: 9,
      members: [
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
      managers: [5],
    },
    {
      no: 9,
      name: '할일9',
      date: moment('2021-02-17', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 4,
        name: '채널4',
      },
      cardName: '카드4',
      closed: true,
      done: false,
      writerNo: 9,
      managers: [4],
    },
    {
      no: 10,
      name: '할일10',
      date: moment('2021-02-17', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 3,
        name: '채널3',
      },
      cardName: '카드3',
      closed: false,
      done: true,
      writerNo: 10,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
        { no: 4, email: 'surfer@rocket.is', name: '장민희', assigned: false },
      ],
    },
    {
      no: 11,
      name: '할일11',
      date: moment('2021-02-20', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 3,
        name: '채널3',
      },
      cardName: '카드2',
      closed: false,
      done: true,
      writerNo: 10,
      managers: [2],
    },
    {
      no: 12,
      name: '할일12',
      date: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
      channel: {
        no: 3,
        name: '채널3',
      },
      cardName: '카드1',
      closed: false,
      done: false,
      writerNo: 10,
      members: [
        { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', assigned: true },
      ],
      managers: [1],
    },
  ],
}

export const testUserData: UserType[] = [
  {
    no: 1,
    name: '조인효',
    email: 'cho.inhyo@rocket.is',
  },
  {
    no: 2,
    name: 'hyuksu choi',
    email: 'ceo@w-coms.com',
  },
  {
    no: 3,
    name: '배상건',
    email: 'bae@rocket.is',
  },
  {
    no: 4,
    name: '장민희',
    email: 'surfer@rocket.is',
  },
  {
    no: 5,
    name: '이현채',
    email: 'hy.kirsche@gmail.com',
  },
  {
    no: 6,
    name: '강현우',
    email: 'develop@rocket.is',
  },
  {
    no: 7,
    name: '안인호',
    email: 'yatmak@wncoms.com',
  },
  {
    no: 8,
    name: '이지현',
    email: 'leeji201996@gmail.com',
  },
  {
    no: 9,
    name: '강상민',
    email: 'rkdtkd21@wncoms.com',
  },
  {
    no: 10,
    name: '마이크로프트',
    email: 'ceo@rocket.is',
  },
]
