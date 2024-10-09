import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { deleteProduct } from '../api/deleteProduct'
import { updateProducts } from '../api/updateProducts'
import { queryClient } from '../lib/react-query'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be at least 0'),
  quantity: z.number().min(0, 'Quantity must be at least 0'),
  typeId: z.number().min(1, 'Type ID is required'),
})

type ProductForm = z.infer<typeof productSchema>

interface ProductCardProps {
  id: string
  image?: string
  name: string
  description: string
  price: number
  quantity: number
  typeId: number
  code: string
}

export function ProductCard({
  id,
  image,
  name,
  description,
  price,
  quantity,
  typeId,
  code,
}: ProductCardProps) {
  const { mutateAsync: updateProductFn, isPending: isLoading } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductForm }) => {
      return await updateProducts(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const { mutateAsync: deleteProductFn } = useMutation({
    mutationFn: async (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenToDelete, setIsOpenToDelete] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name,
      description,
      price,
      quantity,
      typeId,
    },
  })

  async function submitFn(data: ProductForm) {
    try {
      await updateProductFn({ id, data })
      setIsOpen(false)

      toast.success('Produto atualizado com sucesso')
    } catch (error) {
      console.log(error)

      toast.error('Ocorreu um erro ao atulaizar o produto')
    }
  }

  async function submitFnToDelete(id: string) {
    try {
      await deleteProductFn(id)
      setIsOpenToDelete(false)

      toast.success('Produto deletado com sucesso')
    } catch (error) {
      console.log(error)

      toast.error('Ocorreu um erro ao deletar o produto')
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs mx-auto relative">
      <img
        src={image || 'https://via.placeholder.com/300'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 w-80">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2 h-20 overflow-y-scroll">
          {description}
        </p>
        <p className="text-lg font-bold text-zinc-950">${price.toFixed(2)}</p>
        <p className="text-gray-700 mt-2">Quantity: {quantity}</p>
        <p className="text-gray-700">Type ID: {typeId}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300"
        >
          <Pencil size={16} className="text-gray-600" />
        </button>

        <button
          onClick={() => setIsOpenToDelete(true)}
          className="absolute top-2 left-2 p-2 bg-red-200 rounded-full shadow-lg hover:bg-red-300 transition-all duration-300"
        >
          <X size={16} className="text-gray-600" />
        </button>
      </div>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <Dialog.Title className="text-2xl font-bold mb-4">
                Edit Product <span>{code}</span>
              </Dialog.Title>
              <Dialog.Description></Dialog.Description>
              <form onSubmit={handleSubmit(submitFn)} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    {...register('description')}
                    className="w-full border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    {...register('quantity', { valueAsNumber: true })}
                    className="w-full border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Type ID</label>
                  <input
                    type="number"
                    {...register('typeId', { valueAsNumber: true })}
                    className="w-full border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.typeId && (
                    <p className="text-red-500 text-sm">
                      {errors.typeId.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="bg-red-200 hover:bg-transparent border-2 border-transparent hover:border-red-500 text-red-500 px-4 py-2 rounded-lg duration-200"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-zinc-950 text-white hover:text-zinc-950 px-4 py-2 rounded-lg hover:bg-transparent border-2 hover:border-zinc-950 flex items-center justify-center duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white hover:text-zinc-950"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={isOpenToDelete} onOpenChange={setIsOpenToDelete}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-5">
              <Dialog.Title className="text-2xl font-bold mb-4 text-center">
                Tem certeza que deseja excluir este produto ?{' '}
              </Dialog.Title>
              <div className="flex justify-evenly">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                  type="button"
                  onClick={() => submitFnToDelete(id)}
                >
                  Sim
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default ProductCard
