/**
 * Toggle dummy auth vs Spring Boot API.
 * Set VITE_USE_DUMMY_AUTH=false when the backend is ready.
 */
export const USE_DUMMY_AUTH =
  import.meta.env.VITE_USE_DUMMY_AUTH !== 'false'

export const AUTH_ROUTES = {
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
}

export const PROTECTED_ROUTES = {
  cart: '/cart',
  checkout: '/checkout',
  wishlist: '/wishlist',
  profile: '/profile',
  orders: '/orders',
  addresses: '/addresses',
}
