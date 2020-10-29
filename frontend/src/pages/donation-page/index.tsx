import React, { useState, useEffect } from 'react'
import { Form } from './types'

import { Header } from '../../components'

import './index.css'

export function DonationPage() {
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    projectId: '',
    amount: 0.0,
    email: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    postalCode: '',
    paymentNonce: '',
  })

  useEffect(() => {
    require('./braintree-script.js')
  }, [])

  function handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    setForm({ ...form, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(form.amount)
    console.log(form.firstName)
    console.log(form.lastName)
    console.log(form.email)
    //TODO send to backend endpoint to register donation
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
          {renderInputAndLabel('projectId', 'ID do projeto', form.projectId)}
          {renderInputAndLabel('firstName', 'Nome', form.firstName)}
        </div>

        <div className='form-row'>
          {renderInputAndLabel('lastName', 'Sobrenome', form.lastName)}
          {renderInputAndLabel('email', 'Email', form.email)}
        </div>

        <div className='form-row'>
          {renderPaymentFields('ggCardNumber', 'Número do cartão')}
          {renderPaymentFields('ggCardExpiration', 'Data de expiração')}
        </div>

        <div className='form-row'>
          {renderPaymentFields('ggCardCvv', 'CVV')}
          {renderPaymentFields('ggCardPostal', 'Código postal')}
        </div>

        <div className='form-row'>
          {renderInputAndLabel('amount', 'Valor doado', form.amount, 'double')}

          <input type='submit' value='Enviar' className='submit-button' />
        </div>
      </form>
    )
  }

  function renderContent() {
    return (
      <div className='content'>
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
