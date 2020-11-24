import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

import { Header, Loader, Button } from '../../components'

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

  function handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let updateUser: UpdateUser = new UpdateUser('', '', '')
    updateUser.email = form.email
    updateUser.firstName = form.firstName
    updateUser.lastName = form.lastName

    const successfullUpdate = Api.updateUser(updateUser)
    if (successfullUpdate) {
      window.location.reload()
    }
  }

  async function logout() {
    const wasSuccesfullyLogout = Api.logout(localStorage.getItem('email'))
    if (wasSuccesfullyLogout) {
      history.replace('/login')
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

  function renderReadOnlyInputAndLabel(
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
          readOnly
          onChange={handleInputChange}
        />
      </div>
    )
  }

  function renderForm() {
    return (
      <form id='userForm'>
        <div className='form-row'>
          {renderInputAndLabel('firstName', 'Nome', form.firstName)}
          {renderInputAndLabel('lastName', 'Sobrenome', form.lastName)}
        </div>

        <div className='form-row'>
          {renderReadOnlyInputAndLabel('email', 'Email', form.email)}
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
      const { firstName, lastName } = details

      return (
        <div className='user-detail-content content'>
          <div className='user-details'>
            <div className='image-perfil' />
            <div className='name-wrapper'>
              <h2>{`${firstName} ${lastName}`}</h2>
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
