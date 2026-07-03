const WISHLIST_STORAGE_KEY = 'krishana-poshak-wishlist'

export function loadWishlistFromStorage() {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) =>
        item &&
        item.product &&
        (item.product.id !== undefined || item.product.name),
    )
  } catch {
    return []
  }
}

export function saveWishlistToStorage(items) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Ignore quota or privacy-mode errors.
  }
}

export function clearWishlistStorage() {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY)
  } catch {
    // Ignore storage errors.
  }
}
