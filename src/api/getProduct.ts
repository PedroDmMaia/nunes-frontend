import { api } from '../lib/axios'

export interface ProductResponse {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  code: string
  typeId: number
  createdAt: Date
  updatedAt: Date
}

export async function getProducts(): Promise<ProductResponse[]> {
  const response = await api.get<ProductResponse[]>('/products')
  return response.data
}
