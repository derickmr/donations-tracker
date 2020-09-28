import React from 'react'
import './index.css'

import { HomeCard, Header } from '../../components'

export function Home() {
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
