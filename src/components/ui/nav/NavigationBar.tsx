'use client';

import Link from 'next/link';
import { Button } from '~/src/components/ui/buttons/button';
import { Home, List, ShoppingBag } from 'lucide-react';
import { CartSheet } from '../../Cart';

export function NavigationBar() {
  return (
    <nav className="fixed top-0 right-0 w-full border-t py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="w-24">
          <Link href="/">
            <Button  size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
        <Link href="/categories">
          <Button className='flex items-center'>
            <List className="h-5 w-5 mr-2" />
            Categories
          </Button>
        </Link>
        <Link href="/orders">
          <Button className='flex items-center'>
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