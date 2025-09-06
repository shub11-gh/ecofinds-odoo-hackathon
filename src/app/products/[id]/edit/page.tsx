import { ProductForm } from '@/components/product/ProductForm';
import { mockProducts } from '@/lib/data';

export default function EditProductPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the product from a database
  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ProductForm product={product} />
    </div>
  );
}
