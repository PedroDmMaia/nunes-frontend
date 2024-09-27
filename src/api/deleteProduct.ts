import { api } from '../lib/axios'

export async function deleteProduct(id: string) {
  try {
    await api.delete(`/products/${id}`)
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
