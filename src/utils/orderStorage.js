const ORDERS_STORAGE_KEY = 'krishana-poshak-orders'

const defaultOrderStatus = 'Pending'
const defaultPaymentStatus = 'Unpaid'

function safeParse(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function normalizeOrder(order) {
  if (!order || typeof order !== 'object') return null

  const normalized = {
    id: String(order.id ?? Date.now()),
    date: order.date ? String(order.date) : new Date().toISOString(),
    paymentMethod: order.paymentMethod ?? 'cod',
    paymentStatus: order.paymentStatus ?? defaultPaymentStatus,
    status: order.status ?? defaultOrderStatus,
    products: Array.isArray(order.products) ? order.products : [],
    totals: order.totals && typeof order.totals === 'object' ? order.totals : {},
  }

  normalized.totalAmount =
    typeof normalized.totals.totalAmount === 'number'
      ? normalized.totals.totalAmount
      : Number(normalized.totals.totalAmount ?? 0)

  // Fallback for compatibility if totalAmount exists at root
  if (typeof order.totalAmount === 'number') {
    normalized.totalAmount = order.totalAmount
  }

  normalized.products = normalized.products
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      productId: p.productId ?? null,
      name: p.name ?? '',
      quantity: Number(p.quantity ?? 1),
      lineTotal: Number(p.lineTotal ?? 0),
      image: p.image ?? '',
      selectedSize: p.selectedSize ?? '',
      priceValue: Number(p.priceValue ?? 0),
    }))

  return normalized
}

export function loadOrders() {
  const raw = safeParse(localStorage.getItem(ORDERS_STORAGE_KEY))
  return raw.map(normalizeOrder).filter(Boolean)
}

export function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // ignore
  }
}

export function clearOrders() {
  try {
    localStorage.removeItem(ORDERS_STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function appendOrder(order) {
  const existing = loadOrders()
  const normalized = normalizeOrder(order)
  if (!normalized) return null

  const next = [normalized, ...existing]
  saveOrders(next)
  return normalized
}

