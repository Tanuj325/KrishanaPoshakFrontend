import { useEffect, useMemo, useState } from 'react'
import { FiCheckCircle, FiEye, FiLoader, FiRefreshCcw, FiX, FiPackage, FiTrash2 } from 'react-icons/fi'
import DataTable from '../../../components/admin/dashboard/DataTable'
import { cancelOrder, getOrders, updateOrderStatus } from '../../../services/orderService'
import DeleteOrderModal from './DeleteOrderModal'

const DEFAULT_ORDER_STATUS = 'Pending'


const DEFAULT_PAGE_SIZE = 10

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled']

function safeString(v) {
  return v == null ? '' : String(v)
}

function fmtCurrency(n) {
  const num = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(num)) return n
  return num.toLocaleString(undefined, { style: 'currency', currency: 'INR' })
}

function fmtDate(v) {
  if (!v) return '—'
  try {
    return new Date(v).toLocaleDateString()
  } catch {
    return '—'
  }
}

function normalizeOrderForTable(o) {
  const id = o.id ?? o.orderId ?? o._id

  const products = Array.isArray(o.products) ? o.products : []
  const productsText = products
    .map((p) => p?.name ?? p?.productName ?? '')
    .filter(Boolean)
    .join(', ')

  const paymentMethod = o.paymentMethod ?? o.payment?.method ?? '—'
  const paymentStatus = o.paymentStatus ?? o.payment?.status ?? '—'

  const totals = o.totals && typeof o.totals === 'object' ? o.totals : {}
  const total =
    typeof totals.totalAmount === 'number'
      ? totals.totalAmount
      : Number(totals.totalAmount ?? o.totalAmount ?? 0)

  return {
    ...o,
    id: id != null ? String(id) : '',
    productsText,
    totalAmount: Number.isNaN(total) ? 0 : total,
    orderStatus: o.status ?? o.orderStatus ?? o.orderStatusName,
    paymentMethod,
    paymentStatus,
    orderDate: o.orderDate ?? o.date ?? o.createdAt,
    shippingAddress: o.shippingAddress ?? o.shipping?.address ?? '—',
  }
}

export default function OrdersManagement() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [paymentStatus, setPaymentStatus] = useState('All')

  const [data, setData] = useState([])
  const [meta, setMeta] = useState({ total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [deleteId, setDeleteId] = useState(null)

  const params = useMemo(() => {
    const base = {
      page,
      size: pageSize,
      status: status === 'All' ? undefined : status,
      paymentStatus: paymentStatus === 'All' ? undefined : paymentStatus,
    }
    // backend may support q
    if (query.trim()) base.q = query.trim()

    Object.keys(base).forEach((k) => base[k] === undefined && delete base[k])
    return base
  }, [page, pageSize, status, paymentStatus, query])

  const fetchList = async () => {
    setLoading(true)
    setError('')
    try {
      const raw = await getOrders(params)
      const items = raw?.items || raw?.content || raw?.data || raw?.orders || []
      const total = raw?.total ?? raw?.totalItems ?? raw?.count ?? items.length
      setData(items.map(normalizeOrderForTable))
      setMeta({ total: total || 0 })
    } catch (e) {
      setError(e?.message || 'Unable to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, query, status, paymentStatus])

  const totalPages = Math.max(1, Math.ceil((meta?.total || 0) / pageSize))

  const columns = useMemo(
    () => [
      { key: 'id', label: 'Order ID' },
      {
        key: 'customer',
        label: 'Customer Name',
        render: (r) => (
          <span className="font-semibold text-ink/90">
            {r.customerName ?? r.customer?.name ?? r.customer ?? '—'}
          </span>
        ),
      },
      {
        key: 'productsText',
        label: 'Products',
        render: (r) => <span className="truncate max-w-[240px]">{r.productsText || '—'}</span>,
      },
      {
        key: 'totalAmount',
        label: 'Total',
        render: (r) => <span className="font-extrabold text-ink">{fmtCurrency(r.totalAmount)}</span>,
      },
      { key: 'paymentMethod', label: 'Payment Method' },
      {
        key: 'paymentStatus',
        label: 'Payment Status',
        render: (r) => {
          const v = safeString(r.paymentStatus)
          const isPaid = v.toLowerCase().includes('paid') || v.toLowerCase().includes('success')
          return (
            <span
              className={
                isPaid
                  ? 'rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary'
                  : 'rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-ink'
              }
            >
              {v || '—'}
            </span>
          )
        },
      },
      {
        key: 'orderStatus',
        label: 'Order Status',
        render: (r) => {
          const current = safeString(r.orderStatus || 'Pending')
          return (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-ink">
                  {current}
                </span>
              </div>
              <select
                className="h-10 rounded-full border border-border bg-background px-3 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                value={current}
                onChange={async (e) => {
                  const next = e.target.value
                  if (!r.id) return
                  await updateOrderStatus(r.id, next)
                  await fetchList()
                }}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )
        },
      },
      {
        key: 'orderDate',
        label: 'Order Date',
        render: (r) => <span className="font-semibold text-ink/90">{fmtDate(r.orderDate)}</span>,
      },
      {
        key: 'shippingAddress',
        label: 'Shipping Address',
        render: (r) => <span className="truncate max-w-[260px]">{safeString(r.shippingAddress)}</span>,
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (r) => (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => {}}>
              <FiEye className="size-4" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={async () => {
                if (!r.id) return
                // Optional: cancel if pending/confirmed/etc.
                if (safeString(r.orderStatus).toLowerCase() === 'cancelled') return
                await cancelOrder(r.id, 'Cancelled by admin')
                await fetchList()
              }}
            >
              <FiX className="size-4" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              onClick={() => setDeleteId(r.id)}
            >
              <FiTrash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const pageRows = data

  if (deleteId) {
    // Delete modal is optional; keep it simple
    // eslint-disable-next-line react/jsx-no-undef
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-extrabold text-ink">Order Management</div>
            <div className="text-xs font-semibold text-muted">Search, filter, paginate, and update order status</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setQuery('')
                setStatus('All')
                setPaymentStatus('All')
                setPage(1)
              }}
            >
              <FiRefreshCcw className="size-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Search</span>
            <input
              value={query}
              onChange={(e) => {
                setPage(1)
                setQuery(e.target.value)
              }}
              placeholder="Order ID or customer"
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Order Status</span>
            <select
              value={status}
              onChange={(e) => {
                setPage(1)
                setStatus(e.target.value)
              }}
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="All">All</option>
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Payment Status</span>
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPage(1)
                setPaymentStatus(e.target.value)
              }}
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </label>

          <div className="grid gap-2">
            <span className="text-xs font-bold text-muted">Page Size</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPage(1)
                setPageSize(Number(e.target.value))
              }}
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {error ? <div className="mt-3 text-sm font-semibold text-red-500">{error}</div> : null}
      </div>

      <div className="relative">
        {loading ? (
          <div className="rounded-3xl border border-border bg-background p-10 text-center text-sm font-bold text-muted">
            Loading...
          </div>
        ) : (
          <DataTable title={`Orders (${meta?.total || 0})`} columns={columns} rows={pageRows} />
        )}
      </div>

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

      {deleteId ? (
        <DeleteOrderModal
          orderId={deleteId}
          onCancel={() => setDeleteId(null)}
          onDeleted={async () => {
            setDeleteId(null)
            await fetchList()
          }}
        />
      ) : null}
    </div>
  )
}

