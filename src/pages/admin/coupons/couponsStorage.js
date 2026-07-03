const COUPONS_STORAGE_KEY = 'krishana-poshak-coupons'

const SEED = [
  {
    id: 'CPN-1001',
    code: 'RADHA10',
    discount: 10,
    expiryDate: '2026-12-31T00:00:00.000Z',
    minPurchase: 499,
    maxDiscount: 150,
    status: 'Active',
    createdAt: '2026-06-10T10:00:00.000Z',
  },
  {
    id: 'CPN-1002',
    code: 'KRISHNA15',
    discount: 15,
    expiryDate: '2026-11-30T00:00:00.000Z',
    minPurchase: 799,
    maxDiscount: 250,
    status: 'Active',
    createdAt: '2026-06-11T10:00:00.000Z',
  },
  {
    id: 'CPN-1003',
    code: 'FREESHIP',
    discount: 5,
    expiryDate: '2026-10-15T00:00:00.000Z',
    minPurchase: 299,
    maxDiscount: 100,
    status: 'Inactive',
    createdAt: '2026-06-12T10:00:00.000Z',
  },
]

function safeParse(raw) {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function normalizeCoupon(c) {
  if (!c || typeof c !== 'object') return null
  return {
    ...c,
    id: c.id ?? String(Date.now()),
    code: String(c.code ?? c.couponCode ?? '').trim(),
    discount: Number(c.discount ?? 0),
    expiryDate: c.expiryDate ?? c.expiry ?? null,
    minPurchase: Number(c.minPurchase ?? c.minimumPurchase ?? 0),
    maxDiscount: Number(c.maxDiscount ?? c.maximumDiscount ?? 0),
    status: c.status ?? 'Active',
    createdAt: c.createdAt ?? new Date().toISOString(),
  }
}

export function ensureCouponsSeed() {
  const existing = safeParse(localStorage.getItem(COUPONS_STORAGE_KEY))
  if (!Array.isArray(existing) || existing.length === 0) {
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(SEED))
  }
}

export function loadCoupons() {
  const existing = safeParse(localStorage.getItem(COUPONS_STORAGE_KEY))
  const list = Array.isArray(existing) ? existing : SEED
  return list.map(normalizeCoupon).filter(Boolean)
}

export function saveCoupons(coupons) {
  localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(coupons))
}

export function createCoupon(payload) {
  const next = loadCoupons()
  const created = normalizeCoupon({
    ...payload,
    id: payload?.id ?? `CPN-${Date.now()}`,
  })
  next.unshift(created)
  saveCoupons(next)
  return created
}

export function updateCoupon(couponId, payload) {
  const next = loadCoupons()
  const idx = next.findIndex((c) => c.id === couponId)
  if (idx === -1) throw new Error('Coupon not found')
  const updated = normalizeCoupon({ ...next[idx], ...payload, id: couponId })
  next[idx] = updated
  saveCoupons(next)
  return updated
}

export function deleteCoupon(couponId) {
  const next = loadCoupons().filter((c) => c.id !== couponId)
  saveCoupons(next)
}

