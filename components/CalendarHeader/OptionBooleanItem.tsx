import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../../foundations/Text'
import KeywordOptionStyle from '../../styles/components/CalendarHeader/KeywordOptionStyle'
import theme from '../../styles/theme'
import { SelectorType } from './SearchFilter'

interface Props {
  value?: boolean
  selected: SelectorType
  property: 'closed' | 'done'
  onSelect: (property: 'closed' | 'done', value: boolean) => void
}

export default function OptionBooleanItem({
  value,
  selected,
  property,
  onSelect,
}: Props) {
  const { t } = useTranslation()

  return (
    <>
      <KeywordOptionStyle.item onClick={() => onSelect(property, false)}>
        {value === false ? (
          <KeywordOptionStyle.radio>
            <KeywordOptionStyle.selected />
          </KeywordOptionStyle.radio>
        ) : (
          <KeywordOptionStyle.radio />
        )}
        <Text
          value={
            selected === 'channel'
              ? t('calendar.header.filter.selector.channel.inprogress')
              : selected === 'card'
              ? t('calendar.header.filter.selector.card.inprogress')
              : t('calendar.header.filter.selector.todo.inprogress')
          }
          style={value === false ? theme.font.listBold : theme.font.list}
        />
      </KeywordOptionStyle.item>
      <KeywordOptionStyle.item onClick={() => onSelect(property, true)}>
        {value ? (
          <KeywordOptionStyle.radio>
            <KeywordOptionStyle.selected />
          </KeywordOptionStyle.radio>
        ) : (
          <KeywordOptionStyle.radio />
        )}
        <Text
          value={
            selected === 'channel'
              ? t('calendar.header.filter.selector.channel.closed')
              : selected === 'card'
              ? t('calendar.header.filter.selector.card.closed')
              : t('calendar.header.filter.selector.todo.done')
          }
          style={value ? theme.font.listBold : theme.font.list}
        />
      </KeywordOptionStyle.item>
    </>
  )
}
