import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import authService from '../services/auth.service'
import type { User, Credentials } from '../types'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
      const restoredUser = authService.getUser()
      if (restoredUser) setUser(restoredUser)
  }, [])

  const { mutateAsync: login, isPending: isLoading, error } = useMutation({
      mutationFn: async (credentials: Credentials) => {
          const user = await authService.login(credentials)
          setUser(user)
          return user
      },
  })

  const logout = () => {
      authService.logout()
      setUser(null)
  }

  return {
      login,
      logout,
      user,
      isLoading,
      error
  }
}

export default useAuth
