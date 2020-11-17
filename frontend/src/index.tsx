import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import {
  DonationPage,
  Home,
  ONGDetail,
  DonationsList,
  RegisterPage,
  LoginPage,
} from './pages'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Home} />
      <Route path='/donate/:id' component={DonationPage} />
      <Route path='/ong/:id' component={ONGDetail} />
      <Route path='/donations' component={DonationsList} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
