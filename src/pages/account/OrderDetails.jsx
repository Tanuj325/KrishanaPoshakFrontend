import { useMemo } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import {
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiDownload,
  FiMapPin,
  FiPackage,
} from 'react-icons/fi'
import AccountNav from '../../components/account/AccountNav'
import { loadOrders } from '../../utils/orderStorage'

const TIMELINE_STEPS = [
  { key: 'Pending', label: 'Order confirmed', icon: FiCheckCircle },
  { key: 'Confirmed', label: 'Confirmed', icon: FiCheckCircle },
  { key: 'Packed', label: 'Packed', icon: FiCheckCircle },
  { key: 'Shipped', label: 'Shipped', icon: FiCheckCircle },
  { key: 'Delivered', label: 'Delivered', icon: FiCheckCircle },
  { key: 'Cancelled', label: 'Cancelled', icon: FiCheckCircle },
]

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return String(iso || '')
  }
}

function formatPrice(amount) {
  const n = Number(amount || 0)
  return `Rs. ${n.toLocaleString('en-IN')}`
}

function stepIndex(status) {
  const idx = TIMELINE_STEPS.findIndex((s) => s.key === status)
  if (idx === -1) return 0
  return idx
}

function isStepDone(stepKey, currentStatus) {
  if (currentStatus === 'Cancelled') {
    return stepKey === 'Cancelled'
  }
  const doneUntil = stepIndex(currentStatus)
  const idx = TIMELINE_STEPS.findIndex((s) => s.key === stepKey)
  return idx <= doneUntil
}

function OrderDetails() {
  const { orderId } = useParams()

  const orders = useMemo(() => loadOrders(), [])
  const order = useMemo(() => orders.find((o) => o.id === orderId), [
    orders,
    orderId,
  ])

  const totals = order?.totals || {}
  const totalAmount =
    typeof totals.totalAmount === 'number'
      ? totals.totalAmount
      : Number(order?.totalAmount || 0)

  if (!order) {
    return (
      <section className="section-padding">
        <div className="app-container">
          <div className="max-w-3xl rounded-[1.25rem] border border-border bg-secondary p-8 text-center shadow-premium">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <FiPackage className="size-7" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold text-ink">
              Order not found
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted">
              This order may have been cleared from LocalStorage.
            </p>
            <NavLink to="/orders" className="btn btn-primary btn-lg mt-8">
              Back to My Orders
            </NavLink>
          </div>
        </div>
      </section>
    )
  }

  const address = order.deliveryAddress || {}

  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Order Details</span>
            <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
              {order.id}
            </h1>
            <p className="mt-3 text-muted">
              Placed on {formatDate(order.date)} • {order.paymentMethod} •{' '}
              {order.paymentStatus}
            </p>
          </div>
          <NavLink to="/orders" className="btn btn-secondary w-fit">
            Back to Orders
          </NavLink>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-start">
          <AccountNav />

          <div className="grid gap-6">
            <div className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold text-ink">Shipping Address</h2>
                  <div className="mt-4 flex items-start gap-3 rounded-card bg-background p-4">
                    <FiMapPin className="size-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-ink">
                        {address.firstName} {address.lastName}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-muted">
                        {address.phone}
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        {address.address}
                        {address.city ? `, ${address.city}` : ''}
                        {address.state ? `, ${address.state}` : ''}
                        {address.pinCode ? ` - ${address.pinCode}` : ''}
                        {address.country ? `, ${address.country}` : ''}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[18rem]">
                  <div className="rounded-card bg-background p-4">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-ink">
                      <FiPackage className="size-4 text-primary" />
                      Order Status
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-muted">Current</p>
                      <p className="mt-1 text-2xl font-extrabold text-primary">
                        {order.status}
                      </p>
                      <p className="mt-3 text-xs leading-6 text-muted">
                        Payment Status: <span className="font-bold text-ink">{order.paymentStatus}</span>
                      </p>
                    </div>
                    <p className="mt-4 text-xs leading-6 text-muted">
                      Total: <span className="font-extrabold text-ink">{formatPrice(totalAmount)}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary mt-4 w-full"
                    onClick={() => {
                      // UI only (no invoice generation)
                    }}
                  >
                    <FiDownload className="size-5" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">Product List</h2>
              <div className="mt-5 overflow-hidden rounded-card border border-border bg-background">
                {order.products.length === 0 ? (
                  <div className="p-6 text-center text-muted">No products found.</div>
                ) : (
                  <div className="divide-y divide-border">
                    {order.products.map((p, idx) => (
                      <div
                        key={`${p.productId ?? p.name}-${idx}`}
                        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-ink">{p.name}</p>
                          <p className="mt-1 text-xs font-semibold text-muted">
                            Qty: {p.quantity}
                            {p.selectedSize ? ` • Size: ${p.selectedSize}` : ''}
                          </p>
                        </div>
                        <p className="text-sm font-extrabold text-primary">
                          {formatPrice(p.lineTotal)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
                <h2 className="text-xl font-extrabold text-ink">Payment Details</h2>
                <div className="mt-4 grid gap-3 rounded-card bg-background p-4">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-muted">Payment Method</span>
                    <span className="font-extrabold text-ink">{order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-muted">Payment Status</span>
                    <span className="font-extrabold text-ink">{order.paymentStatus}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs leading-6 text-muted">
                    <FiCreditCard className="size-4 text-primary" />
                    No payment integration is connected yet. This is a UI-only demo.
                  </div>
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
                <h2 className="text-xl font-extrabold text-ink">Timeline</h2>
                <ol className="mt-5 space-y-4">
                  {TIMELINE_STEPS.map((step) => {
                    const done = isStepDone(step.key, order.status)
                    const Icon = step.icon
                    return (
                      <li key={step.key} className="relative pl-7">
                        <span
                          className={
                            done
                              ? 'absolute left-0 top-1 grid size-5 place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20'
                              : 'absolute left-0 top-1 grid size-5 place-items-center rounded-full bg-background text-muted ring-1 ring-border'
                          }
                        >
                          <Icon className="size-3.5" />
                        </span>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-extrabold text-ink">{step.label}</p>
                          <p className="text-xs text-muted">
                            {done ? 'Completed' : 'In progress'}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ol>

                <div className="mt-6 rounded-card bg-background p-4">
                  <div className="flex items-center gap-2 text-xs leading-6 text-muted">
                    <FiArrowRight className="size-4 text-primary" />
                    Timeline updates are shown based on the stored order status.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">Order Status</h2>
              <div className="mt-4 rounded-card bg-background p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-muted">
                    Current status
                  </p>
                  <p className="text-2xl font-extrabold text-primary">{order.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderDetails

