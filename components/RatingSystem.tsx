// components/RatingSystem.tsx
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingSystemProps {
  serviceId: string;
  currentRating: number;
  reviewCount: number;
  onRatingSubmit?: (rating: number) => void;
  readonly?: boolean;
}

export default function RatingSystem({
  serviceId,
  currentRating,
  reviewCount,
  onRatingSubmit,
  readonly = false
}: RatingSystemProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = async (rating: number) => {
    if (readonly || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/services/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, rating })
      });

      if (response.ok) {
        setUserRating(rating);
        onRatingSubmit?.(rating);
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || userRating || currentRating;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => !readonly && setHoveredRating(star)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
            className={`p-0.5 ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
            disabled={readonly || isSubmitting}
          >
            <Star
              className={`w-5 h-5 ${
                star <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>

      <span className="text-sm text-gray-600">
        {currentRating > 0 ? (
          <>
            <span className="font-semibold">{currentRating.toFixed(1)}</span>
            {reviewCount > 0 && (
              <span className="text-gray-500"> ({reviewCount} reviews)</span>
            )}
          </>
        ) : (
          <span className="text-gray-500">No reviews yet</span>
        )}
      </span>

      {isSubmitting && (
        <div className="text-xs text-gray-500">Submitting...</div>
      )}
    </div>
  );
}