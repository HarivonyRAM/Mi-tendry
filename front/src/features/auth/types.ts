export interface Credentials {
    email: string
    password: string
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