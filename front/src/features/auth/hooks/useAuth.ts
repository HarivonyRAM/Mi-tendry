import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import authService from '../services/auth.service'
import type { User, LoginCredentials, RegisterCredentials } from '../types'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
      const restoredUser = authService.getUser()
      if (restoredUser) setUser(restoredUser)
  }, [])

  const { mutateAsync: login, isPending: isLoadingLogin, error: loginError } = useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
          const user = await authService.login(credentials)
          setUser(user)
          return user
      },
  })

  const { mutateAsync: register, isPending: isLoadingRegister, error: registerError } = useMutation({
    mutationFn: async (data: RegisterCredentials) => {
        const { password, confirmPassword } = data
        if (password !== confirmPassword)
            throw new Error("Les mots de passe ne correspondent pas.")
    
        const user = await authService.register(data)
        setUser(user)
        return user
    }
  })

  const logout = () => {
      authService.logout()
      setUser(null)
      window.location.reload()
  }

  return {
      login,
      logout,
      user,
      isLoading: isLoadingLogin,
      error: loginError,
      register,
      isLoadingRegister,
      registerError
  }
}

export default useAuth
