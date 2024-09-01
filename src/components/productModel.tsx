import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be at least 0'),
  quantity: z.number().min(0, 'Quantity must be at least 0'),
  typeId: z.number().min(1, 'Type ID is required'),
})

type ProductForm = z.infer<typeof productSchema>

export function ProductModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data: ProductForm) => {
    console.log(data)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
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
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
