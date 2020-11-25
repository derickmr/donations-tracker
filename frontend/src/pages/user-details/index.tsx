import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

import { Header, Loader, Button, Input } from '../../components'

import { Api } from '../../service'

import { UpdateUser, User } from './types'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  isAuthenticated: false,
  token: '',
}

export function UserDetails() {
  const history = useHistory()

  const [details, setDetails] = useState<User>(initialValues)
  const [form, setForm] = useState<User>(initialValues)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const email = localStorage.getItem('email')
      const { data } = await Api.getUser(email!)
      setDetails(data)
      setForm(data)
      setIsLoading(false)
    }

    const isLogged = localStorage.getItem('token')

    if (!isLogged) {
      history.replace('/login')
    } else {
      getData()
    }
  }, [history])

  function handleInputChange(name: string, value: string) {
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let updateUser: UpdateUser = new UpdateUser('', '', '')
    updateUser.email = form.email
    updateUser.firstName = form.firstName
    updateUser.lastName = form.lastName

    setIsLoading(true)
    const successfullUpdate = await Api.updateUser(updateUser)
    if (successfullUpdate) {
      setDetails({ ...details, ...updateUser })
    }
    setIsLoading(false)
  }

  async function logout() {
    setIsLoading(true)
    const wasSuccesfullyLogout = await Api.logout(localStorage.getItem('email'))
    if (wasSuccesfullyLogout) {
      setIsLoading(false)
      history.replace('/login')
    }
  }

  function renderEmail() {
    return (
      <div className='input-wrapper'>
        <label>Email</label>
        <p>{form.email}</p>
      </div>
    )
  }

  function renderForm() {
    return (
      <form id='userForm'>
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
          {renderEmail()}
          <Button label='Atualizar dados' onClick={handleSubmit} />
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

    if (details) {
      return (
        <div className='user-detail-content content'>
          <div className='user-details'>
            <div className='image-perfil' />
            <div className='name-wrapper'>
              <h2>{`${details.firstName} ${details.lastName}`}</h2>
              <Button label='Sair' onClick={logout} />
            </div>
          </div>

          <div className='user-details-container'>
            <div className='data-title'>
              <h4>Seus Dados</h4>
              <div />
            </div>
            <div className='info-container'>{renderForm()}</div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className='container'>
      <Header />
      {renderContent()}
    </div>
  )
}
