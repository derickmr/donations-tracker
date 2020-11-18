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

  static getONGDetail(id: string) {
    return requestAxios.post('/ong/byId', { ongId: id })
  }

  static donateToONG() {
    return requestAxios.get('/donate')
  }

  static saveDonation(form: any) {
    return requestAxios.post('/donation/save', form)
  }

  static getUser(email: string){
    return requestAxios.post('/user', email);
  }
}
