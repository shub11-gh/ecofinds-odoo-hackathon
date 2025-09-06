
'use client';

import { usePurchaseStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DeliveryTracker } from '@/components/purchases/DeliveryTracker';

export default function PurchasesPage() {
  const { purchases } = usePurchaseStore();

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Your Purchases</h1>
      {purchases.length > 0 ? (
        <div className="space-y-4">
          {purchases.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex flex-col sm:flex-row items-center">
                <Link href={`/products/${item.id}`} className="flex items-center flex-grow w-full sm:w-auto mb-4 sm:mb-0">
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
                    <p className="font-bold text-primary text-lg mt-1">₹{item.price.toFixed(2)}</p>
                  </div>
                </Link>

                <div className="flex-shrink-0 text-center sm:text-right w-full sm:w-auto">
                  <Badge variant="outline" className="mb-2">Purchased</Badge>
                  <p className="text-sm text-muted-foreground">Est. Arrival: {new Date(item.estimatedArrival).toLocaleDateString()}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="mt-2">
                        <Truck className="mr-2 h-4 w-4" />
                        Show tracker preview
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <DeliveryTracker currentStatus={item.trackingStatus} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-bold">No past purchases.</h2>
          <p className="text-muted-foreground mt-2">
            Once you buy an item, it will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
