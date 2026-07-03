import { useEffect, useMemo, useState } from 'react'
import { FiRefreshCcw, FiSearch, FiTrash2, FiUser } from 'react-icons/fi'
import DataTable from '../../../components/admin/dashboard/DataTable'
import { ensureCustomersSeed, loadCustomers } from './customersStorage'
import CustomerDetails from './CustomerDetails'

const DEFAULT_PAGE_SIZE = 10

function fmtCurrency(n) {
  const num = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(num)) return n
  return num.toLocaleString(undefined, { style: 'currency', currency: 'INR' })
}

function safeString(v) {
  return v == null ? '' : String(v)
}

export default function CustomersManagement() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    ensureCustomersSeed()
    setData(loadCustomers())
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data

    return data.filter((c) => {
      const name = `${c.firstName} ${c.lastName}`.toLowerCase()
      return (
        name.includes(q) ||
        safeString(c.email).toLowerCase().includes(q) ||
        safeString(c.phone).includes(q)
      )
    })
  }, [data, query])

  const totalPages = Math.max(1, Math.ceil((filtered.length || 0) / pageSize))

  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [query, pageSize])

  const columns = useMemo(
    () => [
      {
        key: 'name',
        label: 'Customer Name',
        render: (r) => (
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiUser className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-bold text-ink/90">
                {r.firstName} {r.lastName}
              </div>
              <div className="truncate text-xs font-semibold text-muted">{r.id}</div>
            </div>
          </div>
        ),
      },
      { key: 'email', label: 'Email', render: (r) => <span className="font-semibold">{r.email}</span> },
      { key: 'phone', label: 'Phone Number', render: (r) => <span className="font-semibold">{r.phone}</span> },
      { key: 'ordersCount', label: 'Total Orders', render: (r) => <span className="font-extrabold text-ink">{r.ordersCount ?? 0}</span> },
      {
        key: 'totalSpending',
        label: 'Total Spending',
        render: (r) => <span className="font-extrabold text-ink">{fmtCurrency(r.totalSpending ?? 0)}</span>,
      },
      {
        key: 'createdAt',
        label: 'Registration Date',
        render: (r) => <span className="font-semibold">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}</span>,
      },
      {
        key: 'lastLoginAt',
        label: 'Last Login',
        render: (r) => <span className="font-semibold">{r.lastLoginAt ? new Date(r.lastLoginAt).toLocaleDateString() : '—'}</span>,
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (r) => (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelected(r)}>
              View
            </button>
          </div>
        ),
      },
    ],
    []
  )

  if (selected) {
    return <CustomerDetails customer={selected} onClose={() => setSelected(null)} />
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-extrabold text-ink">Customer Management</div>
            <div className="text-xs font-semibold text-muted">Search customers and view details</div>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setQuery('')
              setPage(1)
            }}
          >
            <FiRefreshCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Search</span>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, email, phone"
                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </label>

          <div className="grid gap-2">
            <span className="text-xs font-bold text-muted">Page Size</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <div className="rounded-3xl border border-border bg-background p-4 text-xs font-semibold text-muted">
              Showing {pageRows.length} of {filtered.length} customers
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title={`Customers (${filtered.length})`}
        columns={columns}
        rows={pageRows}
      />

      <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-semibold text-muted">
          Page <span className="font-extrabold text-ink">{page}</span> of{' '}
          <span className="font-extrabold text-ink">{totalPages}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

