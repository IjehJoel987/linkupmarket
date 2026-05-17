'use client';

import Link from 'next/link';

export default function CategoryBar() {
  const categories = [
    {
      name: 'LinkUp Foods',
      emoji: '🍞',
      id: 'linkupfood',
      color: 'from-orange-400 to-amber-500'
    },
    {
      name: 'LinkUp Gadgets',
      emoji: '⚡',
      id: 'linkupgadget',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'LinkUp Fashion',
      emoji: '👕',
      id: 'linkupfashion',
      color: 'from-pink-400 to-rose-600'
    },
    {
      name: 'Trade Fair Specials',
      emoji: '🛍️',
      id: 'tradefairspecial',
      color: 'from-purple-400 to-indigo-600'
    }
  ];

  return (
    <div className="bg-white sticky top-20 z-40 shadow-md py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href="/#marketplace">
              <button className={`w-full bg-gradient-to-br ${cat.color} p-4 md:p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 group`}>
                <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                <p className="font-bold text-sm md:text-base text-center leading-tight">{cat.name}</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
