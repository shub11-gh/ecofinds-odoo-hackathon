import { mockPurchases } from '@/lib/data';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function PurchasesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Your Purchases</h1>
      {mockPurchases.length > 0 ? (
        <div className="space-y-4">
          {mockPurchases.map((item) => (
            <Link href={`/products/${item.id}`} key={item.id}>
              <Card className="flex items-center p-4 hover:bg-muted/50 transition-colors">
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
                </div>
                <div className="text-right">
                    <p className="font-bold text-primary text-lg">${item.price.toFixed(2)}</p>
                    <Badge variant="outline" className="mt-1">Purchased</Badge>
                </div>
              </Card>
            </Link>
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
