import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonLinkProps } from './types'

import './index.css'

export function ButtonLink(props: ButtonLinkProps) {
  const { icon, label } = props

  function renderIcon() {
    if (icon) {
      return icon()
    }

    return null
  }
  return (
    <Link className='button-link' to='/'>
      {renderIcon()}
      <span>{label}</span>
    </Link>
  )
}
