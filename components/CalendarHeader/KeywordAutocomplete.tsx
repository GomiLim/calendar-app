/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  testUserAutoApi,
} from '../../pages/api'
import KeywordAutocompleteStyle from '../../styles/components/CalendarHeader/KeywordAutocompleteStyle'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { UserType } from '../../utils/types'
import { SelectorType } from './SearchFilter'

interface Props {
  selected: SelectorType
  input: 'label' | 'name' | 'email'
  onSelect: (keyword: string, no?: number) => void
}

export default function KeywordAutocomplete({
  selected,
  input,
  onSelect,
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

  const getChannelAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') {
      setAutocompleteList(() => [])
      return
    }

    setAutoLoading(() => true)
    const channelList = await testChannelAutoApi(keyword)
    setAutocompleteList(() => channelList)
  }, [isMounted, keyword])

  const getScheduleAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') {
      setAutocompleteList(() => [])
      return
    }

    setAutoLoading(() => true)
    const scheduleList = await testScheduleAutoApi(keyword)
    setAutocompleteList(() => scheduleList)
  }, [isMounted, keyword])

  const getCardAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') {
      setAutocompleteList(() => [])
      return
    }

    setAutoLoading(() => true)
    const cardList = await testCardAutoApi(keyword)
    setAutocompleteList(() => cardList)
  }, [isMounted, keyword])

  const getTodoAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') {
      setAutocompleteList(() => [])
      return
    }

    setAutoLoading(() => true)
    const todoList = await testTodoAutoApi(keyword)
    setAutocompleteList(() => todoList)
  }, [isMounted, keyword])

  const getUserAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') {
      setAutocompleteList(() => [])
      return
    }

    setAutoLoading(() => true)

    const userList = await testUserAutoApi(
      keyword,
      input === 'label' ? undefined : input,
    )
    setAutocompleteList(() => userList)
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
    setAutocompleteList(() => [])
  }, [isMounted, selected])

  React.useEffect(() => {
    if (isMounted()) {
      setAutoLoading(() => false)
    }
  }, [isMounted, autocompleteList])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    setAutoSelectNo(undefined)

    if (e.target.value.length > 0) {
      setShowAutocomplete(true)
    } else {
      setShowAutocomplete(false)
    }
  }

  const onBlur = () => {
    const el = document.getElementById('header-autocomplete-input')
    if (el) {
      el.blur()
    }
    onSelect(keyword, autoSelectNo)
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'Enter' && !e.shiftKey) {
      setShowAutocomplete(false)
      onBlur()
    }
  }

  return (
    <Autocomplete
      items={autocompleteList}
      shouldItemRender={(
        item: TestDataType | TestIconDataType | UserType,
        value: string,
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
            <Loading loading={true} style={KeywordAutocompleteStyle.loading} />
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
        setAutoSelectNo(Number(item.no))
        setShowAutocomplete(false)
        onSelect(item.name, Number(value))
      }}
      autoHighlight={false}
      onMenuVisibilityChange={(isOpen) => {
        if (!isOpen) {
          setShowAutocomplete(false)
          onSelect(keyword, autoSelectNo)
        }
      }}
      open={showAutocomplete}
      selectOnBlur={true}
      renderInput={(props) => (
        <input
          {...props}
          id="header-autocomplete-input"
          type="text"
          style={{
            ...KeywordAutocompleteStyle.input,
            width: selected === 'schedule' ? '100%' : 'calc(100% - 2rem)',
            marginLeft: selected === 'schedule' ? undefined : '2rem',
          }}
          className="fd-input"
          placeholder={t(
            `calendar.header.filter.selector.${selected}.placeholder${
              selected === 'member'
                ? input === 'name'
                  ? '.name'
                  : '.email'
                : ''
            }`,
          )}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
        />
      )}
    />
  )
}
