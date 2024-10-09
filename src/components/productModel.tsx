import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react' // Importando useState para controlar o modal
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct } from '../api/postProduct'
import { queryClient } from '../lib/react-query'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be at least 0'),
  quantity: z.number().min(0, 'Quantity must be at least 0'),
  typeId: z.number().min(1, 'Type ID is required'),
})

type ProductForm = z.infer<typeof productSchema>

export function ProductModal() {
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar se o modal está aberto

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  })

  const { mutateAsync: createProductFn, isPending: isLoading } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const onSubmit = async (data: ProductForm) => {
    try {
      await createProductFn(data)
      toast.success('Produto atualizado com sucesso')

      setIsOpen(false) // Fecha o modal após o sucesso
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao atualizar o produto')
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-zinc-800 hover:bg-zinc-600 text-white p-4 rounded-full shadow-lg h-[2.6rem] flex justify-center items-center duration-200"
        >
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Dialog.Title className="text-2xl font-bold mb-4">
              Add New Product
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
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
                  className="bg-zinc-950 text-white hover:text-zinc-950 px-4 py-2 rounded-lg hover:bg-transparent border-2 border-transparent hover:border-zinc-950 flex items-center justify-center duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
  )
}
