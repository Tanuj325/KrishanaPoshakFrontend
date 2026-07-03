import { USE_DUMMY_AUTH } from '../config/auth'
import {
  clearAuthSession,
  getStoredAccessToken,
  getStoredRefreshToken,
  saveAuthSession,
  updateStoredUser,
} from '../utils/authStorage'
import api from './api'
import * as mockAuth from './auth/mockAuthService'

const AUTH_ENDPOINT = '/auth'

function normalizeAuthResponse(data) {
  return {
    accessToken: data.accessToken || data.token,
    refreshToken: data.refreshToken,
    tokenType: data.tokenType || 'Bearer',
    expiresIn: data.expiresIn || 3600,
    user: data.user,
  }
}

async function apiLogin(credentials) {
  const { data } = await api.post(`${AUTH_ENDPOINT}/login`, credentials)
  return normalizeAuthResponse(data)
}

async function apiRegister(payload) {
  const { data } = await api.post(`${AUTH_ENDPOINT}/register`, payload)
  return normalizeAuthResponse(data)
}

async function apiLogout() {
  await api.post(`${AUTH_ENDPOINT}/logout`)
}

async function apiGetCurrentUser() {
  const { data } = await api.get(`${AUTH_ENDPOINT}/me`)
  return data.user || data
}

async function apiRefreshToken(refreshToken) {
  const { data } = await api.post(`${AUTH_ENDPOINT}/refresh`, { refreshToken })
  return normalizeAuthResponse(data)
}

async function apiForgotPassword(payload) {
  const { data } = await api.post(`${AUTH_ENDPOINT}/forgot-password`, payload)
  return data
}

async function apiResetPassword(payload) {
  const { data } = await api.post(`${AUTH_ENDPOINT}/reset-password`, payload)
  return data
}

async function apiUpdateProfile(payload) {
  const { data } = await api.put(`${AUTH_ENDPOINT}/profile`, payload)
  return data.user || data
}

async function apiChangePassword(payload) {
  const { data } = await api.post(`${AUTH_ENDPOINT}/change-password`, payload)
  return data
}

export async function login(credentials) {
  const response = USE_DUMMY_AUTH
    ? await mockAuth.mockLogin(credentials)
    : await apiLogin(credentials)

  saveAuthSession(response)
  return response
}

export async function register(payload) {
  const response = USE_DUMMY_AUTH
    ? await mockAuth.mockRegister(payload)
    : await apiRegister(payload)

  saveAuthSession(response)
  return response
}

export async function logout() {
  try {
    if (USE_DUMMY_AUTH) {
      await mockAuth.mockLogout()
    } else {
      await apiLogout()
    }
  } finally {
    clearAuthSession()
  }
}

export async function getCurrentUser() {
  const accessToken = getStoredAccessToken()

  if (!accessToken) {
    throw new Error('Not authenticated')
  }

  if (USE_DUMMY_AUTH) {
    return mockAuth.mockGetCurrentUser(accessToken)
  }

  return apiGetCurrentUser()
}

export async function refreshToken() {
  const refreshTokenValue = getStoredRefreshToken()

  if (!refreshTokenValue) {
    throw new Error('No refresh token available')
  }

  const response = USE_DUMMY_AUTH
    ? await mockAuth.mockRefreshToken(refreshTokenValue)
    : await apiRefreshToken(refreshTokenValue)

  saveAuthSession(response)
  return response
}

export async function forgotPassword(payload) {
  if (USE_DUMMY_AUTH) {
    return mockAuth.mockForgotPassword(payload)
  }

  return apiForgotPassword(payload)
}

export async function resetPassword(payload) {
  if (USE_DUMMY_AUTH) {
    return mockAuth.mockResetPassword(payload)
  }

  return apiResetPassword(payload)
}

export async function updateProfile(payload) {
  const accessToken = getStoredAccessToken()

  if (!accessToken) {
    throw new Error('Not authenticated')
  }

  let user

  if (USE_DUMMY_AUTH) {
    const currentUser = await mockAuth.mockGetCurrentUser(accessToken)
    user = await mockAuth.mockUpdateProfile(currentUser.id, payload)
  } else {
    user = await apiUpdateProfile(payload)
  }

  updateStoredUser(user)
  return user
}

export async function changePassword(payload) {
  const accessToken = getStoredAccessToken()

  if (!accessToken) {
    throw new Error('Not authenticated')
  }

  if (USE_DUMMY_AUTH) {
    const currentUser = await mockAuth.mockGetCurrentUser(accessToken)
    return mockAuth.mockChangePassword(currentUser.id, payload)
  }

  return apiChangePassword(payload)
}

export function getStoredToken() {
  return getStoredAccessToken()
}

export function setStoredToken() {
  // Deprecated: use saveAuthSession via login/register instead.
}
