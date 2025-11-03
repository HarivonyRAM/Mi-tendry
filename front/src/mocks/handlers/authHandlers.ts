import { apiUrl } from '../../app/config'
import { http, HttpResponse } from 'msw'
import mockUsers from '../users.mock-data'
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode('JWT_KEY')
const TOKEN_EXPIRES_IN = '2d'
 
const authHandlers = [
    http.post(`${apiUrl}/auth/login`, async ({ request }) => {
        const { email, password } = await request.json() as { email: string; password: string }
        const user = mockUsers.find(u => u.email === email && u.password === password)
        const payload = {
            email: user?.email,
            id: user?.id,
        }
        return (user)
        ? HttpResponse.json({ token: await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(TOKEN_EXPIRES_IN)
            .sign(JWT_SECRET)
        })
        : HttpResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }),
]

export default authHandlers