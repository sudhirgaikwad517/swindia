import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, MapPin, CreditCard, ShoppingBag, Heart, Bell, LogOut, ChevronRight 
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Addresses', icon: MapPin, path: '/checkout' },
    { label: 'Payment Methods', icon: CreditCard, path: '/checkout' },
    { label: 'My Orders', icon: ShoppingBag, path: '/orders' },
    { label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { label: 'Notification Preferences', icon: Bell, path: '/profile' },
  ];

  return (
    <div className="pt-[106px] md:pt-28 pb-20 bg-[#F9FDF9] min-h-screen">
      <div className="container mx-auto px-6 max-w-lg">
        
        <h1 className="font-serif text-2xl font-extrabold text-[#092813] mb-6 text-center">My Profile</h1>

        {/* User Card */}
        <div className="bg-white p-6 rounded-2xl border border-swavalambi-sand/55 shadow-sm flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#EBF1E6] border border-[#092813]/10 flex items-center justify-center text-[#092813] font-bold text-xl">
            NS
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-base text-swavalambi-dark leading-tight">Neha Sharma</h3>
            <p className="text-[10px] text-swavalambi-stone font-semibold mt-0.5">+91 93739 86362</p>
            <p className="text-[10px] text-swavalambi-stone font-semibold">neha@gmail.com</p>
          </div>
          <button 
            onClick={() => alert("Edit profile details...")}
            className="text-[9px] font-bold uppercase tracking-wider text-[#092813] border border-swavalambi-sand px-2.5 py-1 rounded-lg hover:border-[#092813] transition"
          >
            EDIT
          </button>
        </div>

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

        {/* Logout Button */}
        <button 
          onClick={() => {
            alert("Logged out successfully.");
            navigate('/');
          }}
          className="w-full bg-[#F9FDF9] border border-swavalambi-sand hover:border-red-600 hover:text-red-600 text-swavalambi-stone py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
        >
          <LogOut size={14} /> LOGOUT
        </button>

      </div>
    </div>
  );
};

export default Profile;
