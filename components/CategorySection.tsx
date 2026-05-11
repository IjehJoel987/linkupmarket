'use client';

import ServiceCard from './ServiceCard';

interface CategorySectionProps {
  category: string;
  categoryName: string;
  emoji: string;
  bannerImage: string;
  products: any[];
}

export default function CategorySection({ 
  category, 
  categoryName, 
  emoji, 
  bannerImage, 
  products 
}: CategorySectionProps) {
  // Get products for this category
  const categoryProducts = products.filter(
    p => (p.fields.Category || 'Other') === category
  ).slice(0, 10); // Show max 10 products per category

  if (categoryProducts.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Category Header Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-48 md:h-64">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${bannerImage}')`,
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Category Label */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl">{emoji}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{categoryName}</h2>
          </div>
          <p className="text-white/90 mt-2 text-sm md:text-base">
            {categoryProducts.length} products available
          </p>
        </div>
      </div>

      {/* Products Grid - 2 columns on mobile, 3-4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {categoryProducts.map((product) => (
          <ServiceCard key={product.id} service={product} />
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 text-center">
        <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-all duration-300">
          View More {categoryName}
        </button>
      </div>
    </section>
  );
}
