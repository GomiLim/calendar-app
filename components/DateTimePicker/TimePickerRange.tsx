import React from 'react'
import TimePicker from '../../foundations/TimePicker'
import TimePickerRangeStyle from '../../styles/components/DateTimePicker/TimePickerRangeStyle'

type Props = {
  value?: string[]
  date?: Date | Array<Date | undefined>
  onChange: (value: Array<string | undefined>) => void
  clearIcons?: string[]
  timeRange: boolean
}

export default function TimePickerRange({
  value,
  date,
  onChange,
  clearIcons,
  timeRange,
}: Props) {
  const onTimeChange = (time?: string, id?: 'start' | 'end') => {
    if (!id) return
    if (value) {
      if (id === 'start') {
        onChange([time, value[1]])
      } else {
        onChange([value[0], time])
      }
      if (timeRange && !!time) {
        if (id === 'start') {
          if (
            !!value[1] &&
            Number(time.replace(':', '')) > Number(value[1].replace(':', ''))
          ) {
            onChange([time, time])
          }
        } else {
          if (
            !!value[0] &&
            Number(time.replace(':', '')) < Number(value[0].replace(':', ''))
          ) {
            onChange([time, time])
          }
        }
      }
    } else {
      if (id === 'start') {
        onChange([time, undefined])
      } else {
        onChange([undefined, time])
      }
    }
  }

  const removingStyle: React.CSSProperties = {
    position: 'unset' as const,
    bottom: 0,
  }

  return (
    <TimePickerRangeStyle.container>
      <TimePicker
        key="start"
        id="start"
        value={value ? value[0] || value[1] : undefined}
        date={date ? (Array.isArray(date) ? date[0] : date) : undefined}
        onChange={onTimeChange}
        style={{ ...removingStyle, marginLeft: '5%' }}
        clearIcon={clearIcons ? clearIcons[0] : undefined}
      />
      <TimePicker
        key="end"
        id="end"
        value={value ? value[1] || value[0] : undefined}
        date={date ? (Array.isArray(date) ? date[1] : date) : undefined}
        onChange={onTimeChange}
        style={{ ...removingStyle, marginLeft: 0, marginRight: '5%' }}
        clearIcon={clearIcons ? clearIcons[1] : undefined}
      />
    </TimePickerRangeStyle.container>
  )
}
