import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { Header, Button, Input, Loader } from '../../components'
import { Form, RouteParams } from './types'

import './index.css'
import { Api } from '../../service'

import {
  hasEmptyFields,
  creditCardNumberMask,
  dateMonthAndYearMask,
  cvvMask,
} from '../../utils'

const INITAL_VALUES = {
  firstName: '',
  lastName: '',
  projectId: '',
  amount: 0.0,
  email: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  postalCode: '',
}

export function DonationPage() {
  const history = useHistory()
  let { id } = useParams<RouteParams>()

  const [form, setForm] = useState<Form>(INITAL_VALUES)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true)
      const email = localStorage.getItem('email')
      const { data } = await Api.getUser(email!)

      setForm({ ...form, ...data, projectId: id })
      setIsLoading(false)
    }

    const isLogged = localStorage.getItem('token')

    if (!isLogged) {
      history.replace('/login')
    } else {
      getUserData()
    }
  }, [history])

  function handleInputChange(name: string, value: string) {
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit() {
    console.log(form)
    if (hasEmptyFields(form)) {
      toogleErrorToast('Preencha corretamente todos os campos!')
    } else if (!form.projectId) {
      toogleErrorToast(
        'Não é possível fazer uma doação sem um projeto selecionado'
      )
    } else {
      saveDonation()
    }
  }

  async function saveDonation() {
    setIsLoading(true)
    await Api.saveDonation(JSON.stringify(form))
    cleanForm()
    setIsLoading(false)
  }

  function cleanForm() {
    const { firstName, lastName, projectId, email } = form
    setForm({ ...INITAL_VALUES, firstName, lastName, projectId, email })
  }

  function toogleErrorToast(message: string) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function renderForm() {
    return (
      <form id='ggPaymentForm' onSubmit={handleSubmit}>
        <div className='form-row'>
          <Input
            id='firstName'
            label='Nome'
            onChange={handleInputChange}
            value={form.firstName}
          />
          <Input
            id='lastName'
            label='Sobrenome'
            onChange={handleInputChange}
            value={form.lastName}
          />
        </div>

        <div className='form-row'>
          <Input
            id='email'
            label='E-mail'
            onChange={handleInputChange}
            value={form.email}
            type='email'
          />
          <Input
            id='postalCode'
            label='Código postal'
            onChange={handleInputChange}
            value={form.postalCode}
          />
        </div>

        <div className='form-row'>
          <Input
            id='cardNumber'
            label='Número do cartão'
            onChange={handleInputChange}
            value={form.cardNumber}
            mask={creditCardNumberMask}
          />
          <Input
            id='expirationDate'
            label='Data de expiração'
            onChange={handleInputChange}
            value={form.expirationDate}
            mask={dateMonthAndYearMask}
          />
        </div>

        <div className='form-row'>
          <Input
            id='cvv'
            label='CVV'
            onChange={handleInputChange}
            value={form.cvv}
            mask={cvvMask}
          />
          <Input
            id='amount'
            label='Valor doado'
            onChange={handleInputChange}
            value={form.amount}
            type='double'
          />
        </div>

        <div className='form-row'>
          <Button label='Enviar' onClick={handleSubmit} />
        </div>
      </form>
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
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
