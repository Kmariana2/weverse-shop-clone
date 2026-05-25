import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let products = PRODUCTS;
    
    if (category) {
      products = products.filter(p => p.category === category);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
