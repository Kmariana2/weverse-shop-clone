'use client';

import { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { FilterBar } from '@/components/FilterBar';
import { ProductGrid } from '@/components/ProductGrid';
import { useSearchParams } from 'next/navigation';
import { productsAPI } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  firstImage: string;
  badges: string[];
  stock: number;
  countdownEnd: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll(category || undefined);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <FilterBar />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        )}
      </div>
    </div>
  );
}
