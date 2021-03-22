import { throttle } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import {
  testCardAutoApi,
  testChannelAutoApi,
  TestDataType,
  TestIconDataType,
  testScheduleAutoApi,
  testTodoAutoApi,
  testUserApi,
} from '../../pages/api'
import KeywordAutocompleteStyle from '../../styles/components/CalendarHeader/KeywordAutocompleteStyle'
import { useIsMounted } from '../../utils/hooks'
import { UserType } from '../../utils/types'
import AutocompleteItem from './AutocompleteItem'
import { SelectorType } from './SearchFilter'

interface Props {
  selected: SelectorType
  keyword: string
  input: 'label' | 'name' | 'email'
  onSelect: (data: TestDataType | TestIconDataType | UserType) => void
  onBlur: () => void
}

export default function KeywordAutocomplete({
  selected,
  keyword,
  input,
  onSelect,
  onBlur,
}: Props) {
  const { t } = useTranslation()

  const [autocompleteList, setAutocompleteList] = React.useState<
    TestDataType[] | TestIconDataType[] | UserType[]
  >([])

  const isMounted = useIsMounted()

  const getChannelAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return

    const channelList = await testChannelAutoApi(keyword)

    setAutocompleteList(() => channelList)
  }, [isMounted, keyword])

  const getScheduleAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return

    const scheduleList = await testScheduleAutoApi(keyword)

    setAutocompleteList(() => scheduleList)
  }, [isMounted, keyword])

  const getCardAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return

    const cardList = await testCardAutoApi(keyword)

    setAutocompleteList(() => cardList)
  }, [isMounted, keyword])

  const getTodoAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return

    const todoList = await testTodoAutoApi(keyword)

    setAutocompleteList(() => todoList)
  }, [isMounted, keyword])

  const getUserAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return

    console.log('keyword', keyword)

    const userList = await testUserApi(
      keyword,
      input === 'label' ? undefined : input,
    )

    setAutocompleteList(() => userList)
  }, [isMounted, keyword])

  React.useEffect(
    throttle(() => {
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
    }, 25),
    [
      isMounted,
      selected,
      keyword,
      getChannelAutocomplete,
      getScheduleAutocomplete,
      getCardAutocomplete,
      getTodoAutocomplete,
      getUserAutocomplete,
    ],
  )

  return (
    <>
      <KeywordAutocompleteStyle.exterior onClick={onBlur} />
      <KeywordAutocompleteStyle.container>
        {autocompleteList.length === 0 ? (
          <Text
            value={t('calendar.header.filter.selector.autocomplete.nodata')}
            style={KeywordAutocompleteStyle.nodata}
          />
        ) : (
          autocompleteList.map(
            (autocomplete: TestDataType | TestIconDataType | UserType) => (
              <AutocompleteItem
                key={autocomplete.no}
                selected={selected}
                data={autocomplete}
                onSelect={onSelect}
              />
            ),
          )
        )}
      </KeywordAutocompleteStyle.container>
    </>
  )
}
