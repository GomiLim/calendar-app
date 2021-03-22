import tw from 'tailwind-styled-components'
import theme from '../../theme'

const KeywordAutocompleteStyle = {
  exterior: tw.div`
    z-20
    bg-transparent
    fixed
    h-full
    w-full
    top-0
    left-0
  `,
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
    max-w-sm
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
  nodata: {
    ...theme.font.list,
    color: theme.palette.mono.darkGray,
  },
  autoData: {
    ...theme.font.list,
    color: theme.palette.mono.black,
  },
}

export default KeywordAutocompleteStyle
