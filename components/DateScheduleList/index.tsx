import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import Box from '../../foundations/Box'
import Icon from '../../foundations/Icon'
import Text from '../../foundations/Text'
import { filterState, iconDataState, loadingState } from '../../recoil'
import DateScheduleListContainerStyle from '../../styles/components/DateScheduleList/DateScheduleListContainerStyle'
import theme from '../../styles/theme'
import Swipe from '../../utils/helpers/swiper'
import * as hook from '../../utils/hooks'
import { Months } from '../../utils/i18n'
import {
  FilterType,
  Icons,
  TestDataType,
  TestIconDataType,
} from '../../utils/types'
import DueScheduleList from './DueScheduleList'

const returnIdByFilterShow = (filter: FilterType) => {
  return filter.channel.show
    ? 'channel'
    : filter.schedule.show
    ? 'schedule'
    : filter.card.show
    ? 'card'
    : filter.todo.show
    ? 'todo'
    : ''
}

interface Props {
  isMobile: boolean
  date: Date
  schedules: TestDataType[]
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
  onClickTitle: (date: Date) => void
}

export default function DateScheduleList({
  isMobile, // 사용 디바이스 모바일 여부
  date, // 선택된 날짜
  schedules, // 일정 데이터
  channels, // 채널 데이터
  cards, // 카드 데이터
  todos, // 할일 데이터
  onClickTitle, // 최상단 라벨 클릭 callback
}: Props) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)
  const setIconsRaw = Recoil.useSetRecoilState(iconDataState)
  const filter = Recoil.useRecoilValue(filterState)

  const _container: React.RefObject<HTMLDivElement> = React.createRef()
  const _label: React.RefObject<HTMLDivElement> = React.createRef()
  const _header: React.RefObject<HTMLDivElement> = React.createRef()
  const _channel: React.RefObject<HTMLDivElement> = React.createRef()
  const _schedule: React.RefObject<HTMLDivElement> = React.createRef()
  const _card: React.RefObject<HTMLDivElement> = React.createRef()
  const _todo: React.RefObject<HTMLDivElement> = React.createRef()

  // 일정 목록 표시 여부
  const [showScheduleList, setShowScheduleList] = React.useState(true)
  // 채널 목록 표시 여부
  const [showChannelList, setShowChannelList] = React.useState(true)
  // 카드 목록 표시 여부
  const [showCardList, setShowCardList] = React.useState(true)
  // 할일 목록 표시 여부
  const [showTodoList, setShowTodoList] = React.useState(true)
  // 사용 디바이스에 따른 최상단 라벨영역 CSS
  const [topLabelStyle, setTopLabelStyle] = React.useState<
    React.CSSProperties | undefined
  >()
  // 사용 디바이스에 따른 상단 고정헤더 영역 CSS
  const [headerLabelStyle, setHeaderLabelStyle] = React.useState<
    React.CSSProperties | undefined
  >()
  // 상단 고정 헤더
  const [headerContent, setHeaderContent] = React.useState<React.ReactNode[]>(
    [],
  )
  // 패널 전체 스크롤 필요 여부
  const [scrollable, setScrollable] = React.useState(false)

  const isMounted = hook.useIsMounted()

  // 검색조건 변경시에 표출 불 필요한 영역 감춤
  React.useEffect(() => {
    if (isMounted()) {
      if (!_header?.current) return

      const id = returnIdByFilterShow(filter)
      if (_header.current.attributes[0].value === id) return

      if (id === '') {
        _header.current.attributes[0].value = ''
        setHeaderContent(() => [])
        return
      }

      _header.current.attributes[0].value = id

      setHeaderContent(() => [
        <Text key={`${id}-text`} value={t(`calendar.${id}`)} />,
        <Icon
          key={`${id}-icon`}
          style={DateScheduleListContainerStyle.toggle}
          icon={
            (
              id === 'channel'
                ? showChannelList
                : id === 'schedule'
                ? showScheduleList
                : id === 'card'
                ? showCardList
                : showTodoList
            )
              ? Icons.ANGLE_UP
              : Icons.ANGLE_DOWN
          }
        />,
      ])
    }
  }, [isMounted, _header?.current, filter])

  // 패널 스크롤 이벤트
  const onScroll = () => {
    if (!isMounted()) return
    if (!_header?.current) return

    if (
      _todo?.current &&
      _todo.current.getBoundingClientRect().top +
        _todo.current.getBoundingClientRect().height / 2 <=
        _header.current.getBoundingClientRect().bottom
    ) {
      _header.current.attributes[0].value = 'todo'
      setHeaderContent(() => [
        <Text key="todo-text" value={t('calendar.todo')} />,
        <Icon
          key="todo-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showTodoList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    } else if (
      _card?.current &&
      _card.current.getBoundingClientRect().top +
        _card.current.getBoundingClientRect().height / 2 <=
        _header.current.getBoundingClientRect().bottom
    ) {
      _header.current.attributes[0].value = 'card'
      setHeaderContent(() => [
        <Text key="card-text" value={t('calendar.card')} />,
        <Icon
          key="card-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showCardList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    } else if (
      _schedule?.current &&
      _schedule.current.getBoundingClientRect().top +
        _schedule.current.getBoundingClientRect().height / 2 <=
        _header.current.getBoundingClientRect().bottom
    ) {
      _header.current.attributes[0].value = 'schedule'
      setHeaderContent(() => [
        <Text key="schedule-text" value={t('calendar.schedule')} />,
        <Icon
          key="schedule-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showScheduleList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    } else if (_channel?.current) {
      _header.current.attributes[0].value = 'channel'
      setHeaderContent(() => [
        <Text key="channel-text" value={t('calendar.channel')} />,
        <Icon
          key="channel-icon"
          style={DateScheduleListContainerStyle.toggle}
          icon={showChannelList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />,
      ])
    }
  }

  // 패널 전체 스크롤 가능 여부 체크
  React.useEffect(() => {
    if (!isMounted()) return
    if (!_container?.current) return

    const scrollEnable =
      _container.current.scrollHeight > _container.current.clientHeight

    setScrollable(() => scrollEnable)
  }, [
    isMounted,
    showChannelList,
    showScheduleList,
    showCardList,
    showTodoList,
    _container,
  ])

  // 스크롤 여부 변경 시 상단 고정 헤더 기본값 세팅
  React.useEffect(() => {
    if (!isMounted()) return
    if (!_container?.current) return
    if (!_header?.current) return
    if (scrollable) return

    const id = returnIdByFilterShow(filter)
    if (id === '') return
    if (_header.current.attributes[0].value === id) return

    _header.current.attributes[0].value = id

    setHeaderContent(() => [
      <Text key={`${id}-text`} value={t(`calendar.${id}`)} />,
      <Icon
        key={`${id}-icon`}
        style={DateScheduleListContainerStyle.toggle}
        icon={
          (
            id === 'channel'
              ? showChannelList
              : id === 'schedule'
              ? showScheduleList
              : id === 'card'
              ? showCardList
              : showTodoList
          )
            ? Icons.ANGLE_UP
            : Icons.ANGLE_DOWN
        }
      />,
    ])
  }, [isMounted, scrollable, _container, _header, filter])

  // 상단 고정 헤더 영역 변경
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

    setTimeout(() => {
      if (_container?.current) {
        _container.current.scrollTo({
          top,
          behavior: 'auto',
        })
      }
    }, 100)
  }

  // 영역별 헤더 클릭 이벤트
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

  // 모바일 최상단 헤더 영역 아래 스와이프 이벤트
  const touch = (el: HTMLDivElement) => {
    const swiper = new Swipe(el)
    swiper.onDown(() => {
      onClickTitle(date)
    })
    swiper.run()
  }

  // 사용 디바이스에 따라 상단 영역들 CSS 세팅
  hook.useLayoutEffect(() => {
    if (!isMounted()) return
    if (!_label?.current) return
    if (typeof window === 'undefined') return

    touch(_label.current)

    if (isMobile) {
      setTopLabelStyle(() => ({
        width: '100%',
        left: 0,
        top: 'unset',
        bottom: 'calc(70% - 2.5rem)',
      }))
      setHeaderLabelStyle(() => ({
        width: '100%',
        left: 0,
        top: 'unset',
        bottom: 'calc(70% - 5rem)',
      }))
    } else {
      setTopLabelStyle(() => ({
        width: 'calc(30% - 0.063rem)',
        left: 'calc(70% + 0.063rem)',
        top: '4.9rem',
        bottom: 'unset',
      }))
      setHeaderLabelStyle(() => ({
        width: 'calc(30% - 0.063rem)',
        left: 'calc(70% + 0.063rem)',
        top: '7.4rem',
        bottom: 'unset',
      }))
    }
  }, [isMounted, _label?.current, isMobile])

  // 스크롤 이벤트 등록
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

  // 일정 클릭 이벤트
  const onClickSchedule = (data: TestDataType) => {
    alert('클릭시 띄울 일정상세 화면이 없어요!')
  }

  // 채널 클릭 이벤트
  const onClickChannel = (data: TestIconDataType) => {
    alert('클릭시 띄울 채널상세 화면이 없어요!')
  }

  // 카드 클릭 이벤트
  const onClickCard = (data: TestIconDataType) => {
    alert('클릭시 띄울 카드상세 화면이 없어요!')
  }

  // 할일 클릭 이벤트
  const onClickTodo = (data: TestIconDataType) => {
    setLoading(true)
    setIconsRaw((iconsRaw) => ({
      ...iconsRaw,
      todos: iconsRaw.todos.map((todo) =>
        todo.no === data.no ? { ...todo, done: !todo.done } : todo,
      ),
    }))
    setLoading(false)
  }

  const year = moment(date).format('YYYY')
  const month = Number(moment(date).format('MM')) - 1
  const day = Number(moment(date).format('DD'))

  return (
    <DateScheduleListContainerStyle.container
      ref={_container}
      style={{
        paddingTop: isMobile ? '2.4rem' : '2.063rem',
        paddingBottom: isMobile ? '7rem' : undefined,
      }}>
      <div
        ref={_label}
        onClick={() => onClickTitle(date)}
        style={{
          ...DateScheduleListContainerStyle.date,
          ...topLabelStyle,
          display: 'flex' as const,
          justifyContent: 'space-between' as const,
          alignItems: 'center' as const,
          padding: '0 0.5rem',
        }}>
        {isMobile ? (
          <div />
        ) : (
          <Icon
            icon={Icons.ANGLE_RIGHT}
            style={{ color: theme.palette.mono.darkGray }}
          />
        )}
        {t('calendar.yearMonth', {
          year,
          month: t(`calendar.${Months[month]}`),
        }) +
          ` ${
            day < 4
              ? t(`calendar.day${day}`, { day })
              : t('calendar.day', { day })
          }`}
        {isMobile ? (
          <Icon
            icon={Icons.ANGLE_DOWN}
            style={{ color: theme.palette.mono.darkGray }}
          />
        ) : (
          <div />
        )}
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
      {filter.channel.show && (
        <>
          <Box
            refObj={_channel}
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
        </>
      )}
      {filter.schedule.show && (
        <>
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
        </>
      )}
      {filter.card.show && (
        <>
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
        </>
      )}
      {filter.todo.show && (
        <>
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
        </>
      )}
    </DateScheduleListContainerStyle.container>
  )
}
