// app/services/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingCart, MessageCircle, User, CheckCircle, Flame } from 'lucide-react';
import RatingSystem from '@/components/RatingSystem';

export default function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function loadService() {
      const { id } = await params;
      
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) {
          notFound();
        }
        
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error('Error loading service:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    
    loadService();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Navbar />
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div className="text-2xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (!service) {
    notFound();
  }

  const fields = service.fields;
  const images = fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
  const firstImage = images[0] || '';
  const title = fields.Title || 'No Title';
  const linkupPrice = fields.Price || 0;
  const sellerName = fields.Vendor_Name || 'Anonymous';

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

  const savings = vendorPrice ? Math.max(0, vendorPrice - linkupPrice) : 0;
  const totalRating = fields.Total_Rating || 0;
  const reviewCount = fields.Review_Count || 0;
  const telegram = fields.Telegram_Username || '';
  const telegramUrl = telegram ? `https://t.me/${telegram}` : 'https://t.me/linkupmarket';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);

    const cartItem = {
      id: service.id,
      title,
      price: linkupPrice,
      image: firstImage || '/placeholder-product.jpg',
      vendorName: sellerName,
    };

    addItem(cartItem);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex text-purple-600 hover:text-purple-700 mb-8 font-semibold">
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              {firstImage ? (
                <img
                  src={firstImage}
                  alt={title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-7xl">
                  📷
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((image: string, idx: number) => (
                  <div key={idx} className="rounded-lg overflow-hidden shadow">
                    <img
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-24 object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Card Section */}
          <div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-6 sticky top-24">
              {/* Badges */}
              <div className="flex flex-col gap-2 mb-4">
                {fields.Verified && (
                  <div className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg w-fit">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </div>
                )}
                {fields.Popular && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg w-fit">
                    <Flame className="w-3 h-3" />
                    Popular
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="font-bold text-gray-800 mb-3 text-2xl leading-tight">
                {title}
              </h1>

              {/* Pricing Section */}
              <div className="mb-4">
                {vendorPrice && (
                  <div className="text-sm text-gray-500 line-through mb-1">
                    Vendor: ₦{vendorPrice.toLocaleString()}
                  </div>
                )}
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ₦{linkupPrice.toLocaleString()}
                </div>
                {savings > 0 && (
                  <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                    💰 Save ₦{savings.toLocaleString()}
                  </div>
                )}
              </div>

              <hr className="my-4" />

              {/* Vendor Info */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {(sellerName || 'A')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vendor</p>
                  <p className="font-semibold text-sm text-gray-800">{sellerName}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Customer Reviews</p>
                <RatingSystem
                  serviceId={service.id}
                  currentRating={totalRating}
                  reviewCount={reviewCount}
                  readonly={false}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isAdding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on Telegram
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                <p className="font-semibold text-gray-800 mb-2">✅ Shop with confidence</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Verified vendors</li>
                  <li>• Room delivery</li>
                  <li>• Response time &lt;2 min on Telegram</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {fields.Description && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this product</h2>
            <p className="text-gray-700 leading-relaxed">{fields.Description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
