import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import SearchSelectorStyle from '../../styles/components/CalendarHeader/SearchSelectorStyle'
import theme from '../../styles/theme'

interface Props {
  input: 'label' | 'name' | 'email'
  isSelected: boolean
  onSelect: (input: 'name' | 'email') => void
}

export default function OptionMemberFilterItem({
  input,
  isSelected,
  onSelect,
}: Props) {
  const { t } = useTranslation()

  return (
    <SearchSelectorStyle.item
      onClick={() => onSelect(input === 'label' ? 'name' : input)}>
      {isSelected ? (
        <SearchSelectorStyle.radio>
          <SearchSelectorStyle.selected />
        </SearchSelectorStyle.radio>
      ) : (
        <SearchSelectorStyle.radio />
      )}
      <Text
        value={t(`calendar.header.filter.selector.member.${input}`)}
        style={isSelected ? theme.font.listBold : theme.font.list}
      />
    </SearchSelectorStyle.item>
  )
}
