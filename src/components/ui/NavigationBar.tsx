'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartSheet } from '../Cart/Cart';
import { Home } from 'lucide-react';

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

        <Link href="/categories">
          <Button className='flex-3'>
            Categories
          </Button>
        </Link>

        {/* Cart component */}
        <div className="w-24 flex justify-end">
          <CartSheet />
        </div>
      </div>
    </nav>
  );
}