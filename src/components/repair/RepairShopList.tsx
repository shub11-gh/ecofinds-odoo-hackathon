
import { mockRepairShops } from '@/lib/data';
import { RepairShopCard } from './RepairShopCard';

export function RepairShopList() {
  const shops = mockRepairShops;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop) => (
        <RepairShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}
