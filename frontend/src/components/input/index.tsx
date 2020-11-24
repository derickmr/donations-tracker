import React from 'react'

import './index.css'

import { InputProps } from './types'

export function Input(props: InputProps) {
  const { label, id, type, value, onChange, mask } = props

  function onChangeValue(event: any) {
    const target = event.target

    if (mask) {
      const maskValue = mask(target.value)
      onChange(id, maskValue)
    } else {
      onChange(id, target.value)
    }
  }

  return (
    <div className='input-wrapper'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type || 'string'}
        value={value}
        onChange={onChangeValue}
      />
    </div>
  )
}
