'use client';

import Link from 'next/link';
import { CountdownTimer } from './CountdownTimer';
import { formatPrice } from '@/lib/hooks';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  firstImage: string;
  badges: string[];
  stock: number;
  countdownEnd: string;
}

export function ProductCard({
  id,
  name,
  price,
  firstImage,
  badges,
  stock,
  countdownEnd,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative bg-gray-100 aspect-square rounded mb-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image</span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className={`text-xs font-bold px-2 py-1 rounded text-white ${
                  badge === 'EXCLUSIVE' ? 'bg-red-600' : 'bg-amber-600'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Hover Shadow */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity" />
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-gray-600">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">{formatPrice(price)}</p>
            <div className="text-right">
              <CountdownTimer endDate={countdownEnd} />
            </div>
          </div>

          {stock < 5 && (
            <p className="text-xs text-red-600 font-semibold">
              Only {stock} left
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
