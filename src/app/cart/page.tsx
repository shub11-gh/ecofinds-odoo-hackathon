
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function CartPage() {
  const { items: cartItems, removeFromCart } = useCartStore();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={150}
                  height={100}
                  className="rounded-md object-cover h-24 w-36"
                  data-ai-hint={item.imageHint}
                />
                <div className="ml-4 flex-grow">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="font-bold text-primary mt-1">₹{item.price.toFixed(2)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1 sticky top-24">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹5.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(totalPrice + 5).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/checkout" passHref className='w-full'>
                  <Button className="w-full" size="lg">Proceed to Checkout</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-bold">Your cart is empty.</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/" passHref>
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
