import moment from 'moment'
import { GetServerSideProps } from 'next'
import React from 'react'
import Recoil from 'recoil'
import Calendar from '../components/Calendar'
import CalendarHeader from '../components/CalendarHeader'
import DateScheduleList from '../components/DateScheduleList'
import Loading from '../foundations/Loading'
import {
  filterState,
  iconDataSelector,
  iconDataState,
  loadingState,
  scheduleDataSelector,
  scheduleDataState,
} from '../recoil'
import CalendarPageStyle from '../styles/pages/CalendarPageStyle'
import * as helper from '../utils/helpers'
import * as hook from '../utils/hooks'
import { TestDataType, TestIconDataType } from '../utils/types'
import { testIconApi, testScheduleApi } from './api'

const fetchServerData = async (baseDates: Date[]) => {
  const scheduleData = await testScheduleApi(baseDates)
  const iconData = await testIconApi(baseDates)
  return {
    props: {
      scheduleData,
      iconData,
    },
  }
}

const sortIconData = (baseDate: Date, data: TestIconDataType[]) =>
  data.length === 0
    ? undefined
    : data.sort((a, b) => {
        const distanceA = Math.abs(
          baseDate.getTime() - moment(a.date).toDate().getTime(),
        )
        const distanceB = Math.abs(
          baseDate.getTime() - moment(b.date).toDate().getTime(),
        )
        return distanceA - distanceB
      })[0].date

const getMinimumDistanceDate = (
  baseDate: Date,
  ...args: Array<undefined | Date | string>
) => {
  return moment(
    args
      .filter((arg) => !!arg)
      .sort((a, b) => {
        const distanceA = Math.abs(
          baseDate.getTime() - moment(a).toDate().getTime(),
        )
        const distanceB = Math.abs(
          baseDate.getTime() - moment(b).toDate().getTime(),
        )
        return distanceA - distanceB
      })[0],
  ).toDate()
}

interface Props {
  scheduleData: TestDataType[]
  iconData: {
    channels: TestIconDataType[]
    cards: TestIconDataType[]
    todos: TestIconDataType[]
  }
}

export default function Home({ scheduleData, iconData }: Props) {
  const [loading, setLoading] = Recoil.useRecoilState(loadingState)
  const filter = Recoil.useRecoilValue(filterState)
  const setSchedulesRaw = Recoil.useSetRecoilState(scheduleDataState)
  const schedulesRaw = Recoil.useRecoilValue(scheduleDataSelector)
  const setIconsRaw = Recoil.useSetRecoilState(iconDataState)
  const iconsRaw = Recoil.useRecoilValue(iconDataSelector)

  const [monthRange, setMonthRange] = React.useState(
    helper.consistMonthRange(new Date()),
  )
  const [orgDate, setOrgDate] = React.useState<Date>(new Date())
  const [baseDate, setBaseDate] = React.useState<Date>(new Date())
  const [chosenDate, setChosenDate] = React.useState<Date | undefined>()
  const [showDateSchedule, setShowDateSchedule] = React.useState(false)
  const [
    containerWidth,
    setContainerWidth,
  ] = React.useState<React.CSSProperties>({ width: '100%', height: '100%' })
  const [schedules, setSchedules] = React.useState<TestDataType[]>([])
  const [endingChannels, setEndingChannels] = React.useState<
    TestIconDataType[]
  >([])
  const [endingCards, setEndingCards] = React.useState<TestIconDataType[]>([])
  const [endingTodos, setEndingTodos] = React.useState<TestIconDataType[]>([])
  const [doubleClicked, setDoubleClicked] = React.useState(false)
  const [showCreateSchedule, setShowCreateSchedule] = React.useState(false)
  const [calendarShow, setCalendarShow] = React.useState('block')
  const [rightContainerStyle, setRightContainerStyle] = React.useState<
    React.CSSProperties | undefined
  >()
  const [isMobile, setIsMobile] = React.useState(false)

  const isMounted = hook.useIsMounted()

  React.useEffect(() => {
    setIsMobile(helper.checkIsMobile(window))

    const setVhProp = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('load', setVhProp)
    window.addEventListener('resize', setVhProp)

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', setVhProp)
        window.removeEventListener('resize', setVhProp)
      }
    }
  }, [])

  React.useEffect(() => {
    if (isMounted()) {
      setSchedulesRaw(() => scheduleData)
      setIconsRaw(() => iconData)
      setLoading(() => false)
    }
  }, [isMounted, scheduleData, iconData])

  const onClickDate = (date: Date, doubleClicked?: boolean) => {
    const dateNum = Number(moment(date).format('YYYYMMDD'))

    setSchedules(
      schedulesRaw
        .filter((datum) => {
          const startDate = Number(moment(datum.startDate).format('YYYYMMDD'))
          if (datum.endDate) {
            const endDate = Number(moment(datum.endDate).format('YYYYMMDD'))
            if (endDate === startDate) {
              return startDate === dateNum
            }
            return startDate <= dateNum && dateNum <= endDate
          } else {
            return startDate === dateNum
          }
        })
        .map((item) => {
          if (item.type === 'sub') {
            const found = schedulesRaw.find(
              (testD) => testD.no === item.parentNo,
            )
            if (found) {
              return { ...item, parentName: found.name }
            }
          }
          return item
        }),
    )

    const { channels, cards, todos } = iconsRaw
    setEndingChannels(
      channels.filter(
        (channel) =>
          Number(moment(channel.date).format('YYYYMMDD')) === dateNum,
      ),
    )
    setEndingCards(
      cards.filter(
        (card) => Number(moment(card.date).format('YYYYMMDD')) === dateNum,
      ),
    )
    setEndingTodos(
      todos.filter(
        (todo) => Number(moment(todo.date).format('YYYYMMDD')) === dateNum,
      ),
    )
    setTimeout(() => {
      setDoubleClicked(!!doubleClicked)

      if (
        !!chosenDate &&
        moment(date).format('YYYYMMDD') ===
          moment(chosenDate).format('YYYYMMDD')
      ) {
        setChosenDate(undefined)
      } else {
        setBaseDate(date)
        setChosenDate(date)
      }

      setLoading(false)
    }, 50)
  }

  React.useEffect(() => {
    if (!isMounted()) return
    if (!chosenDate) return
    const dateNum = Number(moment(chosenDate).format('YYYYMMDD'))

    setEndingTodos(() =>
      iconsRaw.todos.filter(
        (todo) => Number(moment(todo.date).format('YYYYMMDD')) === dateNum,
      ),
    )
  }, [isMounted, iconsRaw.todos, chosenDate])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!chosenDate) return
    const dateNum = Number(moment(chosenDate).format('YYYYMMDD'))

    setEndingCards(() =>
      iconsRaw.cards.filter(
        (card) => Number(moment(card.date).format('YYYYMMDD')) === dateNum,
      ),
    )
  }, [isMounted, iconsRaw.cards, chosenDate])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!chosenDate) return
    const dateNum = Number(moment(chosenDate).format('YYYYMMDD'))

    setEndingChannels(() =>
      iconsRaw.channels.filter(
        (channel) =>
          Number(moment(channel.date).format('YYYYMMDD')) === dateNum,
      ),
    )
  }, [isMounted, iconsRaw.channels, chosenDate])

  React.useEffect(() => {
    if (!isMounted()) return

    setSchedules(() =>
      schedulesRaw.map((item) => {
        if (item.type === 'sub') {
          const found = schedulesRaw.find((testD) => testD.no === item.parentNo)
          if (found) {
            return { ...item, parentName: found.name }
          }
        }
        return item
      }),
    )
  }, [isMounted, schedulesRaw])

  const getServerData = React.useCallback(
    async (newDates: Date[]) => {
      if (!isMounted()) return

      const { props } = await fetchServerData(newDates)
      setSchedulesRaw((raw) => [
        ...raw,
        ...props.scheduleData.filter(
          (data) => !raw.some((r) => r.no === data.no),
        ),
      ])
      setIconsRaw((raw) => ({
        channels: [
          ...raw.channels,
          ...props.iconData.channels.filter(
            (data) => !raw.channels.some((r) => r.no === data.no),
          ),
        ],
        cards: [
          ...raw.cards,
          ...props.iconData.cards.filter(
            (data) => !raw.cards.some((r) => r.no === data.no),
          ),
        ],
        todos: [
          ...raw.todos,
          ...props.iconData.todos.filter(
            (data) => !raw.todos.some((r) => r.no === data.no),
          ),
        ],
      }))

      setLoading(() => false)
    },
    [isMounted],
  )

  React.useEffect(() => {
    if (isMounted()) {
      const orgDt = Number(moment(orgDate).format('YYYYMM'))
      const baseDt = Number(moment(baseDate).format('YYYYMM'))

      if (orgDt === baseDt) {
        return
      }

      setOrgDate(() => baseDate)

      const neededDateRange = helper
        .consistMonthRange(baseDate)
        .filter(
          (range) =>
            !monthRange.some((month) => helper.compareMonth(month, range)),
        )
      if (neededDateRange.length === 0) return
      if (
        neededDateRange.some(
          (month) => Number(moment(month).format('YYYYMM')) === baseDt,
        )
      ) {
        setLoading(() => true)
      }

      setMonthRange(() => [...monthRange, ...neededDateRange])

      void getServerData(neededDateRange)
    }
  }, [isMounted, orgDate, baseDate, monthRange, getServerData])

  React.useEffect(() => {
    if (isMounted()) {
      if (doubleClicked) {
        setShowDateSchedule(() => false)
        setContainerWidth(() => ({ width: '100%', height: '100%' }))
        setShowCreateSchedule(() => true)
        return
      }

      if (
        schedules.length +
          endingChannels.length +
          endingCards.length +
          endingTodos.length ===
          0 ||
        !chosenDate
      ) {
        setContainerWidth(() => ({ width: '100%', height: '100%' }))
        setShowDateSchedule(() => false)
        setShowCreateSchedule(() => false)
        return
      }

      if (isMobile) {
        setContainerWidth(() => ({
          width: '100%',
          height: '30%',
          transition: 'height 0.5s',
        }))
      } else {
        setContainerWidth(() => ({
          width: '70%',
          height: '100%',
          transition: 'width 0.5s',
        }))
      }
      setShowDateSchedule(() => true)
    }
  }, [
    isMounted,
    isMobile,
    schedules.length,
    endingChannels.length,
    endingCards.length,
    endingTodos,
    chosenDate,
    doubleClicked,
  ])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!showCreateSchedule) return

    alert('더블클릭시 나오는 일정 생성 화면이 없어요!')
  }, [isMounted, showCreateSchedule])

  React.useEffect(() => {
    if (isMounted()) {
      if (typeof window === 'undefined') return

      if (isMobile) {
        setRightContainerStyle(() => ({
          transition: 'height 0.5s',
          MozTransition: 'height 0.5s',
          WebkitTransition: 'height 0.5s',
          height:
            showDateSchedule && !!chosenDate ? 'calc(70% - 0.063rem)' : '0%',
          width: '100%',
        }))
      } else {
        setRightContainerStyle(() => ({
          transition: 'width 0.5s',
          MozTransition: 'width 0.5s',
          WebkitTransition: 'width 0.5s',
          height: '100%',
          width:
            showDateSchedule && !!chosenDate ? 'calc(30% - 0.063rem)' : '0%',
        }))
      }
    }
  }, [isMounted, showDateSchedule, chosenDate, isMobile])

  React.useEffect(() => {
    if (!isMounted()) return
    if (typeof window === 'undefined') return

    if (isMobile) {
      setCalendarShow(() => 'block')
    } else {
      setCalendarShow(() => 'flex')
    }
  }, [isMounted, isMobile])

  React.useEffect(() => {
    if (!isMounted()) return
    if (
      schedulesRaw.length === 0 &&
      iconsRaw.channels.length === 0 &&
      iconsRaw.cards.length === 0 &&
      iconsRaw.todos.length === 0
    )
      return

    const { channel, schedule, card, todo, member } = filter
    if (
      !channel.no &&
      !channel.label &&
      !channel.closed &&
      !schedule.no &&
      !schedule.label &&
      !card.no &&
      !card.label &&
      !card.closed &&
      !todo.no &&
      !todo.label &&
      !todo.done &&
      (!member || (!member.no && !member.name && !member.email && !member.duty))
    )
      return

    const found =
      schedulesRaw.find((schedule) =>
        helper.compareMonth(schedule.startDate, baseDate) || schedule.endDate
          ? helper.compareMonth(schedule.endDate as Date | string, baseDate)
          : false,
      ) ||
      iconsRaw.channels.find((channel) =>
        helper.compareMonth(channel.date, baseDate),
      ) ||
      iconsRaw.cards.find((card) => helper.compareMonth(card.date, baseDate)) ||
      iconsRaw.todos.find((todo) => helper.compareMonth(todo.date, baseDate))
    if (found) return

    const schedules = [...schedulesRaw].sort((a, b) => {
      const distanceAStart = Math.abs(
        baseDate.getTime() - moment(a.startDate).toDate().getTime(),
      )
      const distanceAEnd = Math.abs(
        baseDate.getTime() -
          (a.endDate ? moment(a.endDate).toDate().getTime() : 0),
      )
      const distanceBStart = Math.abs(
        baseDate.getTime() - moment(b.startDate).toDate().getTime(),
      )
      const distanceBEnd = Math.abs(
        baseDate.getTime() -
          (b.endDate ? moment(b.endDate).toDate().getTime() : 0),
      )
      if (
        (distanceAStart > distanceBStart && distanceAStart > distanceBEnd) ||
        (distanceAEnd > distanceBStart && distanceAEnd > distanceBEnd)
      ) {
        return 1
      } else if (
        (distanceAStart < distanceBStart && distanceAStart < distanceBEnd) ||
        (distanceAEnd < distanceBStart && distanceAEnd < distanceBEnd)
      ) {
        return -1
      }
      return 0
    })
    const scheduleClosest =
      schedules.length === 0
        ? undefined
        : schedules[0].endDate
        ? moment(schedules[0].endDate).toDate().getTime() >
          moment(schedules[0].startDate).toDate().getTime()
          ? schedules[0].endDate
          : schedules[0].startDate
        : schedules[0].startDate

    const channelClosest = sortIconData(baseDate, [...iconsRaw.channels])
    const cardClosest = sortIconData(baseDate, [...iconsRaw.cards])
    const todoClosest = sortIconData(baseDate, [...iconsRaw.todos])

    setBaseDate(() =>
      getMinimumDistanceDate(
        baseDate,
        scheduleClosest,
        channelClosest,
        cardClosest,
        todoClosest,
      ),
    )
  }, [isMounted, filter, schedulesRaw, iconsRaw])

  const onChangeMonth = (date: Date) => {
    setBaseDate(date)
  }

  const onDoubleClickSchedule = (scheduleNo: number) => {
    alert('일정 더블클릭시 나오는 일정 수정 화면이 없어요!')
  }

  return (
    <>
      <Loading loading={loading} />
      <CalendarPageStyle.container>
        <CalendarPageStyle.header>
          <CalendarHeader />
        </CalendarPageStyle.header>
        <CalendarPageStyle.content
          style={{
            display: calendarShow,
          }}>
          <div style={containerWidth}>
            <Calendar
              isMobile={isMobile}
              baseDate={baseDate}
              onChangeMonth={onChangeMonth}
              chosenDate={chosenDate}
              onClick={onClickDate}
              onDoubleClickSchedule={onDoubleClickSchedule}
            />
          </div>
          <CalendarPageStyle.rightContainer style={rightContainerStyle}>
            {showDateSchedule && !!chosenDate && (
              <DateScheduleList
                isMobile={isMobile}
                onClickTitle={onClickDate}
                date={chosenDate || new Date()}
                schedules={schedules}
                channels={endingChannels}
                cards={endingCards}
                todos={endingTodos}
              />
            )}
            {/* {showCreateSchedule && !!chosenDate && (
          <DateScheduleListContainer
            platform={platform}
            date={chosenDate || new Date()}
          />
        )} */}
          </CalendarPageStyle.rightContainer>
        </CalendarPageStyle.content>
      </CalendarPageStyle.container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return await fetchServerData(helper.consistMonthRange(new Date()))
}
