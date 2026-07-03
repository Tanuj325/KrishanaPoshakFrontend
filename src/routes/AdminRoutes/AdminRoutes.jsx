import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import AdminProtectedRoute from '../../components/admin/AdminProtectedRoute'
import ErrorPage from '../../components/ui/ErrorPage'
import AdminDashboardLayout from '../../layouts/AdminLayout/AdminDashboardLayout'

const NotImplemented = lazy(() =>
  Promise.resolve({
    default: function NotImplementedPage() {
      return (
        <div className="card-soft p-6">
          <h2 className="text-lg font-bold mb-2">Not implemented</h2>
          <p className="text-sm text-muted">Admin pages will be added later.</p>
        </div>
      )
    },
  }),
)

import AdminLogin from '../../pages/admin/AdminLogin'
import AdminDashboard from '../../pages/admin/AdminDashboard'
import ProductsManagement from '../../pages/admin/products/ProductsManagement'
import CategoriesManagement from '../../pages/admin/categories/CategoriesManagement'
import OrdersManagement from '../../pages/admin/orders/OrdersManagement'
import CustomersManagement from '../../pages/admin/customers/CustomersManagement'
import CouponsManagement from '../../pages/admin/coupons/CouponsManagement'
import ReportsManagement from '../../pages/admin/reports/ReportsManagement'
import StoreSettings from '../../pages/admin/settings/StoreSettings'
const NotificationsCenter = lazy(() => import('../../pages/admin/notifications/NotificationsCenter'))


// Admin feature route configuration.
export const ADMIN_ROUTES = {

  root: '/admin',
  login: '/admin/login',
  dashboard: '/admin/dashboard',
}

export default function AdminRoutes() {
  return [
    {
      index: true,
      element: (
        <AdminProtectedRoute>
          <Navigate to={ADMIN_ROUTES.dashboard} replace />
        </AdminProtectedRoute>
      ),
    },


    // Public
    {
      path: 'login',
      element: <AdminLogin />,
    },

    // Protected app shell
    {
      element: (
        <AdminProtectedRoute>
          <AdminDashboardLayout />
        </AdminProtectedRoute>
      ),
      children: [
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'products', element: <ProductsManagement /> },
        { path: 'categories', element: <CategoriesManagement /> },
        { path: 'orders', element: <OrdersManagement /> },
        { path: 'customers', element: <CustomersManagement /> },
        { path: 'coupons', element: <CouponsManagement /> },

        { path: 'reports', element: <ReportsManagement /> },
        { path: 'settings', element: <StoreSettings /> },
        { path: 'notifications', element: <NotificationsCenter /> },


        { path: '*', element: <NotImplemented /> },
      ],
    },

    {
      path: '*',
      element: (
        <ErrorPage
          title="Admin page not found"
          description="The requested admin route does not exist."
          retryLabel="Go to Admin"
          homeTo={ADMIN_ROUTES.root}
        />
      ),
    },
  ]
}


