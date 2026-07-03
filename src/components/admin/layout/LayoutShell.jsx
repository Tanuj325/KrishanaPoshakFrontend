import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Breadcrumbs from './Breadcrumbs'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import { FiMenu, FiX } from 'react-icons/fi'

import useAdminNotificationsUnreadCount from '../../../hooks/admin/useAdminNotificationsUnreadCount'



import { useAdminAuth } from '../../../context/AdminAuthContext'

export default function LayoutShell({
  children,
  breadcrumb,
  onLogout,
}) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  // Use the passed onLogout or fallback to context logout
  const handleLogout = async () => {
    await (onLogout ? onLogout() : logout());
    navigate('/admin/login', { replace: true });
  };

  const sidebarBreadcrumb = useMemo(() => breadcrumb?.slice(0, 3) || [], [breadcrumb])

  const unreadCount = useAdminNotificationsUnreadCount()

  const handleNotificationsClick = () => {
    try {
      // Force hard navigation; avoids SPA router issues if any overlay/layout intercepts.
      window.location.assign('/admin/notifications')
    } catch {
      // Fallback to SPA navigation.
      navigate('/admin/notifications')
    }
  }





  return (
    <div className="page-shell">
      <div className="app-container py-6">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          {/* Sidebar - desktop */}
          <aside className="hidden rounded-3xl border border-border bg-background md:block">
            <Sidebar onNavigate={handleLogout} />
          </aside>

          {/* Mobile drawer */}
          <div className="md:hidden">
            <MobileDrawer
              breadcrumb={sidebarBreadcrumb}
              onLogout={onLogout}
            />
          </div>

          <section className="min-w-0">
            <div className="rounded-3xl border border-border bg-background p-4 md:p-6">
              <TopNavbar
                breadcrumb={breadcrumb}
                onLogout={onLogout}
                notificationsCount={unreadCount}
                onNotificationsClick={handleNotificationsClick}
              />
              <div className="mt-4">
                <Breadcrumbs items={breadcrumb} />
              </div>
            </div>

            <div className="mt-6">{children}</div>
          </section>
        </div>
      </div>
    </div>
  )
}


function MobileDrawer({ breadcrumb, onLogout }) {
  // This drawer is architecture-only (no external state library required).
  // It uses a simple checkbox-like open state via local state.
  // Implementations can be expanded later.
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-bold text-ink hover:bg-secondary"
      >
        <FiMenu />
        Menu
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] rounded-r-3xl border border-border bg-background">
            <div className="flex items-center justify-between p-4">
              <div className="font-extrabold text-ink">Admin</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border bg-background p-2 hover:bg-secondary"
                aria-label="Close"
              >
                <FiX className="size-5" />
              </button>
            </div>

            <Sidebar onNavigate={(reason) => {
              if (reason === 'logout') onLogout?.()
              setOpen(false)
            }} />
          </div>
        </div>
      ) : null}
    </>
  )
}


