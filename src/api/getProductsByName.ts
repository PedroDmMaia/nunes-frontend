import { api } from '../lib/axios'
import { ProductResponse } from './getProduct'

export async function searchProducts(name: string): Promise<ProductResponse[]> {
  try {
    const response = await api.get<ProductResponse[]>('/search', {
      params: { name },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
