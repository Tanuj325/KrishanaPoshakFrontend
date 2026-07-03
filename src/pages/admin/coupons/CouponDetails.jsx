export default function CouponDetails({ coupon, onClose }) {
  if (!coupon) return null

  const fmtDate = (v) => {
    if (!v) return '—'
    try {
      return new Date(v).toLocaleDateString()
    } catch {
      return '—'
    }
  }

  const fmtCurrency = (n) => {
    const num = typeof n === 'number' ? n : Number(n)
    if (Number.isNaN(num)) return n
    return num.toLocaleString(undefined, { style: 'currency', currency: 'INR' })
  }

  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-extrabold text-ink">Coupon Details</div>
          <div className="text-xs font-semibold text-muted">{coupon.code || coupon.id}</div>
        </div>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Back
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Coupon Code</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{coupon.code}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Status</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{coupon.status}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Discount</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{coupon.discount}%</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Maximum Discount</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{fmtCurrency(coupon.maxDiscount)}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Minimum Purchase</div>
          <div className="mt-1 text-sm font-extrabold text-ink">{fmtCurrency(coupon.minPurchase)}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4">
          <div className="text-xs font-bold text-muted">Expiry Date</div>
          <div className="mt-1 text-sm font-semibold text-ink/90">{fmtDate(coupon.expiryDate)}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4 lg:col-span-2">
          <div className="text-xs font-bold text-muted">Created Date</div>
          <div className="mt-1 text-sm font-semibold text-ink/90">{fmtDate(coupon.createdAt)}</div>
        </div>
      </div>

      <div className="mt-6 text-xs font-semibold text-muted">
        Note: Coupon management uses mock/local storage.
      </div>
    </div>
  )
}

