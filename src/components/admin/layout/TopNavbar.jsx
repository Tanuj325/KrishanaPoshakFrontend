import { useMemo, useState } from 'react'
import { FiBell, FiChevronDown, FiLogOut, FiSearch } from 'react-icons/fi'

export default function TopNavbar({
  breadcrumb,
  notificationsCount = 0,
  onLogout,
  onNotificationsClick,
}) {
  const [profileOpen, setProfileOpen] = useState(false)

  const crumbText = useMemo(() => {
    if (!breadcrumb?.length) return 'Dashboard'
    return breadcrumb.map((c) => c.label).join(' / ')
  }, [breadcrumb])

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-sm font-bold text-muted">{crumbText}</div>
        <div className="text-2xl font-extrabold text-ink md:text-3xl">Admin</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <FiSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search"
            className="h-11 w-64 rounded-full border border-border bg-background px-10 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <button
          type="button"
          className="relative rounded-full border border-border bg-background p-2 hover:bg-secondary"
          aria-label="Notifications"
          onClick={onNotificationsClick}
        >
          <FiBell className="size-5 text-ink" />
          {notificationsCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {notificationsCount}
            </span>
          ) : null}
        </button>


        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 hover:bg-secondary"
            aria-label="Admin profile"
          >
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-black">
              A
            </div>
            <FiChevronDown className="size-4 text-ink" />
          </button>

          {profileOpen ? (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-background p-2 shadow-premium">
              <div className="px-3 py-2">
                <div className="text-sm font-extrabold text-ink">Admin</div>
                <div className="text-xs font-semibold text-muted">admin@example.com</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false)
                  onLogout?.()
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-ink/80 hover:bg-secondary"
              >
                <FiLogOut className="size-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

