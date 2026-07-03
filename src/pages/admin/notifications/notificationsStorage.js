import { NOTIFICATIONS_STORAGE_KEY } from '../../../services/admin/notifications/notificationsStorageKey'

import { adminNotificationsDummyData } from './adminNotificationsDummyData'


function safeParse(raw) {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function ensureNotificationsSeed() {
  const existing = safeParse(localStorage.getItem(NOTIFICATIONS_STORAGE_KEY))
  if (!Array.isArray(existing) || existing.length === 0) {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(adminNotificationsDummyData))
  }
}

export function loadNotifications() {
  const existing = safeParse(localStorage.getItem(NOTIFICATIONS_STORAGE_KEY))
  const list = Array.isArray(existing) ? existing : adminNotificationsDummyData
  return list.map((n) => ({
    ...n,
    read: Boolean(n.read),
  }))
}

export function saveNotifications(list) {
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list))
}

