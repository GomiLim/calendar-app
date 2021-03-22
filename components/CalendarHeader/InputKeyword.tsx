import { debounce } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import Form from '../../foundations/Form'
import Icon from '../../foundations/Icon'
import Input from '../../foundations/Input'
import { TestDataType, TestIconDataType } from '../../pages/api'
import { filterState } from '../../recoil'
import InputKeywordStyle from '../../styles/components/CalendarHeader/InputKeywordStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { Icons, UserType } from '../../utils/types'
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
  const { t } = useTranslation()

  const setFilter = Recoil.useSetRecoilState(filterState)

  const [keyword, setKeyword] = React.useState('')
  const [option, setOption] = React.useState<OptionType>({ input: 'label' })
  const [optionOpen, setOptionOpen] = React.useState(false)
  const [optionStyle, setOptionStyle] = React.useState<
    React.CSSProperties | undefined
  >()
  const [showAutocomplete, setShowAutocomplete] = React.useState(false)

  const _input: React.RefObject<HTMLInputElement> = React.createRef()

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (selected === 'member') {
        setOption(() => ({ input: 'name' }))
      } else {
        setOption(() => ({ input: 'label' }))
      }
      setKeyword(() => '')
      setOptionOpen(() => false)
      setShowAutocomplete(() => false)
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
      } else {
        setOptionStyle(() => ({
          backgroundColor: 'transparent' as const,
        }))
      }
    }
  }, [isMounted, option])

  const onSubmitForm = debounce(
    (
      e?: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>,
    ) => {
      if (e) {
        e.preventDefault()
      }

      if (_input?.current) {
        _input.current.blur()
      }

      switch (selected) {
        case 'channel':
          setFilter((filter) => ({
            ...filter,
            channel: {
              ...filter.channel,
              label: keyword,
            },
          }))
          break
        case 'schedule':
          setFilter((filter) => ({
            ...filter,
            schedule: {
              ...filter.schedule,
              label: keyword,
            },
          }))
          break
        case 'card':
          setFilter((filter) => ({
            ...filter,
            card: {
              ...filter.card,
              label: keyword,
            },
          }))
          break
        case 'todo':
          setFilter((filter) => ({
            ...filter,
            todo: {
              ...filter.todo,
              label: keyword,
            },
          }))
          break
        default:
          setFilter((filter) => ({
            ...filter,
            member: {
              ...filter.member,
              name: option.input === 'name' ? keyword : undefined,
              email: option.input === 'email' ? keyword : undefined,
            },
          }))
          break
      }
    },
    25,
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)

    if (e.target.value.length > 0) {
      setShowAutocomplete(true)
    } else {
      setShowAutocomplete(false)
    }
  }

  const onClickOption = () => {
    setOptionOpen(true)
  }

  const onBlurOption = () => {
    setOptionOpen(false)
  }

  const onSelectAutocomplete = (
    data: TestDataType | TestIconDataType | UserType,
  ) => {
    switch (selected) {
      case 'channel':
        setFilter((filter) => ({
          ...filter,
          channel: {
            ...filter.channel,
            no: data.no,
            label: data.name,
          },
        }))
        break
      case 'schedule':
        setFilter((filter) => ({
          ...filter,
          schedule: {
            ...filter.schedule,
            no: data.no,
            label: data.name,
          },
        }))
        break
      case 'card':
        setFilter((filter) => ({
          ...filter,
          card: {
            ...filter.card,
            no: data.no,
            label: data.name,
          },
        }))
        break
      case 'todo':
        setFilter((filter) => ({
          ...filter,
          todo: {
            ...filter.todo,
            no: data.no,
            label: data.name,
          },
        }))
        break
      default:
        setFilter((filter) => ({
          ...filter,
          channel: {
            ...filter.channel,
            no: data.no,
            name: option.input === 'name' ? data.name : undefined,
            email:
              option.input === 'email' ? (data as UserType)?.email : undefined,
          },
        }))
        break
    }

    setKeyword(data.name)

    if (_input?.current) {
      _input.current.blur()
    }

    setShowAutocomplete(false)
  }

  return (
    <>
      <Form onSubmit={onSubmitForm} style={InputKeywordStyle.container}>
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
        <Input
          refObj={_input}
          type="text"
          onChange={onChange}
          style={{
            ...InputKeywordStyle.input,
            width: selected === 'schedule' ? '100%' : 'calc(100% - 2rem)',
            marginLeft: selected === 'schedule' ? undefined : '2rem',
          }}
          value={keyword}
          placeholder={t(
            `calendar.header.filter.selector.${selected}.placeholder${
              selected === 'member'
                ? option.input === 'name'
                  ? '.name'
                  : '.email'
                : ''
            }`,
          )}
          onBlur={onSubmitForm}
          onSubmit={onSubmitForm}
        />
      </Form>
      {optionOpen && (
        <KeywordOption
          selected={selected}
          option={option}
          setOption={setOption}
          onBlur={onBlurOption}
        />
      )}
      {showAutocomplete && (
        <KeywordAutocomplete
          selected={selected}
          keyword={keyword}
          input={option.input}
          onSelect={onSelectAutocomplete}
          onBlur={() => setShowAutocomplete(false)}
        />
      )}
    </>
  )
}
