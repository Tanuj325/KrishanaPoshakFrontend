import { createContext, useCallback, useEffect, useMemo, useState, useContext } from 'react'

const ADMIN_AUTH_STORAGE_KEY = 'adminAuth'

function getStoredAdminAuth() {
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function setStoredAdminAuth(value) {
  localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(value))
}

function clearStoredAdminAuth() {
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
}

export const AdminAuthContext = createContext(null)

import {
  clearAdminAuthSession,
  getRememberedAdminEmail,
  saveAdminAuthSession,
  saveRememberedAdminEmail,
} from './adminAuthStorage'

// Dummy/local authentication.
// Future-ready for Spring Boot: when BE provides real auth+roles,
// keep the same API surface but swap storage and role source.
export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => getStoredAdminAuth())
  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(null)

  const bootstrap = useCallback(async () => {
    // Keep as async for future BE integration.
    try {
      const stored = getStoredAdminAuth()
      setAdminUser(stored)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  const loginAsAdmin = useCallback(async ({ email, role = 'ADMIN' } = {}) => {
    setError(null)

    // Dummy: store an admin session. Role is placeholder for Spring Boot RBAC.
    const next = {
      isAdmin: true,
      role,
      email: email || 'admin@example.com',
      // could store issuedAt/exp for real auth later
    }

    setStoredAdminAuth(next)
    setAdminUser(next)
    return next
  }, [])

  const logout = useCallback(async () => {
    setError(null)
    clearStoredAdminAuth()
    setAdminUser(null)
  }, [])

  const value = useMemo(
    () => ({
      adminUser,
      isAuthenticated: Boolean(adminUser?.isAdmin),
      role: adminUser?.role || null,
      isLoading,
      error,
      setError,
      clearError: () => setError(null),
      loginAsAdmin,
      logout,
    }),
    [adminUser, error, isLoading, loginAsAdmin, logout],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}

