import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

export function HomeCard() {
  return (
    <div className='home-card'>
      <img
        src='https://istoe.com.br/wp-content/uploads/sites/14/2020/04/ajuda-ongs.jpg'
        alt='ONGs'
        className='home-card-image'
      />
      <div className='home-card-details'>
        <h3>Nome</h3>
        <h4>Detalhe</h4>
        <Link className='link' to='/sobre'>
          ver mais
        </Link>
      </div>
    </div>
  )
}
