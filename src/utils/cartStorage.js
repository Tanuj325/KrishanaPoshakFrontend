const CART_STORAGE_KEY = 'krishana-poshak-cart'

export function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) =>
        item &&
        typeof item.cartId === 'string' &&
        item.product &&
        typeof item.quantity === 'number' &&
        typeof item.selectedSize === 'string',
    )
  } catch {
    return []
  }
}

export function saveCartToStorage(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  } catch {
    // Ignore quota or privacy-mode errors.
  }
}

export function clearCartStorage() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch {
    // Ignore storage errors.
  }
}
