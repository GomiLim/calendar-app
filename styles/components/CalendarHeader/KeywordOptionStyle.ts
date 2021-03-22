import tw from 'tailwind-styled-components'

const KeywordOptionStyle = {
  exterior: tw.div`
    fixed
    h-full
    w-full
    z-20
    top-0
    left-0
  `,
  container: tw.div`
    z-30
    absolute
    left-44
    top-10
    rounded-lg
    border-none
    shadow-md
    bg-mono-lightGray
    pl-2
    pr-2
    pt-1
    pb-1
    cursor-pointer
  `,
  item: tw.div`
    flex
    justify-start
    items-center
    mt-1
    mb-1
    cursor-pointer
  `,
  radio: tw.div`
    rounded-full
    border-mono-darkGray
    border-solid
    border-l
    border-r
    border-t
    border-b
    bg-transparent
    p-0\.5
    mr-2
    w-5
    h-5
  `,
  selected: tw.div`
    rounded-full
    border-none
    bg-main-turquoise
    w-3\.5
    h-3\.5
  `,
}

export default KeywordOptionStyle
