import api from './api'

const ORDERS_ENDPOINT = '/orders'

export async function getOrders(params = {}) {
  const { data } = await api.get(ORDERS_ENDPOINT, { params })
  return data
}

export async function getOrderById(orderId) {
  const { data } = await api.get(`${ORDERS_ENDPOINT}/${orderId}`)
  return data
}

export async function getOrdersByUser(userId, params = {}) {
  const { data } = await api.get(`${ORDERS_ENDPOINT}/user/${userId}`, { params })
  return data
}

export async function createOrder(payload) {
  const { data } = await api.post(ORDERS_ENDPOINT, payload)
  return data
}

export async function updateOrder(orderId, payload) {
  const { data } = await api.put(`${ORDERS_ENDPOINT}/${orderId}`, payload)
  return data
}

export async function updateOrderStatus(orderId, status) {
  const { data } = await api.patch(`${ORDERS_ENDPOINT}/${orderId}/status`, { status })
  return data
}

export async function cancelOrder(orderId, reason = '') {
  const { data } = await api.post(`${ORDERS_ENDPOINT}/${orderId}/cancel`, { reason })
  return data
}
