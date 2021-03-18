import moment from 'moment'
import * as polished from 'polished'
import React from 'react'
import Box from '../../foundations/Box'
import Text from '../../foundations/Text'
import CalendarDateStyle from '../../styles/components/Calendar/CalendarDateStyle'
import theme from '../../styles/theme'
import * as helper from '../../utils/helpers'
import { useIsMounted } from '../../utils/hooks'
import { ScheduleStackType } from './CalendarDateContainer'
import CalendarIcons from './CalendarIcons'
import CalendarSchedules, { ScheduleDisplayType } from './CalendarSchedules'

interface Props {
  chosenDate?: Date
  startWeekOffset: number
  edgeOfWeek?: 'start' | 'end'
  day: number
  month: number
  year: number
  holiday?: boolean
  thisMonth?: boolean
  beforeOrAfter?: 'before' | 'after'
  onClick: (date: Date, doubleClicked?: boolean) => void
  onDoubleClickSchedule: (scheduleNo: number) => void
  _date: React.RefObject<HTMLDivElement> | null
  scheduleStack: Array<Array<ScheduleStackType>>
  icons?: {
    endingChannels?: Date[]
    endingCards?: Date[]
    endingTodos?: Date[]
  }
  exteriorWidth?: number
}

export default React.memo(function CalendarDate({
  chosenDate,
  startWeekOffset,
  edgeOfWeek,
  day,
  month,
  year,
  holiday,
  thisMonth = true,
  beforeOrAfter,
  onClick,
  onDoubleClickSchedule,
  _date,
  scheduleStack,
  icons,
  exteriorWidth,
}: Props) {
  const [actualYear, setActualYear] = React.useState(year)
  const [actualMonth, setActualMonth] = React.useState(month)
  const [selected, setSelected] = React.useState(false)
  const [isToday, setIsToday] = React.useState(false)
  const [isWeekend, setIsWeekend] = React.useState(false)
  const [thisWeek, setThisWeek] = React.useState<Date[]>([])
  const [containerWidth, setContainerWidth] = React.useState(0)
  const [calendarSchedules, setCalendarSchedules] = React.useState<
    Array<ScheduleDisplayType | null>
  >([])

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    setActualYear(() =>
      beforeOrAfter
        ? beforeOrAfter === 'before'
          ? !thisMonth
            ? month === 0
              ? year - 1
              : year
            : year
          : !thisMonth
          ? month === 11
            ? year + 1
            : year
          : year
        : year,
    )
    setActualMonth(() =>
      beforeOrAfter
        ? beforeOrAfter === 'before'
          ? !thisMonth
            ? month === 0
              ? 11
              : month - 1
            : month
          : !thisMonth
          ? month === 11
            ? 0
            : month + 1
          : month
        : month,
    )
  }, [isMounted, year, month, day, thisMonth, beforeOrAfter])

  React.useEffect(() => {
    if (!isMounted()) return
    const thisDate = new Date(actualYear, actualMonth, day)
    const thisDay = moment(thisDate).format('YYYYMMDD')
    setIsToday(() => moment(new Date()).format('YYYYMMDD') === thisDay)
    setIsWeekend(() => thisDate.getDay() === 6 || thisDate.getDay() === 0)

    if (!chosenDate) {
      setSelected(() => false)
      return
    }

    setSelected(() => moment(chosenDate).format('YYYYMMDD') === thisDay)
  }, [isMounted, chosenDate, actualYear, actualMonth, day])

  React.useEffect(() => {
    if (!isMounted()) return

    const week: Date[] = []

    for (let i = 0; i < 7; i++) {
      const dt = new Date(actualYear, actualMonth, day)
      dt.setDate(dt.getDate() + startWeekOffset + i)
      week.push(dt)
    }
    setThisWeek(() => week)
  }, [isMounted, actualYear, actualMonth, day, startWeekOffset])

  React.useEffect(() => {
    if (isMounted()) {
      if (typeof window === 'undefined') return

      if (_date?.current) {
        setContainerWidth(() => Number(_date.current?.clientWidth))
      }
    }
  }, [isMounted, _date?.current, exteriorWidth])

  React.useEffect(() => {
    if (!isMounted()) return

    setCalendarSchedules(() =>
      scheduleStack
        // .filter((stack, idx) => idx < 10)
        .map((stack) => {
          const found = stack.find(
            (schedule) =>
              schedule.week ===
              Number(
                String(actualYear) +
                  helper.makeTwoDigits(actualMonth + 1) +
                  helper.makeTwoDigits(day),
              ),
          )
          if (!found) return null

          const stackList = stack.filter((schedule) => schedule.no === found.no)

          const result: Record<string, unknown> = {
            no: found.no,
            week: found.week,
            type: found.mainWeek ? 'main' : 'sub',
            sub: !!found.subNo,
            label:
              !stackList.some(
                (schedule) => schedule.mainWeek && schedule.week < found.week,
              ) ||
              (edgeOfWeek === 'start' && found.outOfThisWeek)
                ? found.label
                : undefined,
            color: found.color,
          }

          if (result.label && thisWeek.length > 0 && containerWidth !== 0) {
            const label = result.label as string

            if (label.length > 10) {
              const wordLen = Math.round(containerWidth / 14)

              const more = stackList.some(
                (schedule) => schedule.mainWeek && schedule.week > found.week,
              )

              if (edgeOfWeek === 'end' || !more) {
                result.label = label.substr(0, wordLen) + '..extra..'
              } else {
                const maxLen =
                  wordLen *
                  stackList.filter(
                    (schedule) =>
                      schedule.mainWeek &&
                      schedule.week >= found.week &&
                      schedule.week <=
                        Math.max(
                          ...thisWeek.map((week) =>
                            Number(moment(week).format('YYYYMMDD')),
                          ),
                        ),
                  ).length

                if (label.length > maxLen) {
                  result.label = label.substr(0, maxLen) + '..extra..'
                }
              }
            }
          }

          if (result.type === 'main') {
            result.start =
              !(edgeOfWeek === 'start' && found.outOfThisWeek) &&
              !stackList.some(
                (schedule) => schedule.mainWeek && schedule.week < found.week,
              )
            result.end =
              !(edgeOfWeek === 'end' && found.outOfThisWeek) &&
              !stackList.some(
                (schedule) => schedule.mainWeek && schedule.week > found.week,
              )
            result.subStart =
              !(edgeOfWeek === 'start' && found.outOfThisWeek) &&
              !stackList.some(
                (schedule) => !schedule.mainWeek && schedule.week < found.week,
              )
            result.subEnd =
              !(edgeOfWeek === 'end' && found.outOfThisWeek) &&
              !stackList.some(
                (schedule) => !schedule.mainWeek && schedule.week > found.week,
              )
          } else {
            result.start =
              !(edgeOfWeek === 'start' && found.outOfThisWeek) &&
              !stackList.some((schedule) => schedule.week < found.week)
            result.end =
              !(edgeOfWeek === 'end' && found.outOfThisWeek) &&
              !stackList.some((schedule) => schedule.week > found.week)
          }

          return result as ScheduleDisplayType
        }),
    )
  }, [
    isMounted,
    scheduleStack,
    actualYear,
    actualMonth,
    day,
    thisWeek,
    containerWidth,
    edgeOfWeek,
  ])

  const onClickDay = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.preventDefault()
    }

    onClick(new Date(actualYear, actualMonth, day))
  }

  const onDoubeClickDay = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.preventDefault()
    }

    onClick(new Date(actualYear, actualMonth, day), true)
  }

  return (
    <Box
      direction="vertical"
      onClick={onClickDay}
      onDoubleClick={onDoubeClickDay}
      className="hover"
      style={{
        ...CalendarDateStyle.container,
        backgroundColor: selected
          ? polished.lighten(
              thisMonth ? 0.3 : 0.35,
              theme.palette.main.turquoise,
            )
          : undefined,
        borderLeft:
          thisWeek.length === 0
            ? undefined
            : helper.compareDate(
                thisWeek[0],
                new Date(actualYear, actualMonth, day),
              )
            ? undefined
            : `0.063rem solid ${theme.palette.mono.paleWhite}`,
      }}
      refObj={_date}
      id={`${actualYear}-${helper.makeTwoDigits(
        actualMonth,
      )}-${helper.makeTwoDigits(day)}${!thisMonth ? ':disabled' : ''}`}>
      <Box direction="horizontal" style={CalendarDateStyle.title}>
        <Text
          value={day === 1 ? `${actualMonth + 1}/${day}` : String(day)}
          style={{
            ...theme.font.sub,
            marginRight: '0.625rem',
            border: 'none' as const,
            borderRadius: '50%',
            padding: '0.363rem 0.313rem 0.313rem 0.313rem',
            width: '1.5rem',
            height: '1.5rem',
            textAlign: 'center' as const,
            backgroundColor: isToday
              ? polished.lighten(thisMonth ? 0 : 0.3, theme.palette.main.red)
              : undefined,
            color: !thisMonth
              ? theme.palette.mono.gray
              : isToday
              ? theme.palette.mono.white
              : !!isWeekend || !!holiday
              ? theme.palette.main.red
              : theme.palette.mono.black,
          }}
        />
      </Box>
      <div
        style={{
          ...CalendarDateStyle.contents,
          opacity: !thisMonth ? 0.2 : undefined,
        }}>
        {scheduleStack.length > 0 && (
          <CalendarSchedules
            schedules={calendarSchedules}
            onClick={onClickDay}
            onDoubleClick={onDoubleClickSchedule}
          />
        )}
      </div>
      <div
        style={{
          ...CalendarDateStyle.contents,
          marginTop: '0.313rem',
          opacity: !thisMonth ? 0.2 : undefined,
          position:
            scheduleStack.length > 0 ? 'relative' : ('absolute' as const),
          left: 0,
          bottom: 0,
        }}>
        {icons && (
          <CalendarIcons
            today={new Date(actualYear, actualMonth, day)}
            endingChannels={icons.endingChannels}
            endingCards={icons.endingCards}
            endingTodos={icons.endingTodos}
          />
        )}
      </div>
    </Box>
  )
})
