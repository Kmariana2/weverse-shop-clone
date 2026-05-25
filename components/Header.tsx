'use client';

import { useUI, useCart } from '@/lib/store';
import { ShoppingBag, User, Search } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { toggleCart } = useUI();
  const { items } = useCart();
  const cartCount = items.length;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">
            W
          </div>
          <div className="text-sm font-semibold hidden sm:block">
            <div>Weverse Shop</div>
            <div className="text-xs font-normal text-gray-600">BTS</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="font-semibold hover:text-gray-600">
            TOUR MERCH
          </Link>
          <Link href="#" className="hover:text-gray-600">
            MUSIC
          </Link>
          <Link href="#" className="hover:text-gray-600">
            MEMBERSHIP
          </Link>
          <Link href="#" className="hover:text-gray-600">
            LIVE
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={toggleCart}
            className="relative p-2 hover:bg-gray-100 rounded"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
