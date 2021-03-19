import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'
import theme, { StyledPropType } from '../../theme'

const ScheduleItemStyle = {
  container: styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    padding: 0.4rem 0;

    ${(props: StyledPropType) => css`
      border-bottom: 0.063rem solid ${props.theme.palette.mono.paleWhite};

      &:hover {
        background-color: ${props.theme.palette.mono.paleWhite};
      }
    `}
  `,
  color: {
    width: '2rem',
    height: '2rem',
    border: 'none' as const,
    borderRadius: '50%',
    margin: '0.5rem',
    color: theme.palette.mono.white,
    ...theme.font.list,
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  infoContainer: {
    width: 'calc(100% - 3.5rem)',
  },
  top: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  mainLabel: {
    color: theme.palette.mono.darkGray,
    lineClamp: 2,
    ...theme.font.sub,
  },
  bottomLabel: {
    color: theme.palette.mono.darkGray,
    ...theme.font.small,
  },
  schedule: {
    marginRight: '0.4rem',
    color: theme.palette.mono.darkGray,
    ...theme.font.small,
  },
  label: {
    color: theme.palette.mono.black,
    ...theme.font.list,
  },
  mainLabelArea: {
    margin: '0.4rem 0',
    width: '100%',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  lineClamp: styled.div`
    white-space: pre;
    max-height: 2rem;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  thumbnailList: tw.div`
    flex
    justify-end
    items-center
    w-1\/3
    `,
  thumbnail: {
    marginRight: '0.5rem',
    width: '1.5rem',
    height: '1.5rem',
  },
  thumbnailMore: tw.div`
    rounded-full
    border-none
    bg-main-navy
    text-mono-white
    flex
    justify-center
    items-center
    text-sub
    w-6
    h-6
    mr-2
    pb-0.5
  `,
}

export default ScheduleItemStyle
