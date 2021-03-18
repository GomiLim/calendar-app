import React from 'react'
import { useClickPreventionOnDoubleClick } from '../utils/hooks'

interface Props {
  children?: React.ReactNode | React.ReactNode[]
  direction?: 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
  onDoubleClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
  refObj?: React.RefObject<HTMLDivElement> | null
  id?: string
}

export default function Box({
  children,
  direction,
  style = {},
  className = '',
  onClick,
  onDoubleClick,
  refObj,
  id,
}: Props) {
  let handleClick = onClick
  let handleDoubleClick = onDoubleClick

  if (onClick && onDoubleClick) {
    const [hookedClick, hookedDoubleClick] = useClickPreventionOnDoubleClick(
      onClick,
      onDoubleClick,
    )
    handleClick = hookedClick
    handleDoubleClick = hookedDoubleClick
  }

  const directionStyle: React.CSSProperties = {}

  if (direction === 'vertical') {
    directionStyle.flexDirection = 'column'
  } else if (direction === 'horizontal') {
    directionStyle.flexDirection = 'row'
  }

  return (
    <div
      id={id}
      className={`fd-box ${className}`}
      style={{ ...style, ...directionStyle }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={refObj}>
      {children}
    </div>
  )
}
