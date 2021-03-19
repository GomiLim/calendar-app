import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Thumbnail from '../../foundations/Thumbnail'
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

  const trimName = (name?: string) => {
    if (!name) return ''

    const maxLen = 13

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
    <ScheduleItemStyle.container onClick={() => onClick(data)}>
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
        <div style={{ ...ScheduleItemStyle.top, marginTop: '0.5rem' }}>
          <div style={ScheduleItemStyle.mainLabelArea}>
            <div style={ScheduleItemStyle.label}>{trimName(data.name)}</div>
          </div>
          <ScheduleItemStyle.thumbnailList>
            {data.members &&
              (data.members.length > 2 ? (
                <>
                  <Thumbnail
                    email={data.members[0].email}
                    style={ScheduleItemStyle.thumbnail}
                  />
                  <ScheduleItemStyle.thumbnailMore>
                    {`+${data.members.length - 1}`}
                  </ScheduleItemStyle.thumbnailMore>
                </>
              ) : (
                data.members.map((member) => (
                  <Thumbnail
                    key={member.no}
                    email={member.email}
                    style={ScheduleItemStyle.thumbnail}
                  />
                ))
              ))}
          </ScheduleItemStyle.thumbnailList>
        </div>
      </div>
    </ScheduleItemStyle.container>
  )
}
