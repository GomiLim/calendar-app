import theme from '../../theme'

const CalendarIconsStyle = {
  container: {
    margin: '0.063rem 0.625rem',
    justifyContent: 'flex-start' as const,
  },
  box: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  icon: {
    color: theme.palette.mono.white,
    ...theme.font.text,
    width: '1.25rem',
    height: '1.25rem',
  },
}

export default CalendarIconsStyle
