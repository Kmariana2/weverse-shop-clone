'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  const orderNumber = `ORD-${Date.now()}`;

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been received.
      </p>
      <div className="bg-gray-50 p-6 rounded mb-8">
        <p className="text-sm text-gray-600 mb-1">Order Number</p>
        <p className="text-2xl font-bold text-gray-800">{orderNumber}</p>
      </div>
      <p className="text-sm text-gray-600 mb-8">
        A confirmation email has been sent to your inbox with tracking information.
      </p>
      <Link
        href="/"
        className="inline-block bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
