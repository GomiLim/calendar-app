import styled from 'styled-components'
import theme from '../../theme'

const CalendarDateContainerStyle = {
  container: styled.div`
    width: 100%;
    max-height: calc(100vh - 7rem);
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    touch-action: pan-y;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  row: {
    justifyContent: 'space-between' as const,
    width: '100%',
    minHeight: '7.5rem',
    maxHeight: '21.875rem',
    borderTop: `0.063rem solid ${theme.palette.mono.gray}`,
    margin: 0,
    alignItems: 'flex-start' as const,
  },
}

export default CalendarDateContainerStyle
