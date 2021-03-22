import React from 'react'
import SearchSelectorStyle from '../../styles/components/CalendarHeader/SearchSelectorStyle'
import { SelectorType } from './SearchFilter'
import SearchSelectorItem from './SearchSelectorItem'

interface Props {
  selected?: SelectorType
  onSelect: (select: SelectorType) => void
  onBlur: () => void
}

export default function SearchSelector({ selected, onSelect, onBlur }: Props) {
  return (
    <>
      <SearchSelectorStyle.exterior onClick={onBlur} />
      <SearchSelectorStyle.container>
        <SearchSelectorItem
          selected="channel"
          isSelected={selected === 'channel'}
          onSelect={onSelect}
        />
        <SearchSelectorItem
          selected="schedule"
          isSelected={selected === 'schedule'}
          onSelect={onSelect}
        />
        <SearchSelectorItem
          selected="card"
          isSelected={selected === 'card'}
          onSelect={onSelect}
        />
        <SearchSelectorItem
          selected="todo"
          isSelected={selected === 'todo'}
          onSelect={onSelect}
        />
        <SearchSelectorItem
          selected="member"
          isSelected={selected === 'member'}
          onSelect={onSelect}
        />
      </SearchSelectorStyle.container>
    </>
  )
}
