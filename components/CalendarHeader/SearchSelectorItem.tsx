import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import SearchSelectorStyle from '../../styles/components/CalendarHeader/SearchSelectorStyle'
import theme from '../../styles/theme'
import { SelectorType } from './SearchFilter'

interface Props {
  selected: SelectorType
  isSelected: boolean
  onSelect: (select: SelectorType) => void
}

export default function SearchSelectorItem({
  selected,
  isSelected,
  onSelect,
}: Props) {
  const { t } = useTranslation()

  return (
    <SearchSelectorStyle.item onClick={() => onSelect(selected)}>
      {isSelected ? (
        <SearchSelectorStyle.radio>
          <SearchSelectorStyle.selected />
        </SearchSelectorStyle.radio>
      ) : (
        <SearchSelectorStyle.radio />
      )}
      <Text
        value={
          selected === 'channel'
            ? t('calendar.header.filter.display.channel')
            : selected === 'schedule'
            ? t('calendar.header.filter.display.schedule')
            : selected === 'card'
            ? t('calendar.header.filter.display.card')
            : selected === 'todo'
            ? t('calendar.header.filter.display.todo')
            : t('calendar.header.filter.selector.member.title')
        }
        style={isSelected ? theme.font.listBold : theme.font.list}
      />
    </SearchSelectorStyle.item>
  )
}
