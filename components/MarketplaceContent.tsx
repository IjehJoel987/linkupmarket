// components/MarketplaceContent.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, Star, Users, Clock, Shield } from 'lucide-react';
import ServiceCard from './ServiceCard';

interface MarketplaceContentProps {
  services: any[];
}

export default function MarketplaceContent({ services }: MarketplaceContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [sortBy, setSortBy] = useState('Most Popular');

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
      const name = fields.Name?.toLowerCase() || '';
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
          <h2 className="text-2xl font-bold text-gray-800 font-display">Find Your Perfect Service</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <input
              type="text"
              placeholder="Search for photographers, cakes, tutors..."
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

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center card-hover border border-gray-100">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold gradient-text mb-1">{filteredServices.length}</div>
          <div className="text-gray-600 font-medium">Results Found</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center card-hover border border-gray-100">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <div className="text-3xl font-bold gradient-text mb-1">{services.length}</div>
          <div className="text-gray-600 font-medium">Total Services</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center card-hover border border-gray-100">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold gradient-text mb-1">24/7</div>
          <div className="text-gray-600 font-medium">Always Available</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center card-hover border border-gray-100">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold gradient-text mb-1">100%</div>
          <div className="text-gray-600 font-medium">Student-Run</div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 font-display text-gray-800">
          {searchQuery || selectedCategory !== 'All Categories' || priceRange !== 'Any Price'
            ? '🔍 Search Results'
            : '✨ Browse All Services'}
        </h2>
        <p className="text-gray-600 text-lg">
          {searchQuery || selectedCategory !== 'All Categories' || priceRange !== 'Any Price'
            ? `Found ${filteredServices.length} services matching your criteria`
            : 'Discover amazing services from fellow students and campus vendors'}
        </p>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-3xl font-bold text-gray-700 mb-4 font-display">No services found</h3>
          <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
            Try adjusting your search terms or filters to find what you're looking for
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary px-8 py-4 text-lg"
          >
            Clear All Filters
          </button>
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