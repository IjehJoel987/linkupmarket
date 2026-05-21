'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PromotionalCard {
  title: string;
  description: string;
  image: string;
  cta: string;
  link: string;
  bgColor: string;
  textColor: string;
}

const promotionalCards: PromotionalCard[] = [
  {
    title: 'Hungry?',
    description: 'Fastest delivery to Hebron & CST halls.',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cta: 'Order Now',
    link: '/category/linkupfood',
    bgColor: 'from-purple-600 to-purple-700',
    textColor: 'text-white'
  },
  {
    title: 'Tech Deals',
    description: 'Chargers, buds & dorm essentials.',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cta: 'View Gear',
    link: '/category/linkupgadget',
    bgColor: 'from-orange-500 to-red-500',
    textColor: 'text-white'
  }
];

export default function PromotionalCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotionalCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className={`bg-gradient-to-br ${card.bgColor} rounded-3xl p-8 md:p-10 ${card.textColor} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group`}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">{card.title}</h3>
                  <p className="text-base md:text-lg opacity-90">{card.description}</p>
                </div>
                <button className="mt-6 px-6 py-3 bg-white text-gray-900 rounded-lg font-bold transform transition-all duration-300 group-hover:scale-105 inline-flex items-center gap-2 w-fit">
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
