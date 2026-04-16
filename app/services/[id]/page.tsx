// app/services/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingCart, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import RatingSystem from '@/components/RatingSystem';


export default function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
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
        
        const images = data.fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
        if (images.length > 0) {
          setMainImage(images[0]);
        }
      } catch (error) {
        console.error('Error loading service:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    
    loadService();
  }, [params]);

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
  const telegram = fields.Telegram_Username || '';
  const currentLightboxImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

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

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem({
      id: service.id,
      title: fields.Title || 'No Title',
      price: linkupPrice,
      image: mainImage || '/placeholder-product.jpg',
      vendorName: fields.Vendor_Name || 'Anonymous',
    });
    setIsAdding(false);
  };

  const telegramUrl = telegram ? `https://t.me/${telegram}` : 'https://t.me/linkupmarket';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {currentLightboxImage && selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev! - 1);
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <img 
            src={currentLightboxImage} 
            alt="Product"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(prev => (prev! + 1) % images.length);
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex text-purple-600 hover:text-purple-700 mb-8 font-semibold">
          ← Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
              <img
                src={mainImage || '/placeholder-product.jpg'}
                alt={fields.Title}
                className="w-full h-96 object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(image)}
                    className="rounded-lg overflow-hidden border-2"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {fields.Title || 'No Title'}
            </h1>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center">
                {(fields.Vendor_Name || 'A')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-600">Vendor</p>
                <p className="font-semibold">{fields.Vendor_Name || 'Anonymous'}</p>
              </div>
            </div>

            <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              {vendorPrice && (
                <div className="text-sm text-gray-600 line-through mb-2">
                  Vendor: ₦{vendorPrice.toLocaleString()}
                </div>
              )}
              <div className="text-5xl font-bold text-gray-900 mb-3">
                ₦{linkupPrice.toLocaleString()}
              </div>
              {savings > 0 && (
                <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-2 rounded-full">
                  Save ₦{savings.toLocaleString()}
                </div>
              )}
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-3">Reviews</p>
              <RatingSystem
                serviceId={service.id}
                currentRating={fields.Total_Rating || 0}
                reviewCount={fields.Review_Count || 0}
                readonly={false}
              />
            </div>

            {fields.Description && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-700">{fields.Description}</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
