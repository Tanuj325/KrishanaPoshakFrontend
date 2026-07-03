import { useEffect, useMemo, useState } from 'react'
import { getUnreadNotificationsCount } from '../../services/admin/notifications/notificationsStorageService'

export default function useAdminNotificationsUnreadCount() {
  const [version, setVersion] = useState(0)

  const unreadCount = useMemo(() => {
    try {
      return getUnreadNotificationsCount()
    } catch {
      return 0
    }
  }, [version])


  useEffect(() => {
    const onStorage = (e) => {
      // Only bump when notifications storage is modified.
      if (e.key === 'krishana-poshak-notifications') setVersion((v) => v + 1)
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return unreadCount
}

