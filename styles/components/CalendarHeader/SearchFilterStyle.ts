import tw from 'tailwind-styled-components'
import theme from '../../theme'

const SearchFilterStyle = {
  container: tw.div`
    flex
    justify-start
    items-center
  `,
  selectorBtn: {
    ...theme.font.titleLarge,
    width: '2rem',
    height: '2rem',
    padding: '0.25rem',
    borderRadius: '99999px',
    cursor: 'pointer' as const,
    marginLeft: '0.5rem',
  },
}

export default SearchFilterStyle
