import React from 'react'

interface Props {
  value: string
  style?: React.CSSProperties
  className?: string
  dataTestId?: string
}

export default function Text({
  value,
  style,
  className = '',
  dataTestId = '',
}: Props) {
  return (
    <span
      className={`fd-text ${className}`}
      style={style}
      data-testid={dataTestId}>
      {value}
    </span>
  )
}
