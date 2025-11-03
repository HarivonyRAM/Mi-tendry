export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    email: string
    password: string
    confirmPassword: string
}
  
export interface User {
    id: string
    email: string
    name?: string
    exp?: number
}

export interface AuthResponse {
    token: string
}

export interface JwtPayload {
    sub: string
    email: string
    name?: string
    exp?: number
    iat?: number
}