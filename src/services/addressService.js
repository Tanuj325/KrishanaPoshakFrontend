import {
  addAddress,
  deleteAddress,
  loadAddresses,
  setDefaultAddress,
  updateAddress,
} from '../utils/addressStorage'

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Address service facade.
 * Replace implementations with Spring Boot API calls when the backend is ready.
 *
 * Planned endpoints:
 *   GET    /users/{userId}/addresses
 *   POST   /users/{userId}/addresses
 *   PUT    /users/{userId}/addresses/{id}
 *   DELETE /users/{userId}/addresses/{id}
 *   PATCH  /users/{userId}/addresses/{id}/default
 */
export async function fetchAddresses(userId) {
  await delay()
  return loadAddresses(userId)
}

export async function createAddress(userId, payload) {
  await delay()
  return addAddress(userId, payload)
}

export async function editAddress(userId, addressId, payload) {
  await delay()
  return updateAddress(userId, addressId, payload)
}

export async function removeAddress(userId, addressId) {
  await delay()
  return deleteAddress(userId, addressId)
}

export async function markDefaultAddress(userId, addressId) {
  await delay()
  return setDefaultAddress(userId, addressId)
}
