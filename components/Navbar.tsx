// components/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

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

          <div className="flex gap-3">
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