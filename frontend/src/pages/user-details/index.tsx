import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

import { Header, Loader, Button } from '../../components'

import { Api } from '../../service'

import { User } from './types'

const MOCKED_USER = {
  data: {
    user: {
      firstName: 'Teste',
      lastName: 'Teste1',
      email: 'teste1@email.com',
      donations: [
        {
          id: 1,
          amount: 123,
          projectId: '4123',
        },
      ],
      isAuthenticated: true,
      token: 'aslfjaslkfjsa',
    },
  },
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  donations: [],
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
      //TODO: get user from be
      // const { data } = await Api.getUser(email);
      const { data } = MOCKED_USER
      setDetails(data.user)
      setForm(data.user)
      setIsLoading(false)
    }

    const isLogged = localStorage.getItem('token')

    if (!isLogged) {
      history.replace('/login')
    } else {
      getData()
    }
  }, [])

  function handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //TODO: call update user from be
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

  function renderForm() {
    return (
      <form id='userForm'>
        <div className='form-row'>
          {renderInputAndLabel('firstName', 'Nome', form.firstName)}
          {renderInputAndLabel('lastName', 'Sobrenome', form.lastName)}
        </div>

        <div className='form-row'>
          {renderInputAndLabel('email', 'Email', form.email)}
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
              <Button label='Sair' onClick={() => {}} />
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
