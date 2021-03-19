import React from 'react'
import { TestIconDataType } from '../../pages/api/testScheduleData'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import { Icons } from '../../utils/types'

interface Props {
  data: TestIconDataType
  onClick: (data: TestIconDataType) => void
}

export default function TodoItem({ data, onClick }: Props) {
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

  return (
    <ScheduleItemStyle.container onClick={() => onClick(data)}>
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
