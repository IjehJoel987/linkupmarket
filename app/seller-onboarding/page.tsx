'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Star, Shield, TrendingUp, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function SellerOnboarding() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const benefits = [
    {
      icon: Users,
      title: 'Reach 4000+ Students',
      description: 'Access a massive audience of Covenant University students actively looking to buy and hire services.'
    },
    {
      icon: Shield,
      title: 'Build Credibility',
      description: 'Get verified seller badge, customer ratings, and professional profile to stand out from competitors.'
    },
    {
      icon: TrendingUp,
      title: 'Boost Your Business',
      description: 'Professional platform beats spamming groups. Build real reputation and loyal customer base.'
    },
    {
      icon: Star,
      title: 'Premium Visibility',
      description: 'Popular products featured prominently. Free delivery badges for products under ₦5,000.'
    },
    {
      icon: MessageCircle,
      title: 'Easy Communication',
      description: 'Direct Telegram integration for instant customer contact and order updates.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Tools',
      description: 'Analytics, customer reviews, and insights to help you grow and improve your offerings.'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started as a seller?',
      answer: 'Contact LinkUp on Telegram and we\'ll set you up in minutes. You\'ll need to provide basic business info, products/services you offer, and pricing. We handle the rest!'
    },
    {
      question: 'Is there a cost to sell on LinkUp?',
      answer: 'No setup fees, no monthly charges. LinkUp is free for sellers. You only pay when you make sales, and we take a small commission to keep the platform running.'
    },
    {
      question: 'How many products can I list?',
      answer: 'Unlimited! List as many products or services as you want. The more you list, the more visibility you get.'
    },
    {
      question: 'How do customers pay me?',
      answer: 'Customers complete purchases through LinkUp and we handle payments securely. You\'ll receive your earnings directly to your account.'
    },
    {
      question: 'Can I set custom pricing?',
      answer: 'Yes! You control your prices. You can also set both your original price and LinkUp\'s special discount price to attract more buyers.'
    },
    {
      question: 'What if I don\'t have professional photos?',
      answer: 'No problem! Our team can help you create product listings. Just provide details and we\'ll make your products look professional.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Reach More Customers?
              </h1>
              <p className="text-xl text-gray-700">
                Tired of spamming Telegram groups and wasting time on unorganized platforms?
              </p>
              <p className="text-lg text-gray-600">
                LinkUp gives you free visibility to more than 4,000 Covenant University students actively looking for products and services—all without the spam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://t.me/linkupmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Start Selling Today
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link href="/" className="flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all duration-300">
                  Back to Marketplace
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Professional Platform</p>
                      <p className="text-sm text-gray-600">No spam, no clutter—just serious buyers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Build Your Reputation</p>
                      <p className="text-sm text-gray-600">Get verified badges and customer ratings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Grow Your Business</p>
                      <p className="text-sm text-gray-600">Reach more customers and increase sales</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Zero Setup Cost</p>
                      <p className="text-sm text-gray-600">Free to join, only pay when you sell</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Sell on LinkUp?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We give you everything you need to succeed as a seller on campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4 inline-block p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">4,000+</p>
              <p className="text-lg opacity-90">Active Students</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-lg opacity-90">Verified Sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Have questions? We've got answers
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 text-left">
                    {faq.question}
                  </h3>
                  <span className={`text-purple-600 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Stop Spamming Groups. Start Growing Your Business.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join LinkUp today and get your products in front of thousands of engaged students—completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/linkupmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Us on Telegram
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link href="/" className="flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all duration-300">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
