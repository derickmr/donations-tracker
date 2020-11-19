import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

import { Header, ButtonLink, Loader } from '../../components'

import { Api } from '../../service'

import { Donation } from './types'

export function DonationsList() {
  const history = useHistory()

  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const { data } = await Api.getDonations(localStorage.getItem("email"));
      setDonations(data.organization)

      setIsLoading(false)
    }

    const isLogged = localStorage.getItem('token')

    if (!isLogged) {
      history.replace('/login')
    } else {
      getData()
    }
  }, [])

  function renderDonation(donation: Donation) {
    return (
      <tr key={donation.id}>
        <th>{donation.id}</th>
        <td>{`ONG ${donation.projectId}`}</td>
        <td>{`R$ ${donation.amount}`}</td>
        <td>{new Date(donation.date).toLocaleDateString()}</td>
        <td>
          <ButtonLink label='Ver ONG' url={`/ong/${donation.projectId}`} />
        </td>
      </tr>
    )
  }

  function renderDonations() {
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ONG</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{donations.map((donation) => renderDonation(donation))}</tbody>
      </table>
    )
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
      <div className='content donations-list'>
        <div className='image-banner' />
        <div className='donations-page-title'>
          <h1>Minhas Doações</h1>
        </div>
        <div className='donations-wrapper'>{renderDonations()}</div>
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
