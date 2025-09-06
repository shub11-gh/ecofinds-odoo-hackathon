import Link from 'next/link';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts, mockUser } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function MyListingsPage() {
  // Filter products for the mock user
  const userProducts = mockProducts.filter(p => p.userId === mockUser.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">My Listings</h1>
        <Link href="/products/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Listing
          </Button>
        </Link>
      </div>

      {userProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              actions={
                <>
                  <Link href={`/products/${product.id}/edit`} passHref>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </>
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-bold">You have no active listings.</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            List your first item to start selling!
          </p>
          <Link href="/products/new" passHref>
            <Button>List an Item</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
