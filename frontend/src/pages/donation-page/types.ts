export interface Form {
  projectId: string
  amount: number
  firstName: string
  lastName: string
  email: string
  cardNumber: string
  expirationDate: string
  cvv: string
  postalCode: string
}

export interface RouteParams {
  id: string
}
