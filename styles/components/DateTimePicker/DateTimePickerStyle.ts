import styled, { css } from 'styled-components'
import { StyledPropType } from '../../theme'

const DatePickerStyle = {
  exterior: styled.div`
    background-color: transparent;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
  `,
  container: styled.div`
    border: none;
    border-radius: 0.625rem;
    z-index: 101;
    position: absolute;
    width: 17.5rem;

    & * {
      cursor: pointer;
    }

    & .react-date-picker__calendar {
      z-index: 102;
      width: 17.5rem;
      bottom: unset !important;
    }

    & .react-date-picker__calendar--closed {
      display: block;
    }

    & .react-date-picker__button {
      display: none;
    }

    & .react-date-picker__inputGroup {
      display: none;
    }

    &
      .react-date-picker__inputGroup__input
      .react-date-picker__inputGroup__year {
      width: 1.875rem;
    }

    &
      .react-date-picker__inputGroup__input
      .react-date-picker__inputGroup__month {
      width: 0.938rem;
    }

    &
      .react-date-picker__inputGroup__input
      .react-date-picker__inputGroup__date {
      width: 0.938rem;
    }

    & .react-calendar__navigation {
      margin-bottom: 0.313rem;
    }

    & .react-calendar__navigation__label {
      margin-top: 0.313rem;
      border-radius: 0.625rem;
    }

    ${(props: StyledPropType) => css`
      box-shadow: 0 0 0.625rem ${props.theme.palette.mono.gray};
      background-color: ${props.theme.palette.mono.white};

      & .react-calendar__navigation__label__labelText {
        word-break: keep-all;
        font-size: ${props.theme.font.list.fontSize};
        font-weight: ${props.theme.font.list.fontWeight};
      }

      & .react-calendar__month-view__days__day--neighboringMonth {
        opacity: 0.2;
      }

      & .react-date-picker {
        width: 100%;
        text-align: center;
        border-radius: 1.875rem;
        background-color: ${props.theme.palette.mono.white};
      }

      & .react-date-picker__wrapper {
        border: none;
        color: ${props.theme.palette.mono.darkGray};
        padding: 0.313rem;
      }

      & .react-date-picker__inputGroup input {
        color: ${props.theme.palette.mono.gray};
        font-weight: ${props.theme.font.text.fontWeight};
        font-size: ${props.theme.font.text.fontSize};
      }
      & .react-date-picker__inputGroup input:focus {
        background-color: ${props.theme.palette.mono.white};
        border-radius: 1.875rem;
      }
      & .react-date-picker__inputGroup input:active {
        color: ${props.theme.palette.mono.lightGray};
        background-color: ${props.theme.palette.mono.white};
      }

      & .react-date-picker__inputGroup__leadingZero {
        color: ${props.theme.palette.mono.gray};
        font-weight: ${props.theme.font.text.fontWeight};
        font-size: ${props.theme.font.text.fontSize};
      }
      & .react-date-picker__inputGroup__leadingZero:focus {
        background-color: ${props.theme.palette.mono.white};
        border-radius: 1.875rem;
      }
      & .react-date-picker__inputGroup__leadingZero:focus {
        color: ${props.theme.palette.mono.paleWhite};
        background-color: ${props.theme.palette.mono.white};
      }

      & .react-calendar {
        border: none;
        background-color: transparent;
        z-index: 101;
        padding: 0.313rem;
      }

      & .react-calendar__tile {
        background-color: ${props.theme.palette.mono.white};
        z-index: 104;
        width: 2.5rem;
        height: 2.313rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.625rem !important;
      }

      & .react-calendar__tile:hover {
        border-radius: 50%;
      }

      & .react-calendar__month-view__days__day {
        color: ${props.theme.palette.mono.black};
      }

      & .react-calendar__tile--active {
        border-radius: 50%;
        color: ${props.theme.palette.mono.white};
        background-color: ${props.theme.palette.main.blue} !important;
        font-weight: 900;
      }

      & .react-calendar__tile--range {
        border-radius: unset !important;
        color: ${props.theme.palette.mono.white};
        background-color: ${props.theme.palette.main.blue} !important;
        font-weight: 900;
      }

      & .react-calendar__tile--hasActive {
        border-radius: 50%;
        color: ${props.theme.palette.mono.white};
        background-color: ${props.theme.palette.main.blue} !important;
        font-weight: 900;
      }

      & .react-calendar__tile--now {
        color: ${props.theme.palette.sub.paleYellow} !important;
      }

      & .react-calendar__tile--rangeStart {
        border-radius: 50% 0 0 50% !important;
      }

      & .react-calendar__tile--rangeEnd {
        border-radius: 0 50% 50% 0 !important;
      }

      & .react-calendar__tile--rangeBothEnds {
        border-radius: 50% !important;
      }

      &
        .react-calendar__tile--rangeBothEnds.react-calendar__year-view__months__month {
        border-radius: 0.625rem !important;
      }

      & .react-calendar__tile:disabled {
        background-color: ${props.theme.palette.mono.white};
        color: ${props.theme.palette.mono.paleWhite};
      }

      & .react-calendar__navigation__arrow {
        font-size: ${props.theme.font.titleMedium.fontSize};
        font-weight: ${props.theme.font.titleMedium.fontWeight};
        color: ${props.theme.palette.sub.lightBlue};
      }

      & .react-calendar__navigation__arrow:disabled {
        background-color: ${props.theme.palette.mono.white};
        color: ${props.theme.palette.mono.white};
      }

      & .react-calendar__month-view__days__day--weekend {
        color: ${props.theme.palette.main.red};
      }

      & .react-calendar__month-view__weekdays__weekday {
        color: ${props.theme.palette.mono.paleBlack};
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}
  `,
}

export default DatePickerStyle
