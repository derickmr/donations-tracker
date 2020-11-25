import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { useHistory } from 'react-router-dom'

import logo from '../../assets/logoName.png'

import { Header, Button, Input, Loader } from '../../components'
import { Form } from './types'

import './index.css'
import { Api } from '../../service'
import { hasEmptyFields } from '../../utils'

export function RegisterPage() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleInputChange(name: string, value: string) {
    setForm({ ...form, [name]: value })
  }

  function handleSubmit() {
    if (hasEmptyFields(form)) {
      toogleErrorToast('Preencha corretamente todos os campos!')
    } else if (form.password !== form.confirmPassword) {
      toogleErrorToast('As senhas não coincidem!')
    } else {
      createUser()
    }
  }

  async function createUser() {
    setIsLoading(true)
    const wasSuccesfullyCreate = await Api.registerUser(JSON.stringify(form))
    if (wasSuccesfullyCreate) {
      setIsLoading(false)
      history.push('/login')
    } else {
      setIsLoading(false)
      toogleErrorToast('Ocorreu um erro ao cadastrar.')
    }
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
      <form className='register-form'>
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
        <Input
          id='email'
          label='E-mail'
          onChange={handleInputChange}
          value={form.email}
          type='email'
        />
        <Input
          id='password'
          label='Senha'
          onChange={handleInputChange}
          value={form.password}
          type='password'
        />
        <Input
          id='confirmPassword'
          label='Confirmar Senha'
          onChange={handleInputChange}
          value={form.confirmPassword}
          type='password'
        />

        <Button label='Cadastrar' onClick={handleSubmit} />
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
      <div className='register-content content'>
        <div className='register-form-wrapper'>
          <img src={logo} alt='donations tracker' className='logo' />
          <h4>Realize seu cadastro</h4>
          <h4>e tenha controle de suas doações</h4>
          {renderForm()}
        </div>
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
