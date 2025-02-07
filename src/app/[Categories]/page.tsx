"use client";
import { usePathname } from 'next/navigation';
import Filter from "@/components/Filter";
import Mens from "@/components/Categories/Mens";
import Womens from "@/components/Categories/Women";
import Products from '@/components/Products';
import SNKRS from '@/components/Categories/SNKRS';
import Sales from '@/components/Categories/Sale';
import Kids from '@/components/Categories/Kids';

export default function Categories() {
  const pathname = usePathname(); // Get the current URL path

  const renderContent = () => {
    switch (pathname) {
      case "/mens":
        return <Mens />;
      case "/womens":
        return <Womens />;
        case "/kids":
        return <Kids/>;
        case "/sale":
        return <Sales/>;
      case "/SNKRS":
        return <SNKRS />;
      default:
        return (
          <div>
            <Products/>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      {/* Sidebar - Filters */}
      <Filter />

      {/* Main Content */}
        {renderContent()}
     
    </div>
  );
}