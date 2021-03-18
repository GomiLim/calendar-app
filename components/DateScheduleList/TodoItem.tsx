import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TestIconDataType } from '../../pages/api/testScheduleData'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import { Icons } from '../../utils/types'

interface Props {
  data: TestIconDataType
  onClick: (data: TestIconDataType) => void
}

export default function TodoItem({ data, onClick }: Props) {
  const { t } = useTranslation()

  const trimName = (top: boolean, name?: string) => {
    if (!name) return ''

    const maxLen = top ? 13 : 10

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
      <i
        style={{ fontSize: '1.5rem', margin: '0.5rem' }}
        className={`xi-${data.done ? 'check-square-o' : 'checkbox-blank'}`}
      />
      <div
        style={{
          ...ScheduleItemStyle.infoContainer,
          display: 'flex' as const,
          justifyContent: 'space-between' as const,
          alignItems: 'center' as const,
        }}>
        <div style={{ maxWidth: 'calc(100% - 4.8rem)' }}>
          <div style={ScheduleItemStyle.mainLabel}>
            {trimName(
              true,
              `#${data?.channel?.name || ''} > ${data.cardName || ''}`,
            )}
          </div>
          <div style={ScheduleItemStyle.mainLabelArea}>
            <div style={ScheduleItemStyle.label}>
              {trimName(false, data.name)}
            </div>
          </div>
        </div>
        <i
          style={{ fontSize: '1rem', margin: '0.4rem' }}
          className="xi-ellipsis-h"
        />
      </div>
    </ScheduleItemStyle.container>
  )
}
