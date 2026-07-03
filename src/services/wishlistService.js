import {
  clearWishlistStorage,
  loadWishlistFromStorage,
  saveWishlistToStorage,
} from '../utils/wishlistStorage'

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Wishlist service facade.
 * Replace with Spring Boot API calls when the backend is ready.
 *
 * Planned endpoints:
 *   GET    /wishlist
 *   POST   /wishlist
 *   DELETE /wishlist/{productId}
 *   DELETE /wishlist
 */
export async function fetchWishlist() {
  await delay()
  return loadWishlistFromStorage()
}

export async function addWishlistItem(item) {
  await delay()
  const items = loadWishlistFromStorage()
  const exists = items.some((entry) => entry.product.id === item.product.id)

  if (exists) return items

  const nextItems = [...items, item]
  saveWishlistToStorage(nextItems)
  return nextItems
}

export async function removeWishlistItem(productId) {
  await delay()
  const items = loadWishlistFromStorage().filter(
    (entry) => entry.product.id !== productId,
  )
  saveWishlistToStorage(items)
  return items
}

export async function clearWishlistItems() {
  await delay()
  clearWishlistStorage()
  return []
}
