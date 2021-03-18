import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TestDataType } from '../../pages/api/testScheduleData'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import { Icons } from '../../utils/types'

interface Props {
  data: TestDataType
  onClick: (data: TestDataType) => void
}

export default function ScheduleItem({ data, onClick }: Props) {
  const { t } = useTranslation()

  const trimName = (top: boolean, name?: string) => {
    if (!name) return ''

    const maxLen = top ? 13 : 15

    return name.length > maxLen ? (
      <>
        {name.substr(0, maxLen)}
        <i className={Icons.MORE} />
      </>
    ) : (
      name
    )
  }

  return (
    <ScheduleItemStyle.container>
      <div
        style={{
          ...ScheduleItemStyle.color,
          backgroundColor: data.channel.color,
          opacity: data.type === 'main' ? 1 : 0.3,
        }}>
        {t(`calendar.${data.type}Schedule`)}
      </div>
      <div style={ScheduleItemStyle.infoContainer}>
        <div style={ScheduleItemStyle.top}>
          <div style={ScheduleItemStyle.mainLabel}>
            {trimName(true, `#${data.channel.name} > ${data.writerName}`)}
          </div>
          <div style={ScheduleItemStyle.schedule}>
            {moment(data.startDate)
              .format('YY.MM.DD HH:mm')
              .replace(' 00:00', '') +
              (data.endDate &&
              moment(data.startDate).format('YYYYMMDDHHmm') !==
                moment(data.endDate).format('YYYYMMDDHHmm')
                ? `~${moment(data.endDate)
                    .format('YY.MM.DD HH:mm')
                    .replace(' 00:00', '')}`
                : '')}
          </div>
        </div>
        <div style={ScheduleItemStyle.mainLabelArea}>
          <div style={ScheduleItemStyle.label}>
            {trimName(false, data.name)}
          </div>
        </div>
        {data.type === 'sub' && (
          <div style={ScheduleItemStyle.bottomLabel}>
            {trimName(true, data.parentName)}
          </div>
        )}
      </div>
    </ScheduleItemStyle.container>
  )
}
