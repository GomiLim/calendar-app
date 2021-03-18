import React from 'react'
import { useTranslation } from 'react-i18next'
import ScheduleCreateContainerStyle from '../../styles/components/ScheduleCreate/ScheduleCreateContainerStyle'

interface Props {
  platform: 'web' | 'mobile'
  date: Date
}

export default function ScheduleCreate({ platform, date }: Props) {
  const { t } = useTranslation()

  return (
    <div style={ScheduleCreateContainerStyle.container}>
      {t('calendar.create')}
    </div>
  )
}
