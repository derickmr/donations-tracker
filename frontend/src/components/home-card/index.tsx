import React from 'react'
import { Link } from 'react-router-dom'

import { HomeCardProps } from './types'

import './index.css'

export function HomeCard(props: HomeCardProps) {
  const { name, mission, logoUrl } = props
  return (
    <div className='home-card'>
      <div className='home-card-image'>
        <img src={logoUrl} alt={name} />
      </div>
      <div className='home-card-details'>
        <h3>{name}</h3>
        <div className='mission'>
          <h4>{mission}</h4>
        </div>

        <Link className='link' to='/'>
          ver mais
        </Link>
      </div>
    </div>
  )
}
