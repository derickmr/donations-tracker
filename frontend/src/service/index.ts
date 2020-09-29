import axios from 'axios'

const requestAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export class Api {
  static getONGs() {
    return requestAxios.get('/ong')
  }
}
