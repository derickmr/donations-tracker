var braintree = require('braintree-web')
var $ = require('jquery')

var braintreeConfig = {
  styles: {
    '.valid': {
      color: '#4cb371',
    },
    '.invalid': {
      color: '#f3392f',
    },
  },
  fields: {
    number: {
      selector: '#ggCardNumber',
      placeholder: '4111 1111 1111 1111',
    },
    cvv: {
      selector: '#ggCardCvv',
      placeholder: '123',
    },
    expirationDate: {
      selector: '#ggCardExpiration',
      placeholder: 'MM/YYYY',
    },
    postalCode: {
      selector: '#ggCardPostal',
      placeholder: '11111',
    },
  },
}

braintree.client.create(
  {
    authorization: 'sandbox_mbzbpnqn_346mrgcqwkppmnhx', //REPLACE WITH YOUR OWN PAYMENT GATEWAY KEY
  },
  function (err, clientInstance) {
    console.log('entrou')
    if (err) {
      console.log('error initializing payment gateway')
      return
    }

    braintree.hostedFields.create(
      {
        client: clientInstance,
        styles: braintreeConfig.styles,
        fields: braintreeConfig.fields,
      },
      function (hostedFieldsErr, hostedFieldsInstance) {
        if (hostedFieldsErr) {
          console.log('error creating hosted fields')
          return
        }

        var formElement = document.getElementById('ggPaymentForm')

        formElement.addEventListener(
          'submit',
          function (event) {
            event.preventDefault()

            hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
              if (tokenizeErr) {
                console.log('error tokenizing hosted fields')
                return
              }

              $('#paymentNonce').val(payload.nonce)

              var formIsInvalid = false
              var state = hostedFieldsInstance.getState()

              // Loop through the Hosted Fields and check
              // for validity, apply the is-invalid class
              // to the field container if invalid
              Object.keys(state.fields).forEach(function (field) {
                if (!state.fields[field].isValid) {
                  $(state.fields[field].container).addClass('is-invalid')
                  formIsInvalid = true
                }
              })

              if (formIsInvalid) {
                // skip tokenization request if any fields are invalid
                return
              }

              alert(
                'The hidden element with id #paymentNonce has been set to ' +
                  $('#paymentNonce').val() +
                  '. Only remove this alert and ' +
                  'uncomment formElement.trigger("submit") once you replace sandbox_mbzbpnqn_346mrgcqwkppmnhx with your own payment gateway key and setup your own server-side processing / API call.'
              )

              // formElement.trigger('submit');
            }) //end hostedFieldsInstance.tokenize
          },
          false
        ) //end submit event
      }
    ) //end  braintree.hostedFields.create
  }
) //end  braintree.client.create
