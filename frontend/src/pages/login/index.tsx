import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

import { Header, Button, Input } from '../../components'
import { Form } from './types'

import './index.css'
import { Api } from '../../service'
import { hasEmptyFields } from '../../utils'

export function LoginPage() {
  const history = useHistory()
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  })

  function handleInputChange(name: string, value: string) {
    setForm({ ...form, [name]: value })
  }

  function handleSubmit() {
    if (hasEmptyFields(form)) {
      toogleErrorToast('Preencha corretamente todos os campos!')
    } else {
      login()
    }
  }

  async function login() {
    const wasSuccesfullyLoggedIn = await Api.loginUser(JSON.stringify(form))
    console.log(wasSuccesfullyLoggedIn)
    if (wasSuccesfullyLoggedIn) {
      history.push('/')
    } else {
      toogleErrorToast('Ocorreu um erro ao fazer o login')
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
      <form className='login-form'>
        <Input
          id='email'
          label='E-mail'
          onChange={handleInputChange}
          value={form.email}
        />
        <Input
          id='password'
          label='Senha'
          onChange={handleInputChange}
          value={form.password}
          type='password'
        />
        <Button label='Entrar' onClick={handleSubmit} />
      </form>
    )
  }

  function renderContent() {
    return (
      <div className='login-content content'>
        <div className='logo-wrapper'>
          <img src={logo} alt='donations tracker' className='logo' />
        </div>
        <div className='login-form-wrapper'>
          <h3>Faça Login</h3>
          {renderForm()}
          <h4>
            ou <Link to='/register'>Cadastre-se</Link>
          </h4>
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
