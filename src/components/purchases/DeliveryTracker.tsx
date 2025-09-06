'use client';

import * as React from 'react';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrackingStatus } from '@/lib/types';

interface DeliveryTrackerProps {
  currentStatus: TrackingStatus;
}

const statuses: TrackingStatus[] = ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered'];

export function DeliveryTracker({ currentStatus }: DeliveryTrackerProps) {
  const currentIndex = statuses.indexOf(currentStatus);

  const getStatusIcon = (status: TrackingStatus) => {
    switch (status) {
      case 'Shipped':
        return <Package className="h-5 w-5" />;
      case 'In Transit':
        return <Truck className="h-5 w-5" />;
      case 'Out for Delivery':
        return <Truck className="h-5 w-5" />;
      case 'Delivered':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center">
        {statuses.map((status, index) => {
          const isActive = index <= currentIndex;
          return (
            <React.Fragment key={status}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300',
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {getStatusIcon(status)}
                </div>
                <p className={cn(
                    'text-xs mt-1 text-center',
                    isActive ? 'font-semibold text-primary' : 'text-muted-foreground'
                )}>{status}</p>
              </div>
              {index < statuses.length - 1 && (
                <div className="flex-1 h-1 bg-secondary mx-2">
                   <div
                    className={cn(
                      'h-full bg-primary transition-all duration-500',
                      currentIndex > index ? 'w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
