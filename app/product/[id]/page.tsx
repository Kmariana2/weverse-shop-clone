'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ImageGallery } from '@/components/ImageGallery';
import { CountdownTimer } from '@/components/CountdownTimer';
import { useCart, useUI } from '@/lib/store';
import { productsAPI } from '@/lib/api';
import { formatPrice } from '@/lib/hooks';
import { Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  badges: string[];
  stock: number;
  countdownEnd: string;
  shippingTag: string;
  description: string;
  sizes: string[];
}

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { showToastMessage } = useUI();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getById(id);
        setProduct(response.data);
        setSelectedSize(response.data.sizes[0]);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    addItem({
      productId: product.id,
      quantity,
      size: selectedSize,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        firstImage: product.images[0],
      },
    });

    showToastMessage('Added to cart!');
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 aspect-square rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <ImageGallery images={product.images} />
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={`text-xs font-bold px-3 py-1 rounded text-white ${
                  badge === 'EXCLUSIVE' ? 'bg-red-600' : 'bg-amber-600'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          {/* Price & Countdown */}
          <div className="space-y-2">
            <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Expires in:</span>
              <CountdownTimer endDate={product.countdownEnd} />
            </div>
          </div>

          {/* Stock */}
          {product.stock < 5 && (
            <p className="text-sm font-semibold text-red-600">
              Only {product.stock} left in stock
            </p>
          )}

          {/* Shipping */}
          <div className="text-sm text-gray-600">
            <p>{product.shippingTag}</p>
          </div>

          {/* Size Selector */}
          <div>
            <p className="font-semibold mb-3">Select Size</p>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 border-2 rounded font-semibold text-sm transition-colors ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="font-semibold mb-3">Quantity</p>
            <div className="flex items-center gap-4 w-max">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center font-semibold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded font-bold text-lg hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>

          {/* Description */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
