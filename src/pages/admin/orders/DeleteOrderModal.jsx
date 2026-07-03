import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiAlertTriangle, FiX } from 'react-icons/fi'

export default function DeleteOrderModal({ orderId, onCancel, onDeleted }) {
  // There is no delete endpoint in orderService spec; keep modal for future.
  // For now, treat delete as a UI-only confirmation.
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [orderId])

  const onConfirm = async () => {
    setLoading(true)
    try {
      await onDeleted?.()
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50" onClick={onCancel} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-background p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="size-5 text-red-500" />
            <div className="text-sm font-extrabold text-ink">Order Confirmation</div>
          </div>
          <button
            type="button"
            className="rounded-full border border-border bg-background p-2 hover:bg-secondary"
            onClick={onCancel}
            aria-label="Close"
          >
            <FiX className="size-5" />
          </button>
        </div>

        <div className="mt-4 text-sm font-semibold text-muted">
          Confirm action for order <span className="font-extrabold text-ink">{orderId}</span>. (Delete not implemented)
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm} disabled={loading}>
            {loading ? 'Please wait...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

