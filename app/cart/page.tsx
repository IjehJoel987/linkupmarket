'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useCartStore } from '@/lib/cart-store';
import OrderModal from '@/components/OrderModal';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const subtotal = getTotal();
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Shopping Cart ({items.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Add some amazing products from our trade fair!
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg p-6 flex gap-4 hover:shadow-xl transition-shadow"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        by {item.vendorName}
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>
                        <span className="text-lg font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="flex flex-col items-end justify-center min-w-max">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-xl font-bold text-gray-800">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-bold text-purple-600">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => setShowOrderModal(true)}
                  className="w-full py-4 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-200 text-base min-h-12 md:min-h-10 mb-3"
                  style={{
                    backgroundColor: '#9333ea',
                    backgroundImage: 'linear-gradient(to right, #9333ea, #ec4899)',
                  }}
                >
                  Proceed to Payment
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>

                <Link
                  href="/"
                  className="block text-center mt-4 py-3 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  ← Continue Shopping
                </Link>

                {/* Trust Indicators */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">🔒</span>
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">🚚</span>
                    <span>Door delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">✅</span>
                    <span>SEALD verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />
    </div>
  );
}
