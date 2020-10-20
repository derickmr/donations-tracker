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

  handleSubmit(event: any) {
    alert('Form submited')
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

  renderForm() {
    return (
      <form id='ggPaymentForm'>
        <input type='hidden' name='paymentNonce' id='paymentNonce' />
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
          {this.renderInputAndLabel(
            'postalCode',
            'Código postal',
            this.state.postalCode
          )}

          {this.renderInputAndLabel(
            'cardNumber',
            'Número do cartão',
            this.state.cardNumber
          )}
        </div>

        <div className='form-row'>
          {this.renderInputAndLabel('cvv', 'CVV', this.state.cvv)}

          {this.renderInputAndLabel(
            'expirationDate',
            'Valido até',
            this.state.expirationDate
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
