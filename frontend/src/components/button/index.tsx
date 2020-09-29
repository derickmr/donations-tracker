import React from 'react'

import { ButtonProps } from './types'

import './index.css'

export function Button(props: ButtonProps) {
  const { label } = props

  return (
    <button type='button' className='button'>
      {label}
    </button>
  )
}
