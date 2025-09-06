
'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/lib/data';
import type { Product, Category, SubCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
  
  const banners = [
      {
        src: "https://s3no.cashify.in/cashify/web/49fd126086f547bc87104c4e604c254b.webp?p=default&s=lg",
        alt: "Promotional Banner 1",
        hint: "promotional sale"
      },
      {
        src: "https://s3no.cashify.in/cashify/web/9667570390bd441eaf0fad676738691b.webp?p=default&s=lg",
        alt: "Promotional Banner 2",
        hint: "mobile deal"
      },
      {
        src: "https://image2url.com/images/1757151623460-19973fb7-8bdd-41bf-b433-d8d27fde8a8a.png",
        alt: "Promotional Banner 3",
        hint: "refurbished products"
      },
  ]

  return (
    <div>
      <section className="mb-8">
         <Carousel className="w-full">
            <CarouselContent>
                {banners.map((banner, index) => (
                <CarouselItem key={index}>
                    <Card className='overflow-hidden'>
                        <CardContent className="flex aspect-[3/1] items-center justify-center p-0">
                             <Image
                                src={banner.src}
                                alt={banner.alt}
                                width={1200}
                                height={400}
                                className="w-full h-full object-cover"
                                data-ai-hint={banner.hint}
                                priority={index === 0}
                            />
                        </CardContent>
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
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
