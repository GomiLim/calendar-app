import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
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
import { loadingState } from '../../recoil'
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

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const [autocompleteList, setAutocompleteList] = React.useState<
    TestDataType[] | TestIconDataType[] | UserType[]
  >([])

  const isMounted = useIsMounted()

  const getChannelAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setLoading(() => true)
    const channelList = await testChannelAutoApi(keyword)

    setAutocompleteList(() => channelList)
    setLoading(() => false)
  }, [isMounted, keyword])

  const getScheduleAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setLoading(() => true)
    const scheduleList = await testScheduleAutoApi(keyword)

    setAutocompleteList(() => scheduleList)
    setLoading(() => false)
  }, [isMounted, keyword])

  const getCardAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setLoading(() => true)
    const cardList = await testCardAutoApi(keyword)

    setAutocompleteList(() => cardList)
    setLoading(() => false)
  }, [isMounted, keyword])

  const getTodoAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setLoading(() => true)
    const todoList = await testTodoAutoApi(keyword)

    setAutocompleteList(() => todoList)
    setLoading(() => false)
  }, [isMounted, keyword])

  const getUserAutocomplete = React.useCallback(async () => {
    if (!isMounted()) return
    if (keyword === '') return

    setLoading(() => true)
    const userList = await testUserApi(
      keyword,
      input === 'label' ? undefined : input,
    )

    setAutocompleteList(() => userList)
    setLoading(() => false)
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
    keyword,
    getChannelAutocomplete,
    getScheduleAutocomplete,
    getCardAutocomplete,
    getTodoAutocomplete,
    getUserAutocomplete,
  ])

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
              />
            ),
          )
        )}
      </KeywordAutocompleteStyle.container>
    </>
  )
}
