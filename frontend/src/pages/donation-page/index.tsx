import './types';
import React, { useState, useEffect } from 'react'
import { Form } from './types';

export class DonationPage extends React.Component<{}, Form> {
    constructor(props: any) {
      super(props);
      this.state = {firstName: '',
                    lastName: '',
                    projectId: '',
                    amount: 0.00,
                    email: '',
                    cardNumber: '',
                    expirationDate: '',
                    cvv: '',
                    postalCode: ''};

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const clientScript = document.createElement("script");
        clientScript.src = "https://js.braintreegateway.com/web/3.6.2/js/client.js";
        clientScript.async = true;
        document.body.appendChild(clientScript);

        const hostedFieldsScript = document.createElement("script");
        hostedFieldsScript.src = "https://js.braintreegateway.com/web/3.6.2/js/hosted-fields.js";
        hostedFieldsScript.async = true;
        document.body.appendChild(hostedFieldsScript);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        } as Pick<Form, keyof Form>);
      }

    handleSubmit(event: any) {
      alert('Form submited');
      event.preventDefault();
    }

    render() {
      return (
          <>
        <form id="ggPaymentForm">
        <input type="hidden" name="paymentNonce" id="paymentNonce"/>
        <label>
          ID do projeto:
          <input
            id="projectId"
            name="projectId"
            type="string"
            value={this.state.projectId}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Nome:
          <input
            id="firstName"
            name="firstName"
            type="string"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Sobrenome:
          <input
            id="lastName"
            name="lastName"
            type="string"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input
            id="email"
            name="email"
            type="string"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Código postal:
          <input
            id="postalCode"
            name="postalCode"
            type="string"
            value={this.state.postalCode}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Número do cartão:
          <input
            id="cardNumber"
            name="cardNumber"
            type="string"
            value={this.state.cardNumber}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          CVV:
          <input
            id="cvv"
            name="cvv"
            type="string"
            value={this.state.cvv}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Valido até:
          <input
            id="expirationDate"
            name="expirationDate"
            type="string"
            value={this.state.expirationDate}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Valor doado:
          <input
            id="amount"
            name="amount"
            type="double"
            value={this.state.amount}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Enviar" />
      </form>
      </>
      );
    }
  }