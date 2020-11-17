import React from 'react'

import { ButtonProps } from './types'

import './index.css'

export function Button(props: ButtonProps) {
  const { label, onClick } = props

  return (
    <button type='button' className='button' onClick={onClick}>
      {label}
    </button>
  )
}
