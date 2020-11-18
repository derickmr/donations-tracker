export interface User {
  firstName: string
  lastName: string
  email: string
  isAuthenticated: boolean
  token: any
}

export class UpdateUser {
  firstName: string
  lastName: string
  email: string

  constructor(firstName:string, lastName:string, email:string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

}

export interface Donation {
  id: number
  amount: number
  projectId: string
}
