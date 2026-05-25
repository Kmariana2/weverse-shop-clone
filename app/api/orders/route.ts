import { NextRequest, NextResponse } from 'next/server';

// In-memory order storage (for demo purposes)
// In production, use a real database
const orders: any[] = [];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, items, total } = body;

    if (!email || !items || total === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = {
      id: generateId(),
      email,
      items,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
