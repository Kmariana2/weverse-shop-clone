'use client';

import { useUI, useCart } from '@/lib/store';
import { X, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/hooks';

export function CartDrawer() {
  const { showCart, closeCart } = useUI();
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="font-semibold text-lg">Cart</h2>
          <button
            onClick={closeCart}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <p>Your cart is empty</p>
              <Link
                href="/"
                onClick={closeCart}
                className="text-blue-600 hover:underline mt-4 block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4">
                  {/* Product */}
                  <div className="flex gap-4 mb-3">
                    <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold text-sm line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Size: {item.size}
                      </p>
                      <p className="font-semibold text-sm mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3 sticky bottom-0 bg-white">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-black text-white py-3 rounded font-semibold text-center hover:bg-gray-800 block"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
