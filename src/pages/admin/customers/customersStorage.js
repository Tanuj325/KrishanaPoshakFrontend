const CUSTOMERS_STORAGE_KEY = 'krishana-poshak-customers'

const SEED = [
  {
    id: 'CUST-1001',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    createdAt: '2026-06-01T10:00:00.000Z',
    lastLoginAt: '2026-06-25T12:30:00.000Z',
    ordersCount: 3,
    totalSpending: 5499.75,
    status: 'Active',
  },
  {
    id: 'CUST-1002',
    firstName: 'Neha',
    lastName: 'Patel',
    email: 'neha.patel@example.com',
    phone: '9123456780',
    createdAt: '2026-05-28T10:00:00.000Z',
    lastLoginAt: '2026-06-22T09:10:00.000Z',
    ordersCount: 1,
    totalSpending: 249.5,
    status: 'Active',
  },
  {
    id: 'CUST-1003',
    firstName: 'Amit',
    lastName: 'Verma',
    email: 'amit.verma@example.com',
    phone: '9988776655',
    createdAt: '2026-06-12T10:00:00.000Z',
    lastLoginAt: '2026-06-19T16:10:00.000Z',
    ordersCount: 2,
    totalSpending: 178.0,
    status: 'Active',
  },
]

function safeParse(raw) {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed
  } catch {
    return null
  }
}

function normalizeCustomer(c) {
  if (!c || typeof c !== 'object') return null
  const firstName = c.firstName ?? ''
  const lastName = c.lastName ?? ''

  return {
    ...c,
    id: c.id ?? String(Date.now()),
    firstName: String(firstName),
    lastName: String(lastName),
    email: c.email ?? '',
    phone: c.phone ?? '',
    createdAt: c.createdAt ?? new Date().toISOString(),
    lastLoginAt: c.lastLoginAt ?? null,
    ordersCount: Number(c.ordersCount ?? 0),
    totalSpending: Number(c.totalSpending ?? 0),
  }
}

export function loadCustomers() {
  const existing = safeParse(localStorage.getItem(CUSTOMERS_STORAGE_KEY))
  const list = Array.isArray(existing) ? existing : SEED
  return list.map(normalizeCustomer).filter(Boolean)
}

export function saveCustomers(customers) {
  localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers))
}

export function ensureCustomersSeed() {
  const existing = safeParse(localStorage.getItem(CUSTOMERS_STORAGE_KEY))
  if (!Array.isArray(existing) || existing.length === 0) {
    saveCustomers(SEED)
  }
}

