import { useEffect, useMemo, useState } from 'react'
import { FiEdit2, FiPlus, FiRefreshCcw, FiSearch, FiTrash2 } from 'react-icons/fi'
import DataTable from '../../../components/admin/dashboard/DataTable'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../../services/categoryService'
import AddCategoryForm from './AddCategoryForm'
import EditCategoryForm from './EditCategoryForm'
import DeleteCategoryModal from './DeleteCategoryModal'

const DEFAULT_PAGE_SIZE = 10

function fmtDate(d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return '—'
  }
}

function normalizeStatus(v) {
  if (v === true) return 'Active'
  if (v === false) return 'Inactive'
  const s = v == null ? '' : String(v).toLowerCase()
  if (!s) return 'Active'
  if (['active', 'enabled', 'true', '1'].includes(s)) return 'Active'
  if (['inactive', 'disabled', 'false', '0'].includes(s)) return 'Inactive'
  return String(v)
}

export default function CategoriesManagement() {
  const [mode, setMode] = useState('list') // list | add | edit
  const [selectedId, setSelectedId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const [data, setData] = useState([])
  const [meta, setMeta] = useState({ total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const params = useMemo(() => {
    const base = {
      page,
      size: pageSize,
      status: status === 'All' ? undefined : status,
    }
    Object.keys(base).forEach((k) => base[k] === undefined && delete base[k])
    return base
  }, [page, pageSize, status])

  const fetchList = async () => {
    setLoading(true)
    setError('')
    try {
        const raw = query.trim()
        ? await getCategories({ ...params, q: query.trim() })
        : await getCategories(params)


      const items = raw?.items || raw?.content || raw?.data || raw?.categories || []
      const total = raw?.total ?? raw?.totalItems ?? raw?.count ?? items.length
      setData(items)
      setMeta({ total: total || 0 })
    } catch (e) {
      setError(e?.message || 'Unable to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mode === 'list') fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, query, status, mode])

  const totalPages = Math.max(1, Math.ceil((meta?.total || 0) / pageSize))

  const columns = useMemo(
    () => [
      {
        key: 'image',
        label: 'Image',
        render: (r) => (
          <div className="h-11 w-11 overflow-hidden rounded-lg border border-border bg-background">
            {r.image ? (
              <img src={r.image} alt={r.name || r.categoryName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted">—</div>
            )}
          </div>
        ),
      },
      {
        key: 'name',
        label: 'Category',
        render: (r) => (
          <div className="min-w-[180px]">
            <div className="truncate font-bold text-ink/90">{r.name || r.categoryName}</div>
            <div className="truncate text-xs font-semibold text-muted">{r.description || r.desc || '—'}</div>
          </div>
        ),
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
                  const payload = { ...r, status: nextStatus }
                  await updateCategory(r.id || r.categoryId || r._id, payload)
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
        render: (r) => <span className="font-semibold text-ink/90">{fmtDate(r.createdDate || r.createdAt)}</span>,
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
                setSelectedId(r.id || r.categoryId || r._id)
                setMode('edit')
              }}
              aria-label={`Edit ${r.name || r.categoryName}`}
            >
              <FiEdit2 className="size-4" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              onClick={() => setDeleteId(r.id || r.categoryId || r._id)}
              aria-label={`Delete ${r.name || r.categoryName}`}
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

  const pageRows = data.map((c) => ({
    ...c,
    id: c.id ?? c.categoryId ?? c._id,
    name: c.name ?? c.categoryName,
    createdAt: c.createdAt ?? c.createdDate,
  }))

  if (mode === 'add') {
    return (
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-ink">Add Category</div>
            <div className="text-xs font-semibold text-muted">Create a new category</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('list')}>
            Back
          </button>
        </div>
        <AddCategoryForm
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
            <div className="text-sm font-extrabold text-ink">Edit Category</div>
            <div className="text-xs font-semibold text-muted">Update category details</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('list')}>
            Back
          </button>
        </div>
        <EditCategoryForm
          categoryId={selectedId}
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
            <div className="text-sm font-extrabold text-ink">Categories</div>
            <div className="text-xs font-semibold text-muted">Search, filter, paginate, and manage categories</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setMode('add')}>
              <FiPlus className="size-4" />
              Add Category
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setQuery('')
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
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => {
                  setPage(1)
                  setQuery(e.target.value)
                }}
                placeholder="Name or description"
                className="h-11 w-full rounded-full border border-border bg-background py-0 pl-10 pr-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
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
          <div className="rounded-3xl border border-border bg-background p-10 text-center text-sm font-bold text-muted">Loading...</div>
        ) : (
          <DataTable title={`Categories (${meta?.total || 0})`} columns={columns} rows={pageRows} />
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-semibold text-muted">
          Page <span className="font-extrabold text-ink">{page}</span> of <span className="font-extrabold text-ink">{totalPages}</span>
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
        <DeleteCategoryModal
          categoryId={deleteId}
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

