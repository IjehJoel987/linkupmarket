// components/ServiceCard.tsx
import Link from 'next/link';
import { User, CheckCircle, Flame } from 'lucide-react';
import RatingSystem from './RatingSystem';

interface ServiceCardProps {
  service: any;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const fields = service.fields;
  const title = fields.Title || 'No Title';
  const linkupPrice = fields.Price || 0;
  const sellerName = fields.Name || 'Anonymous';

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

  // Calculate savings
  const savings = vendorPrice ? Math.max(0, vendorPrice - linkupPrice) : 0;

  // Get first image
  const images = fields.Works?.split('\n').filter((url: string) => url.trim()) || [];
  const firstImage = images[0] || '';

  // Calculate rating
  const totalRating = fields.Total_Rating || 0;
  const reviewCount = fields.Review_Count || 0;

  return (
    <Link href={`/services/${service.id}`}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg card-hover border border-gray-100 group">
        {/* Image */}
        <div className="relative h-56 bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl opacity-50">
              📷
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {fields.Verified && (
              <div className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                <CheckCircle className="w-3 h-3" />
                Verified
              </div>
            )}
            {fields.Popular && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                <Flame className="w-3 h-3" />
                Popular
              </div>
            )}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Pricing Section */}
          <div className="mb-4">
            {vendorPrice && (
              <div className="text-sm text-gray-500 line-through mb-1 flex items-center gap-1">
                <span>Vendor:</span>
                <span>₦{vendorPrice.toLocaleString()}</span>
              </div>
            )}

            <div className="text-3xl font-bold text-gray-900 mb-2">
              ₦{linkupPrice.toLocaleString()}
            </div>

            {savings > 0 && (
              <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                💰 Save ₦{savings.toLocaleString()}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 text-lg leading-tight">
            {title}
          </h3>

          {/* Rating and Seller */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span className="font-medium">{sellerName}</span>
            </div>

            <RatingSystem
              serviceId={service.id}
              currentRating={totalRating}
              reviewCount={reviewCount}
              readonly={false}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}