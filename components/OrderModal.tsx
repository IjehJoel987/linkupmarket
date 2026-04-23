// components/OrderModal.tsx
'use client';

import { useState } from 'react';
import { X, CheckCircle, Clock, Truck, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState<'confirm' | 'payment' | 'success'>('confirm');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = getTotal();
  const total = subtotal;

  const handleConfirmOrder = () => {
    setStep('payment');
  };

  const handlePaymentComplete = () => {
    setStep('success');
    // In a real app, this would create the order in database
    setTimeout(() => {
      clearCart();
      onClose();
      setStep('confirm');
    }, 3000);
  };

  // construct Telegram URL for chat link
  const getTelegramUrl = () => {
    const orderSummary = items.map(item =>
      `• ${item.title} (₦${item.price.toLocaleString()})\n  👤 Vendor: ${item.vendorName}`
    ). join('\n');

    const message = `🛒 *NEW PRE-ORDER*\n\n📦 *Items:*\n${orderSummary}\n\n💰 *Total:* ₦${total.toLocaleString()}\n\n📍 *Delivery Address:* ${address || '[Please provide your room/hostel details]'}\n\n✅ *Payment Instructions:*\nSend ₦${total.toLocaleString()} to our account and reply with proof of payment.`;

    return `https://t.me/linkupmarket?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {step === 'confirm' && 'Confirm Your Order'}
            {step === 'payment' && 'Complete Payment'}
            {step === 'success' && 'Order Placed!'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {step === 'confirm' && (
            <div className="space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.title}</span>
                      <span className="font-medium">₦{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Input */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Mary Hall, E207"
                  className="w-full h-32 p-2 border border-gray-300 rounded-lg resize-y focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Trust Indicators */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Why Trust LinkUp?</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• ✅ Verified by SEALD (campus service authority)</li>
                  <li>• 🚚 Door-to-room delivery</li>
                  <li>• 💬 Direct communication</li>
                  <li>• 🔒 Secure payment process</li>
                </ul>
              </div>

              <button
                onClick={handleConfirmOrder}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 md:py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200 text-base min-h-12 md:min-h-10"
                style={{
                  backgroundColor: '#9333ea',
                  backgroundImage: 'linear-gradient(to right, #9333ea, #ec4899)',
                }}
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pay via Telegram
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Click below to chat with our team and complete your payment securely.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Payment Steps:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Click "Chat on Telegram" below</li>
                  <li>2. Send ₦{total.toLocaleString()} to our account</li>
                  <li>3. Reply with payment proof</li>
                  <li>4. We'll confirm and schedule delivery</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('confirm')}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <a
                  href={getTelegramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 md:py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base min-h-12 md:min-h-10"
                  style={{
                    backgroundColor: '#2563eb',
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on Telegram
                </a>
              </div>

              <button
                onClick={handlePaymentComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 md:py-3 rounded-lg font-bold transition-colors text-base min-h-12 md:min-h-10"
                style={{
                  backgroundColor: '#16a34a',
                }}
              >
                I've Completed Payment
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 text-sm">
                We'll contact you on Telegram to confirm payment and arrange delivery.
              </p>

              {/* Order Status */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-800 mb-3">What's Next?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Payment verification (2-4 hours)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Pickup from seller (next day)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Delivery to your room (1-2 days)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
