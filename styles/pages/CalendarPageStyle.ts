import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const CalendarPageStyle = {
  container: tw(styled.div`
    height: calc(var(--vh, 1vh) * 100);
    overscroll-behavior: none;
  `)`
    justify-center
  `,
  rightContainer: tw.div`
    bg-mono-white
    border-left
    border-mono-paleWhite
  `,
}

export default CalendarPageStyle
