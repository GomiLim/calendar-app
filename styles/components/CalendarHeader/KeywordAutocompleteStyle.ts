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
    wordBreak: 'keep-all' as const,
    whiteSpace: 'pre-line' as const,
  },
  autoData: {
    ...theme.font.list,
    color: theme.palette.mono.black,
    wordBreak: 'keep-all' as const,
    whiteSpace: 'pre-line' as const,
  },
  autoDataSub: {
    ...theme.font.sub,
    color: theme.palette.mono.gray,
    wordBreak: 'keep-all' as const,
    whiteSpace: 'pre-line' as const,
  },
  input: {
    background: 'transparent' as const,
    border: 'none' as const,
    height: '1.5rem',
    padding: 0,
    ...theme.font.list,
  },
  delete: {
    ...theme.font.list,
    cursor: 'pointer' as const,
    zIndex: 1,
    position: 'absolute' as const,
    left: '23.3rem',
  },
}

export default KeywordAutocompleteStyle
