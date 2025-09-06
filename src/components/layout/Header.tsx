
'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Leaf, PlusCircle, Menu, Wrench, LogOut } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { mockProducts, mockUser } from '@/lib/data';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
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

  const navLinks = (
    <>
      <Link href="/products/new" passHref>
        <Button variant="ghost" className="w-full justify-start sm:w-auto sm:justify-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Listing
        </Button>
      </Link>
       <Link href="/my-listings" passHref>
        <Button variant="ghost" className="w-full justify-start sm:w-auto sm:justify-center">My Listings</Button>
      </Link>
      <Link href="/purchases" passHref>
        <Button variant="ghost" className="w-full justify-start sm:w-auto sm:justify-center">Purchases</Button>
      </Link>
       <Link href="/repair" passHref>
        <Button variant="ghost" className="w-full justify-start sm:w-auto sm:justify-center">
            <Wrench className="mr-2 h-5 w-5" />
            Repair
        </Button>
      </Link>
      <Link href="/dashboard" passHref>
        <Button variant="ghost" className="w-full justify-start sm:w-auto sm:justify-center">Dashboard</Button>
      </Link>
    </>
  );

  return (
    <header className="bg-card border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="hidden sm:inline text-primary">EcoFinds</span>
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center px-2 sm:px-8">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-muted-foreground border px-4">
                  <Search className="h-5 w-5 mr-2" />
                  <span className='truncate'>Search for products...</span>
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
                      autoFocus
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
                            <p className="text-sm text-primary">₹{product.price.toFixed(2)}</p>
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

          <nav className="flex items-center space-x-1 sm:space-x-2">
             <div className="hidden sm:flex sm:items-center sm:space-x-2">
                {navLinks}
             </div>
            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user.username}`} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Link href="/login" passHref>
                    <Button className="hidden sm:inline-flex">Login</Button>
                </Link>
            )}

            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigate through the application pages.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 pt-8">
                    {navLinks}
                    <SheetClose asChild>
                       <Link href="/login" passHref>
                         <Button className="w-full">Login</Button>
                       </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
