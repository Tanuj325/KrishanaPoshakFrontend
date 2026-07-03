import { Outlet, useLocation } from 'react-router-dom'

import LayoutShell from '../../components/admin/layout/LayoutShell'
import { useAdminAuth } from '../../context/AdminAuthContext/AdminAuthContext'

const getBreadcrumb = (pathname) => {

  if (pathname.startsWith('/admin/dashboard')) {
    return [{ label: 'Dashboard', to: '/admin/dashboard' }]
  }

  if (pathname === '/admin' || pathname === '/admin/') {
    return [{ label: 'Dashboard', to: '/admin/dashboard' }]
  }

  const parts = pathname.split('/').filter(Boolean)
  if (!parts.length) return [{ label: 'Dashboard' }]

  const main = parts[0]
  const second = parts[1]

  const labelMap = {
    dashboard: 'Dashboard',
    products: 'Products',
    categories: 'Categories',
    orders: 'Orders',
    customers: 'Customers',
    coupons: 'Coupons',
    reports: 'Reports',
    settings: 'Settings',
  }

  const secondLabel = labelMap[second] || (second ? second.charAt(0).toUpperCase() + second.slice(1) : 'Dashboard')

  return [
    { label: 'Dashboard', to: '/admin/dashboard' },
    ...(main === 'admin' ? [{ label: secondLabel }] : []),
  ]
}

export default function AdminDashboardLayout() {
  const location = useLocation()
  const { logout } = useAdminAuth()

  return (
    <LayoutShell breadcrumb={getBreadcrumb(location.pathname)} onLogout={logout}>
      <Outlet />
    </LayoutShell>
  )
}




