import React from 'react'
import Icon from '../../foundations/Icon'
import Text from '../../foundations/Text'
import CheckerFilterStyle from '../../styles/components/CalendarHeader/CheckerFilterStyle'
import { Icons } from '../../utils/types'
import { SelectorType } from './SearchFilter'

interface Props {
  check: SelectorType
  label: string
  checked: boolean
  onCheck: (check: SelectorType, value: boolean) => void
}

export default function CheckerFilterItem({
  check,
  label,
  checked,
  onCheck,
}: Props) {
  return (
    <CheckerFilterStyle.item.container onClick={() => onCheck(check, !checked)}>
      <Icon icon={checked ? Icons.CHECKED : Icons.UNCHECKED} />
      <Text value={label} />
    </CheckerFilterStyle.item.container>
  )
}
