import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, LayoutGrid, Tag, Truck } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount?: number;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ cartCount = 0 }) => {
  const location = useLocation();
  const activePath = location.pathname;

  const tabs = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Shop', icon: ShoppingBag, path: '/shop' },
    { label: 'Track Order', icon: Truck, path: '/track-order' },
    { label: 'Offers', icon: Tag, path: '/shop?category=Combo+Offers' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-250 py-1.5 flex items-center justify-between lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {tabs.map((tab, idx) => {
        // Active check logic
        const isActive = tab.path === '/'
          ? activePath === '/'
          : activePath.startsWith(tab.path.split('?')[0]) && 
            (tab.path.includes('category=') 
              ? location.search.includes('category=Combo+Offers') 
              : !location.search.includes('category=Combo+Offers'));

        const Icon = tab.icon;

        return (
          <Link 
            key={idx}
            to={tab.path} 
            className="flex flex-col items-center flex-1 py-1 transition-all"
          >
            <div className={`relative p-1 transition-colors duration-200 ${
              isActive ? 'text-[#092813]' : 'text-gray-400'
            }`}>
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={isActive ? 'fill-current' : ''} 
              />
              
              {tab.label === 'Shop' && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FE8B00] text-black text-[9px] font-extrabold h-4.5 min-w-[18px] px-1 flex items-center justify-center rounded-full border border-white shadow-sm font-sans">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[9px] font-sans font-medium mt-0.5 transition-colors duration-200 ${
              isActive ? 'text-[#092813] font-bold' : 'text-gray-500 font-medium'
            }`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
