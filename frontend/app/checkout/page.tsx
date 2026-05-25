'use client';

import { useState } from 'react';
import { useCart, useUI } from '@/lib/store';
import { checkoutAPI } from '@/lib/api';
import { formatPrice } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function Checkout() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const { closeCart } = useUI();

  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [loading, setLoading] = useState(false);

  // Shipping
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  // Payment
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      await checkoutAPI.checkout(shippingInfo, paymentInfo);
      clearCart();
      closeCart();
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push('/')}
          className="text-blue-600 hover:underline"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="flex items-center justify-between mb-12">
        <div
          className={`flex-1 text-center pb-3 border-b-2 ${
            step === 'shipping' ? 'border-black' : 'border-gray-300'
          }`}
        >
          <p className={`font-semibold ${step === 'shipping' ? '' : 'text-gray-600'}`}>
            Shipping
          </p>
        </div>
        <div
          className={`flex-1 text-center pb-3 border-b-2 ${
            step === 'payment' ? 'border-black' : 'border-gray-300'
          }`}
        >
          <p className={`font-semibold ${step === 'payment' ? '' : 'text-gray-600'}`}>
            Payment
          </p>
        </div>
        <div
          className={`flex-1 text-center pb-3 border-b-2 ${
            step === 'review' ? 'border-black' : 'border-gray-300'
          }`}
        >
          <p className={`font-semibold ${step === 'review' ? '' : 'text-gray-600'}`}>
            Review
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Shipping Step */}
          {step === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={shippingInfo.firstName}
                  onChange={handleShippingChange}
                  className="col-span-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={shippingInfo.lastName}
                  onChange={handleShippingChange}
                  className="col-span-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  className="col-span-2 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  className="col-span-2 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  className="col-span-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  className="col-span-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={shippingInfo.zip}
                  onChange={handleShippingChange}
                  className="col-span-1 px-4 py-2 border border-gray-300 rounded"
                />
                <select
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  className="col-span-1 px-4 py-2 border border-gray-300 rounded"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
              <button
                onClick={() => setStep('payment')}
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Payment Information</h2>
              <p className="text-sm text-gray-600">
                Demo mode: Use 4242 4242 4242 4242 for card number
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={paymentInfo.cvc}
                    onChange={handlePaymentChange}
                    className="px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep('shipping')}
                  className="flex-1 border-2 border-gray-300 text-black py-3 rounded font-bold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('review')}
                  className="flex-1 bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {step === 'review' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Order Review</h2>

              {/* Shipping Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Shipping To:</h3>
                <p className="text-sm text-gray-600">
                  {shippingInfo.firstName} {shippingInfo.lastName}
                  <br />
                  {shippingInfo.address}
                  <br />
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                  <br />
                  {shippingInfo.country}
                </p>
              </div>

              {/* Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Items</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x {item.quantity} ({item.size})
                      </span>
                      <span className="font-semibold">
                        {formatPrice(
                          item.product.price * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('payment')}
                  className="flex-1 border-2 border-gray-300 text-black py-3 rounded font-bold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded sticky top-20">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
