import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import CalendarSchedulesStyle from '../../styles/components/Calendar/CalendarSchedulesStyle'
import theme from '../../styles/theme'
import { useClickPreventionOnDoubleClick } from '../../utils/hooks'
import { Icons } from '../../utils/types'

export type ScheduleDisplayType = {
  no: number
  week: number
  type: 'main' | 'sub'
  start?: boolean
  end?: boolean
  sub?: boolean
  subStart?: boolean
  subEnd?: boolean
  label?: string
  color: string
}

interface Props {
  schedules: Array<ScheduleDisplayType | null>
  onClick: () => void
  onDoubleClick: (no: number) => void
}

export default React.memo(function CalendarSchedules({
  schedules,
  onClick,
  onDoubleClick,
}: Props) {
  const { t } = useTranslation()

  let handleClick: (arg?: any) => void = () => {
    onClick()
  }
  let handleDoubleClick: (arg: any) => void = (scheduleNo: number) => {
    onDoubleClick(scheduleNo)
  }

  const [hookedClick, hookedDoubleClick] = useClickPreventionOnDoubleClick(
    handleClick,
    handleDoubleClick,
  )

  handleClick = hookedClick
  handleDoubleClick = hookedDoubleClick

  const maxCount = 10
  const extraCount =
    schedules.length > maxCount
      ? schedules.filter(
          (schedule, idx) => idx >= maxCount && schedule !== null,
        ).length
      : 0

  return (
    <div style={CalendarSchedulesStyle.container}>
      {schedules
        .filter((schedule, idx) => idx <= maxCount)
        .map((schedule, idx) =>
          idx === maxCount && extraCount > 1 ? (
            <Text
              key={'more_' + String(idx)}
              value={t('calendar.moreSchedule', { count: extraCount })}
              style={{
                ...CalendarSchedulesStyle.nullStyle,
                ...theme.font.item1,
                color: theme.palette.mono.darkGray,
                marginLeft: '0.625rem',
              }}
            />
          ) : schedule === null ? (
            <div
              key={'null_' + String(idx)}
              style={CalendarSchedulesStyle.nullStyle}
            />
          ) : schedule.type === 'main' ? (
            <CalendarSchedulesStyle.box
              id={String(schedule.week) + '_' + String(schedule.no)}
              key={String(schedule.week) + '_' + String(schedule.no)}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleClick()
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleDoubleClick(schedule.no)
              }}>
              <div
                style={{
                  ...CalendarSchedulesStyle.sub,
                  margin: 0,
                  position: 'absolute' as const,
                  backgroundColor: schedule.color,
                  display: schedule.sub ? 'flex' : 'none',
                  borderRadius: schedule.subStart
                    ? schedule.subEnd
                      ? '1.875rem'
                      : '1.875rem 0px 0px 1.875rem'
                    : schedule.subEnd
                    ? '0px 1.875rem 1.875rem 0px'
                    : 'unset',
                }}
              />
              <div
                style={{
                  ...CalendarSchedulesStyle.main,
                  margin: 0,
                  position: 'absolute' as const,
                  backgroundColor: schedule.color,
                  borderRadius: schedule.start
                    ? schedule.end
                      ? '1.875rem'
                      : '1.875rem 0px 0px 1.875rem'
                    : schedule.end
                    ? '0px 1.875rem 1.875rem 0px'
                    : 'unset',
                }}
              />
              {schedule.label &&
                (schedule.label.indexOf('..extra..') > -1 ? (
                  <div
                    style={{
                      display: 'flex' as const,
                      justifyContent: 'flex-start' as const,
                      alignItems: 'center' as const,
                      zIndex: 3,
                    }}>
                    <Text
                      value={schedule.label.replace('..extra..', '')}
                      style={CalendarSchedulesStyle.label}
                    />
                    <i className={Icons.MORE} />
                  </div>
                ) : (
                  <Text
                    value={schedule.label}
                    style={CalendarSchedulesStyle.label}
                  />
                ))}
            </CalendarSchedulesStyle.box>
          ) : (
            <CalendarSchedulesStyle.subBox
              id={String(schedule.week) + '_' + String(schedule.no)}
              key={String(schedule.week) + '_' + String(schedule.no)}
              style={{
                ...CalendarSchedulesStyle.sub,
                backgroundColor: schedule.color,
                borderRadius: schedule.start
                  ? schedule.end
                    ? '1.875rem'
                    : '1.875rem 0px 0px 1.875rem'
                  : schedule.end
                  ? '0px 1.875rem 1.875rem 0px'
                  : 'unset',
              }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleClick()
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleDoubleClick(schedule.no)
              }}
            />
          ),
        )}
    </div>
  )
})
