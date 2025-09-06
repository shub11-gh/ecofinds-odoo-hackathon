
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCartStore, usePurchaseStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import type { Purchase } from '@/lib/types';
import { CreditCard, Landmark, Wallet, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items: cartItems, clearCart } = useCartStore();
  const { addPurchases } = usePurchaseStore();
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalWithShipping = totalPrice + 5;

  const handlePlaceOrder = () => {
    const newPurchases: Purchase[] = cartItems.map(item => {
      const arrivalDate = new Date();
      arrivalDate.setDate(arrivalDate.getDate() + 7); // Arrives in 7 days
      return {
        ...item,
        purchaseDate: new Date().toISOString().split('T')[0],
        estimatedArrival: arrivalDate.toISOString().split('T')[0],
        trackingNumber: `1Z${Math.random().toString().slice(2, 18).toUpperCase()}`,
        trackingStatus: 'Shipped',
      };
    });

    // Add new purchases to the purchase store
    addPurchases(newPurchases);

    // Clear the cart
    clearCart();

    toast({
      title: 'Order Placed!',
      description: 'Your items are on their way. You can track them in your purchases.',
    });

    router.push('/purchases');
  };

  if (cartItems.length === 0) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold">Your cart is empty.</h2>
            <p className="text-muted-foreground mt-2 mb-4">
                Please add items to your cart before proceeding to checkout.
            </p>
            <Button onClick={() => router.push('/')}>Go Shopping</Button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <Label
                  htmlFor="upi"
                  className="flex items-center gap-4 border p-4 rounded-md cursor-pointer hover:bg-muted has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                >
                  <CreditCard className="h-6 w-6" />
                  <div className="flex-grow">
                    <p className="font-semibold">UPI</p>
                    <p className="text-sm opacity-80">Pay with any UPI app.</p>
                  </div>
                  <RadioGroupItem value="upi" id="upi" />
                </Label>
                <Label
                  htmlFor="paypal"
                  className="flex items-center gap-4 border p-4 rounded-md cursor-pointer hover:bg-muted has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                >
                  <Wallet className="h-6 w-6" />
                  <div className="flex-grow">
                    <p className="font-semibold">PayPal</p>
                    <p className="text-sm opacity-80">Connect your PayPal account.</p>
                  </div>
                  <RadioGroupItem value="paypal" id="paypal" />
                </Label>
                <Label
                  htmlFor="cod"
                  className="flex items-center gap-4 border p-4 rounded-md cursor-pointer hover:bg-muted has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                >
                  <Truck className="h-6 w-6" />
                  <div className="flex-grow">
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm opacity-80">Pay when your order arrives.</p>
                  </div>
                  <RadioGroupItem value="cod" id="cod" />
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span>₹{item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>₹5.00</span>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalWithShipping.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full mt-4"
            size="lg"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
