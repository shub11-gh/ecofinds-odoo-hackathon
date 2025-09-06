
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RepairForm } from '@/components/repair/RepairForm';
import { RepairShopList } from '@/components/repair/RepairShopList';
import { Map, Wrench } from 'lucide-react';

export default function RepairPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <section className="text-center py-16 bg-card border-b rounded-lg shadow-sm">
        <Wrench className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">
          Get Your Items Repaired Easily!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Find trusted repair centers nearby and give your beloved items a second life.
        </p>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Start Repair Request</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">New Repair Request</DialogTitle>
            </DialogHeader>
            <RepairForm onSubmit={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold font-headline mb-8 flex items-center gap-3">
            <Map className='h-8 w-8 text-primary' />
            Nearby Repair Shops
        </h2>
        <RepairShopList />
      </section>
    </div>
  );
}
