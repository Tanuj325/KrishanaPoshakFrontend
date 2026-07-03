import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiAlertTriangle, FiX } from 'react-icons/fi'
import { deleteCategory, getCategoryById } from '../../../services/categoryService'

function ModalShell({ title, children, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-background p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="size-5 text-red-500" />
              <div className="text-sm font-extrabold text-ink">{title}</div>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-border bg-background p-2 hover:bg-secondary"
            onClick={onClose}
            aria-label="Close"
          >
            <FiX className="size-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default function DeleteCategoryModal({ categoryId, onCancel, onDeleted }) {
  const [categoryName, setCategoryName] = useState('this category')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    const load = async () => {
      setLoading(true)
      try {
        const c = await getCategoryById(categoryId)
        if (!alive) return
        setCategoryName(c?.name ?? c?.categoryName ?? 'this category')
      } catch {
        if (!alive) return
        setCategoryName('this category')
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [categoryId])

  const onConfirm = async () => {
    setError('')
    setDeleting(true)
    try {
      await deleteCategory(categoryId)
      await onDeleted?.()
    } catch (e) {
      setError(e?.message || 'Unable to delete category')
      setDeleting(false)
    }
  }

  return (
    <ModalShell title="Delete Category" onClose={onCancel}>
      <div className="text-sm font-semibold text-muted">
        Are you sure you want to delete <span className="font-extrabold text-ink">{loading ? '...' : categoryName}</span>? This action cannot be undone.
      </div>

      {error ? <div className="mt-3 text-sm font-semibold text-red-500">{error}</div> : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={deleting}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={onConfirm} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </ModalShell>
  )
}

