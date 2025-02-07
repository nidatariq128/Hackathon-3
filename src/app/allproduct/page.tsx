"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { client } from "@/sanity/lib/client"; // Adjust the path as necessary

// Product type interface
type Product = {
  _id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  isNewArrival: boolean;
};

// ProductCard component
interface ProductCardProps {
  _id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  isNewArrival?: boolean;
}

function ProductCard({ _id, name, price, imageUrl, category, isNewArrival }: ProductCardProps) {
  return (
    <Link href={`/allproduct/${_id}`} className="group">
      <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg shadow-sm">
        <Image
          src={imageUrl}
          alt={name || "Product Image"}  // Added alt text for accessibility
          width={348}
          height={348}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          loading="lazy"  // Enable lazy loading for better performance
        />
        
      </div>
      <div className="mt-2 space-y-1 text-center">
        {isNewArrival && <div className="text-sm text-orange-600">Just In</div>}
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-sm font-medium text-gray-900">MRP: ₹{price}</p>
      </div>
    </Link>
  );
}

// ProductGrid component
function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
          _id,
          name,
          price,
          "imageUrl": image.asset->url,
          category,
          isNewArrival
        }`;
        const data: Product[] = await client.fetch(query);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}

// SidebarSection component
interface SidebarSectionProps {
  title: string;
  items: string[];
}

function SidebarSection({ title, items }: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <ul className="mt-2 space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-sm text-gray-600 hover:text-black">
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Sidebar component
function Sidebar() {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <nav className="sticky top-0 pt-4">
        <div className="border-b border-gray-200 py-4">
          <span className="text-sm font-medium">New (500)</span>
          <ul className="mt-2 space-y-2">
            {[
              "Shoes",
              "Tops & T-Shirts",
              "Hoodies & Sweatshirts",
              "Shorts",
              "Trousers & Tights",
              "Jackets",
              "Tracksuits",
              "Accessories & Equipment",
            ].map((item, index) => (
              <li key={index}>
                <Link href="#" className="text-sm text-gray-600 hover:text-black">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <SidebarSection title="Gender" items={["Men", "Women", "Unisex"]} />
        <SidebarSection title="Kids" items={["Boys", "Girls"]} />
        <SidebarSection
          title="Shop By Price"
          items={[
            "Under ₹ 7,500.00",
            "₹ 7,501.00 - ₹ 15,000.00",
            "Over ₹ 15,000.00",
          ]}
        />
      </nav>
    </aside>
  );
}

// Combined Export with Layout Fixes
export default function ProductsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 px-4 md:px-8 py-8">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-xl font-bold mb-6">Products</h1>
        <ProductGrid />
      </main>
    </div>
  );
}
