import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppContext } from './context'
import {
  clearCartStorage,
  loadCartFromStorage,
  saveCartToStorage,
} from '../utils/cartStorage'
import {
  clearWishlistStorage,
  loadWishlistFromStorage,
  saveWishlistToStorage,
} from '../utils/wishlistStorage'

const MAX_QUANTITY = 10
const MIN_QUANTITY = 1

function normalizeProduct(product) {
  const priceValue =
    product.priceValue || Number(String(product.price).replace(/[^\d]/g, ''))

  return { ...product, priceValue }
}

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage())
  const [wishlistItems, setWishlistItems] = useState(() => loadWishlistFromStorage())

  useEffect(() => {
    saveCartToStorage(cartItems)
  }, [cartItems])

  useEffect(() => {
    saveWishlistToStorage(wishlistItems)
  }, [wishlistItems])

  const addToCart = useCallback((product, quantity = 1, selectedSize = 'Standard') => {
    const normalizedProduct = normalizeProduct(product)
    const size = selectedSize || product.sizes?.[0] || 'Standard'
    const cartId = `${product.id || product.name}-${size}`

    setCartItems((items) => {
      const existingItem = items.find((item) => item.cartId === cartId)

      if (existingItem) {
        return items.map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, MAX_QUANTITY),
              }
            : item,
        )
      }

      return [
        ...items,
        {
          cartId,
          product: normalizedProduct,
          quantity: Math.min(quantity, MAX_QUANTITY),
          selectedSize: size,
        },
      ]
    })
  }, [])

  const addToWishlist = useCallback((product) => {
    const normalizedProduct = normalizeProduct(product)

    setWishlistItems((items) => {
      if (items.some((item) => item.product.id === normalizedProduct.id)) {
        return items
      }

      return [
        ...items,
        {
          product: normalizedProduct,
          addedAt: new Date().toISOString(),
        },
      ]
    })
  }, [])

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((items) =>
      items.filter((item) => item.product.id !== productId),
    )
  }, [])

  const toggleWishlist = useCallback(
    (product) => {
      const productId = product.id
      const exists = wishlistItems.some((item) => item.product.id === productId)

      if (exists) {
        removeFromWishlist(productId)
      } else {
        addToWishlist(product)
      }
    },
    [addToWishlist, removeFromWishlist, wishlistItems],
  )

  const isInWishlist = useCallback(
    (productId) => wishlistItems.some((item) => item.product.id === productId),
    [wishlistItems],
  )

  const moveToCart = useCallback(
    (productId) => {
      const item = wishlistItems.find((entry) => entry.product.id === productId)
      if (!item) return

      const defaultSize = item.product.sizes?.[0] || 'Standard'
      addToCart(item.product, 1, defaultSize)
      removeFromWishlist(productId)
    },
    [addToCart, removeFromWishlist, wishlistItems],
  )

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
    clearWishlistStorage()
  }, [])

  const removeFromCart = useCallback((cartId) => {
    setCartItems((items) => items.filter((item) => item.cartId !== cartId))
  }, [])

  const increaseQuantity = useCallback((cartId) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
          : item,
      ),
    )
  }, [])

  const decreaseQuantity = useCallback((cartId) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(item.quantity - 1, MIN_QUANTITY) }
          : item,
      ),
    )
  }, [])

  const updateCartQuantity = useCallback((cartId, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: Math.min(Math.max(quantity, MIN_QUANTITY), MAX_QUANTITY),
            }
          : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    clearCartStorage()
  }, [])

  const cartTotalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.product.priceValue * item.quantity,
        0,
      ),
    [cartItems],
  )

  const cartShipping = useMemo(() => {
    if (cartSubtotal === 0) return 0
    return cartSubtotal >= 2000 ? 0 : 99
  }, [cartSubtotal])

  const cartTotal = useMemo(
    () => cartSubtotal + cartShipping,
    [cartSubtotal, cartShipping],
  )


  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems])

  const value = useMemo(
    () => ({
      cartItems,
      cartSubtotal,
      cartShipping,
      cartTotalItems,
      cartCounter: cartTotalItems,
      cartTotal,
      wishlistItems,
      wishlistCount,
      addToCart,

      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateCartQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      moveToCart,
      clearWishlist,
    }),
    [
      addToCart,
      addToWishlist,
      cartItems,
      cartSubtotal,
      cartTotalItems,
      clearCart,
      clearWishlist,
      decreaseQuantity,
      increaseQuantity,
      isInWishlist,
      moveToCart,
      removeFromCart,
      removeFromWishlist,
      toggleWishlist,
      updateCartQuantity,
      wishlistCount,
      wishlistItems,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
