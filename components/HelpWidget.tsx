'use client';

import { useState } from 'react';
import { X, MessageCircle, Search, HelpCircle } from 'lucide-react';

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const helpOptions = [
    {
      icon: '❓',
      title: 'Need Help?',
      desc: 'Our team is here to assist you',
      link: 'https://t.me/linkupmarket?text=Hi! I need help with LinkUp Trade Fair'
    },
    {
      icon: '🔍',
      title: 'Product Not Found?',
      desc: 'We can help you find or source it',
      link: 'https://t.me/linkupmarket?text=Hi! I%27m looking for a product that%27s not on your platform. Can you help me source it?'
    },
    {
      icon: '💬',
      title: 'General Questions?',
      desc: 'Chat with us directly',
      link: 'https://t.me/linkupmarket?text=Hi LinkUp! I have a question about your service'
    }
  ];

  return (
    <div className="relative">
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-110 group"
        title="Need Help?"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          ?
        </span>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Need Help?
        </div>
      </button>

      {/* Help Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:top-full md:right-0 md:left-auto z-40 w-full md:w-96 md:mt-2">
            <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">How Can We Help?</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Help Options */}
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {helpOptions.map((option, idx) => (
                  <a
                    key={idx}
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block p-4 bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg border border-purple-200 hover:border-purple-400 transition cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition">
                          {option.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                      </div>
                      <MessageCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                    </div>
                  </a>
                ))}

                {/* Footer Message */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    💡 <span className="font-semibold">Did you know?</span> We're always here to help! Chat us on Telegram for instant responses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
