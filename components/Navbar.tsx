// components/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchStore } from '@/lib/search-store';

// Dynamically import CartDropdown to avoid hydration issues
const CartDropdown = dynamic(() => import('./CartDropdown'), {
  ssr: false,
  loading: () => <div className="w-6 h-6" /> // Placeholder while loading
});

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

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
              className="h-16 w-auto group-hover:scale-110 transition-transform duration-300"
            />
            <span className="ml-3 text-2xl font-bold gradient-text hidden sm:block">LinkUp</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#marketplace"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 relative group"
            >
              Browse Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/post-service"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 relative group"
            >
              Sell Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 relative group"
            >
              Dashboard
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