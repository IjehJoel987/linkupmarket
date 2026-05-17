'use client';

import { X } from 'lucide-react';
import Link from 'next/link';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoriesModal({ isOpen, onClose }: CategoriesModalProps) {
  const categories = [
    {
      name: 'LinkUp Foods',
      emoji: '🍞',
      id: 'linkupfood',
      description: 'Jendol, bread, snacks & more',
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'LinkUp Gadgets',
      emoji: '⚡',
      id: 'linkupgadget',
      description: 'Tech, electronics & accessories',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'LinkUp Fashion',
      emoji: '👕',
      id: 'linkupfashion',
      description: 'Clothes, shoes & style',
      color: 'from-pink-400 to-rose-600'
    },
    {
      name: 'Trade Fair Specials',
      emoji: '🛍️',
      id: 'tradefairspecial',
      description: 'Limited offers & deals',
      color: 'from-purple-400 to-indigo-600'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
        <div className="bg-white rounded-3xl md:rounded-2xl shadow-2xl w-full md:w-auto md:max-w-2xl max-h-96 md:max-h-fit overflow-y-auto animate-slide-up">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-100 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Browse Categories</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="p-6 grid grid-cols-2 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href="/#marketplace"
                onClick={onClose}
                className="group"
              >
                <div className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl text-white transform transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}>
                  <div className="text-5xl mb-3">{cat.emoji}</div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-white/90 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-white/80 group-hover:text-white/90">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-3xl md:rounded-b-2xl">
            <p className="text-center text-gray-600 mb-3">Can't find what you're looking for?</p>
            <Link href="/#marketplace" onClick={onClose}>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Browse All Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
