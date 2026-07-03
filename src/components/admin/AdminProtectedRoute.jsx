import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext/AdminAuthContext'

function AdminAuthLoadingState() {
  return (
    <div className="section-padding">
      <div className="app-container flex min-h-[40vh] items-center justify-center">
        <p className="text-sm font-semibold text-muted">Loading admin session...</p>
      </div>
    </div>
  )
}

/**
 * Protects admin routes.
 * Future-ready for Spring Boot RBAC: later we can check permissions/roles from BE.
 */
// export default function AdminProtectedRoute({ children, requiredRole = 'ADMIN' }) {
//   const { isAuthenticated, role, isLoading } = useAdminAuth()
//   const location = useLocation()

//   if (isLoading) return <AdminAuthLoadingState />

//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace state={{ from: location }} />
//   }

//   // Placeholder role check. When BE RBAC is added, this logic can be extended.
//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to="/admin" replace />
//   }

//   return children
// }


export default function AdminProtectedRoute({ children }) {
  return children;
}