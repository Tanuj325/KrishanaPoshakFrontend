import { useEffect, useMemo, useState } from 'react'
import { FiPlus, FiRefreshCcw, FiTrash2 } from 'react-icons/fi'
import DataTable from '../../../components/admin/dashboard/DataTable'
import {
  ensureCouponsSeed,
  loadCoupons,
} from './couponsStorage'
import AddCouponForm from './AddCouponForm'
import EditCouponForm from './EditCouponForm'
import DeleteCouponModal from './DeleteCouponModal'
import CouponDetails from './CouponDetails'

const DEFAULT_PAGE_SIZE = 10

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

export default function CouponsManagement() {
  const [mode, setMode] = useState('list') // list | add | edit
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [editId, setEditId] = useState(null)
  const [deleteCouponObj, setDeleteCouponObj] = useState(null)

  useEffect(() => {
    ensureCouponsSeed()
    setData(loadCoupons())
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data

    return data.filter((c) => {
      const code = c.code?.toLowerCase() || ''
      const status = c.status?.toLowerCase() || ''
      return code.includes(q) || status.includes(q)
    })
  }, [data, query])

  useEffect(() => {
    setPage(1)
  }, [query, pageSize])

  const totalPages = Math.max(1, Math.ceil((filtered.length || 0) / pageSize))
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize)

  const refresh = () => {
    setData(loadCoupons())
  }

  const columns = useMemo(
    () => [
      {
        key: 'code',
        label: 'Coupon Code',
        render: (r) => <span className="font-extrabold text-ink">{r.code}</span>,
      },
      {
        key: 'discount',
        label: 'Discount',
        render: (r) => (
          <span className="font-extrabold text-ink">{r.discount}%</span>
        ),
      },
      {
        key: 'expiryDate',
        label: 'Expiry Date',
        render: (r) => <span className="font-semibold text-ink/90">{fmtDate(r.expiryDate)}</span>,
      },
      {
        key: 'minPurchase',
        label: 'Minimum Purchase',
        render: (r) => <span className="font-semibold text-ink/90">{fmtCurrency(r.minPurchase)}</span>,
      },
      {
        key: 'maxDiscount',
        label: 'Maximum Discount',
        render: (r) => <span className="font-semibold text-ink/90">{fmtCurrency(r.maxDiscount)}</span>,
      },
      {
        key: 'status',
        label: 'Status',
        render: (r) => (
          <span
            className={
              r.status === 'Active'
                ? 'rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary'
                : 'rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-ink'
            }
          >
            {r.status}
          </span>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (r) => (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelectedCoupon(r)}>
              View
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditId(r.id)
                setMode('edit')
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              onClick={() => setDeleteCouponObj(r)}
              aria-label={`Delete ${r.code}`}
            >
              <FiTrash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  if (selectedCoupon) {
    return <CouponDetails coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
  }

  if (mode === 'add') {
    return (
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-ink">Add Coupon</div>
            <div className="text-xs font-semibold text-muted">Create a new coupon entry</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('list')}>
            Back
          </button>
        </div>
        <AddCouponForm
          onCancel={() => setMode('list')}
          onCreated={async () => {
            setMode('list')
            refresh()
          }}
        />
      </div>
    )
  }

  if (mode === 'edit') {
    return (
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-ink">Edit Coupon</div>
            <div className="text-xs font-semibold text-muted">Update coupon details</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('list')}>
            Back
          </button>
        </div>
        <EditCouponForm
          couponId={editId}
          onCancel={() => setMode('list')}
          onUpdated={async () => {
            setMode('list')
            refresh()
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-extrabold text-ink">Coupons</div>
            <div className="text-xs font-semibold text-muted">Search and manage coupons</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setMode('add')}>
              <FiPlus className="size-4" />
              Add Coupon
            </button>
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
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-bold text-muted">Search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Coupon code or status"
              className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
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

          <div className="rounded-3xl border border-border bg-background p-4 text-xs font-semibold text-muted lg:col-span-1">
            Showing {pageRows.length} of {filtered.length} coupons
          </div>
        </div>
      </div>

      <DataTable title={`Coupons (${filtered.length})`} columns={columns} rows={pageRows} />

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

      {deleteCouponObj ? (
        <DeleteCouponModal
          coupon={deleteCouponObj}
          onCancel={() => setDeleteCouponObj(null)}
          onDeleted={async () => {
            setDeleteCouponObj(null)
            refresh()
          }}
        />
      ) : null}
    </div>
  )
}

