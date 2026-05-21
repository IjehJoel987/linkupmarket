'use client';

import Link from 'next/link';

interface CategoryStats {
  category: string;
  name: string;
  emoji: string;
  count: number;
  color: string;
}

interface ShopByCategoryProps {
  categories: CategoryStats[];
}

export default function ShopByCategory({ categories }: ShopByCategoryProps) {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop by category</h2>
          <p className="text-lg text-gray-600">Everything Covenant students need, in one place.</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.category} href={`/category/${cat.category}`}>
              <div className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-white text-center transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl group`}>
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-sm text-white/90">{cat.count.toLocaleString()} ITEMS</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
