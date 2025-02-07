'use client';


import Image from 'next/image';
import { useCart } from '@/components/CardContext'; // Import the context
import { useState } from 'react'; // Import useState to manage notification state

interface Product {
  name: any;
  image: any;
  _id: string;
  productName: string;
  category: string;
  price: string;
  colors: string[];
  imageUrl: string;
  description: string;
}

const Productdetail = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState<string>(''); // State for notification

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      productName: product.productName,
      price: product.price,
      imageUrl: product.image?.asset?.url || '',
      quantity: 1,
    };
    addToCart(cartItem);
    setNotification(`${product.productName} added to cart successfully!`); // Set notification
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
  };

  return (
    <div className='grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-6'>
      <div className='col-span-12 md:col-span-6'>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.productName}
            width={500}
            height={500}
          />
        ) : (
          <div className='w-full h-full bg-gray-300 rounded-md flex items-center justify-center text-gray-600'>
            No Image Available
          </div>
        )}
      </div>
      <div className='col-span-12 md:col-span-6 pr-18 pt-10 md:pt-0'>
        <h1 className='text-3xl font-bold'>{product.productName}</h1>
        <p className='py-10 text-lg'>{product.description}</p>
        <h2 className="text-2xl focus-visible:outline-none mb-4">
          <span className="font-bold">Price:</span> &#8377; {product.price}
        </h2>
        {product.colors && (
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-black">Available Colors:</h2>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="block w-6 h-6 rounded-full border border-gray-400"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className='flex mt-6'>
          <button
          onClick={handleAddToCart} 
          className="rounded-full bg-black px-12 py-6 text-white text-lg">
            Add to cart
            </button>
        </div>
        <div className='flex mt-6'>
          <button
          onClick={handleAddToCart} 
          className="rounded-full bg-black px-12 py-6 text-white text-lg">
            Add to wishlist
            </button>
        </div>
        {notification && (
          <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default Productdetail;