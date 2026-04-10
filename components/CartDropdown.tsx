// components/CartDropdown.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function CartDropdown() {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <Link 
      href="/cart" 
      className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors inline-flex items-center"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
