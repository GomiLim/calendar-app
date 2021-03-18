import moment from 'moment'
import React from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import Box from '../../foundations/Box'
import Button from '../../foundations/Button'
import Icon from '../../foundations/Icon'
import Text from '../../foundations/Text'
import { loadingState } from '../../recoil'
import CalendarContainerStyle from '../../styles/components/Calendar/CalendarContainerStyle'
import theme from '../../styles/theme'
import * as helper from '../../utils/helpers'
import { useIsMounted } from '../../utils/hooks'
import { Days, Months } from '../../utils/i18n'
import { Icons } from '../../utils/types'
import DateTimePicker from '../DateTimePicker'
import CalendarDateContainer from './CalendarDateContainer'

const createDayLabels = (startDay: number, t: TFunction<string>) => {
  const DayList: React.ReactNode[] = []

  let dayCount = 0
  for (let dayNum: number = startDay; dayNum < 7; dayNum++) {
    DayList.push(
      <Box
        key={Days[dayNum]}
        direction="horizontal"
        style={CalendarContainerStyle.dayHeader}>
        <Text
          value={t(`calendar.${Days[dayNum]}`)}
          style={
            {
              ...CalendarContainerStyle.day,
              color:
                dayNum === 0 || dayNum === 6
                  ? theme.palette.main.red
                  : theme.palette.mono.darkGray,
            } as React.CSSProperties
          }
        />
      </Box>,
    )

    dayCount++
    if (dayCount === 7) {
      break
    } else if (dayNum === 6 && dayCount < 7) {
      dayNum = -1
    }
  }

  return DayList
}

interface Props {
  baseDate: Date
  onChangeMonth: (date: Date) => void
  chosenDate?: Date
  onClick: (date: Date, doubleClicked?: boolean) => void
  onDoubleClickSchedule: (scheduleNo: number) => void
  startDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export default function Calendar({
  baseDate,
  onChangeMonth,
  chosenDate,
  onClick,
  onDoubleClickSchedule,
  startDay = 0,
}: Props) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const [year, setYear] = React.useState(
    Number(moment(new Date()).format('YYYY')),
  )
  const [month, setMonth] = React.useState(
    Number(moment(new Date()).format('MM')),
  )
  const [yearMonth, setYearMonth] = React.useState(
    moment(new Date()).format('YYYYMM'),
  )
  const [showYearMonthModal, setShowYearMonthModal] = React.useState(false)
  const [actionProcessing, setActionProcessing] = React.useState(false)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (baseDate) {
        setYear(() => Number(moment(baseDate).format('YYYY')))
        setMonth(() => Number(moment(baseDate).format('MM')))
      }
      setLoading(() => false)
    }
  }, [isMounted, baseDate])

  React.useEffect(() => {
    if (isMounted()) {
      if (yearMonth.substr(4, 2) === helper.makeTwoDigits(month)) return

      setYearMonth(() => String(year) + helper.makeTwoDigits(month))
    }
  }, [isMounted, year, month, helper.makeTwoDigits, yearMonth])

  const DayList = React.useMemo(() => createDayLabels(startDay, t), [
    startDay,
    t,
  ])

  const onChange = (increment: boolean) => {
    setActionProcessing(true)

    let changingYear = year
    let changingMonth = month

    if (month === 1) {
      if (increment) {
        changingMonth++
      } else {
        changingYear--
        changingMonth = 12
      }
    } else if (month === 12) {
      if (increment) {
        changingYear++
        changingMonth = 1
      } else {
        changingMonth--
      }
    } else {
      if (increment) {
        changingMonth++
      } else {
        changingMonth--
      }
    }
    onChangeMonth(new Date(changingYear, changingMonth - 1, 1))
  }

  const onSelect = (date?: Date | Array<Date | undefined>) => {
    if (date && !Array.isArray(date)) {
      setYear(Number(moment(date).format('YYYY')))
      setMonth(Number(moment(date).format('MM')))
      setShowYearMonthModal(false)
    }
  }

  const onRangeSelect = (range: Date[]) => {
    console.log('RANGE1!!!!!', range)
  }

  return (
    <CalendarContainerStyle.container>
      <div style={CalendarContainerStyle.header}>
        <Box direction="horizontal" style={CalendarContainerStyle.headerTop}>
          <div style={CalendarContainerStyle.pickerModal}>
            <DateTimePicker
              date={new Date(year, month - 1, 1)}
              changeDate={onSelect}
              isOpen={showYearMonthModal}
              datePick={false}
            />
          </div>
          <Box
            direction="horizontal"
            style={CalendarContainerStyle.headerTopSub}>
            <Icon
              icon={Icons.ANGLE_LEFT}
              onClick={() => onChange(false)}
              style={CalendarContainerStyle.topItem}
            />
            <Button
              value={t('calendar.yearMonth', {
                year,
                month: t(`calendar.${Months[month - 1]}`),
              })}
              style={CalendarContainerStyle.topItem}
              onClick={() => setShowYearMonthModal(true)}
            />
            <Icon
              icon={Icons.ANGLE_RIGHT}
              onClick={() => onChange(true)}
              style={CalendarContainerStyle.topItem}
            />
          </Box>
        </Box>
        <Box direction="horizontal" style={CalendarContainerStyle.dayContainer}>
          {DayList}
        </Box>
      </div>
      <div style={CalendarContainerStyle.dateContainer}>
        <CalendarDateContainer
          startDay={startDay}
          onChangeMonth={onChangeMonth}
          chosenDate={chosenDate}
          yearMonth={yearMonth}
          onClick={onClick}
          onDoubleClickSchedule={onDoubleClickSchedule}
          onRangeSelect={onRangeSelect}
          actionProcessing={actionProcessing}
          setActionProcessing={setActionProcessing}
        />
      </div>
    </CalendarContainerStyle.container>
  )
}
