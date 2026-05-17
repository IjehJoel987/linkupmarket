// app/category/[category]/page.tsx
import { fetchServices } from '@/lib/airtable';
import CategoryPageClient from '@/components/CategoryPageClient';
import Navbar from '@/components/Navbar';

const categoryInfo: Record<string, { name: string; emoji: string; color: string }> = {
  linkupfood: { name: 'LinkUp Foods', emoji: '🍞', color: 'from-orange-400 to-amber-500' },
  linkupgadget: { name: 'LinkUp Gadgets', emoji: '⚡', color: 'from-blue-400 to-blue-600' },
  linkupfashion: { name: 'LinkUp Fashion', emoji: '👕', color: 'from-pink-400 to-rose-600' },
  tradefairspecial: { name: 'Trade Fair Specials', emoji: '🛍️', color: 'from-purple-400 to-indigo-600' }
};

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const services = await fetchServices();
  const category = params.category;
  const info = categoryInfo[category] || { name: 'Products', emoji: '📦', color: 'from-gray-400 to-gray-600' };

  // Count products for this category (for display)
  const categoryCount = services.filter(
    (service: any) => (service.fields.Category || 'Other') === category
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Category Header */}
      <div className={`bg-gradient-to-br ${info.color} py-8 md:py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl md:text-6xl">{info.emoji}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{info.name}</h1>
              <p className="text-white/90 text-lg">{categoryCount} products available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <CategoryPageClient 
        category={category}
        categoryName={info.name}
        products={services}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 LinkUp Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
