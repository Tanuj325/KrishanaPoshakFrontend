const ADDRESSES_KEY = 'krishana-poshak-addresses'

export const ADDRESS_LABELS = ['Home', 'Work', 'Mandir', 'Other']

const DEMO_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    name: 'Radha Sharma',
    phone: '+91 98765 43210',
    line1: 'Krishna Poshak Studio, Banke Bihari Temple Road',
    line2: '',
    city: 'Vrindavan',
    state: 'Uttar Pradesh',
    pinCode: '281121',
    country: 'India',
    isDefault: true,
  },
]

function loadAllAddresses() {
  try {
    const stored = localStorage.getItem(ADDRESSES_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveAllAddresses(allAddresses) {
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(allAddresses))
}

function normalizeDefault(addresses, preferredId = null) {
  if (addresses.length === 0) return []

  const hasDefault = addresses.some((address) => address.isDefault)

  if (!hasDefault) {
    const targetId = preferredId ?? addresses[0].id
    return addresses.map((address) => ({
      ...address,
      isDefault: address.id === targetId,
    }))
  }

  if (preferredId) {
    return addresses.map((address) => ({
      ...address,
      isDefault: address.id === preferredId,
    }))
  }

  return addresses
}

export function loadAddresses(userId) {
  const allAddresses = loadAllAddresses()
  const userAddresses = allAddresses[userId] || []

  if (userId === 1 && userAddresses.length === 0) {
    allAddresses[userId] = DEMO_ADDRESSES
    saveAllAddresses(allAddresses)
    return DEMO_ADDRESSES
  }

  return userAddresses
}

export function saveAddresses(userId, addresses) {
  const allAddresses = loadAllAddresses()
  allAddresses[userId] = addresses
  saveAllAddresses(allAddresses)
  return addresses
}

export function addAddress(userId, payload) {
  const addresses = loadAddresses(userId)
  const newAddress = {
    id: Date.now(),
    label: payload.label,
    name: payload.name,
    phone: payload.phone,
    line1: payload.line1,
    line2: payload.line2 || '',
    city: payload.city,
    state: payload.state,
    pinCode: payload.pinCode,
    country: payload.country || 'India',
    isDefault: payload.isDefault ?? addresses.length === 0,
  }

  let nextAddresses = [...addresses, newAddress]

  if (newAddress.isDefault) {
    nextAddresses = normalizeDefault(nextAddresses, newAddress.id)
  }

  return saveAddresses(userId, nextAddresses)
}

export function updateAddress(userId, addressId, payload) {
  const addresses = loadAddresses(userId)
  let nextAddresses = addresses.map((address) =>
    address.id === addressId
      ? {
          ...address,
          label: payload.label,
          name: payload.name,
          phone: payload.phone,
          line1: payload.line1,
          line2: payload.line2 || '',
          city: payload.city,
          state: payload.state,
          pinCode: payload.pinCode,
          country: payload.country || 'India',
          isDefault: payload.isDefault ?? address.isDefault,
        }
      : address,
  )

  if (payload.isDefault) {
    nextAddresses = normalizeDefault(nextAddresses, addressId)
  } else {
    nextAddresses = normalizeDefault(nextAddresses)
  }

  return saveAddresses(userId, nextAddresses)
}

export function deleteAddress(userId, addressId) {
  const addresses = loadAddresses(userId)
  const nextAddresses = addresses.filter((address) => address.id !== addressId)
  return saveAddresses(userId, normalizeDefault(nextAddresses))
}

export function setDefaultAddress(userId, addressId) {
  const addresses = loadAddresses(userId)
  return saveAddresses(userId, normalizeDefault(addresses, addressId))
}

export function formatAddress(address) {
  const line2 = address.line2 ? `, ${address.line2}` : ''
  return `${address.line1}${line2}, ${address.city}, ${address.state} - ${address.pinCode}`
}

export function getDefaultAddress(userId) {
  return loadAddresses(userId).find((address) => address.isDefault) || null
}
