import axios from 'axios'

const requestAxios = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://donations-tracker-backend.herokuapp.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token'),
  },
})

export class Api {
  static getONGs() {
    return requestAxios.get('/ong')
  }

  static getNextPageONGs(nextProjectID: string) {
    return requestAxios.get(`/ong/${nextProjectID}`)
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
    try {
      const { status } = await requestAxios.post('/user', data)
      return status === 201
    } catch (error) {
      return false
    }
  }

  static async updateUser(user: any) {
    const { status } = await requestAxios.put('/user', user)
    return status === 200
  }

  static async loginUser(data: any) {
    try {
      const response = await requestAxios.post('/user/login', data)
      const requestWasSuccessfull = response.status === 200

      if (requestWasSuccessfull) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
      }
      return requestWasSuccessfull
    } catch (error) {
      return false
    }
  }

  static async getDonations(email: any) {
    const response = await requestAxios.get(`/donation/all/${email}`)
    return response
  }

  static async searchDonations(donationId: any) {
    const response = await requestAxios.post('/donation/search/', {
      projectId: donationId,
    })
    return response
  }

  static async logout(email: string | null) {
    const response = await requestAxios.post('/user/logout', { email })
    const requestWasSuccessfull = response.status === 200

    if (requestWasSuccessfull) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    }

    return requestWasSuccessfull
  }
}
