import React from 'react'
import Autocomplete from 'react-autocomplete'
import { useTranslation } from 'react-i18next'
import Loading from '../../foundations/Loading'
import Text from '../../foundations/Text'
import Thumbnail from '../../foundations/Thumbnail'
import {
  testCardAutoApi,
  testChannelAutoApi,
  TestDataType,
  TestIconDataType,
  testScheduleAutoApi,
  testTodoAutoApi,
  testUserApi,
} from '../../pages/api'
import InputKeywordStyle from '../../styles/components/CalendarHeader/InputKeywordStyle'
import KeywordAutocompleteStyle from '../../styles/components/CalendarHeader/KeywordAutocompleteStyle'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { UserType } from '../../utils/types'
import { SelectorType } from './SearchFilter'

interface Props {
  selected: SelectorType
  input: 'label' | 'name' | 'email'
  onSelect: (
    value: string,
    data: TestDataType | TestIconDataType | UserType,
  ) => void
  onBlur: (keyword: string, no?: number) => void
}

export default function KeywordAutocomplete({
  selected,
  input,
  onSelect,
  onBlur,
}: Props) {
  const { t } = useTranslation()

  const [autoSelectNo, setAutoSelectNo] = React.useState<number | undefined>()
  const [keyword, setKeyword] = React.useState('')
  const [showAutocomplete, setShowAutocomplete] = React.useState(false)
  const [autoLoading, setAutoLoading] = React.useState(false)

  const [autocompleteList, setAutocompleteList] = React.useState<
    TestDataType[] | TestIconDataType[] | UserType[]
  >([])

  const isMounted = useIsMounted()

  let _input: Autocomplete | null = null

  const getChannelAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setAutoLoading(() => true)
    const channelList = await testChannelAutoApi(keyword)

    setAutocompleteList(() => channelList)
    setAutoLoading(() => false)
  }, [isMounted, keyword])

  const getScheduleAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setAutoLoading(() => true)
    const scheduleList = await testScheduleAutoApi(keyword)

    setAutocompleteList(() => scheduleList)
    setAutoLoading(() => false)
  }, [isMounted, keyword])

  const getCardAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setAutoLoading(() => true)
    const cardList = await testCardAutoApi(keyword)

    setAutocompleteList(() => cardList)
    setAutoLoading(() => false)
  }, [isMounted, keyword])

  const getTodoAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setAutoLoading(() => true)
    const todoList = await testTodoAutoApi(keyword)

    setAutocompleteList(() => todoList)
    setAutoLoading(() => false)
  }, [isMounted, keyword])

  const getUserAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setAutoLoading(() => true)
    const userList = await testUserApi(
      keyword,
      input === 'label' ? undefined : input,
    )

    setAutocompleteList(() => userList)
    setAutoLoading(() => false)
  }, [isMounted, keyword])

  React.useEffect(() => {
    if (!isMounted()) return

    switch (selected) {
      case 'channel':
        void getChannelAutocomplete()
        break
      case 'schedule':
        void getScheduleAutocomplete()
        break
      case 'card':
        void getCardAutocomplete()
        break
      case 'todo':
        void getTodoAutocomplete()
        break
      default:
        void getUserAutocomplete()
        break
    }
  }, [
    isMounted,
    selected,
    getChannelAutocomplete,
    getScheduleAutocomplete,
    getCardAutocomplete,
    getTodoAutocomplete,
    getUserAutocomplete,
  ])

  React.useEffect(() => {
    if (!isMounted()) return

    setShowAutocomplete(() => false)
    setAutoSelectNo(() => undefined)
    setKeyword(() => '')
    setAutoLoading(() => true)
  }, [isMounted, selected])

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      console.log('entered')
      // if (onSubmit) {
      //   onSubmit()
      // }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    setAutoSelectNo(undefined)

    if (e.target.value.length > 0) {
      setShowAutocomplete(true)
    } else {
      setShowAutocomplete(false)
    }
  }

  React.useEffect(() => {
    if (!isMounted()) return
    if (!_input?.refs?.input) return

    const keyEvent = (e: KeyboardEvent) => {
      e.preventDefault()

      if (!showAutocomplete) return

      console.log('????', _input)
      if (
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown'
      ) {
        setShowAutocomplete(() => false)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    _input.refs.input.addEventListener('keyup', keyEvent)

    return () => {
      if (_input?.refs?.input) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        _input?.refs.input.removeEventListener('keyup', keyEvent)
      }
    }
  }, [isMounted, _input])

  return (
    <Autocomplete
      ref={(el) => {
        _input = el
      }}
      wrapperStyle={{
        ...InputKeywordStyle.input,
        width: selected === 'schedule' ? '100%' : 'calc(100% - 2rem)',
        marginLeft: selected === 'schedule' ? undefined : '2rem',
      }}
      items={autocompleteList}
      shouldItemRender={(
        item: TestDataType | TestIconDataType | UserType,
        value,
      ) =>
        value.trim().length > 0 &&
        item.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()) > -1
      }
      getItemValue={(item: TestDataType | TestIconDataType | UserType) =>
        String(item.no)
      }
      renderMenu={(items, value, style) => (
        <KeywordAutocompleteStyle.container>
          {autoLoading ? (
            <Loading
              loading={true}
              style={{
                position: 'initial' as const,
                backgroundColor: 'transparent' as const,
                paddingTop: '-2rem',
              }}
            />
          ) : items.length === 0 ? (
            <Text
              value={t('calendar.header.filter.selector.autocomplete.nodata')}
              style={KeywordAutocompleteStyle.nodata}
            />
          ) : (
            items
          )}
        </KeywordAutocompleteStyle.container>
      )}
      renderItem={(
        item: TestDataType | TestIconDataType | UserType,
        highlighted,
      ) => (
        <KeywordAutocompleteStyle.item
          key={item.no}
          style={{
            backgroundColor: highlighted
              ? theme.palette.main.navy
              : 'transparent',
          }}>
          {selected === 'channel' ? (
            <div
              style={{
                ...ScheduleItemStyle.color,
                backgroundColor:
                  (item as TestIconDataType).color || theme.palette.mono.gray,
                width: '3rem',
                height: '3rem',
              }}
            />
          ) : selected === 'schedule' ? (
            <div
              style={{
                ...ScheduleItemStyle.color,
                backgroundColor: (item as TestDataType).channel.color,
                opacity: (item as TestDataType).type === 'main' ? 1 : 0.3,
              }}>
              {t(`calendar.${(item as TestDataType).type}Schedule`)}
            </div>
          ) : selected === 'card' ? (
            <div
              style={{
                ...ScheduleItemStyle.color,
                backgroundColor:
                  (item as TestIconDataType).color || theme.palette.mono.gray,
              }}
            />
          ) : selected === 'member' ? (
            <Thumbnail
              email={(item as UserType).email}
              style={ScheduleItemStyle.thumbnail}
            />
          ) : null}
          <Text
            value={item.name}
            style={{
              ...KeywordAutocompleteStyle.autoData,
              color: highlighted
                ? theme.palette.mono.white
                : theme.palette.mono.darkGray,
            }}
          />
        </KeywordAutocompleteStyle.item>
      )}
      value={keyword}
      onChange={onChange}
      onSelect={(value, item: TestDataType | TestIconDataType | UserType) => {
        setKeyword(item.name)
        setAutoSelectNo(item.no)
        setShowAutocomplete(false)
        onSelect(value, item)
      }}
      // renderInput={(props) => (
      //   <input
      //     {...props}
      //     ref={_input}
      //     type="text"
      //     onKeyUp={enter}
      //     style={{
      //       ...InputKeywordStyle.input,
      //       width: selected === 'schedule' ? '100%' : 'calc(100% - 2rem)',
      //       marginLeft: selected === 'schedule' ? undefined : '2rem',
      //     }}
      //     className="fd-input"
      //     value={keyword}
      //     placeholder={t(
      //       `calendar.header.filter.selector.${selected}.placeholder${
      //         selected === 'member'
      //           ? option.input === 'name'
      //             ? '.name'
      //             : '.email'
      //           : ''
      //       }`,
      //     )}
      //     onBlur={onSubmitForm}
      //   />
      // )}
      autoHighlight={false}
      onMenuVisibilityChange={(isOpen) => {
        if (!isOpen) {
          setShowAutocomplete(false)
          onBlur(keyword, autoSelectNo)
        }
      }}
      open={showAutocomplete}
      selectOnBlur={true}
      sortItems={(
        itemA: TestDataType | TestIconDataType | UserType,
        itemB: TestDataType | TestIconDataType | UserType,
        value: string,
      ) => {
        const aNum = Number(
          itemA.name
            .trim()
            .toLowerCase()
            .split('')
            .map((str) => String(str.charCodeAt(0)))
            .join(''),
        )
        const bNum = Number(
          itemB.name
            .trim()
            .toLowerCase()
            .split('')
            .map((str) => String(str.charCodeAt(0)))
            .join(''),
        )
        if (aNum < bNum) return -1
        if (aNum > bNum) return 1
        return 0
      }}
    />
  )
}
