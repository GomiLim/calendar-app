import moment from 'moment'
import Recoil from 'recoil'
import { filteredIconData, filteredScheduleData } from '../../pages/api'
import { initFilter } from '../../recoil'
import theme from '../../styles/theme'
import { FilterType, TestDataType, TestIconDataType } from '../../utils/types'
import {
  testIconData,
  testScheduleData,
  testUserData,
} from '../../__mocks__/testScheduleData'

describe('State Data Selector 테스트', () => {
  const scheduleDataState = Recoil.atom<TestDataType[]>({
    key: 'testScheduleDataState',
    default: testScheduleData,
  })
  const iconDataState = Recoil.atom<{
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  }>({
    key: 'testIconDataState',
    default: testIconData,
  })
  const filterState = Recoil.atom<FilterType>({
    key: 'testFilterState',
    default: initFilter,
  })

  const scheduleDataSelector = Recoil.selector({
    key: 'testScheduleDataSelector',
    get: ({ get }) =>
      filteredScheduleData(get(scheduleDataState), get(filterState)),
  })
  const iconDataSelector = Recoil.selector({
    key: 'testIconDataSelector',
    get: ({ get }) => filteredIconData(get(iconDataState), get(filterState)),
  })

  context('scheduleDataSelector 테스트', () => {
    it('모든 일정 출력', () => {
      const initialSnapshot = Recoil.snapshot_UNSTABLE()
      expect(
        initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
      ).toStrictEqual(testScheduleData)
    })
    it('일정 감출 시', () => {
      const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
        set(filterState, {
          ...initFilter,
          schedule: { ...initFilter.schedule, show: false },
        }),
      )
      expect(
        initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
      ).toStrictEqual([])
    })
    it('일정 자동완성 목록에서 선택 시', () => {
      const selectedNo = 2
      const expected = testScheduleData.filter(
        (schedule) => schedule.no === selectedNo,
      )
      expect(expected).toStrictEqual([
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
            {
              no: 1,
              email: 'cho.inhyo@rocket.is',
              name: '조인효',
              attend: false,
            },
            {
              no: 2,
              email: 'ceo@w-coms.com',
              name: 'hyuksu choi',
              attend: false,
            },
            { no: 4, email: 'surfer@rocket.is', name: '장민희', attend: true },
          ],
        },
      ])
      const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
        set(filterState, {
          ...initFilter,
          schedule: { ...initFilter.schedule, no: selectedNo },
        }),
      )
      expect(
        initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
      ).toStrictEqual(expected)
    })
    it('일정 제목 입력 시', () => {
      const keyword = '파란채널'
      const expected = testScheduleData.filter((schedule) =>
        schedule.name
          .replace(/ /g, '')
          .toLowerCase()
          .includes(keyword.replace(/ /g, '').toLowerCase()),
      )
      expect(expected).toEqual([
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
            {
              no: 1,
              email: 'cho.inhyo@rocket.is',
              name: '조인효',
              attend: true,
            },
            {
              no: 2,
              email: 'ceo@w-coms.com',
              name: 'hyuksu choi',
              attend: false,
            },
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
            {
              no: 1,
              email: 'cho.inhyo@rocket.is',
              name: '조인효',
              attend: false,
            },
            {
              no: 2,
              email: 'ceo@w-coms.com',
              name: 'hyuksu choi',
              attend: true,
            },
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
          members: [
            {
              no: 1,
              email: 'cho.inhyo@rocket.is',
              name: '조인효',
              attend: true,
            },
          ],
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
            {
              no: 1,
              email: 'cho.inhyo@rocket.is',
              name: '조인효',
              attend: true,
            },
            {
              no: 2,
              email: 'ceo@w-coms.com',
              name: 'hyuksu choi',
              attend: false,
            },
            { no: 3, email: 'bae@rocket.is', name: '배상건', attend: false },
          ],
        },
      ])
      const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
        set(filterState, {
          ...initFilter,
          schedule: { ...initFilter.schedule, label: keyword },
        }),
      )
      expect(
        initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
      ).toStrictEqual(expected)
    })
  })
  describe('iconDataSelector 테스트', () => {
    context('채널 데이터 테스트', () => {
      const checkDependableData = (
        initialSnapshot: Recoil.Snapshot,
        expected: TestIconDataType[],
      ) => {
        const filter = initialSnapshot.getLoadable(filterState).valueOrThrow()
        const expectedSchedules = testScheduleData.filter((schedule) =>
          expected.some(
            (channel) =>
              channel.no === schedule.channel.no &&
              (filter.channel.closed === undefined
                ? true
                : !!schedule.channel.closed === filter.channel.closed),
          ),
        )
        expect(
          initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
        ).toStrictEqual(expectedSchedules)
        // const expectedCards = testIconData.cards.filter((card) =>
        //   expected.some((channel) => channel.no === card.channel.no),
        // )
        // expect(
        //   initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
        // ).toStrictEqual(expectedCards)
        // const expectedTodos = testIconData.todos.filter((todo) =>
        //   expected.some((channel) => channel.no === todo.channel.no),
        // )
        // expect(
        //   initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
        // ).toStrictEqual(expectedTodos)
      }

      context('모든 채널', () => {
        it('모든 데이터 출력', () => {
          const initialSnapshot = Recoil.snapshot_UNSTABLE()
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(testIconData.channels)
        })
        it('감출 시', () => {
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, show: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual([])
        })
        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 5
          const expected = testIconData.channels.filter(
            (channel) => channel.no === selectedNo,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, no: selectedNo },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)

          checkDependableData(initialSnapshot, expected)
        })
        it('제목 입력 시', () => {
          const keyword = '널4'
          const expected = testIconData.channels.filter(
            (channel) =>
              channel.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, label: keyword },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)

          checkDependableData(initialSnapshot, expected)
        })
      })
      context('진행 중 채널', () => {
        it('모든 데이터 출력', () => {
          const expected = testIconData.channels.filter(
            (channel) => !channel.closed,
          )
          expect(expected.length).toBe(7)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, closed: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)
        })

        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 5
          const expected = testIconData.channels.filter(
            (channel) => channel.no === selectedNo && !channel.closed,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, no: selectedNo, closed: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)
          console.log(
            'expected',
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          )
          checkDependableData(initialSnapshot, expected)
        })
        it('제목 입력 시', () => {
          const keyword = '널1'
          const expected = testIconData.channels.filter(
            (channel) =>
              channel.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1 &&
              !channel.closed,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, label: keyword, closed: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)
        })
      })
      context('종료된 채널', () => {
        it('모든 데이터 출력', () => {
          const expected = testIconData.channels.filter(
            (channel) => !!channel.closed,
          )
          expect(expected.length).toBe(3)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, closed: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)
        })

        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 5
          const expected = testIconData.channels.filter(
            (channel) => channel.no === selectedNo && !!channel.closed,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, no: selectedNo, closed: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '널1'
          const expected = testIconData.channels.filter(
            (channel) =>
              channel.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1 &&
              !!channel.closed,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              channel: { ...initFilter.channel, label: keyword, closed: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expected)
        })
      })
    })
    context('카드 데이터 테스트', () => {
      context('모든 카드', () => {
        it('모든 데이터 출력', () => {
          const initialSnapshot = Recoil.snapshot_UNSTABLE()
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(testIconData.cards)
        })
        it('감출 시', () => {
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, show: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual([])
        })
        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 2
          const expected = testIconData.cards.filter(
            (card) => card.no === selectedNo,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, no: selectedNo },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '드3'
          const expected = testIconData.cards.filter(
            (card) =>
              card.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, label: keyword },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })
      })
      context('진행 중 카드', () => {
        it('모든 데이터 출력', () => {
          const expected = testIconData.cards.filter((card) => !card.closed)
          expect(expected.length).toBe(8)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, closed: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })

        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 4
          const expected = testIconData.cards.filter(
            (card) => card.no === selectedNo && !card.closed,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, no: selectedNo, closed: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '드4'
          const expected = testIconData.cards.filter(
            (card) =>
              card.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1 &&
              !card.closed,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, label: keyword, closed: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })
      })
      context('종료된 카드', () => {
        it('모든 데이터 출력', () => {
          const expected = testIconData.cards.filter((card) => !!card.closed)
          expect(expected.length).toBe(2)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, closed: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })

        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 8
          const expected = testIconData.cards.filter(
            (card) => card.no === selectedNo && !!card.closed,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, no: selectedNo, closed: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '9'
          const expected = testIconData.cards.filter(
            (card) =>
              card.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1 &&
              !!card.closed,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              card: { ...initFilter.card, label: keyword, closed: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expected)
        })
      })
    })

    context('할일 데이터 테스트', () => {
      context('모든 할일', () => {
        it('모든 데이터 출력', () => {
          const initialSnapshot = Recoil.snapshot_UNSTABLE()
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(testIconData.todos)
        })
        it('감출 시', () => {
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, show: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual([])
        })
        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 3
          const expected = testIconData.todos.filter(
            (todo) => todo.no === selectedNo,
          )
          expect(expected).toStrictEqual([
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
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, no: selectedNo },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '일4'
          const expected = testIconData.todos.filter(
            (todo) =>
              todo.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1,
          )
          expect(expected).toStrictEqual([
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
                {
                  no: 1,
                  email: 'cho.inhyo@rocket.is',
                  name: '조인효',
                  assigned: true,
                },
                {
                  no: 3,
                  email: 'bae@rocket.is',
                  name: '배상건',
                  assigned: true,
                },
                {
                  no: 4,
                  email: 'surfer@rocket.is',
                  name: '장민희',
                  assigned: false,
                },
              ],
              managers: [9],
            },
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, label: keyword },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })
      })
      context('진행 중 할일', () => {
        it('모든 데이터 출력', () => {
          const expected = testIconData.todos.filter((todo) => !todo.done)
          expect(expected.length).toBe(7)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, done: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })

        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 4
          const expected = testIconData.todos.filter(
            (todo) => todo.no === selectedNo && !todo.done,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, no: selectedNo, done: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '일5'
          const expected = testIconData.todos.filter(
            (todo) =>
              todo.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1 &&
              !todo.done,
          )
          expect(expected).toStrictEqual([
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
                {
                  no: 3,
                  email: 'bae@rocket.is',
                  name: '배상건',
                  assigned: true,
                },
                {
                  no: 4,
                  email: 'surfer@rocket.is',
                  name: '장민희',
                  assigned: false,
                },
              ],
              managers: [8, 2],
            },
          ])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, label: keyword, done: false },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })
      })
      context('완료된 할일', () => {
        it('모든 데이터 출력', () => {
          const expected = testIconData.todos.filter((todo) => !!todo.done)
          expect(expected.length).toBe(5)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, done: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })

        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 8
          const expected = testIconData.todos.filter(
            (todo) => todo.no === selectedNo && !!todo.done,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, no: selectedNo, done: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })
        it('제목 입력 시', () => {
          const keyword = '9'
          const expected = testIconData.todos.filter(
            (todo) =>
              todo.name
                .replace(/ /g, '')
                .toLowerCase()
                .indexOf(keyword.replace(/ /g, '').toLowerCase()) > -1 &&
              !!todo.done,
          )
          expect(expected).toStrictEqual([])
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              todo: { ...initFilter.todo, label: keyword, done: true },
            }),
          )
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expected)
        })
      })
    })
    context('사용자 필터 테스트', () => {
      context('권한 전체', () => {
        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 1
          const expectedUsers = testUserData.filter(
            (user) => user.no === selectedNo,
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = testScheduleData.filter(
            (schedule) =>
              schedule.members &&
              schedule.members.some((member) => member.no === selectedNo),
          )
          expect(expectedSchedules.length).toBe(22)
          const expectedChannels = testIconData.channels.filter(
            (channel) =>
              channel.members &&
              channel.members?.some((member) => member.no === selectedNo),
          )
          expect(expectedChannels.length).toBe(0)
          const expectedCards = testIconData.cards.filter(
            (card) =>
              card.members &&
              card.members?.some((member) => member.no === selectedNo),
          )
          expect(expectedCards.length).toBe(6)
          const expectedTodos = testIconData.todos.filter(
            (todo) =>
              todo.members &&
              todo.members?.some((member) => member.no === selectedNo),
          )
          expect(expectedTodos.length).toBe(7)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { no: selectedNo },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
        it('이름 입력 시', () => {
          const keyword = '인효'
          const expectedUsers = testUserData.filter((user) =>
            user.name
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = testScheduleData.filter(
            (schedule) =>
              schedule.members &&
              schedule.members.some((member) =>
                String(member.name)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedSchedules.length).toBe(22)
          const expectedChannels = testIconData.channels.filter(
            (channel) =>
              channel.members &&
              channel.members?.some((member) =>
                String(member.name)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedChannels.length).toBe(0)
          const expectedCards = testIconData.cards.filter(
            (card) =>
              card.members &&
              card.members?.some((member) =>
                String(member.name)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedCards.length).toBe(6)
          const expectedTodos = testIconData.todos.filter(
            (todo) =>
              todo.members &&
              todo.members?.some((member) =>
                String(member.name)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedTodos.length).toBe(7)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { name: keyword },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
        it('이메일 입력 시', () => {
          const keyword = 'cho.inhyo'
          const expectedUsers = testUserData.filter((user) =>
            user.email
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = testScheduleData.filter(
            (schedule) =>
              schedule.members &&
              schedule.members.some((member) =>
                String(member.email)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedSchedules.length).toBe(22)
          const expectedChannels = testIconData.channels.filter(
            (channel) =>
              channel.members &&
              channel.members?.some((member) =>
                String(member.email)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedChannels.length).toBe(0)
          const expectedCards = testIconData.cards.filter(
            (card) =>
              card.members &&
              card.members?.some((member) =>
                String(member.email)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedCards.length).toBe(6)
          const expectedTodos = testIconData.todos.filter(
            (todo) =>
              todo.members &&
              todo.members?.some((member) =>
                String(member.email)
                  .replace(/ /g, '')
                  .toLowerCase()
                  .includes(keyword.replace(/ /g, '').toLowerCase()),
              ),
          )
          expect(expectedTodos.length).toBe(7)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { email: keyword },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
      })
      context('관리자', () => {
        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 1
          const expectedUsers = testUserData.filter(
            (user) => user.no === selectedNo,
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = []
          expect(expectedSchedules.length).toBe(0)
          const expectedChannels = testIconData.channels.filter(
            (channel) =>
              channel.managers &&
              channel.managers?.some((member) => member === selectedNo),
          )
          expect(expectedChannels.length).toBe(4)
          const expectedCards = testIconData.cards.filter(
            (card) =>
              card.managers &&
              card.managers?.some((member) => member === selectedNo),
          )
          expect(expectedCards.length).toBe(2)
          const expectedTodos = testIconData.todos.filter(
            (todo) =>
              todo.managers &&
              todo.managers?.some((member) => member === selectedNo),
          )
          expect(expectedTodos.length).toBe(3)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { no: selectedNo, duty: 'manager' },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
        it('이름 입력 시', () => {
          const keyword = '인효'
          const expectedUsers = testUserData.filter((user) =>
            user.name
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = []
          expect(expectedSchedules.length).toBe(0)
          const expectedChannels = testIconData.channels.filter(
            (channel) =>
              channel.managers &&
              channel.managers
                ?.map((member) =>
                  testUserData.find((user) => user.no === member),
                )
                .some((member) =>
                  String(member.name)
                    .replace(/ /g, '')
                    .toLowerCase()
                    .includes(keyword.replace(/ /g, '').toLowerCase()),
                ),
          )
          expect(expectedChannels.length).toBe(4)
          const expectedCards = testIconData.cards.filter(
            (card) =>
              card.managers &&
              card.managers
                ?.map((member) =>
                  testUserData.find((user) => user.no === member),
                )
                .some((member) =>
                  String(member.name)
                    .replace(/ /g, '')
                    .toLowerCase()
                    .includes(keyword.replace(/ /g, '').toLowerCase()),
                ),
          )
          expect(expectedCards.length).toBe(2)
          const expectedTodos = testIconData.todos.filter(
            (todo) =>
              todo.managers &&
              todo.managers
                ?.map((member) =>
                  testUserData.find((user) => user.no === member),
                )
                .some((member) =>
                  String(member.name)
                    .replace(/ /g, '')
                    .toLowerCase()
                    .includes(keyword.replace(/ /g, '').toLowerCase()),
                ),
          )
          expect(expectedTodos.length).toBe(3)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { name: keyword, duty: 'manager' },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
        it('이메일 입력 시', () => {
          const keyword = 'cho.inhyo'
          const expectedUsers = testUserData.filter((user) =>
            user.email
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = []
          expect(expectedSchedules.length).toBe(0)
          const expectedChannels = testIconData.channels.filter(
            (channel) =>
              channel.managers &&
              channel.managers
                ?.map((member) =>
                  testUserData.find((user) => user.no === member),
                )
                .some((member) =>
                  String(member.email)
                    .replace(/ /g, '')
                    .toLowerCase()
                    .includes(keyword.replace(/ /g, '').toLowerCase()),
                ),
          )
          expect(expectedChannels.length).toBe(4)
          const expectedCards = testIconData.cards.filter(
            (card) =>
              card.managers &&
              card.managers
                ?.map((member) =>
                  testUserData.find((user) => user.no === member),
                )
                .some((member) =>
                  String(member.email)
                    .replace(/ /g, '')
                    .toLowerCase()
                    .includes(keyword.replace(/ /g, '').toLowerCase()),
                ),
          )
          expect(expectedCards.length).toBe(2)
          const expectedTodos = testIconData.todos.filter(
            (todo) =>
              todo.managers &&
              todo.managers
                ?.map((member) =>
                  testUserData.find((user) => user.no === member),
                )
                .some((member) =>
                  String(member.email)
                    .replace(/ /g, '')
                    .toLowerCase()
                    .includes(keyword.replace(/ /g, '').toLowerCase()),
                ),
          )
          expect(expectedTodos.length).toBe(3)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { email: keyword, duty: 'manager' },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
      })
      context('생성자', () => {
        it('자동완성 목록에서 선택 시', () => {
          const selectedNo = 1
          const expectedUsers = testUserData.filter(
            (user) => user.no === selectedNo,
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = testScheduleData.filter(
            (schedule) => schedule.writerNo === selectedNo,
          )
          expect(expectedSchedules.length).toBe(22)
          const expectedChannels = testIconData.channels.filter(
            (channel) => channel.writerNo === selectedNo,
          )
          expect(expectedChannels.length).toBe(0)
          const expectedCards = testIconData.cards.filter(
            (card) => card.writerNo === selectedNo,
          )
          expect(expectedCards.length).toBe(10)
          const expectedTodos = testIconData.todos.filter(
            (todo) => todo.writerNo === selectedNo,
          )
          expect(expectedTodos.length).toBe(0)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { no: selectedNo, duty: 'creator' },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
        it('이름 입력 시', () => {
          const keyword = '인효'
          const expectedUsers = testUserData.filter((user) =>
            user.name
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = testScheduleData.filter((schedule) =>
            String(
              testUserData.find((user) => user.no === schedule.writerNo)?.name,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedSchedules.length).toBe(22)
          const expectedChannels = testIconData.channels.filter((channel) =>
            String(
              testUserData.find((user) => user.no === channel.writerNo)?.name,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedChannels.length).toBe(0)
          const expectedCards = testIconData.cards.filter((card) =>
            String(testUserData.find((user) => user.no === card.writerNo)?.name)
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedCards.length).toBe(10)
          const expectedTodos = testIconData.todos.filter((todo) =>
            String(testUserData.find((user) => user.no === todo.writerNo)?.name)
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedTodos.length).toBe(0)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { name: keyword, duty: 'creator' },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
        it('이메일 입력 시', () => {
          const keyword = 'cho.inhyo'
          const expectedUsers = testUserData.filter((user) =>
            user.email
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedUsers).toStrictEqual([
            {
              no: 1,
              name: '조인효',
              email: 'cho.inhyo@rocket.is',
            },
          ])

          const expectedSchedules = testScheduleData.filter((schedule) =>
            String(
              testUserData.find((user) => user.no === schedule.writerNo)?.email,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedSchedules.length).toBe(22)
          const expectedChannels = testIconData.channels.filter((channel) =>
            String(
              testUserData.find((user) => user.no === channel.writerNo)?.email,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedChannels.length).toBe(0)
          const expectedCards = testIconData.cards.filter((card) =>
            String(
              testUserData.find((user) => user.no === card.writerNo)?.email,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedCards.length).toBe(10)
          const expectedTodos = testIconData.todos.filter((todo) =>
            String(
              testUserData.find((user) => user.no === todo.writerNo)?.email,
            )
              .replace(/ /g, '')
              .toLowerCase()
              .includes(keyword.replace(/ /g, '').toLowerCase()),
          )
          expect(expectedTodos.length).toBe(0)
          const initialSnapshot = Recoil.snapshot_UNSTABLE(({ set }) =>
            set(filterState, {
              ...initFilter,
              member: { email: keyword, duty: 'creator' },
            }),
          )
          expect(
            initialSnapshot.getLoadable(scheduleDataSelector).valueOrThrow(),
          ).toStrictEqual(expectedSchedules)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow()
              .channels,
          ).toStrictEqual(expectedChannels)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().cards,
          ).toStrictEqual(expectedCards)
          expect(
            initialSnapshot.getLoadable(iconDataSelector).valueOrThrow().todos,
          ).toStrictEqual(expectedTodos)
        })
      })
    })
  })
})
