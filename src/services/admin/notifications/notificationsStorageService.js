import {
  ensureNotificationsSeed,
  loadNotifications,
  saveNotifications,
} from '../../../pages/admin/notifications/notificationsStorage'

export function getUnreadNotificationsCount() {
  ensureNotificationsSeed()
  const items = loadNotifications()
  return items.filter((n) => !n.read).length
}

export {
  ensureNotificationsSeed,
  loadNotifications,
  saveNotifications,
}

