import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'

import { Header, Loader, ONGTheme, ButtonLink } from '../../components'

import { Api } from '../../service'

import { RouteParams, User } from './types'

const MOCKED_USER =
{
  "data": {
    "user": {
      "firstName": "user",
      "lastName": "lastname",
      "email": "mail",
      "donations": [
        {
          "id": 1,
          "amount": 123,
          "projectId": "4123"
        }
      ]
      ,
      "isAuthenticated": true,
      "token": "aslfjaslkfjsa"
    }
  }
};

export function UserDetails() {
  // let { id } = useParams<RouteParams>()

  const [details, setDetails] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const { data } = MOCKED_USER;

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      //TODO: get user from be
      // const { data } = await Api.getUser(email);
      setDetails(data.user)

      setIsLoading(false)
    }

    getData()
  }, []);

  function renderForm() {
    return (
      <form id='userForm' onSubmit={handleSubmit}>
        <div className='form-row'>
          {renderInputAndLabel('firstName', 'Nome', details!.firstName)}
          {renderInputAndLabel('lastName', 'Sobrenome', details!.lastName)}
        </div>

        <div className='form-row'>
          {renderInputAndLabel('email', 'Email', details!.email)}
          <input type='submit' value='Atualizar dados' className='submit-button' />
        </div>
      </form>
    )
  }

  function handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    //TODO: handle input change accordingly
    // setDetails({ ...details, [name]: value })
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

  function renderContent(){
    if (details) {
      return (
        <div className='content'>
          <div className='image-perfil' />
          <div className='details-container'>
            <div className='info-container'>
              <div className='info-wrapper'>
              {renderForm()}
              </div>
            </div>
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
