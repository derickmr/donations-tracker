import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

import { Header, Button } from '../../components'
import { Form } from './types'

import './index.css'
import { Api } from '../../service'

export function LoginPage() {
  const history = useHistory()
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
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
    } else {
      login()
    }
  }

  async function login() {
    const wasSuccesfullyLoggedIn = await Api.loginUser(JSON.stringify(form))
    if (wasSuccesfullyLoggedIn) {
      // history.push('/')
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
    type: string
  ) {
    return (
      <div className='input-register-wrapper'>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  function renderForm() {
    return (
      <form className='login-form'>
        {renderInputAndLabel('email', 'E-mail', form.email, 'email')}
        {renderInputAndLabel('password', 'Senha', form.password, 'password')}
        <Button label='Entrar' onClick={handleSubmit} />
      </form>
    )
  }

  function renderContent() {
    return (
      <div className='login-content content'>
        <div>
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
