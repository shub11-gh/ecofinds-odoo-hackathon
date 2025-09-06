'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/lib/data';
import type { Category, SubCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') as Category | null;
  const currentSubCategory = searchParams.get('subcategory') as SubCategory<Category> | null;

  const handleCategoryFilter = (category: Category | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    // Reset subcategory when main category changes
    params.delete('subcategory');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubCategoryFilter = (subcategory: SubCategory<Category> | null) => {
    const params = new URLSearchParams(searchParams);
    if (subcategory) {
        params.set('subcategory', subcategory);
    } else {
        params.delete('subcategory');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const selectedCategoryObject = categories.find(c => c.name === currentCategory);

  return (
    <div className='mb-8'>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={!currentCategory ? 'default' : 'outline'}
          onClick={() => handleCategoryFilter(null)}
          className="rounded-full"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={currentCategory === category.name ? 'default' : 'outline'}
            onClick={() => handleCategoryFilter(category.name)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>
      {selectedCategoryObject && selectedCategoryObject.subcategories.length > 0 && (
        <>
            <Separator className="my-4" />
            <div className="flex flex-wrap items-center gap-2">
            <Button
                variant={!currentSubCategory ? 'secondary' : 'outline'}
                onClick={() => handleSubCategoryFilter(null)}
                className="rounded-full"
                size="sm"
            >
                All {selectedCategoryObject.name}
            </Button>
            {selectedCategoryObject.subcategories.map((subcategory) => (
                <Button
                key={subcategory}
                variant={currentSubCategory === subcategory ? 'secondary' : 'outline'}
                onClick={() => handleSubCategoryFilter(subcategory)}
                className="rounded-full"
                size="sm"
                >
                {subcategory}
                </Button>
            ))}
            </div>
        </>
      )}
    </div>
  );
}
