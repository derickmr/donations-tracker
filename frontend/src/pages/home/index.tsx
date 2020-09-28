import React from 'react'
import './index.css'

import { HomeCard, Header } from '../../components'

export function App() {
  return (
    <div>
      <Header />
      <div className='content'>
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    </div>
  )
}
