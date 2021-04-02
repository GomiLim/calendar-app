import { debounce } from 'lodash'
import React from 'react'
import Recoil from 'recoil'
import Icon from '../../foundations/Icon'
import { filterState } from '../../recoil'
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
  const setFilter = Recoil.useSetRecoilState(filterState)

  // 상세 검색 필터 옵션
  const [option, setOption] = React.useState<OptionType>({ input: 'label' })
  // 상세 검색 필터 옵션 컴포넌트 표시 여부
  const [optionOpen, setOptionOpen] = React.useState(false)
  // 상세 검색 필터 옵션 컴포넌트 CSS
  const [optionStyle, setOptionStyle] = React.useState<
    React.CSSProperties | undefined
  >()

  const isMounted = useIsMounted()

  // 기본 사용자 필터 선택 시, 상세 필터 세팅
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

  // 선택된 상세 검색 필터 값 필터에 세팅
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

        setFilter((old) => ({
          ...old,
          channel: {
            ...old.channel,
            closed: selected === 'channel' ? option.closed : undefined,
          },
          card: {
            ...old.card,
            closed: selected === 'card' ? option.closed : undefined,
          },
          todo: {
            ...old.todo,
            done: selected === 'todo' ? option.done : undefined,
          },
          member: {
            ...old.member,
            duty: selected === 'member' ? option.duty : undefined,
          },
        }))
      } else {
        setOptionStyle(() => ({
          backgroundColor: 'transparent' as const,
        }))

        setFilter((old) => ({
          ...old,
          channel: {
            ...old.channel,
            closed: undefined,
          },
          card: {
            ...old.card,
            closed: undefined,
          },
          todo: {
            ...old.todo,
            done: undefined,
          },
          member: {
            ...old.member,
            duty: undefined,
          },
        }))
      }
    }
  }, [isMounted, option])

  // 검색 호출 이벤트
  const onSubmitForm = debounce((keyword: string, no?: number) => {
    switch (selected) {
      case 'channel':
        setFilter((filter) => ({
          ...filter,
          channel: {
            ...filter.channel,
            no,
            label: keyword,
            closed:
              selected === 'channel' && keyword !== ''
                ? option.closed
                : undefined,
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
            closed:
              selected === 'card' && keyword !== '' ? option.closed : undefined,
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
            done:
              selected === 'todo' && keyword !== '' ? option.done : undefined,
          },
        }))
        break
      default:
        setFilter((filter) => ({
          ...filter,
          member: {
            no,
            name: option.input === 'name' ? keyword : undefined,
            email: option.input === 'email' ? keyword : undefined,
            duty:
              selected === 'member' && keyword !== '' ? option.duty : undefined,
          },
        }))
        break
    }
  }, 25)

  // 상세 검색 필터 오픈
  const onClickOption = () => {
    setOptionOpen(true)
  }

  // 상세 검색 필터 닫기
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
    </>
  )
}
