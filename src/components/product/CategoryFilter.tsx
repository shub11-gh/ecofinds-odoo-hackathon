
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/lib/data';
import type { Category, SubCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') as Category | null;
  const currentSubCategory = searchParams.get('subcategory') as SubCategory<Category> | null;

  const handleFilter = (category: Category | null, subcategory: SubCategory<Category> | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if (subcategory) {
        params.set('subcategory', subcategory);
    } else {
        params.delete('subcategory');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const getFilterLabel = () => {
    if (currentCategory && currentSubCategory) {
      return `${currentCategory} > ${currentSubCategory}`;
    }
    if (currentCategory) {
      return currentCategory;
    }
    return 'All Categories';
  }

  return (
    <div className='mb-8'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[200px] justify-between">
            {getFilterLabel()}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleFilter(null, null)}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuSub key={category.name}>
                <DropdownMenuSubTrigger>
                  <span>{category.name}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleFilter(category.name, null)}>
                    All {category.name}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {category.subcategories.map((subcategory) => (
                    <DropdownMenuItem 
                      key={subcategory} 
                      onClick={() => handleFilter(category.name, subcategory)}
                    >
                      {subcategory}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
