import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Info, HelpCircle, Phone, Truck, FileText, ShieldCheck, 
  RotateCcw, ChevronRight, FileQuestion 
} from 'lucide-react';

const MoreMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'About Us', icon: Info, path: '/about' },
    { label: 'FAQs', icon: FileQuestion, path: '/product/p1' },
    { label: 'Contact Us', icon: Phone, path: '/contact' },
    { label: 'Track Order', icon: Truck, path: '/track-order' },
    { label: 'Terms & Conditions', icon: FileText, path: '/terms' },
    { label: 'Privacy Policy', icon: ShieldCheck, path: '/privacy' },
    { label: 'Shipping Policy', icon: Truck, path: '/shipping' },
    { label: 'Return & Refund Policy', icon: RotateCcw, path: '/refunds' },
  ];

  return (
    <div className="pt-[106px] md:pt-28 pb-20 bg-[#F9FDF9] min-h-screen">
      <div className="container mx-auto px-6 max-w-lg">
        
        <h1 className="font-serif text-2xl font-extrabold text-[#092813] mb-6 text-center font-bold">More</h1>

        {/* Menu list */}
        <div className="bg-white rounded-2xl border border-swavalambi-sand/55 shadow-sm divide-y divide-swavalambi-sand/30 overflow-hidden mb-6">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => navigate(item.path)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#F9FDF9]/35 transition text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813]"><item.icon size={16} /></span>
                <span className="text-xs font-semibold text-swavalambi-dark">{item.label}</span>
              </div>
              <ChevronRight size={14} className="text-swavalambi-stone" />
            </button>
          ))}
        </div>

        {/* App Version Info */}
        <div className="text-center text-[9px] text-swavalambi-stone uppercase tracking-widest font-bold">
          Swavalambi India v1.1.0 • Backed by Tradition
        </div>

      </div>
    </div>
  );
};

export default MoreMenu;
