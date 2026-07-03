const STORE_SETTINGS_KEY = 'krishana-poshak-store-settings'

const DEFAULT_SETTINGS = {
  storeName: 'Krishana Poshak',
  storeLogo: '', // base64/data-url
  ownerName: 'Tanuj',
  email: 'owner@krishanaposak.example',
  phone: '9000000000',
  whatsappNumber: '9000000000',
  businessAddress: 'Vrindavan, Uttar Pradesh, India',
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
  },
  theme: 'Light',
  updatedAt: null,
}

function safeParse(raw) {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function loadStoreSettings() {
  const existing = safeParse(localStorage.getItem(STORE_SETTINGS_KEY))
  return existing ? { ...DEFAULT_SETTINGS, ...existing, social: { ...DEFAULT_SETTINGS.social, ...(existing.social || {}) } } : DEFAULT_SETTINGS
}

export function saveStoreSettings(payload) {
  const next = {
    ...DEFAULT_SETTINGS,
    ...payload,
    social: { ...DEFAULT_SETTINGS.social, ...(payload?.social || {}) },
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(next))
  return next
}

