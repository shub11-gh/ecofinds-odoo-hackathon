
'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Leaf, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const filtered = mockProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/products/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  if (!isMounted) {
    return null; 
  }

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
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Search for Products</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Type to search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10"
                    />
                  </div>
                </form>
                <div className="mt-4 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-2 rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => handleResultClick(product.id)}
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={50}
                            height={50}
                            className="rounded-md object-cover h-12 w-12"
                            data-ai-hint={product.imageHint}
                          />
                          <div>
                            <p className="font-semibold">{product.title}</p>
                            <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length > 1 ? (
                    <p className="text-center text-muted-foreground py-4">No products found.</p>
                  ) : null}
                </div>
              </DialogContent>
            </Dialog>
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
