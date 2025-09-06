import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  actions?: React.ReactNode;
}

export default function ProductCard({ product, actions }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-w-4 aspect-h-3">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={600}
              height={400}
              className="object-cover w-full h-48"
              data-ai-hint={product.imageHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-bold leading-tight hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <p className="text-xl font-headline font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        {actions ? (
          <div className="flex gap-2">{actions}</div>
        ) : (
          <Link href={`/products/${product.id}`} passHref>
             <Button>View</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
