import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TestIconDataType } from '../../pages/api/testScheduleData'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import theme from '../../styles/theme'
import { Icons } from '../../utils/types'

interface Props {
  type: string
  data: TestIconDataType
  onClick: (data: TestIconDataType) => void
}

export default function CardItem({ type, data, onClick }: Props) {
  const { t } = useTranslation()

  const trimName = (top: boolean, name?: string) => {
    if (!name) return ''

    const maxLen = top ? 13 : 25

    return name.length > maxLen ? (
      <>
        {name.substr(0, maxLen)}
        <i className={Icons.MORE} />
      </>
    ) : (
      name
    )
  }

  const calculateTimeDiff = (modTime?: Date) => {
    if (!modTime) return t('calendar.minute', { minute: 0 })

    const ago = Math.floor(
      moment.duration(moment(new Date()).diff(moment(modTime))).asMinutes(),
    )
    const hour = Math.floor(ago / 60)
    const minute = ago % 60

    if (hour > 0 && minute > 0) {
      return `${t('calendar.hour', { hour })} ${t('calendar.minute', {
        minute,
      })}`
    } else if (hour > 0) {
      return t('calendar.hour', { hour })
    } else {
      return t('calendar.minute', { minute })
    }
  }

  return (
    <ScheduleItemStyle.container>
      <div
        style={{
          ...ScheduleItemStyle.color,
          backgroundColor: data.color || theme.palette.mono.gray,
        }}
      />
      <div style={ScheduleItemStyle.infoContainer}>
        <div style={ScheduleItemStyle.top}>
          <div style={ScheduleItemStyle.mainLabel}>
            {trimName(
              true,
              `#${data?.channel?.name || ''} > ${data.writerName || ''}`,
            )}
          </div>
          <div style={ScheduleItemStyle.schedule}>
            {t('calendar.dueto', {
              date: moment(data.date)
                .format('YY.MM.DD HH:mm')
                .replace(' 00:00', ''),
            })}
          </div>
        </div>
        <div style={ScheduleItemStyle.mainLabelArea}>
          <div style={ScheduleItemStyle.label}>
            {trimName(false, data.name)}
          </div>
        </div>
      </div>
    </ScheduleItemStyle.container>
  )
}
