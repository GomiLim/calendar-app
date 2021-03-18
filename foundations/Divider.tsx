import React from 'react'

interface Props {
  direction: 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

export default function Divider({
  direction,
  style = {},
  className = '',
}: Props) {
  const directionStyle: React.CSSProperties = {}

  if (direction === 'vertical') {
    directionStyle.height = '100%'
    if (!('width' in style) && !className) {
      directionStyle.width = '1px'
    }
  } else {
    directionStyle.width = '100%'
    if (!('height' in style) && !className) {
      directionStyle.height = '1px'
    }
  }

  return (
    <div
      className={`fd-divider ${className}`}
      style={{ ...style, ...directionStyle }}
    />
  )
}
