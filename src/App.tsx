import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { getProducts } from './api/getProduct'
import { searchProductsByName } from './api/getProductsByName'
import { ProductCard } from './components/productCard'
import { ProductModal } from './components/productModel'

export function App() {
  const [search, setSearch] = useState('')

  const { data: products, refetch } = useQuery({
    queryFn: search ? () => searchProductsByName(search) : () => getProducts(),
    queryKey: ['products', search],
    // enabled: false, // A query é disparada manualmente com `refetch`
  })

  const { handleSubmit } = useForm()

  function submitFn() {
    refetch()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-zinc-950 text-white py-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Nunes Sports</h1>
          <form
            onSubmit={handleSubmit(submitFn)}
            className="relative w-full sm:w-1/3 mb-4 sm:mb-0 rounded-lg border-[1px] border-white  focus:border-none"
          >
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full px-4 py-2 rounded-lg bg-transparent text-white focus:text-black focus:outline-none transition-colors duration-200 focus:bg-white border-none"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </form>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 flex-grow">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Welcome to Nunes Sports
        </h2>
        <p className="text-gray-700 text-center">
          Discover the best sports gear and equipment at unbeatable prices.
          Search for your favorite products above or browse through our
          categories.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              typeId={product.typeId}
              code={product.code}
              id={product.id}
            />
          ))}
        </div>
      </main>
      <footer className="bg-zinc-950 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Nunes Sports. All rights reserved.</p>
        </div>
      </footer>

      <Dialog.Root>
        <ProductModal />
      </Dialog.Root>
    </div>
  )
}

export default App
