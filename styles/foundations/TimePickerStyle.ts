import styled, { css } from 'styled-components'
import { StyledPropType } from '../theme'

const TimePickerStyle = {
  container: styled.div`
    width: 45%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-left: 30%;
    position: absolute;
    bottom: 4.375rem;
  `,
  picker: styled.div`
    width: calc(100% - 0.313rem);
    height: 2.188rem;
    cursor: pointer;
    border: none;
    border-radius: 1.875rem;

    & * {
      cursor: pointer;
    }

    & .time-picker {
      width: 90%;
      text-align-last: center;
    }

    ${(props: StyledPropType) => css`
      & .time-picker .rc-time-picker-input {
        padding-right: 0.938rem;
        background-color: ${props.theme.palette.mono.lightGray};
        font-weight: ${props.theme.font.text.fontWeight};
        font-size: ${props.theme.font.text.fontSize};
        border: none;
        border-radius: 1.875rem;
        color: ${props.theme.palette.mono.black};
        height: 1.813rem;
      }

      & .time-picker .rc-time-picker-clear {
        padding-right: 0.938rem;
      }

      & .rc-time-picker-clear-icon {
        color: ${props.theme.palette.main.red};
        margin-bottom: 0.125rem;
      }

      & .rc-time-picker-panel {
        color: ${props.theme.palette.mono.gray};
      }
    `}
  `,
}

export default TimePickerStyle
