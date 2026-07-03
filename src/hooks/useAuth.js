import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Access auth state and actions from any component.
 *
 * @returns {{
 *   currentUser: object | null,
 *   isAuthenticated: boolean,
 *   isLoading: boolean,
 *   login: (credentials) => Promise,
 *   register: (payload) => Promise,
 *   logout: () => Promise,
 *   fetchCurrentUser: () => Promise,
 * }}
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
