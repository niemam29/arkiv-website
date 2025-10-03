import { useState, useEffect } from 'react'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = localStorage.getItem('isAuthenticated') === 'true'
    setAuthState({
      isAuthenticated: isAuth,
      isLoading: false
    })
  }, [])

  const login = (username: string, password: string): boolean => {
    // Check credentials (in production, this should be an API call)
    const correctUsername = 'ETHWarsawDB'
    const correctPassword = 'GOLEM_DB2025%'

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem('isAuthenticated', 'true')
      setAuthState({
        isAuthenticated: true,
        isLoading: false
      })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    setAuthState({
      isAuthenticated: false,
      isLoading: false
    })
  }

  return {
    ...authState,
    login,
    logout
  }
}
