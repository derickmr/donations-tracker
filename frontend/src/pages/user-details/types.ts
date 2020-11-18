export interface User {
  firstName: string
  lastName: string
  email: string
  donations: Donation[]
  isAuthenticated: boolean
  token: any
}

export interface Donation {
  id: number
  amount: number
  projectId: string
}
