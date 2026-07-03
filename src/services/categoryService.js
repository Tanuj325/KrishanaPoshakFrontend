import api from './api'

const CATEGORIES_ENDPOINT = '/categories'

export async function getCategories(params = {}) {
  const { data } = await api.get(CATEGORIES_ENDPOINT, { params })
  return data
}

export async function getCategoryById(categoryId) {
  const { data } = await api.get(`${CATEGORIES_ENDPOINT}/${categoryId}`)
  return data
}

export async function getCategoryProducts(categoryId, params = {}) {
  const { data } = await api.get(`${CATEGORIES_ENDPOINT}/${categoryId}/products`, {
    params,
  })
  return data
}

export async function createCategory(payload) {
  const { data } = await api.post(CATEGORIES_ENDPOINT, payload)
  return data
}

export async function updateCategory(categoryId, payload) {
  const { data } = await api.put(`${CATEGORIES_ENDPOINT}/${categoryId}`, payload)
  return data
}

export async function deleteCategory(categoryId) {
  const { data } = await api.delete(`${CATEGORIES_ENDPOINT}/${categoryId}`)
  return data
}
