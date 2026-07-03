const KEYS = {
  // Keep this separate so it can map 1:1 to JWT fields later.
  accessToken: 'admin-poshak-token',
  refreshToken: 'admin-poshak-refresh-token',
  user: 'admin-poshak-user',
  rememberEmail: 'admin-poshak-remember-email',
}

export function saveAdminAuthSession({ accessToken, refreshToken, user }) {
  localStorage.setItem(KEYS.accessToken, accessToken)
  if (refreshToken) localStorage.setItem(KEYS.refreshToken, refreshToken)
  localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function getStoredAdminAccessToken() {
  return localStorage.getItem(KEYS.accessToken)
}

export function getStoredAdminRefreshToken() {
  return localStorage.getItem(KEYS.refreshToken)
}

export function getStoredAdminUser() {
  const raw = localStorage.getItem(KEYS.user)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearAdminAuthSession() {
  localStorage.removeItem(KEYS.accessToken)
  localStorage.removeItem(KEYS.refreshToken)
  localStorage.removeItem(KEYS.user)
}

export function saveRememberedAdminEmail(email) {
  localStorage.setItem(KEYS.rememberEmail, email)
}

export function getRememberedAdminEmail() {
  return localStorage.getItem(KEYS.rememberEmail) || ''
}

export function clearRememberedAdminEmail() {
  localStorage.removeItem(KEYS.rememberEmail)
}

