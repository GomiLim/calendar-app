import React from 'react'
import { useTranslation } from 'react-i18next'
import CheckerFilterStyle from '../../styles/components/CalendarHeader/CheckerFilterStyle'
import { useIsMounted } from '../../utils/hooks'
import CheckerFilterItem from './CheckerFilterItem'
import { SelectorType } from './SearchFilter'

type CheckType = {
  channel: boolean
  schedule: boolean
  card: boolean
  todo: boolean
}

const initCheck = {
  channel: true,
  schedule: true,
  card: true,
  todo: true,
}

interface Props {
  onCheck: (check: SelectorType, value: boolean) => void
}

export default function CheckerFilter({ onCheck }: Props) {
  const { t } = useTranslation()

  const [checks, setChecks] = React.useState<CheckType>(initCheck)
  const [allChecked, setAllChecked] = React.useState(true)

  const isMounted = useIsMounted()

  const onSelect = (check: SelectorType, value: boolean) => {
    onCheck(check, value)

    if (check === 'all') {
      setChecks({
        channel: value,
        schedule: value,
        card: value,
        todo: value,
      })
    } else if (check !== 'member') {
      setChecks((old) => ({ ...old, [check]: value }))
    }
  }

  React.useEffect(() => {
    if (isMounted()) {
      setAllChecked(
        () => checks.channel && checks.schedule && checks.card && checks.todo,
      )
    }
  }, [isMounted, checks])

  return (
    <CheckerFilterStyle.container>
      <CheckerFilterItem
        check="all"
        label={t('calendar.header.filter.display.all')}
        checked={allChecked}
        onCheck={onSelect}
      />
      <CheckerFilterItem
        check="channel"
        label={t('calendar.header.filter.display.channel')}
        checked={checks.channel}
        onCheck={onSelect}
      />
      <CheckerFilterItem
        check="schedule"
        label={t('calendar.header.filter.display.schedule')}
        checked={checks.schedule}
        onCheck={onSelect}
      />
      <CheckerFilterItem
        check="card"
        label={t('calendar.header.filter.display.card')}
        checked={checks.card}
        onCheck={onSelect}
      />
      <CheckerFilterItem
        check="todo"
        label={t('calendar.header.filter.display.todo')}
        checked={checks.todo}
        onCheck={onSelect}
      />
    </CheckerFilterStyle.container>
  )
}
