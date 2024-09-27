import { api } from '../lib/axios'

interface Products {
  name: string
  description: string
  price: number
  quantity: number
  typeId: number
}

export async function createProduct(data: Products) {
  try {
    const response = await api.post(`/products`, data)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
