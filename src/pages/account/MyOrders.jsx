import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { FiArrowRight, FiClock, FiCreditCard, FiShoppingBag, FiPackage } from 'react-icons/fi'

import EmptyOrders from '../EmptyOrders'
import AccountNav from '../../components/account/AccountNav'
import { loadOrders } from '../../utils/orderStorage'

const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered',
  'Cancelled',
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

function statusPillClass(status) {
  switch (status) {
    case 'Pending':
      return 'bg-primary/10 text-primary ring-1 ring-primary/20'
    case 'Confirmed':
      return 'bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20'
    case 'Packed':
      return 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20'
    case 'Shipped':
      return 'bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/20'
    case 'Delivered':
      return 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20'
    case 'Cancelled':
      return 'bg-red-500/10 text-red-700 ring-1 ring-red-500/20'
    default:
      return 'bg-secondary text-ink ring-1 ring-border'
  }
}

function QuantitySummary({ products }) {
  const totalQty = useMemo(
    () => products.reduce((sum, p) => sum + Number(p.quantity || 0), 0),
    [products],
  )
  return <span>{totalQty} item{totalQty === 1 ? '' : 's'}</span>
}

function MyOrders() {
  const orders = useMemo(() => loadOrders(), [])




  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Order History</span>
            <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
              My Orders
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Track your poshak orders, delivery status, and past purchases.
            </p>
          </div>
          <NavLink to="/shop" className="btn btn-secondary w-fit">
            <FiShoppingBag className="size-5" />
            Continue Shopping
          </NavLink>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-start">
          <AccountNav />

          <div className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
            {orders.length === 0 ? (
              <EmptyOrders />
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => {
                  const totals = order.totals || {}
                  const totalAmount =
                    typeof totals.totalAmount === 'number'
                      ? totals.totalAmount
                      : Number(order.totalAmount || 0)

                  return (
                    <article
                      key={order.id}
                      className="rounded-[1.25rem] border border-border bg-background p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.05)]"
                    >
                      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
                              <FiPackage className="size-4" />
                              {order.id}
                            </span>

                            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted ring-1 ring-border">
                              <FiClock className="size-4" />
                              {formatDate(order.date)}
                            </span>
                          </div>

                          <div className="mt-3 text-sm text-muted">
                            <QuantitySummary products={order.products} />
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:items-end">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${statusPillClass(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                          <div className="text-xs font-semibold text-muted">
                            Payment: {order.paymentMethod}
                            <span className="mx-1">•</span>
                            {order.paymentStatus}
                          </div>
                        </div>
                      </header>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_18rem]">
                        <div className="rounded-card bg-secondary p-4">
                          <h3 className="text-sm font-extrabold text-ink">
                            Product List
                          </h3>

                          <div className="mt-4 grid gap-3">
                            {order.products.map((p, idx) => (
                              <div
                                key={`${p.productId ?? p.name}-${idx}`}
                                className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-extrabold text-ink">
                                    {p.name}
                                  </p>
                                  <p className="mt-1 text-xs font-semibold text-muted">
                                    Qty: {p.quantity}
                                    {p.selectedSize
                                      ? ` • Size: ${p.selectedSize}`
                                      : ''}
                                  </p>
                                </div>
                                <p className="shrink-0 text-sm font-extrabold text-primary">
                                  {formatPrice(p.lineTotal)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <aside className="rounded-card bg-background p-4">
                          <div className="flex items-center gap-2 text-sm font-extrabold text-ink">
                            <FiCreditCard className="size-4 text-primary" />
                            Total Amount
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-muted">
                              Amount
                            </span>
                            <span className="text-lg font-extrabold text-ink">
                              {formatPrice(totalAmount)}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted">Order Status</span>
                              <span className="font-bold text-ink">
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted">Payment Method</span>
                              <span className="font-bold text-ink">
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted">Payment Status</span>
                              <span className="font-bold text-ink">
                                {order.paymentStatus}
                              </span>
                            </div>
                          </div>

                          <div className="mt-5">
                            <p className="text-xs leading-6 text-muted">
                              Use LocalStorage demo: statuses are shown from the
                              stored order record.
                            </p>
                          </div>
                        </aside>
                      </div>

                      {/* Hidden: ensure statuses list is referenced for clarity */}

                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyOrders

