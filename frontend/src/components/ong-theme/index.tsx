import React from 'react'

import { ONGThemeProps } from './types'

import './index.css'

export function ONGTheme(props: ONGThemeProps) {
  const { themeName } = props
  return <h4 className='themeName'>{themeName}</h4>
}
