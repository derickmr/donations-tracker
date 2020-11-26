import React, { useState, useEffect } from 'react'
import './index.css'

import { HomeCard, Header, Loader } from '../../components'

import { Api } from '../../service'

import { ONG } from './types'

export function Home() {
  const [listOngs, setListOngs] = useState<Array<ONG>>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [nextProjectId, setNextProjectId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)

      const { data } = await Api.getONGs()

      setHasNextPage(data.hasNext)
      setNextProjectId(data.nextOrgId)
      setListOngs(data.organization)
      setIsLoading(false)
    }

    getData()
  }, [])

  async function loadMoreOngs() {
    setIsLoading(true)
    const { data } = await Api.getNextPageONGs(nextProjectId)

    setHasNextPage(data.hasNext)
    setNextProjectId(data.nextProjectId)
    const organizations = parseProjectToOng(data.project)
    setListOngs((listOngs) => [...listOngs, ...organizations])
    setIsLoading(false)
  }

  function parseProjectToOng(project: any) {
    return project.map((proj: any) => proj.organization)
  }

  function renderLoadMoreOngs() {
    if (hasNextPage) {
      return (
        <button className='button-load-more' onClick={loadMoreOngs}>
          Carregar Mais
        </button>
      )
    }

    return null
  }

  function renderONGs() {
    return listOngs.map((ong: ONG) => {
      if (ong.id) {
        return <HomeCard key={ong.id} {...ong} />
      }
      return null
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

    return (
      <div className='content home-content'>
        <div className='ongs-wrapper'>{renderONGs()}</div>
        {renderLoadMoreOngs()}
      </div>
    )
  }

  return (
    <div className='container'>
      <Header />
      {renderContent()}
    </div>
  )
}
