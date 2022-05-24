export interface Address {
  id: number
  firstName: string | null
  lastName: string | null
  organisationName: string | null
  street: string | null
  premise: string | null
  city: string
  postalCode: string
  country: string | null
  user: null
  warehouse: null
}

export interface User {
  id: number
  accessCode: string | null
  userName: string
  email: string
  remember: boolean | null
  language: string
  appearance: string
  address: Address
  shoppingSession: null
}

export const user: User = {
  id: 1,
  accessCode: null,
  userName: 'user',
  email: 'user@user.com',
  remember: null,
  language: 'en',
  appearance: 'MEDIA',
  address: {
    id: 2,
    firstName: null,
    lastName: null,
    organisationName: null,
    street: 'Zeughausstrasse 6',
    premise: null,
    city: 'Frauenfeld',
    postalCode: '8500',
    country: null,
    user: null,
    warehouse: null,
  },
  shoppingSession: null,
}
