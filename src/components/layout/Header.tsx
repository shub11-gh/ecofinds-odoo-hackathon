
'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Leaf, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="bg-card border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-foreground font-headline">
              <Leaf className="h-8 w-8 text-primary" />
              <span>EcoFinds</span>
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center px-8">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  name="search"
                  type="search" 
                  placeholder="Search for items..." 
                  className="w-full pl-10" 
                  defaultValue={searchParams.get('q') || ''}
                  key={searchParams.get('q')} // Add key to reset input on navigation
                />
              </div>
            </form>
          </div>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/products/new" passHref>
              <Button variant="ghost" className="hidden sm:inline-flex">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Listing
              </Button>
            </Link>
             <Link href="/my-listings" passHref>
              <Button variant="ghost">My Listings</Button>
            </Link>
            <Link href="/purchases" passHref>
              <Button variant="ghost">Purchases</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
