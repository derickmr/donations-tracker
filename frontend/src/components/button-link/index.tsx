import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonLinkProps } from './types'

import './index.css'

export function ButtonLink(props: ButtonLinkProps) {
  const { icon, label, url } = props

  function renderIcon() {
    if (icon) {
      return icon()
    }

    return null
  }
  return (
    <Link className='button-link' to={url}>
      {renderIcon()}
      <span>{label}</span>
    </Link>
  )
}
