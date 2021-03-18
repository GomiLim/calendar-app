const CalendarDateStyle = {
  container: {
    width: 'calc(100% / 7)',
    justifyContent: 'flex-start' as const,
    alignSelf: 'stretch' as const,
    cursor: 'pointer' as const,
    margin: 0,
  },
  title: {
    margin: 0,
    width: '100%',
    justifyContent: 'flex-end' as const,
  },
  contents: {
    width: '100%',
  },
  text: {
    wordBreak: 'keep-all' as const,
    whiteSpace: 'pre' as const,
    position: 'absolute' as const,
    left: 0,
  },
}

export default CalendarDateStyle
