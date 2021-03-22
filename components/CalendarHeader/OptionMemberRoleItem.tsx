import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import SearchSelectorStyle from '../../styles/components/CalendarHeader/SearchSelectorStyle'
import theme from '../../styles/theme'

interface Props {
  duty: 'manager' | 'creator' | 'assignee'
  isSelected: boolean
  onSelect: (role: 'manager' | 'creator' | 'assignee') => void
}

export default function OptionMemberRoleItem({
  duty,
  isSelected,
  onSelect,
}: Props) {
  const { t } = useTranslation()

  return (
    <SearchSelectorStyle.item onClick={() => onSelect(duty)}>
      {isSelected ? (
        <SearchSelectorStyle.radio>
          <SearchSelectorStyle.selected />
        </SearchSelectorStyle.radio>
      ) : (
        <SearchSelectorStyle.radio />
      )}
      <Text
        value={t(`calendar.header.filter.selector.member.duty.${duty}`)}
        style={isSelected ? theme.font.listBold : theme.font.list}
      />
    </SearchSelectorStyle.item>
  )
}
