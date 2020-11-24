import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'

import { Header, Loader, ONGTheme, ButtonLink } from '../../components'

import { Api } from '../../service'

import { RouteParams, ONG } from './types'

export function ONGDetail() {
  let { id } = useParams<RouteParams>()

  const [details, setDetails] = useState<ONG | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const { data } = await Api.getONGDetail(id)
      setDetails(data.organization)

      setIsLoading(false)
    }

    getData()
  }, [id])

  function renderThemes() {
    return details?.themes.theme.map((theme) => {
      return <ONGTheme key={theme.id} themeName={theme.name} />
    })
  }

  function renderDonationButton() {
    const isLogged = localStorage.getItem('token')
    if (isLogged) {
      return <ButtonLink label='Doar valor' url={`/donate/${details?.id}`} />
    }

    return null
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div className='loader-container'>
          <Loader />
        </div>
      )
    }

    if (details) {
      return (
        <div className='ong-detail-content content'>
          <div className='image-banner' />
          <div className='ong-buttons-container'>
            <div>{renderDonationButton()}</div>
          </div>
          <div className='details-container'>
            <div className='info-container'>
              <img src={details.logoUrl} className='detail-logo' alt='logo' />
              <div className='info-wrapper'>
                <h1 className='name'>{details.name}</h1>
                <h2 className='info'>
                  {details.city}, {details.state}, {details.country}
                </h2>
                <h2 className='info'>
                  Projetos totais: {details.totalProjects}
                </h2>
                <h2 className='info'>
                  Site:{' '}
                  <a href={details.url} target='blank'>
                    {details.url}
                  </a>
                </h2>
              </div>
            </div>
            <p className='detail-mission'>{details.mission}</p>
            <div className='themes-container'>{renderThemes()}</div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className='container'>
      <Header />
      {renderContent()}
    </div>
  )
}
