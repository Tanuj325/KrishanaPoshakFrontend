const KEYS = {
  accessToken: 'krishana-poshak-token',
  refreshToken: 'krishana-poshak-refresh-token',
  user: 'krishana-poshak-user',
  rememberEmail: 'krishana-poshak-remember-email',
}

/**
 * Persists auth session to localStorage.
 * Swap the implementation here when moving to httpOnly cookies with Spring Boot.
 */
export function saveAuthSession({ accessToken, refreshToken, user }) {
  localStorage.setItem(KEYS.accessToken, accessToken)
  if (refreshToken) {
    localStorage.setItem(KEYS.refreshToken, refreshToken)
  }
  localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function getStoredAccessToken() {
  return localStorage.getItem(KEYS.accessToken)
}

export function getStoredRefreshToken() {
  return localStorage.getItem(KEYS.refreshToken)
}

export function getStoredUser() {
  const raw = localStorage.getItem(KEYS.user)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function updateStoredUser(user) {
  const accessToken = getStoredAccessToken()
  const refreshToken = getStoredRefreshToken()

  if (!accessToken) return null

  saveAuthSession({
    accessToken,
    refreshToken,
    user,
  })

  return user
}

export function clearAuthSession() {
  localStorage.removeItem(KEYS.accessToken)
  localStorage.removeItem(KEYS.refreshToken)
  localStorage.removeItem(KEYS.user)
}

export function saveRememberedEmail(email) {
  localStorage.setItem(KEYS.rememberEmail, email)
}

export function getRememberedEmail() {
  return localStorage.getItem(KEYS.rememberEmail) || ''
}

export function clearRememberedEmail() {
  localStorage.removeItem(KEYS.rememberEmail)
}
