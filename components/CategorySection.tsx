'use client';

import { useState } from 'react';
import ServiceCard from './ServiceCard';
import { useSearchStore } from '@/lib/search-store';

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
  const [expanded, setExpanded] = useState(false);
  const searchQuery = useSearchStore((state) => state.query);

  // Get products for this category AND matching search
  const allCategoryProducts = products.filter(p => {
    // Category filter
    const productCategory = p.fields.Category || 'Other';
    const matchesCategory = productCategory === category;
    
    // Search filter
    if (!matchesCategory) return false;
    
    if (searchQuery === '') return true;
    
    const title = p.fields.Title?.toLowerCase() || '';
    const description = p.fields.Description?.toLowerCase() || '';
    const name = p.fields.Vendor_Name?.toLowerCase() || '';
    
    return (
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase()) ||
      name.includes(searchQuery.toLowerCase())
    );
  });

  // Show max 10 initially, or all if expanded
  const displayedProducts = expanded ? allCategoryProducts : allCategoryProducts.slice(0, 10);

  if (allCategoryProducts.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Category Header Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-48 md:h-64 bg-gradient-to-br from-purple-600 to-pink-600">
        <img
          src={bannerImage}
          alt={categoryName}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            e.currentTarget.style.display = 'none';
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
            {allCategoryProducts.length} products available
          </p>
        </div>
      </div>

      {/* Products Grid - 2 columns on mobile, 3-4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {displayedProducts.map((product) => (
          <ServiceCard key={product.id} service={product} />
        ))}
      </div>

      {/* View More Button */}
      {allCategoryProducts.length > 10 && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-all duration-300 hover:scale-105"
          >
            {expanded ? `Show Less ${categoryName}` : `View More ${categoryName}`}
          </button>
        </div>
      )}
    </section>
  );
}
