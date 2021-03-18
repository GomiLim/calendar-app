import React from 'react'

interface Props {
  value: string | React.ReactNode[] | Array<string | React.ReactNode>
  onClick: (e?: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
}

export default function Button({
  value,
  onClick,
  style,
  className = '',
}: Props) {
  return (
    <button onClick={onClick} className={`fd-btn ${className}`} style={style}>
      {value}
    </button>
  )
}
