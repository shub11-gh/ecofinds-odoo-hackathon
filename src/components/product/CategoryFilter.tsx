'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/lib/data';
import type { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleFilter = (category: Category | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <Button
        variant={!currentCategory ? 'default' : 'outline'}
        onClick={() => handleFilter(null)}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? 'default' : 'outline'}
          onClick={() => handleFilter(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
