import { useMemo } from 'react'

function fmtDate(v) {
  if (!v) return '—'
  try {
    return new Date(v).toLocaleDateString()
  } catch {
    return '—'
  }
}

function fmtCurrency(n) {
  const num = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(num)) return n
  return num.toLocaleString(undefined, { style: 'currency', currency: 'INR' })
}

export default function CustomerDetails({ customer, onClose }) {
  const fullName = useMemo(() => {
    const first = customer?.firstName ?? ''
    const last = customer?.lastName ?? ''
    return `${first} ${last}`.trim() || customer?.email || 'Customer'
  }, [customer])

  if (!customer) return null

  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-extrabold text-ink">Customer Details</div>
          <div className="text-xs font-semibold text-muted">{fullName}</div>
        </div>

        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Back
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Email</div>
          <div className="mt-1 text-sm font-semibold text-ink/90">{customer.email || '—'}</div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Phone Number</div>
          <div className="mt-1 text-sm font-semibold text-ink/90">{customer.phone || '—'}</div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Total Orders</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{customer.ordersCount ?? 0}</div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Total Spending</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{fmtCurrency(customer.totalSpending ?? 0)}</div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Registration Date</div>
          <div className="mt-1 text-sm font-semibold text-ink/90">{fmtDate(customer.createdAt)}</div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Last Login</div>
          <div className="mt-1 text-sm font-semibold text-ink/90">{fmtDate(customer.lastLoginAt)}</div>
        </div>
      </div>

      <div className="mt-6 text-xs font-semibold text-muted">
        Note: This is mock/local data for UI scaffolding.
      </div>
    </div>
  )
}

