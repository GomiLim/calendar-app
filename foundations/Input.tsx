import React from 'react'

type InputTypes =
  | 'email'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: number | string
  type?: InputTypes
  refObj?: React.RefObject<HTMLInputElement> | null
  name?: string
  placeholder?: string
  onFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void
  onKeyUp?: (e?: React.KeyboardEvent<HTMLInputElement>) => void
  onSubmit?: () => void
  style?: React.CSSProperties
  className?: string
}

export default function Input({
  onChange,
  value,
  type,
  refObj,
  name,
  placeholder,
  onFocus,
  onBlur,
  onKeyUp,
  onSubmit,
  style,
  className = '',
}: Props) {
  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      if (onSubmit) {
        onSubmit()
      }
    }
  }

  return (
    <input
      type={type}
      ref={refObj}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp || enter}
      className={`fd-input ${className}`}
      style={style}
    />
  )
}
