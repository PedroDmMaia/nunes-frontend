import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'

import { getProducts } from './api/getProduct'
import { ProductCard } from './components/productCard'
import { ProductModal } from './components/productModel'

export function App() {
  const { data: products } = useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
  })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-800 text-white py-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Nunes Sports</h1>
          <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg">
              🔍
            </button>
          </div>
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
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              typeId={product.typeId}
            />
          ))}
        </div>
      </main>
      <footer className="bg-blue-800 text-white py-4 mt-8">
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
