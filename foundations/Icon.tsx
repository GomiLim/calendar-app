import React from 'react'
import * as types from '../utils/types'

interface Props {
  icon: types.Icons
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
}

export default function Icon({ icon, onClick, style, className = '' }: Props) {
  return (
    <i
      className={`fd-icon ${icon} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      style={style}
    />
  )
}
