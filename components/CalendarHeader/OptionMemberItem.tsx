import React from 'react'
import { useTranslation } from 'react-i18next'
import Divider from '../../foundations/Divider'
import Text from '../../foundations/Text'
import OptionMemberItemStyle from '../../styles/components/CalendarHeader/OptionMemberItemStyle'
import { OptionType } from './InputKeyword'
import OptionMemberFilterItem from './OptionMemberFilterItem'
import OptionMemberRoleItem from './OptionMemberRoleItem'

interface Props {
  option: OptionType
  setOption: React.Dispatch<React.SetStateAction<OptionType>>
}

export default function OptionMemberItem({ option, setOption }: Props) {
  const { t } = useTranslation()

  const onSelectMemberFilter = (input: 'name' | 'email') => {
    setOption({ ...option, input })
  }

  const onSelectMemberRole = (duty: 'manager' | 'creator' | 'assignee') => {
    if (option.duty === duty) {
      setOption({ ...option, duty: undefined })
    } else {
      setOption({ ...option, duty })
    }
  }

  return (
    <>
      <OptionMemberFilterItem
        input="name"
        isSelected={option.input === 'name'}
        onSelect={onSelectMemberFilter}
      />
      <OptionMemberFilterItem
        input="email"
        isSelected={option.input === 'email'}
        onSelect={onSelectMemberFilter}
      />
      <Divider direction="horizontal" style={OptionMemberItemStyle.divider} />
      <Text
        value={t('calendar.header.filter.selector.member.duty.title')}
        style={OptionMemberItemStyle.dutyLabel}
      />
      <OptionMemberRoleItem
        key="manager"
        duty="manager"
        isSelected={option.duty === 'manager'}
        onSelect={onSelectMemberRole}
      />
      <OptionMemberRoleItem
        key="creator"
        duty="creator"
        isSelected={option.duty === 'creator'}
        onSelect={onSelectMemberRole}
      />
      <OptionMemberRoleItem
        key="assignee"
        duty="assignee"
        isSelected={option.duty === 'assignee'}
        onSelect={onSelectMemberRole}
      />
    </>
  )
}
