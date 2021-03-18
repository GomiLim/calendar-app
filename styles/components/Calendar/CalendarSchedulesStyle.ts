import styled from 'styled-components'
import theme from '../../theme'

const stick = {
  margin: '0.063rem 0 0 0',
  width: '100%',
  height: '1.25rem',
  border: 'none' as const,
}

const CalendarSchedulesStyle = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  flex: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  box: styled.div`
    margin: 0.063rem 0 0 0;
    width: 100%;
    height: 1.25rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
      opacity: 0.5;
    }
  `,
  nullStyle: {
    ...stick,
    zIndex: 1,
    backgroundColor: 'transparent' as const,
  },
  sub: {
    ...stick,
    opacity: 0.3,
    zIndex: 0,
  },
  subBox: styled.div`
    &:hover {
      box-shadow: inset 100rem 1.25rem ${theme.palette.mono.lightGray};
    }
  `,
  main: {
    ...stick,
    zIndex: 1,
  },
  label: {
    whiteSpace: 'pre' as const,
    wordBreak: 'keep-all' as const,
    zIndex: 2,
    marginRight: 0,
  },
}

export default CalendarSchedulesStyle
