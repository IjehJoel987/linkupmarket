'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

interface CategoryPageClientProps {
  category: string;
  categoryName: string;
  products: any[];
}

export default function CategoryPageClient({
  category,
  categoryName,
  products
}: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [sortBy, setSortBy] = useState('Most Popular');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((service: any) => {
      const fields = service.fields;
      const title = fields.Title?.toLowerCase() || '';
      const description = fields.Description?.toLowerCase() || '';
      const name = fields.Vendor_Name?.toLowerCase() || '';
      const price = fields.Price || 0;

      // Search filter
      const matchesSearch = searchQuery === '' ||
        title.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase()) ||
        name.includes(searchQuery.toLowerCase());

      // Price filter
      let matchesPrice = true;
      if (priceRange === 'Under ₦5,000') {
        matchesPrice = price < 5000;
      } else if (priceRange === '₦5,000 - ₦10,000') {
        matchesPrice = price >= 5000 && price <= 10000;
      } else if (priceRange === 'Over ₦10,000') {
        matchesPrice = price > 10000;
      }

      return matchesSearch && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return (a.fields.Price || 0) - (b.fields.Price || 0);
        case 'Price: High to Low':
          return (b.fields.Price || 0) - (a.fields.Price || 0);
        case 'Highest Rated':
          const aRating = (a.fields.Total_Rating || 0) / (a.fields.Review_Count || 1);
          const bRating = (b.fields.Total_Rating || 0) / (b.fields.Review_Count || 1);
          return bRating - aRating;
        case 'Most Popular':
        default:
          return (b.fields.Review_Count || 0) - (a.fields.Review_Count || 0);
      }
    });

    return filtered;
  }, [products, searchQuery, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange('Any Price');
    setSortBy('Most Popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">Search & Filter</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white"
          >
            <option>Any Price</option>
            <option>Under ₦5,000</option>
            <option>₦5,000 - ₦10,000</option>
            <option>Over ₦10,000</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white"
          >
            <option>Most Popular</option>
            <option>Highest Rated</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

          {(searchQuery || priceRange !== 'Any Price' || sortBy !== 'Most Popular') && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600 text-lg">
          Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ServiceCard key={product.id} service={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
