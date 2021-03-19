import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Thumbnail from '../../foundations/Thumbnail'
import { TestDataType } from '../../pages/api/testScheduleData'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import { Icons } from '../../utils/types'

interface Props {
  data: TestDataType
  onClick: (data: TestDataType) => void
}

export default function ScheduleItem({ data, onClick }: Props) {
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
          backgroundColor: data.channel.color,
          opacity: data.type === 'main' ? 1 : 0.3,
        }}>
        {t(`calendar.${data.type}Schedule`)}
      </div>
      <div style={ScheduleItemStyle.infoContainer}>
        <div style={ScheduleItemStyle.top}>
          <div style={ScheduleItemStyle.mainLabel}>
            {trimName(`#${data.channel.name} > ${data.writerName}`)}
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
        <div style={{ ...ScheduleItemStyle.top, marginTop: '0.5rem' }}>
          <div style={{ width: '70%' }}>
            <div style={ScheduleItemStyle.mainLabelArea}>
              <div style={ScheduleItemStyle.label}>{trimName(data.name)}</div>
            </div>
            {data.type === 'sub' && (
              <div style={ScheduleItemStyle.bottomLabel}>
                {trimName(data.parentName)}
              </div>
            )}
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
