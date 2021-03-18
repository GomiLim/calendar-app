import React from 'react'

interface Props {
  value: string
  style?: React.CSSProperties
  className?: string
}

export default function Text({ value, style, className = '' }: Props) {
  return (
    <span className={`fd-text ${className}`} style={style}>
      {value}
    </span>
  )
}
