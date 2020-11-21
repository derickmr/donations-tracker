import axios from 'axios'
import { User } from '../pages/user-details/types'

const requestAxios = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com//donations-tracker-backend.herokuapp.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
  },
});

export class Api {
  static getONGs() {
    return requestAxios.get('/ong')
  }

  static getONGDetail(id: string) {
    return requestAxios.post('/ong/byId', { ongId: id })
  }

  static donateToONG() {
    return requestAxios.get('/donate')
  }

  static saveDonation(form: any) {
    return requestAxios.post('/donation/save', form)
  }

  static getUser(email: string) {
    const response = requestAxios.get(`/user/search/${email}`)
    return response
  }

  static async registerUser(data: any) {
    const { status } = await requestAxios.post('/user', data)
    return status === 201
  }

  static async updateUser(user: any) {
    const { status } = await requestAxios.put('/user', user)
    return status === 201
  }

  static async loginUser(data: any) {
    const response = await requestAxios.post('/user/login', data)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('email', response.data.email)
    return response.status === 200
  }

  static async getDonations(email: any) {
    const response = await requestAxios.get(`/donation/all/${email}`)
    return response;
  }
}
