import { debounce } from 'lodash'
import React from 'react'
import Recoil from 'recoil'
import Icon from '../../foundations/Icon'
import { filterState, loadingState } from '../../recoil'
import InputKeywordStyle from '../../styles/components/CalendarHeader/InputKeywordStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { Icons } from '../../utils/types'
import KeywordAutocomplete from './KeywordAutocomplete'
import KeywordOption from './KeywordOption'
import { SelectorType } from './SearchFilter'

export type OptionType = {
  input: 'label' | 'name' | 'email'
  closed?: boolean
  done?: boolean
  duty?: 'manager' | 'creator' | 'assignee'
}

interface Props {
  selected: SelectorType
}

export default function InputKeyword({ selected }: Props) {
  const setLoading = Recoil.useSetRecoilState(loadingState)
  const setFilter = Recoil.useSetRecoilState(filterState)

  const [option, setOption] = React.useState<OptionType>({ input: 'label' })
  const [optionOpen, setOptionOpen] = React.useState(false)
  const [optionStyle, setOptionStyle] = React.useState<
    React.CSSProperties | undefined
  >()

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (selected === 'member') {
        setOption(() => ({ input: 'name' }))
      } else {
        setOption(() => ({ input: 'label' }))
      }

      setOptionOpen(() => false)
    }
  }, [isMounted, selected])

  React.useEffect(() => {
    if (isMounted()) {
      if (
        option.closed !== undefined ||
        option.done !== undefined ||
        option.duty !== undefined
      ) {
        setOptionStyle(() => ({
          backgroundColor: theme.palette.main.turquoise,
        }))
      } else {
        setOptionStyle(() => ({
          backgroundColor: 'transparent' as const,
        }))
      }

      setLoading(() => true)

      setFilter((filter) => ({
        ...filter,
        channel: {
          ...filter.channel,
          closed: selected === 'channel' ? option.closed : undefined,
        },
        card: {
          ...filter.card,
          closed: selected === 'card' ? option.closed : undefined,
        },
        todo: {
          ...filter.todo,
          done: selected === 'todo' ? option.done : undefined,
        },
        member: {
          ...filter.member,
          duty: selected === 'member' ? option.duty : undefined,
        },
      }))
    }
  }, [isMounted, option])

  const onSubmitForm = debounce((keyword: string, no?: number) => {
    setLoading(true)

    switch (selected) {
      case 'channel':
        setFilter((filter) => ({
          ...filter,
          channel: {
            ...filter.channel,
            no,
            label: keyword,
          },
        }))
        break
      case 'schedule':
        setFilter((filter) => ({
          ...filter,
          schedule: {
            ...filter.schedule,
            no,
            label: keyword,
          },
        }))
        break
      case 'card':
        setFilter((filter) => ({
          ...filter,
          card: {
            ...filter.card,
            no,
            label: keyword,
          },
        }))
        break
      case 'todo':
        setFilter((filter) => ({
          ...filter,
          todo: {
            ...filter.todo,
            no,
            label: keyword,
          },
        }))
        break
      default:
        setFilter((filter) => ({
          ...filter,
          member: {
            ...filter.member,
            no,
            name: option.input === 'name' ? keyword : undefined,
            email: option.input === 'email' ? keyword : undefined,
          },
        }))
        break
    }
  }, 25)

  const onClickOption = () => {
    setOptionOpen(true)
  }

  const onBlurOption = () => {
    setOptionOpen(false)
  }

  return (
    <>
      <div style={InputKeywordStyle.container}>
        {selected !== 'schedule' && (
          <Icon
            icon={Icons.FILTER_OPTION}
            style={{
              ...InputKeywordStyle.filter,
              ...optionStyle,
            }}
            onClick={onClickOption}
          />
        )}
        <KeywordAutocomplete
          selected={selected}
          input={option.input}
          onSelect={onSubmitForm}
        />
      </div>
      {optionOpen && (
        <KeywordOption
          selected={selected}
          option={option}
          setOption={setOption}
          onBlur={onBlurOption}
        />
      )}
      {/* {showAutocomplete && (
        <KeywordAutocomplete
          selected={selected}
          keyword={keyword}
          input={option.input}
          onSelect={onSelectAutocomplete}
          onBlur={() => setShowAutocomplete(false)}
        />
      )} */}
    </>
  )
}