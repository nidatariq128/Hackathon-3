'use client';

import { useCart } from '@/components/CardContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ThankYou = () => {
  const { cart } = useCart();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a random order ID
    const generateOrderId = () => {
      return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    };
    setOrderId(generateOrderId());
  }, []);

  return (
    <div className="container mx-auto px-[100px] py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You for Your Order!</h1>
      <p className="text-lg mb-4">Your order has been placed successfully.</p>
      <p className="text-lg font-medium">Order ID: <span className="text-blue-600">{orderId}</span></p>

      {/* Order Summary */}
      <div className="mt-8 max-w-[600px] mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center gap-4">
              <Image src={item.image} alt={item.productName} width={60} height={60} className="rounded-md object-cover" />
              <div>
                <h3 className="text-lg font-medium">{item.productName}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="text-lg font-medium">₹ {Number(item.price).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <Link href="/" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
