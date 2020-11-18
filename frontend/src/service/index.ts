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

  static async registerUser(data: any) {
    const { status } = await requestAxios.post('/user', data)
    return status === 201
  }

  static async loginUser(data: any) {
    const response = await requestAxios.post('/user/login', data)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("email", response.data.email);
    return response.status === 200;
  }
}
