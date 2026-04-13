// app/page.tsx
import Link from 'next/link';
import { fetchServices } from '@/lib/airtable';
import MarketplaceContent from '../components/MarketplaceContent';
import Navbar from '../components/Navbar';

export default async function HomePage() {
  const services = await fetchServices();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-black">
        {/* University Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/university-campus.jpg)',
          }}
        ></div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-3 h-3 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
          <div className="absolute top-40 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-300/50" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-32 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-pulse shadow-lg shadow-pink-300/50" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-300/50" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse shadow-lg shadow-pink-400/50" style={{animationDelay: '1.2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight text-white drop-shadow-2xl">
              Covenant University
              <span className="block text-blue-300 mt-2">
                Trade Fair
              </span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-white max-w-3xl mx-auto leading-relaxed font-semibold drop-shadow-lg">
              Get your favourite products delivered to you on campus!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="#marketplace"
                className="px-16 py-4 text-2xl font-extrabold rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-300 hover:border-blue-100"
              >
                ORDER NOW
              </Link>

              <Link
                href="/post-service"
                className="px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 bg-white/20 text-white hover:bg-white/30 hover:scale-105 border-2 border-white/50 backdrop-blur-sm"
              >
                Sell Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How LinkUp Delivery Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're your trusted bridge between amazing student products and convenient delivery to your room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Pre-Order</h3>
              <p className="text-gray-600">
                Browse products, add to cart, and place your pre-order before stock runs out.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Pay & Confirm</h3>
              <p className="text-gray-600">
                Chat us on Telegram, pay ₦400 delivery fee + product cost. We verify payment instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Door Delivery</h3>
              <p className="text-gray-600">
                We pick up from sellers and deliver directly to your room. Track your order status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pass services to client component */}
      <MarketplaceContent services={services} />

      {/* Trust & Process Section (Footer Area) */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Students Trust LinkUp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We’re a SEALD-verified student delivery service with transparent fees and door-to-room reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">SEALD Verified</h4>
              <p className="text-gray-600">Approved by campus app and student services authority.</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Door Delivery</h4>
              <p className="text-gray-600">Guaranteed delivery from seller to student room for ₦400.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Direct Telegram Support</h4>
              <p className="text-gray-600">Instant order confirmation and updates via chat.</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Trusted Community</h4>
              <p className="text-gray-600">Curated student vendors with fair prices and quality checks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-pink-500 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-500 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="/linkup_logo.PNG"
                  alt="LinkUp Marketplace"
                  className="h-12 w-auto mr-3"
                />
                <span className="text-2xl font-bold gradient-text">LinkUp</span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Built by students, for students. Connect, buy, sell, and grow together in our vibrant campus marketplace.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.75.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.75.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#marketplace" className="text-gray-300 hover:text-purple-400 transition-colors">Browse Services</a></li>
                <li><a href="/post-service" className="text-gray-300 hover:text-purple-400 transition-colors">Sell Services</a></li>
                <li><a href="/dashboard" className="text-gray-300 hover:text-purple-400 transition-colors">Dashboard</a></li>
                <li><a href="/signup" className="text-gray-300 hover:text-purple-400 transition-colors">Join Community</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 LinkUp Marketplace. All rights reserved. | Made with ❤️ for Covenant University students
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure & Trusted
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Student-Powered
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
