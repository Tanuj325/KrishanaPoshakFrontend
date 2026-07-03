import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * Redirects authenticated users away from guest-only pages (login, register).
 */
function GuestRoute({ children, redirectTo = '/' }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default GuestRoute
