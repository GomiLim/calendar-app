import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import Thumbnail from '../../foundations/Thumbnail'
import { TestDataType, TestIconDataType } from '../../pages/api'
import KeywordAutocompleteStyle from '../../styles/components/CalendarHeader/KeywordAutocompleteStyle'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import theme from '../../styles/theme'
import { UserType } from '../../utils/types'
import { SelectorType } from './SearchFilter'

interface Props {
  selected: SelectorType
  data: TestDataType | TestIconDataType | UserType
  onSelect: (data: TestDataType | TestIconDataType | UserType) => void
}

export default function AutocompleteItem({ selected, data, onSelect }: Props) {
  const { t } = useTranslation()

  return (
    <KeywordAutocompleteStyle.item onClick={() => onSelect(data)}>
      {selected === 'channel' ? (
        <div
          style={{
            ...ScheduleItemStyle.color,
            backgroundColor:
              (data as TestIconDataType).color || theme.palette.mono.gray,
            width: '3rem',
            height: '3rem',
          }}
        />
      ) : selected === 'schedule' ? (
        <div
          style={{
            ...ScheduleItemStyle.color,
            backgroundColor: (data as TestDataType).channel.color,
            opacity: (data as TestDataType).type === 'main' ? 1 : 0.3,
          }}>
          {t(`calendar.${(data as TestDataType).type}Schedule`)}
        </div>
      ) : selected === 'card' ? (
        <div
          style={{
            ...ScheduleItemStyle.color,
            backgroundColor:
              (data as TestIconDataType).color || theme.palette.mono.gray,
          }}
        />
      ) : selected === 'member' ? (
        <Thumbnail
          email={(data as UserType).email}
          style={ScheduleItemStyle.thumbnail}
        />
      ) : null}
      <Text value={data.name} style={KeywordAutocompleteStyle.autoData} />
    </KeywordAutocompleteStyle.item>
  )
}
