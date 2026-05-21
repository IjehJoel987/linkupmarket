// app/page.tsx
import Link from 'next/link';
import { fetchServices } from '@/lib/airtable';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import CategoryBar from '../components/CategoryBar';
import ShopByCategory from '../components/ShopByCategory';
import PromotionalCards from '../components/PromotionalCards';
import CountdownTimer from '../components/CountdownTimer';
import CategorySection from '../components/CategorySection';

export default async function HomePage() {
  const services = await fetchServices();

  // Count products per category
  const categoryCounts = {
    linkupfood: services.filter((s: any) => s.fields.Category === 'linkupfood').length,
    linkupgadget: services.filter((s: any) => s.fields.Category === 'linkupgadget').length,
    linkupfashion: services.filter((s: any) => s.fields.Category === 'linkupfashion').length,
    tradefairspecial: services.filter((s: any) => s.fields.Category === 'tradefairspecial').length
  };

  const categoryStats = [
    { category: 'linkupfood', name: 'LinkUp Foods', emoji: '🍞', count: categoryCounts.linkupfood, color: 'from-orange-400 to-amber-500' },
    { category: 'linkupgadget', name: 'LinkUp Gadgets', emoji: '⚡', count: categoryCounts.linkupgadget, color: 'from-blue-400 to-blue-600' },
    { category: 'linkupfashion', name: 'LinkUp Fashion', emoji: '👕', count: categoryCounts.linkupfashion, color: 'from-pink-400 to-rose-600' },
    { category: 'tradefairspecial', name: 'Trade Fair Specials', emoji: '🛍️', count: categoryCounts.tradefairspecial, color: 'from-purple-400 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnnouncementBanner />
      <CategoryBar />

      {/* Benefits Section */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">🚚</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Hall Delivery</h4>
                <p className="text-sm text-gray-600">Under 30 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Verified Vendors</h4>
                <p className="text-sm text-gray-600">Student-owned</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-pink-100 rounded-full">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Pay on Delivery</h4>
                <p className="text-sm text-gray-600">Cash or transfer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-yellow-100 rounded-full">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Flash Deals Daily</h4>
                <p className="text-sm text-gray-600">Up to 40% off</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <ShopByCategory categories={categoryStats} />

      {/* Promotional Cards */}
      <PromotionalCards />

      {/* Countdown Timer - Flash Sale */}
      <CountdownTimer />

      {/* Categories with Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* LinkUp Foods */}
        <CategorySection
          category="linkupfood"
          categoryName="LinkUp Foods"
          emoji="🍞"
          bannerImage="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=400&fit=crop&q=80"
          products={services}
        />

        {/* LinkUp Gadgets */}
        <CategorySection
          category="linkupgadget"
          categoryName="LinkUp Gadgets"
          emoji="⚡"
          bannerImage="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop&q=80"
          products={services}
        />

        {/* LinkUp Fashion */}
        <CategorySection
          category="linkupfashion"
          categoryName="LinkUp Fashion"
          emoji="👕"
          bannerImage="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=400&fit=crop&q=80"
          products={services}
        />

        {/* Trade Fair Specials */}
        <CategorySection
          category="tradefairspecial"
          categoryName="Trade Fair Specials"
          emoji="🛍️"
          bannerImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=400&fit=crop&q=80"
          products={services}
        />
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img src="/linkup_logo.PNG" alt="LinkUp" className="h-12 w-auto mr-3" />
                <span className="text-2xl font-bold gradient-text">LinkUp.</span>
              </div>
              <p className="text-gray-300 mb-4">
                The official student marketplace for Covenant University. Trusted by 10,000+ buyers every semester.
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">Safety Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">Return Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">My Orders</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">Saved Items</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">Store Manager</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">About LinkUp</a></li>
                <li><a href="/seller-onboarding" className="text-gray-300 hover:text-purple-400 transition">Become a Vendor</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition">Careers</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-center">© 2026 LinkUp Marketplace · Built for Covenant University students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
