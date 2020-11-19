import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { Header } from '../../components'
import { Form, RouteParams } from './types'

import './index.css'
import { Api } from '../../service'

export function DonationPage() {
  const history = useHistory()
  let { id } = useParams<RouteParams>()

  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    projectId: id,
    amount: 0.0,
    email: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    postalCode: '',
    paymentNonce: '',
  })

  useEffect(() => {
    const isLogged = localStorage.getItem('token')

    if (!isLogged) {
      history.replace('/login')
    } else {
      require('./braintree-script.js')
    }
  }, [])

  function handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (form.projectId) {
      await Api.saveDonation(JSON.stringify(form))
    }
  }

  function renderInputAndLabel(
    id: string,
    label: string,
    value: any,
    type?: string
  ) {
    return (
      <div className='input-wrapper'>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          type={type || 'string'}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  function renderPaymentFields(id: string, label: string) {
    return (
      <div className='input-wrapper'>
        <label htmlFor={id} className='hosted-fields--label'>
          {label}
        </label>
        <div id={id} className='hosted-field' />
      </div>
    )
  }

  function renderForm() {
    return (
      <form id='ggPaymentForm' onSubmit={handleSubmit}>
        <input
          type='hidden'
          name='paymentNonce'
          id='paymentNonce'
          onChange={handleInputChange}
        />
        <div className='form-row'>
          {renderInputAndLabel('firstName', 'Nome', form.firstName)}
          {renderInputAndLabel('lastName', 'Sobrenome', form.lastName)}
        </div>

        <div className='form-row'>
          {renderInputAndLabel('email', 'Email', form.email)}
          {renderPaymentFields('ggCardPostal', 'Código postal')}
        </div>

        <div className='form-row'>
          {renderPaymentFields('ggCardNumber', 'Número do cartão')}
          {renderPaymentFields('ggCardExpiration', 'Data de expiração')}
        </div>

        <div className='form-row'>
          {renderPaymentFields('ggCardCvv', 'CVV')}
          {renderInputAndLabel('amount', 'Valor doado', form.amount, 'double')}
        </div>

        <div className='form-row'>
          <input type='submit' value='Enviar' className='submit-button' />
        </div>
      </form>
    )
  }

  function renderContent() {
    return (
      <div className='donation-content content'>
        <div className='image-banner' />
        <div className='form-title'>
          <h1>Formulário de Doação</h1>
        </div>
        {renderForm()}
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
