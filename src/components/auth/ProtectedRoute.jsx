import { Navigate, useLocation } from 'react-router-dom'
import { AUTH_ROUTES } from '../../config/auth'
import { useAuth } from '../../hooks/useAuth'

function AuthLoadingState() {
  return (
    <div className="section-padding">
      <div className="app-container flex min-h-[40vh] items-center justify-center">
        <p className="text-sm font-semibold text-muted">Loading your account...</p>
      </div>
    </div>
  )
}

/**
 * Redirects unauthenticated users to login.
 * Preserves the attempted route for post-login redirect.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <AuthLoadingState />
  }

  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.login} replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
