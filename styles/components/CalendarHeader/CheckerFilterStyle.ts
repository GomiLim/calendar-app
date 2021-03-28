import tw from 'tailwind-styled-components'

const CheckerFilterStyle = {
  container: tw.div`
    flex
    justify-center
    items-center
    ml-7
  `,
  item: {
    container: tw.div`
      flex
      justify-center
      items-center
      cursor-pointer
      ml-2
      mr-2
    `,
  },
}

export default CheckerFilterStyle
