import React from 'react'
import Recoil from 'recoil'
import Icon from '../../foundations/Icon'
import { filterState } from '../../recoil'
import SearchFilterStyle from '../../styles/components/CalendarHeader/SearchFilterStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { Icons } from '../../utils/types'
import CheckerFilter from './CheckerFilter'
import InputKeyword from './InputKeyword'
import SearchSelector from './SearchSelector'

export type SelectorType =
  | 'all'
  | 'channel'
  | 'schedule'
  | 'card'
  | 'todo'
  | 'member'

export default function SearchFilter() {
  const [filter, setFilter] = Recoil.useRecoilState(filterState)

  const [selectorOpened, setSelectorOpened] = React.useState(false)
  const [selected, setSelected] = React.useState<SelectorType | undefined>()
  const [selectorBtnStyle, setSelectorBtnStyle] = React.useState<
    React.CSSProperties | undefined
  >()

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setSelectorBtnStyle(() =>
        selected
          ? {
              border: 'none' as const,
              width: '1.84rem',
              height: '1.84rem',
              color: theme.palette.mono.white,
              backgroundColor: theme.palette.main.navy,
            }
          : {
              border: `0.16rem solid ${theme.palette.mono.darkGray}`,
              color: theme.palette.mono.darkGray,
              backgroundColor: theme.palette.mono.white,
            },
      )
    }
  }, [isMounted, selected])

  const onClickSelectorBtn = () => {
    if (selected) {
      setSelected(undefined)
      setSelectorOpened(false)
      setFilter({
        ...filter,
        channel: {
          ...filter.channel,
          no: undefined,
          label: undefined,
          closed: undefined,
        },
        schedule: {
          ...filter.schedule,
          no: undefined,
          label: undefined,
        },
        card: {
          ...filter.card,
          no: undefined,
          label: undefined,
          closed: undefined,
        },
        todo: {
          ...filter.todo,
          no: undefined,
          label: undefined,
          done: undefined,
        },
        member: {
          ...filter.member,
          no: undefined,
          name: undefined,
          email: undefined,
          duty: undefined,
        },
      })
    } else {
      setSelectorOpened(true)
    }
  }

  const onSelectorSelect = (select: SelectorType) => {
    setSelected(select)
  }

  const onSelectorBlur = () => {
    setSelectorOpened(false)
  }

  const onCheck = (check: SelectorType, value: boolean) => {
    if (check === 'all') {
      setFilter((old) => ({
        ...old,
        channel: {
          ...old.channel,
          show: value,
        },
        schedule: {
          ...old.schedule,
          show: value,
        },
        card: {
          ...old.card,
          show: value,
        },
        todo: {
          ...old.todo,
          show: value,
        },
      }))
    } else {
      setFilter((old) => ({
        ...old,
        [check]: {
          ...old[check],
          show: value,
        },
      }))
    }
  }

  return (
    <>
      <SearchFilterStyle.container>
        <Icon
          icon={Icons.FILTER}
          style={{ ...SearchFilterStyle.selectorBtn, ...selectorBtnStyle }}
          onClick={onClickSelectorBtn}
        />
        {selected && <InputKeyword selected={selected} />}
      </SearchFilterStyle.container>
      {selectorOpened && (
        <SearchSelector
          selected={selected}
          onSelect={onSelectorSelect}
          onBlur={onSelectorBlur}
        />
      )}
      <CheckerFilter onCheck={onCheck} />
    </>
  )
}
