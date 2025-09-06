
'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { mockProducts, mockUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/lib/store';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { addToCart, isItemInCart } = useCartStore();
  const product = mockProducts.find(p => p.id === params.id);

  // In a real app, you would get the current logged-in user's ID
  const currentUserId = mockUser.id;
  const isOwner = product?.userId === currentUserId;

  if (!product) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      if (isItemInCart(product.id)) {
        toast({
          title: 'Already in Cart',
          description: `${product.title} is already in your cart.`,
        });
      } else {
        addToCart(product);
        toast({
          title: 'Added to Cart!',
          description: `Successfully added "${product.title}" to your cart.`,
        });
        router.refresh(); 
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={600}
            height={400}
            className="w-full object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col">
          <div className='flex items-center gap-2 mb-2'>
            <Badge variant="secondary" className="w-fit">{product.category}</Badge>
            <Separator orientation='vertical' className='h-4'/>
            <Badge variant="outline" className="w-fit">{product.subcategory}</Badge>
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed flex-grow">{product.description}</p>
          
          {!isOwner && (
            <div className="mt-8">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
