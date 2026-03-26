// components/CountdownTimer.tsx
'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: Date;
  className?: string;
}

export default function CountdownTimer({
  targetDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // Default: 60 days from now
  className = ""
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); // Remove targetDate from dependencies to prevent infinite re-renders

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-red-600">
        <Clock className="w-5 h-5" />
        <span className="font-semibold text-sm">Trade Fair Ends In:</span>
      </div>

      {isExpired ? (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-lg">
          EXPIRED
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          <div className="flex flex-col items-center min-w-[50px]">
            <div className="text-2xl leading-none">{timeLeft.days}</div>
            <div className="text-xs opacity-90 uppercase tracking-wide">Days</div>
          </div>
          <span className="text-2xl mx-1">:</span>
          <div className="flex flex-col items-center min-w-[50px]">
            <div className="text-2xl leading-none">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-90 uppercase tracking-wide">Hrs</div>
          </div>
          <span className="text-2xl mx-1">:</span>
          <div className="flex flex-col items-center min-w-[50px]">
            <div className="text-2xl leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-90 uppercase tracking-wide">Min</div>
          </div>
          <span className="text-2xl mx-1">:</span>
          <div className="flex flex-col items-center min-w-[50px]">
            <div className="text-2xl leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-90 uppercase tracking-wide">Sec</div>
          </div>
        </div>
      )}
    </div>
  );
}