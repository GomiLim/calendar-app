import theme from '../../theme'

const InputKeywordStyle = {
  container: {
    border: `1px solid ${theme.palette.mono.darkGray}`,
    borderRadius: '1rem',
    marginLeft: '0.5rem',
    display: 'flex' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
    width: '15rem',
    height: '2rem',
    padding: '0.25rem',
  },
  filter: {
    ...theme.font.listBold,
    width: '1.7rem',
    height: '1.7rem',
    padding: '0.5rem',
    border: 'none' as const,
    borderRadius: '99999px',
    zIndex: 10,
    cursor: 'pointer' as const,
    position: 'absolute' as const,
    top: '1.6rem',
    left: '10.2rem',
  },
}

export default InputKeywordStyle
