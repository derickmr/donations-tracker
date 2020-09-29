import React from 'react'

import plus from '../../assets/add.svg'

import { HomeCardProps } from './types'

import { ButtonLink } from '../button-link'

import './index.css'

export function HomeCard(props: HomeCardProps) {
  const { name, mission, logoUrl } = props

  function renderButtonIcon() {
    return <img src={plus} alt='ver mais' className='button-icon' />
  }

  return (
    <div className='home-card'>
      <div
        className='home-card-image'
        style={{ backgroundImage: `url(${logoUrl})` }}
      />
      <div className='home-card-details'>
        <h3>{name}</h3>
        <div className='mission'>
          <h4>{mission}</h4>
        </div>
      </div>
      <ButtonLink label='Ver Mais' icon={renderButtonIcon} />
    </div>
  )
}
