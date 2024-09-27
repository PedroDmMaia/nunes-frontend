import { api } from '../lib/axios'
import { ProductResponse } from './getProduct'

export async function searchProductsByName(
  name: string,
): Promise<ProductResponse[]> {
  try {
    const response = await api.get<ProductResponse[]>('products/search', {
      params: { name },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
