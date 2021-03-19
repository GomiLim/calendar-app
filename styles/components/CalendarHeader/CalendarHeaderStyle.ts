import tw from 'tailwind-styled-components'
import theme from '../../theme'

const iconStyle = {
  width: '2.5rem',
  height: '2.5rem',
  padding: '0.25rem',
  fontSize: '2rem',
  color: theme.palette.mono.black,
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
  `,
  userContainer: tw.div`
    flex
    justify-end
    item-center
    w-1\/4
  `,
  thumbnail: {
    width: '2rem',
    height: '2rem',
  },
  icon: {
    ...iconStyle,
    backgroundColor: 'transparent' as const,
  },
  systemIcon: {
    ...iconStyle,
    border: 'none' as const,
    backgroundColor: theme.palette.sub.babyPink,
    borderRadius: '0.1rem',
  },
}

export default CalendarHeaderStyle
