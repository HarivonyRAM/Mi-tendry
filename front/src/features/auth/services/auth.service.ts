
import { loginRequest, registerRequest } from '../api/auth.api'
import type { LoginCredentials, User, AuthResponse, JwtPayload, RegisterCredentials } from '../types'

const LOCAL_STORAGE_TOKEN_KEY = 'token'

const getToken = (): string | null => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

const getUser = (token?: string): User | null => {
    token = token ?? getToken() ?? undefined
    if (!token) return null
    const decoded = parseJwt(token)
    if (!decoded) throw new Error("Invalid token")

    const { sub: id, email, name, exp } = decoded
    return { id, email, name, exp }
}

const login = async (credentials: LoginCredentials): Promise<User | null> => {
    const { token }: AuthResponse = await loginRequest(credentials)
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
    return getUser(token)
}

const register = async (credentials: RegisterCredentials): Promise<User | null> => {
    const { token }: AuthResponse = await registerRequest(credentials)
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
    return getUser(token)
}

const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

const parseJwt = (token: string): JwtPayload | null => {
    try {
        const base64Payload = token.split('.')[1]
        const payload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(payload)
    } catch {
        console.error("Failed to parse JWT:", token)
        return null
    }
}

export default { login, register, logout, getUser, getToken }