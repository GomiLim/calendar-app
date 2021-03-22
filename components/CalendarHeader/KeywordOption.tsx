import React from 'react'
import KeywordOptionStyle from '../../styles/components/CalendarHeader/KeywordOptionStyle'
import { OptionType } from './InputKeyword'
import OptionBooleanItem from './OptionBooleanItem'
import OptionMemberItem from './OptionMemberItem'
import { SelectorType } from './SearchFilter'

interface Props {
  selected: SelectorType
  option: OptionType
  setOption: React.Dispatch<React.SetStateAction<OptionType>>
  onBlur: () => void
}

export default function KeywordOption({
  selected,
  option,
  setOption,
  onBlur,
}: Props) {
  const onSelect = (property: 'closed' | 'done', value: boolean) => {
    if (option[property] === value) {
      setOption({ ...option, [property]: undefined })
    } else {
      setOption({ ...option, [property]: value })
    }
  }

  return (
    <>
      <KeywordOptionStyle.exterior onClick={onBlur} />
      <KeywordOptionStyle.container>
        {selected === 'channel' || selected === 'card' ? (
          <OptionBooleanItem
            value={option.closed}
            selected={selected}
            property="closed"
            onSelect={onSelect}
          />
        ) : selected === 'todo' ? (
          <OptionBooleanItem
            value={option.done}
            selected={selected}
            property="done"
            onSelect={onSelect}
          />
        ) : selected === 'member' ? (
          <OptionMemberItem option={option} setOption={setOption} />
        ) : null}
      </KeywordOptionStyle.container>
    </>
  )
}
