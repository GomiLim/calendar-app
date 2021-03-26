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
  iconDataState,
  loadingState,
  scheduleDataState,
} from '../recoil'
import CalendarPageStyle from '../styles/pages/CalendarPageStyle'
import * as helper from '../utils/helpers'
import * as hook from '../utils/hooks'
import { FilterType } from '../utils/types'
import {
  TestDataType,
  testIconApi,
  TestIconDataType,
  testScheduleApi,
} from './api'

const fetchServerData = async (baseDate: Date, filter?: FilterType) => {
  const scheduleData = await testScheduleApi(baseDate, filter)
  const iconData = await testIconApi(baseDate, filter)
  return {
    props: {
      scheduleData,
      iconData,
    },
  }
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
  const [schedulesRaw, setSchedulesRaw] = Recoil.useRecoilState(
    scheduleDataState,
  )
  const [iconsRaw, setIconsRaw] = Recoil.useRecoilState(iconDataState)
  const filter = Recoil.useRecoilValue(filterState)

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

  const getServerData = React.useCallback(async () => {
    if (!isMounted()) return

    setLoading(() => true)

    const { props } = await fetchServerData(baseDate, filter)
    setSchedulesRaw(() => props.scheduleData)
    setIconsRaw(() => props.iconData)

    setLoading(() => false)
  }, [isMounted, filter, baseDate])

  React.useEffect(() => {
    if (!isMounted()) return

    void getServerData()
  }, [isMounted, getServerData])

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
        setContainerWidth(() => ({ width: '100%', height: '30%' }))
      } else {
        setContainerWidth(() => ({ width: '70%', height: '100%' }))
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

      if (showDateSchedule) {
        setLoading(() => true)
        setLoading(() => false)
      }

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
  return await fetchServerData(new Date())
}
