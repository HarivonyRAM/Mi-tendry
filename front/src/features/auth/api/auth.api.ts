import { apiUrl } from '../../../app/config'
import type { LoginCredentials, AuthResponse, RegisterCredentials } from '../types'

export const loginRequest = async (credentials: LoginCredentials): Promise<AuthResponse> => {

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

export const registerRequest = async (data: RegisterCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Registration failed')
  }

  return response.json()
}