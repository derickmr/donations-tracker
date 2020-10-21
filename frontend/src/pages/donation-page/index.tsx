import React from 'react'
import { Form } from './types'

import { Header } from '../../components'

import './index.css'

export class DonationPage extends React.Component<{}, Form> {
  constructor(props: any) {
    super(props)
    this.state = {
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
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const clientScript = document.createElement('script')
    clientScript.src = 'https://js.braintreegateway.com/web/3.6.2/js/client.js'
    clientScript.async = true
    document.body.appendChild(clientScript)

    const hostedFieldsScript = document.createElement('script')
    hostedFieldsScript.src =
      'https://js.braintreegateway.com/web/3.6.2/js/hosted-fields.js'
    hostedFieldsScript.async = true
    document.body.appendChild(hostedFieldsScript)
  }

  handleInputChange(event: any) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    } as Pick<Form, keyof Form>)
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // alert('Form submited')
    console.log(event)
    event.preventDefault()
  }

  renderInputAndLabel(id: string, label: string, value: any, type?: string) {
    return (
      <div className='input-wrapper'>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          type={type || 'string'}
          value={value}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }

  renderPaymentFields(id: string, label: string, value: any, type?: string) {
    return (
      <div className='input-wrapper'>
        <label htmlFor={id} className='hosted-fields--label'>
          {label}
        </label>
        <div
          id={id}
          className='hosted-field'
          onChange={this.handleInputChange}
        />
      </div>
    )
  }

  renderForm() {
    return (
      <form id='ggPaymentForm' onSubmit={this.handleSubmit}>
        <input
          type='hidden'
          name='paymentNonce'
          id='paymentNonce'
          onChange={this.handleInputChange}
        />
        <div className='form-row'>
          {this.renderInputAndLabel(
            'projectId',
            'ID do projeto',
            this.state.projectId
          )}
          {this.renderInputAndLabel('firstName', 'Nome', this.state.firstName)}
        </div>

        <div className='form-row'>
          {this.renderInputAndLabel(
            'lastName',
            'Sobrenome',
            this.state.lastName
          )}
          {this.renderInputAndLabel('email', 'Email', this.state.email)}
        </div>

        <div className='form-row'>
          {this.renderPaymentFields(
            'ggCardNumber',
            'Número do cartão',
            this.state.cardNumber
          )}
          {this.renderPaymentFields(
            'ggCardExpiration',
            'Data de expiração',
            this.state.expirationDate
          )}
        </div>

        <div className='form-row'>
          {this.renderPaymentFields('ggCardCvv', 'CVV', this.state.cvv)}
          {this.renderPaymentFields(
            'ggCardPostal',
            'Código postal',
            this.state.postalCode
          )}
        </div>

        <div className='form-row'>
          {this.renderInputAndLabel(
            'amount',
            'Valor doado',
            this.state.amount,
            'double'
          )}

          <input type='submit' value='Enviar' className='submit-button' />
        </div>
      </form>
    )
  }

  renderContent() {
    return (
      <div className='content'>
        <div className='image-banner' />
        <div className='form-title'>
          <h1>Formulário de Doação</h1>
        </div>
        {this.renderForm()}
      </div>
    )
  }

  render() {
    return (
      <div className='container'>
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}
