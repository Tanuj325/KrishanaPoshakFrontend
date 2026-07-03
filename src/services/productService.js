import api from './api'

const PRODUCTS_ENDPOINT = '/products'

export async function getProducts(params = {}) {
  const { data } = await api.get(PRODUCTS_ENDPOINT, { params })
  return data
}

export async function getProductById(productId) {
  const { data } = await api.get(`${PRODUCTS_ENDPOINT}/${productId}`)
  return data
}

export async function getFeaturedProducts(params = {}) {
  const { data } = await api.get(`${PRODUCTS_ENDPOINT}/featured`, { params })
  return data
}

export async function getProductsByCategory(categoryId, params = {}) {
  const { data } = await api.get(`${PRODUCTS_ENDPOINT}/category/${categoryId}`, {
    params,
  })
  return data
}

export async function searchProducts(query, params = {}) {
  const { data } = await api.get(`${PRODUCTS_ENDPOINT}/search`, {
    params: { q: query, ...params },
  })
  return data
}

export async function createProduct(payload) {
  const { data } = await api.post(PRODUCTS_ENDPOINT, payload)
  return data
}

export async function updateProduct(productId, payload) {
  const { data } = await api.put(`${PRODUCTS_ENDPOINT}/${productId}`, payload)
  return data
}

export async function deleteProduct(productId) {
  const { data } = await api.delete(`${PRODUCTS_ENDPOINT}/${productId}`)
  return data
}
