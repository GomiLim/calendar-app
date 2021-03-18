import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import Calendar from '../components/Calendar'
import DateScheduleList from '../components/DateScheduleList'
import { loadingState } from '../recoil'
import CalendarPageStyle from '../styles/pages/CalendarPageStyle'
import * as helper from '../utils/helpers'
import * as hook from '../utils/hooks'
import {
  TestDataType,
  testIconData,
  TestIconDataType,
  testScheduleData,
} from './api/testScheduleData'

export default function Home() {
  const setLoading = Recoil.useSetRecoilState(loadingState)

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

  const isMounted = hook.useIsMounted()

  const onClickDate = (date: Date, doubleClicked?: boolean) => {
    const dateNum = Number(moment(date).format('YYYYMMDD'))

    setSchedules(
      testScheduleData
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
            const found = testScheduleData.find(
              (testD) => testD.no === item.parentNo,
            )
            if (found) {
              return { ...item, parentName: found.name }
            }
          }
          return item
        }),
    )

    const { channels, cards, todos } = testIconData
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
    if (isMounted()) {
      if (typeof window === 'undefined') return

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

      if (helper.checkIsMobile(window)) {
        setContainerWidth(() => ({ width: '100%', height: '30%' }))
      } else {
        setContainerWidth(() => ({ width: '70%', height: '100%' }))
      }
      setShowDateSchedule(() => true)
    }
  }, [
    isMounted,
    schedules.length,
    endingChannels.length,
    endingCards.length,
    endingTodos.length,
    chosenDate,
    helper.checkIsMobile,
    doubleClicked,
  ])

  React.useEffect(() => {
    if (isMounted()) {
      if (typeof window === 'undefined') return

      if (helper.checkIsMobile(window)) {
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
  }, [isMounted, showDateSchedule, chosenDate])

  React.useEffect(() => {
    if (!isMounted()) return
    if (typeof window === 'undefined') return

    const setVhProp = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('load', setVhProp)
    window.addEventListener('resize', setVhProp)

    if (helper.checkIsMobile(window)) {
      setCalendarShow(() => 'block')
    } else {
      setCalendarShow(() => 'flex')
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', setVhProp)
        window.removeEventListener('resize', setVhProp)
      }
    }
  }, [isMounted, helper.checkIsMobile])

  const onChangeMonth = (date: Date) => {
    setBaseDate(date)
  }

  return (
    <CalendarPageStyle.container
      style={{
        display: calendarShow,
      }}>
      <div style={containerWidth}>
        <Calendar
          baseDate={baseDate}
          onChangeMonth={onChangeMonth}
          chosenDate={chosenDate}
          onClick={onClickDate}
        />
      </div>
      <CalendarPageStyle.rightContainer style={rightContainerStyle}>
        {showDateSchedule && !!chosenDate && (
          <DateScheduleList
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
    </CalendarPageStyle.container>
  )
}
