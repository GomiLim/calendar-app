import theme from '../../theme'

const DueScheduleListStyle = {
  nodata: {
    width: '100%',
    minHeight: '3rem',
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderBottom: `0.063rem solid ${theme.palette.mono.paleWhite}`,
    backgroundColor: 'transparent' as const,
    color: theme.palette.mono.gray,
    ...theme.font.list,
  },
}

export default DueScheduleListStyle
