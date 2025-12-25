// app/services/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RatingSystem from '@/components/RatingSystem';
import Navbar from '../../../components/Navbar';

// Fix for Next.js 15 - params is now a Promise
export default function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
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
                  onClick={() => setSelectedImage(mainImage)}
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
                          setSelectedImage(img);
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
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {fields.Description}
              </p>

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

              {/* Contact Buttons */}
              <div className="space-y-3">
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi! I'm interested in your service: ${fields.Title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-green-500 text-white rounded-lg text-center font-semibold hover:bg-green-600 transition"
                  >
                    💬 Chat on WhatsApp
                  </a>
                )}
                
                {telegram && (
                  <a
                    href={`https://t.me/${telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-blue-500 text-white rounded-lg text-center font-semibold hover:bg-blue-600 transition"
                  >
                    💬 Chat on Telegram
                  </a>
                )}
              </div>

              {/* Safety Tips */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">🛡️ Safety Tips</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Meet in public places</li>
                  <li>• Inspect before paying</li>
                  <li>• Avoid prepayments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}