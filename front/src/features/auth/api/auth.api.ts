import { apiUrl } from '../../../app/config'
import type { Credentials, AuthResponse } from '../types'

export const loginRequest = async (credentials: Credentials): Promise<AuthResponse> => {

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Login failed')
  }

  return response.json()
}