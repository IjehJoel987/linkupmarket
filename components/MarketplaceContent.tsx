// components/MarketplaceContent.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, Star, Users, Clock, Shield } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useSearchStore } from '@/lib/search-store';

interface MarketplaceContentProps {
  services: any[];
}

export default function MarketplaceContent({ services }: MarketplaceContentProps) {
  const searchQuery = useSearchStore((state) => state.query);
  const setSearchQuery = useSearchStore((state) => state.setQuery);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [sortBy, setSortBy] = useState('Most Popular');

  // Auto-scroll to products when search query changes
  useEffect(() => {
    if (searchQuery) {
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [searchQuery]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = services.map(s => s.fields.Title || 'Others');
    return ['All Categories', ...Array.from(new Set(cats))];
  }, [services]);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = services.filter(service => {
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

      // Category filter
      const matchesCategory = selectedCategory === 'All Categories' ||
        fields.Title === selectedCategory;

      // Price filter
      let matchesPrice = true;
      if (priceRange === 'Under ₦5,000') {
        matchesPrice = price < 5000;
      } else if (priceRange === '₦5,000 - ₦10,000') {
        matchesPrice = price >= 5000 && price <= 10000;
      } else if (priceRange === 'Over ₦10,000') {
        matchesPrice = price > 10000;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort services
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
  }, [services, searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setPriceRange('Any Price');
    setSortBy('Most Popular');
  };

  return (
    <div id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Search & Filters */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
            <Search className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-display">Find Your Perfect Product</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <input
              type="text"
              placeholder="Search for fashion, food, tech, crafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          >
            <option>Any Price</option>
            <option>Under ₦5,000</option>
            <option>₦5,000 - ₦10,000</option>
            <option>Over ₦10,000</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          >
            <option>Most Popular</option>
            <option>Highest Rated</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredServices.length} results found</span>
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </div>



      {/* Products Grid */}
      <div id="products-section" className="mb-8">
        <h2 className="text-4xl font-bold mb-4 font-display text-gray-800">
          {searchQuery || selectedCategory !== 'All Categories' || priceRange !== 'Any Price'
            ? '🔍 Search Results'
            : 'LinkUp Products'}
        </h2>
        <p className="text-gray-600 text-lg">
          {searchQuery || selectedCategory !== 'All Categories' || priceRange !== 'Any Price'
            ? `Found ${filteredServices.length} products matching your criteria`
            : 'Pre-order exclusive products from student entrepreneurs before the trade fair'}
        </p>
      </div>

      {filteredServices.length === 0 ? (
        <div className="py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-4xl font-bold text-gray-800 mb-4 font-display">Product Not Found?</h3>
            <p className="text-gray-600 mb-2 text-lg">
              We might have what you're looking for or can help you source it!
            </p>
          </div>

          {/* Call to Action Card */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">💬</span>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">Can't Find What You Want?</h4>
                  <p className="text-gray-600 font-semibold">Chat with LinkUp directly on Telegram!</p>
                </div>
              </div>
              
              <ul className="space-y-2 text-gray-700 font-semibold ml-16">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Tell us what you're looking for
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Get instant replies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> We'll deliver it straight to your room
                </li>
              </ul>

              <a
                href="https://t.me/linkupmarket?text=Hi! I'm looking for a specific product that I didn't find on your platform. Can you help me source it?"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-center font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 mt-6"
              >
                💬 Chat with LinkUp on Telegram
              </a>

              <p className="text-center text-sm text-gray-600 mt-4">
                ⚡ Average response time: <span className="font-bold">Less than 2 minutes</span>
              </p>
            </div>
          </div>

          {/* Original Clear Filters Button */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Or:</p>
            <button
              onClick={clearFilters}
              className="btn-primary px-8 py-4 text-lg"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredServices.map((service: any, index: number) => (
            <div key={service.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
