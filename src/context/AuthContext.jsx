import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'
import {
  clearRememberedEmail,
  getRememberedEmail,
  getStoredUser,
  saveRememberedEmail,
} from '../utils/authStorage'

export const AuthContext = createContext(null)

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const clearError = useCallback(() => setError(null), [])

  const fetchCurrentUser = useCallback(async () => {
    const user = await authService.getCurrentUser()
    setCurrentUser(user)
    return user
  }, [])

  const bootstrapAuth = useCallback(async () => {
    const storedUser = getStoredUser()

    if (!storedUser) {
      setCurrentUser(null)
      setIsLoading(false)
      return
    }

    try {
      await fetchCurrentUser()
    } catch {
      await authService.logout()
      setCurrentUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [fetchCurrentUser])

  useEffect(() => {
    bootstrapAuth()
  }, [bootstrapAuth])

  const login = useCallback(async (credentials) => {
    clearError()

    try {
      const response = await authService.login(credentials)

      if (credentials.rememberMe) {
        saveRememberedEmail(credentials.email)
      } else {
        clearRememberedEmail()
      }

      setCurrentUser(response.user)
      return response
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to sign in. Please try again.')
      setError(message)
      throw new Error(message)
    }
  }, [clearError])

  const register = useCallback(async (payload) => {
    clearError()

    try {
      const response = await authService.register(payload)
      setCurrentUser(response.user)
      return response
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to create account. Please try again.')
      setError(message)
      throw new Error(message)
    }
  }, [clearError])

  const logout = useCallback(async () => {
    clearError()

    try {
      await authService.logout()
    } finally {
      setCurrentUser(null)
    }
  }, [clearError])

  const forgotPassword = useCallback(async (payload) => {
    clearError()

    try {
      return await authService.forgotPassword(payload)
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to process your request.')
      setError(message)
      throw new Error(message)
    }
  }, [clearError])

  const resetPassword = useCallback(async (payload) => {
    clearError()

    try {
      return await authService.resetPassword(payload)
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to reset password.')
      setError(message)
      throw new Error(message)
    }
  }, [clearError])

  const updateProfile = useCallback(async (payload) => {
    clearError()

    try {
      const user = await authService.updateProfile(payload)
      setCurrentUser(user)
      return user
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to update profile.')
      setError(message)
      throw new Error(message)
    }
  }, [clearError])

  const changePassword = useCallback(async (payload) => {
    clearError()

    try {
      return await authService.changePassword(payload)
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to change password.')
      setError(message)
      throw new Error(message)
    }
  }, [clearError])

  const value = useMemo(
    () => ({
      currentUser,
      user: currentUser,
      isAuthenticated: Boolean(currentUser),
      isLoading,
      error,
      setError,
      clearError,
      login,
      register,
      logout,
      fetchCurrentUser,
      forgotPassword,
      resetPassword,
      updateProfile,
      changePassword,
      rememberedEmail: getRememberedEmail(),
    }),
    [
      changePassword,
      clearError,
      currentUser,
      error,
      fetchCurrentUser,
      forgotPassword,
      isLoading,
      login,
      logout,
      register,
      resetPassword,
      updateProfile,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
