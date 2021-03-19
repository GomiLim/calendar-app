const CalendarDateStyle = {
  selectable: {
    width: 'calc(100% / 7)',
    margin: 0,
    cursor: 'pointer' as const,
    background: 'transparent' as const,
    alignSelf: 'stretch' as const,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start' as const,
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
