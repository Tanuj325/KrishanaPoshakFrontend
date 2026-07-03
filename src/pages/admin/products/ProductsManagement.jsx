import { useEffect, useMemo, useState } from 'react'
import { FiEdit2, FiEye, FiPlus, FiRefreshCcw, FiTrash2 } from 'react-icons/fi'
import DataTable from '../../../components/admin/dashboard/DataTable'
import { getProducts, searchProducts, deleteProduct, updateProduct } from '../../../services/productService'
import AddProductForm from './AddProductForm'
import EditProductForm from './EditProductForm'
import DeleteProductModal from './DeleteProductModal'

const DEFAULT_PAGE_SIZE = 10

function fmtMoney(n) {
  const num = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(num)) return n
  return num.toLocaleString(undefined, { style: 'currency', currency: 'INR' })
}

function safeString(v) {
  return v == null ? '' : String(v)
}

function normalizeStatus(v) {
  if (v === true) return 'Active'
  if (v === false) return 'Inactive'
  const s = safeString(v).toLowerCase()
  if (!s) return 'Active'
  if (['active', 'enabled', 'true', '1'].includes(s)) return 'Active'
  if (['inactive', 'disabled', 'false', '0'].includes(s)) return 'Inactive'
  return safeString(v)
}

export default function ProductsManagement() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')

  const [data, setData] = useState([])
  const [meta, setMeta] = useState({ total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [mode, setMode] = useState('list') // list | add | edit
  const [selectedId, setSelectedId] = useState(null)

  const [deleteId, setDeleteId] = useState(null)

  const params = useMemo(() => {
    const base = {
      page,
      size: pageSize,
      category: category === 'All' ? undefined : category,
      status: status === 'All' ? undefined : status,
    }

    // strip undefined
    Object.keys(base).forEach((k) => base[k] === undefined && delete base[k])
    return base
  }, [page, pageSize, category, status])

  const fetchList = async () => {
    setLoading(true)
    setError('')
    try {
      const raw = query.trim()
        ? await searchProducts(query.trim(), params)
        : await getProducts(params)

      // Accept common shapes: { items, content, data, total, totalItems } etc.
      const items = raw?.items || raw?.content || raw?.data || raw?.products || []
      const total = raw?.total ?? raw?.totalItems ?? raw?.count ?? items.length

      setData(items)
      setMeta({ total: total || 0 })
    } catch (e) {
      setError(e?.message || 'Unable to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mode === 'list') fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, query, category, status, mode])

  const columns = useMemo(
    () => [
      {
        key: 'image',
        label: 'Image',
        render: (r) => (
          <div className="h-11 w-11 overflow-hidden rounded-lg border border-border bg-background">
            {r.image ? (
              <img src={r.image} alt={r.name || r.productName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted">—</div>
            )}
          </div>
        ),
      },
      {
        key: 'name',
        label: 'Product',
        render: (r) => (
          <div className="min-w-[180px]">
            <div className="truncate font-bold text-ink/90">{r.name || r.productName}</div>
            <div className="truncate text-xs font-semibold text-muted">{r.category}</div>
          </div>
        ),
      },
      {
        key: 'price',
        label: 'Price',
        render: (r) => (
          <div>
            <div className="font-extrabold text-ink">{fmtMoney(r.priceValue ?? r.price)}</div>
            {r.discount ? (
              <div className="text-xs font-bold text-primary">Discount: {r.discount}%</div>
            ) : (
              <div className="text-xs font-semibold text-muted">No discount</div>
            )}
          </div>
        ),
      },
      {
        key: 'stock',
        label: 'Stock',
        render: (r) => <span className="font-extrabold text-ink">{r.stock ?? r.quantity ?? 0}</span>,
      },
      {
        key: 'status',
        label: 'Status',
        render: (r) => {
          const current = normalizeStatus(r.status ?? r.enabled ?? r.active)
          return (
            <div className="flex items-center gap-3">
              <span
                className={
                  current === 'Active'
                    ? 'rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary'
                    : 'rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-ink'
                }
              >
                {current}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={async () => {
                  const nextStatus = current === 'Active' ? 'Inactive' : 'Active'
                  const nextPayload = {
                    ...r,
                    status: nextStatus,
                  }
                  await updateProduct(r.id || r.productId, nextPayload)
                  await fetchList()
                }}
              >
                Toggle
              </button>
            </div>
          )
        },
      },
      {
        key: 'createdAt',
        label: 'Created',
        render: (r) => {
          const created = r.createdDate || r.createdAt || r.creationDate
          if (!created) return <span className="text-muted">—</span>
          return <span className="font-semibold text-ink/90">{new Date(created).toLocaleDateString()}</span>
        },
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (r) => (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setMode('list')
                // View: open details in edit form read-only later; for now reuse Edit as demo.
                setSelectedId(r.id || r.productId)
                setMode('edit')
              }}
              aria-label={`View ${r.name}`}
            >
              <FiEye className="size-4" />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSelectedId(r.id || r.productId)
                setMode('edit')
              }}
              aria-label={`Edit ${r.name}`}
            >
              <FiEdit2 className="size-4" />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              onClick={() => setDeleteId(r.id || r.productId)}
              aria-label={`Delete ${r.name}`}
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

  const totalPages = Math.max(1, Math.ceil((meta?.total || 0) / pageSize))

  const pageRows = data.map((p) => ({
    ...p,
    id: p.id ?? p.productId,
    name: p.name ?? p.productName,
    priceValue: p.priceValue ?? p.price,
    createdAt: p.createdAt ?? p.createdDate,
  }))

  if (mode === 'add') {
    return (
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-ink">Add Product</div>
            <div className="text-xs font-semibold text-muted">Create a new product entry</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('list')}>
            Back
          </button>
        </div>
        <AddProductForm
          onCancel={() => setMode('list')}
          onCreated={async () => {
            setMode('list')
            await fetchList()
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
            <div className="text-sm font-extrabold text-ink">Edit Product</div>
            <div className="text-xs font-semibold text-muted">Update product details</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('list')}>
            Back
          </button>
        </div>
        <EditProductForm
          productId={selectedId}
          onCancel={() => setMode('list')}
          onUpdated={async () => {
            setMode('list')
            await fetchList()
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
            <div className="text-sm font-extrabold text-ink">Product Management</div>
            <div className="text-xs font-semibold text-muted">Search, filter, paginate, and manage products</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setMode('add')}
            >
              <FiPlus className="size-4" />
              Add Product
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setQuery('')
                setCategory('All')
                setStatus('All')
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
              placeholder="Name or category"
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Category</span>
            <select
              value={category}
              onChange={(e) => {
                setPage(1)
                setCategory(e.target.value)
              }}
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="All">All</option>
              {/* backend-driven categories can be plugged in later */}
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Kids">Kids</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Status</span>
            <select
              value={status}
              onChange={(e) => {
                setPage(1)
                setStatus(e.target.value)
              }}
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
          <DataTable
            title={`Products (${meta?.total || 0})`}
            columns={columns}
            rows={pageRows}
          />
        )}
      </div>

      {/* Pagination */}
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
        <DeleteProductModal
          productId={deleteId}
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

