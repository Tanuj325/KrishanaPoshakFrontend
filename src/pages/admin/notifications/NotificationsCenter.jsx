import { useEffect, useMemo, useState } from 'react'
import { FiBell, FiCheckCircle, FiCopy, FiTrash2 } from 'react-icons/fi'
import {
  ensureNotificationsSeed,
  loadNotifications,
  saveNotifications,
} from './notificationsStorage'

function fmtDate(v) {
  if (!v) return '—'
  try {
    return new Date(v).toLocaleString()
  } catch {
    return '—'
  }
}

export default function NotificationsCenter() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      ensureNotificationsSeed()
      setItems(loadNotifications())
    } catch (e) {
      setError(e?.message || 'Unable to load notifications')
    }
  }, [])

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items])

  const markAllRead = () => {
    const next = items.map((n) => ({ ...n, read: true }))
    setItems(next)
    saveNotifications(next)
  }

  const clearAll = () => {
    const next = []
    setItems(next)
    saveNotifications(next)
  }

  const markOneRead = (id) => {
    const next = items.map((n) => (n.id === id ? { ...n, read: true } : n))
    setItems(next)
    saveNotifications(next)
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-background p-6">
        <div className="flex items-center gap-3">
          <FiBell className="size-5 text-muted" />
          <div>
            <div className="text-sm font-extrabold text-ink">No notifications</div>
            <div className="text-xs font-semibold text-muted">You’re all caught up.</div>
          </div>
        </div>
        {error ? <div className="mt-3 text-sm font-semibold text-red-500">{error}</div> : null}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-extrabold text-ink">Admin Notification Center</div>
            <div className="text-xs font-semibold text-muted">
              Unread: <span className="font-extrabold text-ink">{unreadCount}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              <FiCheckCircle className="size-4" />
              Mark as Read
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              onClick={clearAll}
              disabled={items.length === 0}
            >
              <FiTrash2 className="size-4" />
              Clear All
            </button>
          </div>
        </div>

        {error ? <div className="mt-3 text-sm font-semibold text-red-500">{error}</div> : null}
      </div>

      <div className="rounded-3xl border border-border bg-background p-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
          Notifications
        </div>

        <div className="space-y-3">
          {items
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((n) => (
              <div
                key={n.id}
                className={
                  n.read
                    ? 'rounded-2xl border border-border bg-background p-4'
                    : 'rounded-2xl border border-primary/20 bg-primary/5 p-4'
                }
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          n.read
                            ? 'rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-ink'
                            : 'rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary'
                        }
                      >
                        {n.type}
                      </span>
                      <span className="text-xs font-semibold text-muted">{fmtDate(n.createdAt)}</span>
                    </div>

                    <div className="mt-2 truncate text-sm font-extrabold text-ink">{n.title}</div>
                    <div className="mt-1 text-sm font-semibold text-muted">{n.message}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {!n.read ? (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => markOneRead(n.id)}
                      >
                        Mark as Read
                      </button>
                    ) : null}

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        // best effort; may be blocked in some environments
                        navigator.clipboard?.writeText?.(`${n.title} - ${n.message}`)
                      }}
                      aria-label="Copy notification"
                    >
                      <FiCopy className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

