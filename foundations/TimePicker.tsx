import moment from 'moment'
import { default as TmPicker } from 'rc-time-picker'
import React from 'react'
import TimePickerStyle from '../styles/foundations/TimePickerStyle'
import theme from '../styles/theme'
import Text from './Text'

type Props = {
  id?: 'start' | 'end'
  value?: string
  date?: Date
  onChange: (time?: string, id?: 'start' | 'end') => void
  style?: React.CSSProperties
  clearIcon?: string
}

export default function TimePicker({
  id,
  value,
  date,
  onChange,
  style,
  clearIcon,
}: Props) {
  const onOpen = () => {
    onChange(value ? value : '00:00', id)
  }

  const onTimeChange = (e: moment.Moment) => {
    if (e === null) {
      onChange(undefined, id)
      return
    }
    if (!e.isValid()) return

    onChange(e === null ? undefined : e.format('HH:mm'), id)
  }

  const clickedClear = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!date) return

    onChange(value ? undefined : '00:00', id)
  }

  const iconClear = (
    <i
      className={clearIcon}
      style={{
        color: '#3067A8',
        width: '1.25rem',
        height: '1.25rem',
        fontSize: '0.875rem',
        position: 'absolute' as const,
        bottom: value ? '0.125rem' : '0.5rem',
        left: value
          ? id === 'end'
            ? '0.406rem'
            : '0.344rem'
          : (id ? (id === 'start' ? '1.563rem' : '9.5rem') : undefined) ||
            '0.688rem',
      }}
      onClick={clickedClear}
    />
  )

  return (
    <TimePickerStyle.container style={style}>
      <Text
        value={date ? moment(date).format('YYYY/MM/DD') : ''}
        style={{ width: '5.625rem', ...theme.font.text2 }}
      />
      <TimePickerStyle.picker>
        <TmPicker
          value={
            value
              ? moment(moment(new Date()).format('YYYY-MM-DD') + ` ${value}:00`)
              : undefined
          }
          showSecond={false}
          onOpen={onOpen}
          onChange={onTimeChange}
          className="time-picker"
          format={'HH:mm'}
          use12Hours={false}
          inputReadOnly
          clearIcon={iconClear}
          disabled={!date}
        />
        {!value && iconClear}
      </TimePickerStyle.picker>
    </TimePickerStyle.container>
  )
}
