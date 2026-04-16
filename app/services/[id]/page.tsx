// app/services/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Truck } from 'lucide-react';
import RatingSystem from '@/components/RatingSystem';
import Navbar from '../../../components/Navbar';
import { useCartStore } from '@/lib/cart-store';

// small helper button component for detail page
function AddToCartButton({ service }: { service: any }) {
  const { addItem } = useCartStore();
  const [adding, setAdding] = useState(false);

  const title = service.fields.Title || 'No Title';
  const price = service.fields.Price || 0;
  const images = service.fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
  const image = images[0] || '/placeholder-product.jpg';
  const vendorName = service.fields.Name || 'Anonymous';

  const handleClick = async () => {
    setAdding(true);
    addItem({ id: service.id, title, price, image, vendorName });
    setAdding(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={adding}
      className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-4 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 text-base md:text-sm min-h-12 md:min-h-10"
      style={{
        backgroundColor: '#9333ea',
        backgroundImage: 'linear-gradient(to right, #9333ea, #ec4899)',
      }}
    >
      {adding ? (
        <span className="loader h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <ShoppingCart className="w-5 h-5" />
      )}
      {adding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

// Fix for Next.js 15 - params is now a Promise
export default function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    async function loadService() {
      const { id } = await params;
      
      const res = await fetch(`/api/services/${id}`);
      if (!res.ok) {
        notFound();
      }
      
      const data = await res.json();
      setService(data);
      
      const images = data.fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
      if (images.length > 0) {
        setMainImage(images[0]);
      }
      
      setLoading(false);
    }
    
    loadService();
  }, [params]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex === null || !service) return;
      
      const images = service.fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
      
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev! - 1);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => (prev! + 1) % images.length);
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex, service]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div className="text-2xl font-semibold text-gray-700">Loading...</div>
          <div className="text-gray-500 mt-2">Fetching service details</div>
        </div>
      </div>
    );
  }

  if (!service) {
    notFound();
  }
  
  const fields = service.fields;
  const images = fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
  const whatsapp = fields.Contact || '';
  const telegram = fields.Telegram_Username || '';
  
  // Get current lightbox image
  const currentLightboxImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;
  
  // Get vendor price
  const vendorPriceRaw = fields.Vendor_Price || fields['Vendor Price'] || fields.VendorPrice;
  let vendorPrice = null;
  try {
    if (vendorPriceRaw && String(vendorPriceRaw).trim()) {
      vendorPrice = parseFloat(String(vendorPriceRaw).replace(/,/g, ''));
    }
  } catch (e) {
    vendorPrice = null;
  }
  
  const linkupPrice = fields.Price || 0;
  const savings = vendorPrice ? Math.max(0, vendorPrice - linkupPrice) : 0;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Lightbox Modal */}
      {currentLightboxImage && selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImageIndex(null)}
            title="Close (ESC)"
          >
            ×
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev! - 1);
              }}
              title="Previous (← Arrow)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Main Image */}
          <img 
            src={currentLightboxImage} 
            alt={`Image ${selectedImageIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(prev => (prev! + 1) % images.length);
              }}
              title="Next (→ Arrow)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Keyboard Hints */}
          <div className="absolute top-4 left-4 text-white/70 text-xs">
            <p>ESC to close</p>
            {images.length > 1 && <p>← → to navigate</p>}
          </div>
        </div>
      )}

      <Navbar />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="text-purple-600 hover:text-purple-700 font-semibold mb-4 inline-block">
          ← Back to Browse
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Images with Gallery */}
          <div>
            {images.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image - Click to Enlarge */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setSelectedImageIndex(0)}
                >
                  <img 
                    src={mainImage} 
                    alt={fields.Title}
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-6xl opacity-0 group-hover:opacity-100 transition drop-shadow-lg">
                      🔍
                    </span>
                  </div>
                </div>

                {/* Thumbnails - Click to View & Enlarge */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img: string, i: number) => (
                      <div 
                        key={i}
                        className="relative cursor-pointer group"
                        onClick={() => {
                          setMainImage(img);
                          setSelectedImageIndex(i);
                        }}
                      >
                        <img 
                          src={img}
                          alt={`${fields.Title} ${i + 1}`}
                          className={`w-full h-24 object-cover rounded-lg transition ${
                            mainImage === img 
                              ? 'ring-4 ring-purple-600' 
                              : 'hover:ring-2 hover:ring-purple-400'
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition drop-shadow-lg">
                            🔍
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-8xl">
                📷
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {fields.Title}
              </h1>
              
              {/* Pricing */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                {vendorPrice && (
                  <div className="text-lg text-gray-500 line-through mb-2">
                    Vendor price: ₦{vendorPrice.toLocaleString()}
                  </div>
                )}
                
                <div className="text-4xl font-bold text-black mb-2">
                  LinkUp price: ₦{linkupPrice.toLocaleString()}
                </div>
                
                {savings > 0 && (
                  <div className="text-xl font-bold text-green-600">
                    You save: ₦{savings.toLocaleString()}
                  </div>
                )}

                {/* Free Delivery Banner */}
                {linkupPrice < 5000 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg flex items-start gap-3 shadow-md">
                    <div className="text-3xl flex-shrink-0">🚚</div>
                    <div>
                      <p className="font-bold text-emerald-900 text-lg">Free Delivery Eligible!</p>
                      <p className="text-emerald-700 text-sm">Get free room delivery on all orders below ₦5,000</p>
                    </div>
                  </div>
                )}

                {/* Add to cart button */}
                <AddToCartButton
                  service={service}
                />
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {fields.Description}
              </p>

              {/* Simple Inquiry Section */}
              <div className="mb-8 p-6 bg-gray-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-800">Need more details?</span> Have questions about size, color, specifications, or customization? 
                  {telegram && (
                    <>
                      {' '}<a
                        href={`https://t.me/${telegram.replace('@', '')}?text=Hi! I'm interested in your service:%0a%0a📦 *${fields.Title}*%0a💰 Price: ₦${linkupPrice.toLocaleString()}${savings > 0 ? `%0a💰 You save: ₦${savings.toLocaleString()}` : ''}%0a%0aCan you provide more details?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-600 hover:text-blue-700 underline hover:no-underline transition"
                      >
                        Chat on Telegram
                      </a>
                      {' '}for quick responses and personalized assistance.
                    </>
                  )}
                </p>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Seller Information</h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👤</span>
                  <span className="font-medium">{fields.Name}</span>
                  {fields.Verified && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ Verified</span>
                  )}
                </div>

                {/* Rating Section */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Rate this service</h4>
                  <RatingSystem
                    serviceId={service.id}
                    currentRating={fields.Total_Rating || 0}
                    reviewCount={fields.Review_Count || 0}
                    readonly={false}
                  />
                </div>
              </div>

              {/* Safety Tips */}
              {/* <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">🛡️ Safety Tips</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Meet in public places</li>
                  <li>• Inspect before paying</li>
                  <li>• Avoid prepayments</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
