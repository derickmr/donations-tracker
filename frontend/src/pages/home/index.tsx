import React, { useState, useEffect } from 'react'
import './index.css'

import { HomeCard, Header, Loader } from '../../components'

import { Api } from '../../service'

import { ONG } from './types'

export function Home() {
  const [listOngs, setListOngs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const { data } = await Api.getONGs()
      setListOngs(data.organization)
      setIsLoading(false)
    }

    getData()
  }, [])

  function renderONGs() {
    return listOngs.map((ong: ONG) => {
      return <HomeCard key={ong.id} {...ong} />
    })
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div className='loader-container'>
          <Loader />
        </div>
      )
    }

    return <div className='content'>{renderONGs()}</div>
  }

  return (
    <div>
      <Header />
      {renderContent()}
    </div>
  )
}
