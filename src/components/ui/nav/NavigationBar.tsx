'use client';

import Link from 'next/link';
import { Button } from '~/src/components/ui/buttons/button';
import { Home, List, ShoppingBag } from 'lucide-react';
import dynamic from 'next/dynamic';


const CartSheet = dynamic(() => import('../../Cart').then(mod => mod.CartSheet), {
  ssr: false,
});


export function NavigationBar() {
  return (
    <nav className="fixed top-0 right-0 w-full border-t py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="w-24">
          <Link href="/" aria-label='Go to home page'>
            <Button  size="icon" aria-label="Home button">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
        <Link href="/categories" aria-label="Browse categories">
          <Button className='flex items-center' aria-label="Browse button">
            <List className="h-5 w-5 mr-2" />
            Categories
          </Button>
        </Link>
        <Link href="/orders" aria-label="Order history">
          <Button className='flex items-center' aria-label="Order history button">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Order History
          </Button>
        </Link>
      </div>
        {/* Cart component */}
        <div className="w-24 flex justify-end">
          <CartSheet />
        </div>
      </div>
    </nav>
  );
}