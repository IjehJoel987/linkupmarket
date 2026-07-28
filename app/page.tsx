// app/page.tsx
import Link from 'next/link';
import { fetchServices } from '@/lib/airtable';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import CategoryBar from '../components/CategoryBar';
import CategorySection from '../components/CategorySection';

export default async function HomePage() {
  const services = await fetchServices();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnnouncementBanner />
      <CategoryBar />



      {/* Benefits Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Hall Delivery</h4>
                <p className="text-xs text-gray-600">Under 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Verified Vendors</h4>
                <p className="text-xs text-gray-600">Student-owned</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Pay on Delivery</h4>
                <p className="text-xs text-gray-600">Cash or transfer</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Flash Deals Daily</h4>
                <p className="text-xs text-gray-600">Up to 40% off</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories with Products */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
