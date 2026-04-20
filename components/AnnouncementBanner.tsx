'use client';

export default function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white overflow-hidden py-3 sticky top-20 z-40">
      <div className="relative flex items-center">
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .scroll-text {
            animation: scroll 15s linear infinite;
            white-space: nowrap;
            display: inline-block;
          }
        `}</style>
        
        <div className="flex gap-8">
          <div className="scroll-text font-semibold text-lg">
            🎉 First Purchase Gets FREE DELIVERY!  Order now and save on dlivery of products to hall of residence
          </div>
          <div className="scroll-text font-semibold text-lg">
            🎉 First Purchase Gets FREE DELIVERY!  Order now and save on dlivery of products to hall of residence
          </div>
        </div>
      </div>
    </div>
  );
}
