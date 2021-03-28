import moment from 'moment'
import React from 'react'
import Box from '../../foundations/Box'
import Icon from '../../foundations/Icon'
import Text from '../../foundations/Text'
import CalendarIconsStyle from '../../styles/components/Calendar/CalendarIconsStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { Icons } from '../../utils/types'

interface Props {
  today: Date
  endingChannels?: Date[]
  endingCards?: Date[]
  endingTodos?: Date[]
}

export default React.memo(function CalendarIcons({
  today,
  endingChannels,
  endingCards,
  endingTodos,
}: Props) {
  const [endingChannelCnt, setEndingChannelCnt] = React.useState(0)
  const [endingCardCnt, setEndingCardCnt] = React.useState(0)
  const [endingTodoCnt, setEndingTodoCnt] = React.useState(0)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    const todayStr = moment(today).format('YYYYMMDD')

    setEndingChannelCnt(() =>
      !!endingChannels && endingChannels.length > 0
        ? endingChannels.filter(
            (endingChannel) =>
              moment(endingChannel).format('YYYYMMDD') === todayStr,
          ).length
        : 0,
    )
    setEndingCardCnt(() =>
      !!endingCards && endingCards.length > 0
        ? endingCards.filter(
            (endingCard) => moment(endingCard).format('YYYYMMDD') === todayStr,
          ).length
        : 0,
    )
    setEndingTodoCnt(() =>
      !!endingTodos && endingTodos.length > 0
        ? endingTodos.filter(
            (endingTodo) => moment(endingTodo).format('YYYYMMDD') === todayStr,
          ).length
        : 0,
    )
  }, [isMounted, endingChannels, endingCards, endingTodos, today])

  return (
    <>
      {endingChannelCnt > 0 && (
        <Box direction="horizontal" style={CalendarIconsStyle.container}>
          <Icon
            icon={Icons.EMOTICON}
            style={{
              ...CalendarIconsStyle.icon,
              backgroundColor: theme.palette.main.red,
            }}
          />
          <Text value={String(endingChannelCnt)} />
        </Box>
      )}
      {(endingCardCnt > 0 || endingTodoCnt > 0) && (
        <div style={CalendarIconsStyle.box}>
          {endingCardCnt > 0 && (
            <Box direction="horizontal" style={CalendarIconsStyle.container}>
              <Icon
                icon={Icons.CARD}
                style={{
                  ...CalendarIconsStyle.icon,
                  backgroundColor: theme.palette.main.blue,
                }}
              />
              <Text value={String(endingCardCnt)} />
            </Box>
          )}
          {endingTodoCnt > 0 && (
            <Box
              direction="horizontal"
              style={{
                ...CalendarIconsStyle.container,
                marginRight: '1.25rem',
              }}>
              <Icon
                icon={Icons.MISSION}
                style={{
                  ...CalendarIconsStyle.icon,
                  backgroundColor: theme.palette.main.turquoise,
                }}
              />
              <Text value={String(endingTodoCnt)} />
            </Box>
          )}
        </div>
      )}
    </>
  )
})
