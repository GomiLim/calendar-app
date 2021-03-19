import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'
import { StyledPropType } from '../theme'

const CalendarPageStyle = {
  container: styled.div`
    height: calc(var(--vh, 1vh) * 100);

    ${(props: StyledPropType) => css`
      background-color: ${props.theme.palette.mono.white};
    `}
  `,
  header: styled.div`
    width: 100%;
    height: 5rem;
    padding: 1rem;
    overscroll-behavior: none;
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props: StyledPropType) => css`
      border-bottom: 0.16rem solid ${props.theme.palette.mono.paleWhite};
    `}
  `,
  content: styled.div`
    height: calc(100% - 4.5rem);
    width: 100%;
    justify-content: center;
    overscroll-behavior: none;
  `,
  rightContainer: tw.div`
    bg-mono-white
    border-left
    border-mono-paleWhite
  `,
}

export default CalendarPageStyle
