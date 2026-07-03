import ProtectedRoute from '../components/auth/ProtectedRoute'

/**
 * Wraps a page element with authentication protection.
 * Unauthenticated users are redirected to login.
 */
export function withAuthProtection(element) {
  return <ProtectedRoute>{element}</ProtectedRoute>
}
