import tw from 'tailwind-styled-components'
import theme from '../../theme'

const KeywordAutocompleteStyle = {
  container: tw.div`
    bg-mono-white
    z-30
    absolute
    left-48
    top-14
    rounded-lg
    border-none
    bg-mono-lightGray
    shadow-md
    pl-2
    pr-2
    pt-1
    pb-1
    cursor-pointer
    overflow-x-hidden
    overflow-y-scroll
    max-h-60
    max-w-xs
    w-52
    `,
  item: tw.div`
    flex
    justify-start
    items-center
    mt-1
    mb-1
    cursor-pointer
    bg-transparent
    hover:bg-mono-lightGray
  `,
  loading: {
    position: 'initial' as const,
    backgroundColor: 'transparent' as const,
  },
  nodata: {
    ...theme.font.list,
    color: theme.palette.mono.darkGray,
  },
  autoData: {
    ...theme.font.list,
    color: theme.palette.mono.black,
  },
  input: {
    background: 'transparent' as const,
    border: 'none' as const,
    height: '1.5rem',
    padding: 0,
    ...theme.font.list,
  },
}

export default KeywordAutocompleteStyle
