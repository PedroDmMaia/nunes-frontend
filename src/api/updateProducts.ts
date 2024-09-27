import { api } from '../lib/axios'

interface Products {
  name: string
  description: string
  price: number
  quantity: number
  typeId: number
}

export async function updateProducts(id: string, data: Products) {
  try {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
