import { useCallback, useEffect, useState } from 'react'
import * as addressService from '../services/addressService'

export function useAddresses(userId) {
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshAddresses = useCallback(async () => {
    if (!userId) {
      setAddresses([])
      setIsLoading(false)
      return []
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await addressService.fetchAddresses(userId)
      setAddresses(data)
      return data
    } catch (err) {
      setError(err.message || 'Unable to load addresses')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    refreshAddresses()
  }, [refreshAddresses])

  const addAddress = useCallback(
    async (payload) => {
      const data = await addressService.createAddress(userId, payload)
      await refreshAddresses()
      return data
    },
    [refreshAddresses, userId],
  )

  const updateAddress = useCallback(
    async (addressId, payload) => {
      const data = await addressService.editAddress(userId, addressId, payload)
      await refreshAddresses()
      return data
    },
    [refreshAddresses, userId],
  )

  const deleteAddress = useCallback(
    async (addressId) => {
      const data = await addressService.removeAddress(userId, addressId)
      await refreshAddresses()
      return data
    },
    [refreshAddresses, userId],
  )

  const setDefaultAddress = useCallback(
    async (addressId) => {
      const data = await addressService.markDefaultAddress(userId, addressId)
      await refreshAddresses()
      return data
    },
    [refreshAddresses, userId],
  )

  return {
    addresses,
    isLoading,
    error,
    refreshAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  }
}
