import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../foundations/Box'
import Icon from '../../foundations/Icon'
import Text from '../../foundations/Text'
import {
  TestDataType,
  TestIconDataType,
} from '../../pages/api/testScheduleData'
import DateScheduleListContainerStyle from '../../styles/components/DateScheduleList/DateScheduleListContainerStyle'
import * as helper from '../../utils/helpers'
import Swipe from '../../utils/helpers/swiper'
import * as hook from '../../utils/hooks'
import { Months } from '../../utils/i18n'
import { Icons } from '../../utils/types'
import DueScheduleList from './DueScheduleList'

interface Props {
  date: Date
  schedules: TestDataType[]
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
  onClickTitle: (date: Date) => void
}

export default function DateScheduleList({
  date,
  schedules,
  channels,
  cards,
  todos,
  onClickTitle,
}: Props) {
  const { t } = useTranslation()

  const _container: React.RefObject<HTMLDivElement> = React.createRef()
  const _label: React.RefObject<HTMLDivElement> = React.createRef()
  const _header: React.RefObject<HTMLDivElement> = React.createRef()
  const _schedule: React.RefObject<HTMLDivElement> = React.createRef()
  const _card: React.RefObject<HTMLDivElement> = React.createRef()
  const _todo: React.RefObject<HTMLDivElement> = React.createRef()

  const [showScheduleList, setShowScheduleList] = React.useState(true)
  const [showChannelList, setShowChannelList] = React.useState(true)
  const [showCardList, setShowCardList] = React.useState(true)
  const [showTodoList, setShowTodoList] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)
  const [topLabelStyle, setTopLabelStyle] = React.useState<
    React.CSSProperties | undefined
  >()
  const [headerLabelStyle, setHeaderLabelStyle] = React.useState<
    React.CSSProperties | undefined
  >()
  const [headerContent, setHeaderContent] = React.useState<React.ReactNode[]>(
    [],
  )
  const [scrollable, setScrollable] = React.useState(false)

  const isMounted = hook.useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setHeaderContent([
        <Text key="channel-text" value={t('calendar.channel')} />,
        <Icon
          key="channel-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showChannelList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    }
  }, [])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!_container?.current) return

    setScrollable(() => {
      if (_container?.current) {
        return _container.current.scrollHeight > _container.current.clientHeight
      } else {
        return false
      }
    })
  }, [
    isMounted,
    showChannelList,
    showScheduleList,
    showCardList,
    showTodoList,
    _container,
  ])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!_container?.current) return
    if (!_header?.current) return
    if (scrollable) return
    if (_header.current.attributes[0].value === 'channel') return

    _header.current.attributes[0].value = 'channel'
    setHeaderContent(() => [
      <Text key="channel-text" value={t('calendar.channel')} />,
      <Icon
        key="channel-icon"
        style={DateScheduleListContainerStyle.toggle}
        icon={showChannelList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
      />,
    ])
  }, [isMounted, scrollable, _container, _header])

  const changeHeaderDisplay = (attrVal: string) => {
    if (!_container?.current) return
    if (!_schedule?.current || !_card?.current || !_todo?.current) return

    const show =
      attrVal === 'channel'
        ? showChannelList
        : attrVal === 'schedule'
        ? showScheduleList
        : attrVal === 'card'
        ? showCardList
        : showTodoList

    setHeaderContent(
      headerContent.map((header, idx) => {
        if (idx === 0) return header
        return (
          <Icon
            key={`${attrVal}-icon`}
            style={DateScheduleListContainerStyle.toggle}
            icon={!show ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
          />
        )
      }),
    )

    const top =
      attrVal === 'channel'
        ? 0
        : attrVal === 'schedule'
        ? _schedule.current.getBoundingClientRect().top
        : attrVal === 'card'
        ? _card.current.getBoundingClientRect().top
        : _todo.current.getBoundingClientRect().top

    _container.current.scrollTo({
      top,
      behavior: 'auto',
    })
  }

  const onClickHeader = () => {
    if (!_header.current) return

    changeHeaderDisplay(_header.current.attributes[0].value)

    switch (_header.current.attributes[0].value) {
      case 'channel':
        setShowChannelList(!showChannelList)
        break
      case 'schedule':
        setShowScheduleList(!showScheduleList)
        break
      case 'card':
        setShowCardList(!showCardList)
        break
      default:
        setShowTodoList(!showTodoList)
        break
    }
  }

  const touch = (el: HTMLDivElement) => {
    const swiper = new Swipe(el)
    swiper.onDown(() => {
      onClickTitle(date)
    })
    swiper.run()
  }

  hook.useLayoutEffect(() => {
    if (!isMounted()) return
    if (!_label?.current) return
    if (typeof window === 'undefined') return

    touch(_label.current)

    const mobileCheck = helper.checkIsMobile(window)
    setIsMobile(() => mobileCheck)

    if (mobileCheck) {
      setTopLabelStyle(() => ({
        width: '100%',
        left: 0,
        top: 'unset',
        bottom: 'calc(70% - 3rem)',
      }))
      setHeaderLabelStyle(() => ({
        width: '100%',
        left: 0,
        top: 'unset',
        bottom: 'calc(70% - 5.5rem)',
      }))
    } else {
      setTopLabelStyle(() => ({
        width: 'calc(30% - 0.063rem)',
        left: 'calc(70% + 0.063rem)',
        top: 0,
        bottom: 'unset',
      }))
      setHeaderLabelStyle(() => ({
        width: 'calc(30% - 0.063rem)',
        left: 'calc(70% + 0.063rem)',
        top: '2.5rem',
        bottom: 'unset',
      }))
    }
  }, [isMounted, _label?.current, helper.checkIsMobile])

  const onScroll = () => {
    if (!_header?.current) return
    if (!_schedule?.current || !_card?.current || !_todo?.current) return

    if (
      _todo.current.getBoundingClientRect().top +
        _todo.current.getBoundingClientRect().height / 2 <=
      _header.current.getBoundingClientRect().bottom
    ) {
      _header.current.attributes[0].value = 'todo'
      setHeaderContent([
        <Text key="todo-text" value={t('calendar.todo')} />,
        <Icon
          key="todo-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showTodoList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    } else if (
      _card.current.getBoundingClientRect().top +
        _card.current.getBoundingClientRect().height / 2 <=
      _header.current.getBoundingClientRect().bottom
    ) {
      _header.current.attributes[0].value = 'card'
      setHeaderContent([
        <Text key="card-text" value={t('calendar.card')} />,
        <Icon
          key="card-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showCardList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    } else if (
      _schedule.current.getBoundingClientRect().top +
        _schedule.current.getBoundingClientRect().height / 2 <=
      _header.current.getBoundingClientRect().bottom
    ) {
      _header.current.attributes[0].value = 'schedule'
      setHeaderContent([
        <Text key="schedule-text" value={t('calendar.schedule')} />,
        <Icon
          key="schedule-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showScheduleList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    } else {
      _header.current.attributes[0].value = 'channel'
      setHeaderContent([
        <Text key="channel-text" value={t('calendar.channel')} />,
        <Icon
          key="channel-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showChannelList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    }
  }

  React.useEffect(() => {
    if (!isMounted()) return
    if (!_container?.current) return

    _container.current.addEventListener('scroll', onScroll)

    return () => {
      if (_container?.current) {
        _container.current.removeEventListener('scroll', onScroll)
      }
    }
  }, [isMounted, _container])

  const onClickScheduleShow = () => setShowScheduleList(!showScheduleList)
  const onClickChannelShow = () => setShowChannelList(!showChannelList)
  const onClickCardShow = () => setShowCardList(!showCardList)
  const onClickTodoShow = () => setShowTodoList(!showTodoList)

  const onClickSchedule = (data: TestDataType) => {
    //
  }

  const onClickChannel = (data: TestIconDataType) => {
    //
  }

  const onClickCard = (data: TestIconDataType) => {
    //
  }

  const onClickTodo = (data: TestIconDataType) => {
    //
  }

  const year = moment(date).format('YYYY')
  const month = Number(moment(date).format('MM')) - 1
  const day = Number(moment(date).format('DD'))

  return (
    <DateScheduleListContainerStyle.container
      ref={_container}
      style={{
        paddingTop: isMobile ? '2.8rem' : '2.063rem',
        paddingBottom: isMobile ? '7rem' : undefined,
      }}>
      <div
        ref={_label}
        onClick={() => onClickTitle(date)}
        style={{
          ...DateScheduleListContainerStyle.date,
          ...topLabelStyle,
        }}>
        {t('calendar.yearMonth', {
          year,
          month: t(`calendar.${Months[month]}`),
        }) +
          ` ${
            day < 4
              ? t(`calendar.day${day}`, { day })
              : t('calendar.day', { day })
          }`}
      </div>
      <Box
        id="channel"
        refObj={_header}
        direction="horizontal"
        onClick={onClickHeader}
        style={{
          ...DateScheduleListContainerStyle.date,
          ...DateScheduleListContainerStyle.sectionTitle,
          ...headerLabelStyle,
        }}>
        {headerContent}
      </Box>
      <Box
        direction="horizontal"
        onClick={onClickChannelShow}
        style={DateScheduleListContainerStyle.sectionTitle}
      />
      {showChannelList && (
        <DueScheduleList<TestIconDataType>
          dataList={channels}
          type="channel"
          onClick={onClickChannel}
        />
      )}
      <Box
        refObj={_schedule}
        direction="horizontal"
        onClick={onClickScheduleShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <Text value={t('calendar.schedule')} />
        <Icon
          style={DateScheduleListContainerStyle.toggle}
          icon={showScheduleList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showScheduleList && (
        <DueScheduleList<TestDataType>
          dataList={schedules}
          type="schedule"
          onClick={onClickSchedule}
        />
      )}
      <Box
        refObj={_card}
        direction="horizontal"
        onClick={onClickCardShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <Text value={t('calendar.card')} />
        <Icon
          style={DateScheduleListContainerStyle.toggle}
          icon={showCardList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showCardList && (
        <DueScheduleList<TestIconDataType>
          dataList={cards}
          type="card"
          onClick={onClickCard}
        />
      )}
      <Box
        refObj={_todo}
        direction="horizontal"
        onClick={onClickTodoShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <Text value={t('calendar.todo')} />
        <Icon
          style={DateScheduleListContainerStyle.toggle}
          icon={showTodoList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showTodoList && (
        <DueScheduleList<TestIconDataType>
          dataList={todos}
          type="todo"
          onClick={onClickTodo}
        />
      )}
    </DateScheduleListContainerStyle.container>
  )
}
