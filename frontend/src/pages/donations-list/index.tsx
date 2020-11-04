import React from 'react'
import './index.css'

import { Header, ButtonLink } from '../../components'

import { Donation } from './types'

const MOCKED_DONATIONS = [
  {
    id: 1,
    name: 'Samadhan',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    donatedValue: 'R$ 200,00',
    date: '25/10/2020',
    logoUrl: 'https://www.globalgiving.org/pfil/organ/11/orglogo.jpg',
    ongId: 11,
  },
  {
    id: 2,
    name: 'Ruchika Social Service Organisation',
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    donatedValue: 'R$ 100,00',
    date: '26/10/2020',
    logoUrl: 'http://www.ruchika.org/',
    ongId: 12,
  },
]

export function DonationsList() {
  function renderDonation(donation: Donation) {
    return (
      <tr key={donation.id}>
        <th>{donation.id}</th>
        <td>{donation.name}</td>
        <td>{donation.donatedValue}</td>
        <td>{donation.date}</td>
        <td>
          <ButtonLink label='Ver ONG' url={`/ong/${donation.ongId}`} />
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
        <tbody>
          {MOCKED_DONATIONS.map((donation) => renderDonation(donation))}
        </tbody>
      </table>
    )
  }

  function renderContent() {
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
