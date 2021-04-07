import moment from 'moment'
import dynamic from 'next/dynamic'
import React from 'react'
import { Detail, ViewCallbackProperties } from 'react-calendar'
import { DatePickerProps } from 'react-date-picker'
import { useTranslation } from 'react-i18next'
import Button from '../../foundations/Button'
import TimePicker from '../../foundations/TimePicker'
import DateTimePickerStyle from '../../styles/components/DateTimePicker/DateTimePickerStyle'
import theme from '../../styles/theme'
import * as helper from '../../utils/helpers'
import { useIsMounted } from '../../utils/hooks'
import { Icons } from '../../utils/types'
import TimePickerRange from './TimePickerRange'

interface Props {
  date?: Date | Array<Date | undefined>
  changeDate:
    | ((date?: Date | Array<Date | undefined>) => void)
    | React.Dispatch<
        React.SetStateAction<Date | Array<Date | undefined> | undefined>
      >
  isOpen: boolean
  selectRange?: boolean
  timeRange?: boolean
  timeDisplay?: boolean
  maxDate?: Date
  minDate?: Date
  calculatedTop?: string
  calculatedLeft?: string
  datePick?: boolean
}

export default function DateTimePicker({
  date, // 날짜 값
  changeDate, // 날짜 변경 callback
  isOpen, // 활성화 여부
  selectRange = false, // 기간 선택 여부
  timeDisplay = false, // 시간 선택 여부
  timeRange = false, // 시간 범위 선택 여부
  maxDate, // 최대 선택 가능 날짜
  minDate, // 최소 선택 가능 날짜
  calculatedTop, // 화면상의 컴포넌트 표시 x-axis
  calculatedLeft, // 화면상의 컴포넌트 표시 y-axis
  datePick = true, // 일자 선택 가능 여부(false면, 월 선택)
}: Props) {
  const { t } = useTranslation()

  // 세기/년/월/일 선택 화면 중, 기본화면 모드
  const [viewMode, setViewMode] = React.useState<Detail>(
    datePick ? 'month' : 'year',
  )
  // 표시영역 높이
  const [containerHeight, setContainerHeight] = React.useState<string>(
    timeDisplay ? '29.375rem' : selectRange ? '26.25rem' : '21.875rem',
  )
  // 실제 사용 값
  const [value, setValue] = React.useState<
    Date | Array<Date | undefined> | undefined
  >()
  // 시간 선택 여부
  const [timeSelect, setTimeSelect] = React.useState<boolean | Array<boolean>>(
    selectRange ? [false, false] : false,
  )
  // 시간 값
  const [timeValue, setTimeValue] = React.useState<
    string | Array<string | undefined> | undefined
  >()
  // nextJS에서 사용 시, react-date-picker 라이브러리 내 global CSS 규칙을 어기는 css import가 있어서 사용
  const [DatePicker, setDatePicker] = React.useState<
    React.ComponentType<DatePickerProps> | undefined
  >()

  const isMounted = useIsMounted()

  React.useEffect(() => {
    setDatePicker(dynamic(() => import('react-date-picker')))
  }, [])

  // prop으로 받아온 날짜 값을 세팅
  React.useEffect(() => {
    if (isMounted()) {
      setViewMode(() => (datePick ? 'month' : 'year'))

      const initialize = () => {
        setValue(() => undefined)
        setTimeSelect(() => false)
        setTimeValue(() => undefined)
      }

      if (date) {
        if (Array.isArray(date)) {
          const momentDt = [
            (date as Date[])[0] ? moment((date as Date[])[0]) : undefined,
            (date as Date[])[1] ? moment((date as Date[])[1]) : undefined,
          ]

          if (!!momentDt[0] && !!momentDt[1]) {
            initialize()
          } else if (!momentDt[0] || !momentDt[1]) {
            setValue(() =>
              momentDt[0] ? momentDt[0].toDate() : momentDt[1]?.toDate(),
            )
            setTimeSelect(() =>
              momentDt[0]
                ? momentDt[0].format('HH:mm') !== '00:00'
                : momentDt[1]?.format('HH:mm') !== '00:00',
            )
            setTimeValue(() =>
              momentDt[0]
                ? momentDt[0].format('HH:mm') === '00:00'
                  ? undefined
                  : momentDt[0].format('HH:mm')
                : momentDt[1]?.format('HH:mm') === '00:00'
                ? undefined
                : momentDt[1]?.format('HH:mm'),
            )
          } else {
            setValue(() => [
              momentDt[0] ? momentDt[0].toDate() : undefined,
              momentDt[1] ? momentDt[1].toDate() : undefined,
            ])
            setTimeSelect(() => [
              !momentDt[0] || momentDt[0].format('HH:mm') !== '00:00',
              !momentDt[1] || momentDt[1].format('HH:mm') !== '00:00',
            ])
            setTimeValue(() => [
              !momentDt[0] || momentDt[0].format('HH:mm') === '00:00'
                ? undefined
                : momentDt[0].format('HH:mm'),
              !momentDt[1] || momentDt[1].format('HH:mm') === '00:00'
                ? undefined
                : momentDt[1].format('HH:mm'),
            ])
          }
        } else {
          const momentDt = moment(date)

          setValue(() => momentDt.toDate())
          setTimeSelect(() => momentDt.format('HH:mm') !== '00:00')
          setTimeValue(() =>
            momentDt.format('HH:mm') === '00:00'
              ? undefined
              : momentDt.format('HH:mm'),
          )
        }
      } else {
        initialize()
      }
    }
  }, [isMounted, isOpen, date, datePick, selectRange])

  // 세기/년/월/일 선택 화면 변경 시 css 레이아웃 조정
  React.useEffect(() => {
    if (isMounted()) {
      switch (viewMode) {
        case 'month':
          setContainerHeight(() =>
            timeDisplay ? '29.375rem' : selectRange ? '26.25rem' : '21.875rem',
          )
          break
        case 'century':
          setContainerHeight(() =>
            timeDisplay ? '35.625rem' : selectRange ? '32.5rem' : '28.125rem',
          )
          break
        default:
          setContainerHeight(() =>
            timeDisplay ? '31.25rem' : selectRange ? '28.125rem' : '23.75rem',
          )
          break
      }
    }
  }, [isMounted, viewMode, timeDisplay])

  const onViewChange = (props: ViewCallbackProperties) => {
    // eslint-disable-next-line react/prop-types
    if (!datePick && props.view === 'month') return

    // eslint-disable-next-line react/prop-types
    setViewMode(props.view)
  }

  // 일자 선택 시, 설정값에 따라 날짜 선택 컴포넌트 표출여부 설정
  const onClickDay = (pickedDate: Date) => {
    if (!selectRange && !timeRange) return

    if (Array.isArray(value) || value === undefined) {
      setValue(pickedDate)
      setTimeSelect(false)
      setTimeValue(undefined)
    } else if (selectRange) {
      if (
        Number(moment(pickedDate).format('YYYYMMDD')) <
        Number(moment(value).format('YYYYMMDD'))
      ) {
        setValue([pickedDate, value])
        setTimeSelect([false, timeSelect as boolean])
        setTimeValue([undefined, timeValue as string])
      } else {
        setValue([value, pickedDate])
        setTimeSelect([timeSelect as boolean, false])
        setTimeValue([timeValue as string, undefined])
      }
    } else if (timeRange) {
      setValue(pickedDate)
      setTimeSelect([false, false])
      setTimeValue([undefined, undefined])
    }
  }

  // 날짜 변경 이벤트
  const onDateChange = (pickedDate: Date | Date[]) => {
    if (selectRange || timeRange) return

    setValue(pickedDate)
  }

  // 시간 변경 이벤트
  const onTimeChange = (pickedTime?: string) => {
    setTimeValue(pickedTime)
    setTimeSelect(!!pickedTime)

    const dtStr = helper.dateValidator(
      moment(value as Date).format('YYYY.MM.DD'),
    )
    if (dtStr) {
      const newDate = helper.convertToDate(
        moment(dtStr).format('YYYY-MM-DD') +
          (pickedTime ? ` ${pickedTime}:00` : ' 00:00:00'),
      )

      if (newDate) {
        setValue(newDate)
      }
    }
  }

  // 시간 범위 변경 이벤트
  const onTimeRangeChange = (pickedTime: Array<string | undefined>) => {
    setTimeValue(pickedTime)
    setTimeSelect([!!pickedTime[0], !!pickedTime[1]])
    if (timeRange && !Array.isArray(value)) {
      const result = [
        helper.convertToDate(
          moment(value).format('YYYY-MM-DD') +
            (pickedTime[0] ? ` ${pickedTime[0]}:00` : ' 00:00:00'),
        ),
        helper.convertToDate(
          moment(value).format('YYYY-MM-DD') +
            (pickedTime[1] ? ` ${pickedTime[1]}:00` : ' 00:00:00'),
        ),
      ]
      if (result.some((r) => r === null)) return

      setValue(result as Date[])
    }
  }

  // 해당 컴포넌트 내 설정된 값 변경 후에 데이터 가공
  const onChange = (pickedDate?: Date | Array<Date | undefined>) => {
    let newDate: Date | Array<Date | undefined> | undefined

    if (selectRange || timeRange) {
      if (timeDisplay) {
        if (Array.isArray(timeValue)) {
          newDate = Array.isArray(pickedDate)
            ? [
                pickedDate[0]
                  ? helper.convertToDate(
                      moment(pickedDate[0]).format('YYYY-MM-DD') +
                        (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                    ) || undefined
                  : undefined,
                pickedDate[1]
                  ? helper.convertToDate(
                      moment(pickedDate[1]).format('YYYY-MM-DD') +
                        (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                    ) || undefined
                  : undefined,
              ]
            : pickedDate
            ? timeRange
              ? [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                  ) || undefined,
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                  ) || undefined,
                ]
              : [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ) || undefined,
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ) || undefined,
                ]
            : undefined
        } else {
          newDate = Array.isArray(pickedDate)
            ? [
                pickedDate[0]
                  ? helper.convertToDate(
                      moment(pickedDate[0]).format('YYYY-MM-DD') +
                        (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                    ) || undefined
                  : undefined,
                pickedDate[1]
                  ? helper.convertToDate(
                      moment(pickedDate[1]).format('YYYY-MM-DD') +
                        (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                    ) || undefined
                  : undefined,
              ]
            : pickedDate
            ? timeRange
              ? [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  ) || undefined,
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  ) || undefined,
                ]
              : [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ) || undefined,
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ) || undefined,
                ]
            : undefined
        }
      } else {
        newDate = [
          helper.convertToDate(
            moment(
              Array.isArray(pickedDate)
                ? pickedDate[0] || pickedDate[1]
                : pickedDate,
            ).format('YYYY-MM-DD') + ' 00:00:00',
          ) || undefined,
          helper.convertToDate(
            moment(
              Array.isArray(pickedDate)
                ? pickedDate[1] || pickedDate[0]
                : pickedDate,
            ).format('YYYY-MM-DD') + ' 00:00:00',
          ) || undefined,
        ]
      }
    } else {
      newDate = pickedDate
        ? helper.convertToDate(
            moment(pickedDate as Date).format('YYYY-MM-DD') +
              (timeValue ? ` ${timeValue as string}:00` : ' 00:00:00'),
          ) || undefined
        : undefined
    }
    setValue(newDate)

    return newDate
  }

  // 해당 컴포넌트 종료 시에 callback 호출
  const onCalendarClose = () => {
    if (!selectRange && !timeDisplay) {
      if (!value && !date) {
        changeDate(undefined)
      } else if (
        moment(value as Date).format('YYYY-MM-DD') !==
        moment(date as Date).format('YYYY-MM-DD')
      ) {
        changeDate(onChange(value))
      }
    }
  }

  // 컴포넌트 영역 외부 클릭 시, 종료
  const onClickExterior = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    changeDate(date)
  }

  // 월 선택 이벤트
  const onClickMonth = (date: Date) => {
    setValue(date)
    changeDate(date)
  }

  return (
    <>
      <DateTimePickerStyle.exterior
        onClick={onClickExterior}
        style={{
          display: isOpen ? 'block' : 'none',
          height: `calc(1000% + ${calculatedTop || '0.063rem'})`,
        }}
      />
      <DateTimePickerStyle.container
        style={{
          display: isOpen ? 'block' : 'none',
          height: containerHeight,
          top: calculatedTop,
          left: calculatedLeft,
        }}>
        {DatePicker && (
          <DatePicker
            onClickDay={onClickDay}
            onChange={onDateChange}
            value={
              !!value && Array.isArray(value) && !value[1]
                ? undefined
                : (value as Date | Date[] | undefined)
            }
            required={true}
            yearPlaceholder="YYYY"
            monthPlaceholder="MM"
            dayPlaceholder="DD"
            format="yyyy.MM.dd"
            maxDate={maxDate}
            minDate={minDate}
            isOpen={isOpen}
            onCalendarClose={onCalendarClose}
            selectRange={selectRange}
            onClickMonth={datePick ? undefined : onClickMonth}
            onViewChange={onViewChange}
            view={viewMode}
            defaultView={datePick ? undefined : 'year'}
            calendarType="US"
          />
        )}
        {timeDisplay &&
          isOpen &&
          ((selectRange && Array.isArray(value)) || timeRange ? (
            <TimePickerRange
              value={timeValue as string[] | undefined}
              date={value}
              onChange={onTimeRangeChange}
              clearIcons={[
                (timeSelect as boolean[])[0]
                  ? Icons.RADIO_CHECKED
                  : Icons.RADIO_BLANK,
                (timeSelect as boolean[])[1]
                  ? Icons.RADIO_CHECKED
                  : Icons.RADIO_BLANK,
              ]}
              timeRange={timeRange}
            />
          ) : (
            <TimePicker
              value={timeValue as string | undefined}
              date={value as Date | undefined}
              onChange={onTimeChange}
              clearIcon={
                (timeSelect as boolean)
                  ? Icons.RADIO_CHECKED
                  : Icons.RADIO_BLANK
              }
            />
          ))}
        {(timeDisplay || selectRange) && (
          <Button
            value={t('datetime.ok')}
            onClick={() => changeDate(onChange(value))}
            style={{
              position: 'absolute' as const,
              bottom: '1.25rem',
              color: theme.palette.mono.white,
              backgroundColor: theme.palette.main.blue,
              padding: '0.313rem',
              minWidth: '3.125rem',
              left: '40%',
            }}
          />
        )}
      </DateTimePickerStyle.container>
    </>
  )
}
