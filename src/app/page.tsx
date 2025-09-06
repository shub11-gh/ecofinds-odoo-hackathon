import Link from 'next/link';
import { Plus } from 'lucide-react';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/lib/data';
import type { Product, Category, SubCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams.category as Category | undefined;
  const subcategory = searchParams.subcategory as SubCategory<Category> | undefined;
  const query = searchParams.q as string | undefined;

  let filteredProducts: Product[] = mockProducts;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.subcategory === subcategory
    );
  }

  if (query) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div>
      <section className="bg-blue-600 text-white rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Buy Smart. <br /> Buy Refurbished.
            </h1>
            <p className="text-lg mb-6">
              Save up to <span className="text-yellow-400 font-bold">50%</span> on refurbished phones
            </p>
            <Button className="bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-500">
              Buy Now
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center relative">
            <Image
              src="https://picsum.photos/400/300"
              alt="Refurbished phones"
              width={400}
              height={300}
              className="rounded-lg z-10"
              data-ai-hint="refurbished smartphones"
            />
            <div className="absolute -bottom-4 bg-blue-800 text-yellow-300 p-4 rounded-full shadow-lg z-20">
              <p className="font-bold text-lg">SMART VALUE DAYS</p>
              <p className="text-center text-sm">4th - 8th Sep</p>
            </div>
          </div>
        </div>
      </section>

      <h1 className="text-3xl font-bold mb-4 font-headline">Explore Products</h1>
      <p className="text-muted-foreground mb-8">
        Find unique pre-owned items and contribute to a more sustainable world.
      </p>
      
      <CategoryFilter />
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No products found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
      
      <Link href="/products/new" passHref>
        <Button size="icon" className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg">
            <Plus className="h-8 w-8" />
            <span className="sr-only">Add new product</span>
        </Button>
      </Link>
    </div>
  );
}
