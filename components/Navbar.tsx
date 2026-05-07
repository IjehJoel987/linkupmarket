// components/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, Search, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchStore } from '@/lib/search-store';

// Dynamically import CartDropdown to avoid hydration issues
const CartDropdown = dynamic(() => import('./CartDropdown'), {
  ssr: false,
  loading: () => <div className="w-6 h-6" /> // Placeholder while loading
});

// Dynamically import HelpWidget to avoid hydration issues
const HelpWidget = dynamic(() => import('./HelpWidget'), {
  ssr: false,
  loading: () => <div className="w-6 h-6" /> // Placeholder while loading
});

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [showCategories, setShowCategories] = useState(false);
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  const categories = [
    { name: 'LinkUp Foods', href: '#marketplace' },
    { name: 'LinkUp Gadgets', href: '#marketplace' },
    { name: 'LinkUp Fashion', href: '#marketplace' },
    { name: 'Trade Fair Specials', href: '#marketplace' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setTimeout(() => {
        const element = document.getElementById('products-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('linkup_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('linkup_user');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            <img
              src="/linkup_logo.PNG"
              alt="LinkUp Marketplace"
              className="h-16 w-auto group-hover:scale-110 group-hover:brightness-0 group-hover:saturate-200 group-hover:hue-rotate-180 transition-all duration-300"
              style={{
                filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.1))'
              }}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#marketplace"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 relative group"
            >
              Browse Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 flex items-center gap-1">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/seller-onboarding"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 relative group"
            >
              Become a Seller
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search products"
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <HelpWidget />
            <CartDropdown />
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold">Welcome, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="btn-secondary px-6 py-3 text-sm font-semibold hidden sm:inline-block">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="btn-primary px-6 py-3 text-sm font-semibold">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
