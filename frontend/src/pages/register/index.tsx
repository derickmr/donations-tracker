import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'

import logo from '../../assets/logoName.png'

import { Header, Button } from '../../components'
import { Form } from './types'

import './index.css'
import { Api } from '../../service'

export function RegisterPage() {
  const history = useHistory()
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    setForm({ ...form, [name]: value })
  }

  function handleSubmit() {
    if (hasEmptyField()) {
      toogleErrorToast('Preencha corretamente todos os campos!')
    } else if (form.password !== form.confirmPassword) {
      toogleErrorToast('As senhas não coincidem!')
    } else {
      createUser()
    }
  }

  async function createUser() {
    const wasSuccesfullyCreate = await Api.registerUser(JSON.stringify(form))
    if (wasSuccesfullyCreate) {
      //TODO redirect to login screen
      history.push('/')
    }
  }

  function hasEmptyField() {
    let hasEmptyField = false

    Object.values(form).forEach((element) => {
      if (!element) {
        hasEmptyField = true
      }
    })

    return hasEmptyField
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

  function renderInputAndLabel(
    id: string,
    label: string,
    value: any,
    type?: string
  ) {
    return (
      <div className='input-register-wrapper'>
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

  function renderForm() {
    return (
      <form className='register-form'>
        {renderInputAndLabel('name', 'Nome', form.name)}
        {renderInputAndLabel('email', 'E-mail', form.email, 'email')}
        {renderInputAndLabel('password', 'Senha', form.password, 'password')}
        {renderInputAndLabel(
          'confirmPassword',
          'Confirmar Senha',
          form.confirmPassword,
          'password'
        )}

        <Button label='Cadastrar' onClick={handleSubmit} />
      </form>
    )
  }

  function renderContent() {
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
