import React from 'react'

import { Button } from '../button'

import './index.css'

export function SearchOng() {
  return (
    <div className='search-wrapper'>
      <div className='search-content'>
        <h2>Explorar ONGs</h2>
        <div className='input-button-wrapper'>
          <input type='text' placeholder='Buscar por nome' />
          <Button label='Pesquisar' onClick={() => {}} />
        </div>
      </div>
    </div>
  )
}
