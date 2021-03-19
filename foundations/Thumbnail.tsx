import React from 'react'
import endpointsConfig from '../endpoints.config'

interface Props {
  email: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}

export default function Thumbnail({
  email,
  alt,
  className = '',
  style = {},
}: Props) {
  return (
    <img
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      src={`${endpointsConfig.uriApiApp}/profile/${email}/thumbnail`}
      alt={alt}
      loading="eager"
      className={`fd-thumbnail ${className}`}
      style={style}
    />
  )
}
