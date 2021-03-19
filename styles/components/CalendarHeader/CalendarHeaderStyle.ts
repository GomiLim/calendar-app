import tw from 'tailwind-styled-components'
import theme from '../../theme'

const iconStyle = {
  width: '2.5rem',
  height: '2.5rem',
  padding: '0.25rem',
  fontSize: '2rem',
  color: theme.palette.mono.black,
  margin: 'auto 0',
  marginRight: '1rem',
  cursor: 'pointer' as const,
}

const CalendarHeaderStyle = {
  container: tw.div`
    flex
    justify-between
    item-center
    w-full
    h-full
  `,
  filterContainer: tw.div`
    flex
    justify-start
    item-center
    w-3\/4
    h-full
    `,
  userContainer: tw.div`
    flex
    justify-end
    item-center
    w-1\/4
    h-full
  `,
  thumbnail: {
    width: '2rem',
    height: '2rem',
    margin: 'auto 0',
    marginRight: '1rem',
  },
  icon: {
    ...iconStyle,
    backgroundColor: 'transparent' as const,
  },
  systemIcon: {
    ...iconStyle,
    fontSize: '1.5rem',
    border: 'none' as const,
    backgroundColor: theme.palette.sub.babyPink,
    borderRadius: '0.5rem',
  },
  title: {
    margin: 'auto 0',
    marginRight: '2rem',
    ...theme.font.titleLarge,
  },
  userName: {
    margin: 'auto 0',
    marginRight: '1rem',
    ...theme.font.titleSmall,
  },
}

export default CalendarHeaderStyle
