import React from 'react'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  style?: React.CSSProperties
  className?: string
}

export default function Form({ children, onSubmit, style, className }: Props) {
  const submitAttempt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form onSubmit={submitAttempt} className={className} style={style}>
      {children}
    </form>
  )
}
