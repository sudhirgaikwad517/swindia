import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS, UPCOMING_PRODUCTS } from '../data';
import { Product, CartItem } from '../types';
import { 
  Leaf, Heart, ShoppingCart, Package, Sprout, 
  SlidersHorizontal, ChevronDown, Gift, ChevronRight, Star, ShieldCheck,
  Droplet, LayoutGrid, Shield, Users
} from 'lucide-react';

interface ShopProps {
  onAddToCart: (product: Product) => void;
  wishlistItems?: Product[];
  onToggleWishlist?: (product: Product) => void;
  cartItems?: CartItem[];
}

const Shop: React.FC<ShopProps> = ({ onAddToCart, wishlistItems = [], onToggleWishlist, cartItems = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [prebookProd, setPrebookProd] = useState<string | null>(null);
  const [prebookLoading, setPrebookLoading] = useState(false);
  const [prebookStatus, setPrebookStatus] = useState<string | null>(null);

  const handlePrebookSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrebookLoading(true);
    setPrebookStatus(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      pincode: formData.get('pincode'),
      product_name: prebookProd
    };

    try {
      const response = await fetch('/api/prebooking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      if (resData.status === 'success') {
        setPrebookStatus('Prebooking successful! We will notify you.');
        setTimeout(() => {
          setPrebookProd(null);
          setPrebookStatus(null);
        }, 2000);
      } else {
        setPrebookStatus(resData.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setPrebookStatus('Failed to send prebooking. Please check connection.');
    } finally {
      setPrebookLoading(false);
    }
  };

  const coreProducts = PRODUCTS;

  // Sync category with query param (e.g. from Offers bottom nav tab)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [location.search]);

  // Exact rating numbers as per screenshot
  const getProductDisplayRating = (id: string) => {
    switch (id) {
      case 'p1': return 4.8;
      case 'p2': return 4.7;
      case 'p3': return 4.6;
      default: return 4.8;
    }
  };

  // Hinglish Image Briefs
  const getProductImageDetails = (id: string) => {
    return {
      id: 'product_image_sea_buckthorn_juice',
      desc: 'Sea Buckthorn Juice 100ml amber bottle ki saaf studio photo. Background light off-white rakho aur thodi halki drop shadow dikhao.'
    };
  };

  // Filter Categories matching mobile screenshot
  const getFilteredProducts = (category: string) => {
    switch (category) {
      case 'Diabetes Care':
        return coreProducts.filter(p => p.category === 'Diabetes Care' && !p.isUpcoming);
      case 'Hair Care':
        return coreProducts.filter(p => p.category === 'Hair Wellness' && !p.isUpcoming);
      case 'Combo Offers':
        return coreProducts.filter(p => (p.id === 'p4' || p.id === 'p5' || p.category.includes('Combo') || p.sku.includes('combo')) && !p.isUpcoming);
      case 'Coming Soon':
        return coreProducts.filter(p => p.isUpcoming);
      case 'All Products':
      default:
        return coreProducts;
    }
  };

  const filteredProducts = getFilteredProducts(activeCategory);

  const categories = [
    { name: 'All Products', icon: Leaf },
    { name: 'Diabetes Care', icon: Droplet },
    { name: 'Hair Care', icon: Sprout },
    { name: 'Combo Offers', icon: Gift },
    { name: 'Coming Soon', icon: Package },
  ];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const lastAddedItem = cartItems.length > 0 ? cartItems[cartItems.length - 1] : null;

  return (
    <div className="pt-[106px] lg:pt-[80px] pb-32 lg:pb-20 min-h-screen bg-[#F9FDF9] font-sans antialiased">
      
      {/* 1. Hero Banner Section */}
      <div className="bg-[#F9FDF9] lg:bg-[#061C0D] pb-4 pt-4 lg:py-16 rounded-b-[24px] lg:rounded-none border-b border-gray-150 lg:border-none text-gray-800 lg:text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-12 gap-4 items-center">
            
            {/* Left text info */}
            <div className="col-span-8 space-y-2.5 text-left">
              <span className="text-[11px] sm:text-sm font-extrabold uppercase tracking-widest text-[#FE8B00] block font-sans">
                Shop Our
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-[45px] font-bold text-[#092813] lg:text-white leading-tight">
                Authentic <br /> Wellness Range
              </h1>
              <p className="text-gray-600 lg:text-white/80 font-sans text-xs sm:text-sm leading-relaxed max-w-[200px] sm:max-w-md">
                Pure. Premium. Effective. <br /> For a healthier you, every day.
              </p>
            </div>

            {/* Right image placeholder */}
            <div className="col-span-4 flex justify-end items-center">
              <div className="w-full max-w-[120px] sm:max-w-[200px] md:max-w-[260px] aspect-square flex items-center justify-center">
                <img 
                  src="/assets/content/image-Photoroom%20(21).png" 
                  alt="Authentic Wellness Range" 
                  className="w-full h-full object-contain filter drop-shadow-md scale-125 origin-center"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE ONLY VIEW */}
      {/* ========================================================================= */}

      {/* 2. Categories Horizontal Carousel */}
      <div className="max-w-5xl mx-auto mt-4 px-3 overflow-x-auto no-scrollbar scroll-smooth flex gap-2 py-1.5 lg:hidden">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold font-sans transition-all duration-200 shrink-0 select-none shadow-sm cursor-pointer border ${
                isSelected 
                  ? 'bg-[#061C0D] text-white border-[#061C0D]' 
                  : 'bg-white text-gray-700 border-gray-150 hover:border-gray-300'
              }`}
            >
              <Icon size={12} className={isSelected ? 'text-white' : 'text-gray-500'} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Sort & Filter Toolbar */}
      <div className="max-w-5xl mx-auto flex justify-between items-center px-3 py-1.5 mt-1 lg:hidden">
        <button className="flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-gray-700 font-sans shadow-sm hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={12} className="text-gray-500" />
          <span>Filters</span>
        </button>
        <button className="flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-gray-700 font-sans shadow-sm hover:bg-gray-50 transition-colors">
          <span>Sort by: Popular</span>
          <ChevronDown size={12} className="text-gray-500" />
        </button>
      </div>

      {/* 4. Products Grid */}
      <div className="max-w-5xl mx-auto px-3 mt-1 lg:hidden">
        <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => {
            if (product.isUpcoming) {
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white border border-gray-150 rounded-2xl p-3 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer text-left h-auto pb-3 justify-between"
                >
                  <div className="w-full aspect-square bg-[#F9FDF9] rounded-xl overflow-hidden flex flex-col items-center justify-center relative">
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
                      Coming Soon
                    </span>
                    <Package size={28} className="text-gray-300 animate-pulse" />
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Under Formulation</span>
                  </div>
                  <div className="text-left mt-3 flex-1 flex flex-col justify-between font-sans">
                    <div>
                      <h3 className="font-sans text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-1 hover:text-[#FE8B00]">
                        {product.name}
                      </h3>
                      <p className="text-[12px] sm:text-xs text-gray-400 font-medium mt-0.5">
                        {product.category}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="w-full bg-[#092813] hover:bg-[#06281C] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 rounded-xl transition-all shadow-sm active:scale-95 mt-3"
                    >
                      Prebook Now
                    </button>
                  </div>
                </div>
              );
            }

            const isBestseller = product.badges?.some(b => b.toUpperCase().includes('BEST'));
            const isInWishlist = wishlistItems.some(item => item.id === product.id);
            return (
              <div 
                key={product.id}
                className="bg-white border border-gray-155 rounded-2xl p-3 sm:p-5 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 relative group h-auto pb-3"
              >
                {/* Product Image Container (1:1 Ratio) */}
                <div 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full aspect-square bg-[#F9FDF9] rounded-xl overflow-hidden flex items-center justify-center relative cursor-pointer"
                >
                  {isBestseller && (
                    <span className="absolute top-2.5 left-2.5 bg-[#061C0D] text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
                      Bestseller
                    </span>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleWishlist) onToggleWishlist(product);
                    }}
                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-500 transition-colors z-10"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={14} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
                  </button>

                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Product Details */}
                <div className="text-left mt-3 flex flex-col font-sans">
                  <div className="flex flex-col gap-0.5">
                    <h3 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="font-sans text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-1 hover:text-[#FE8B00] cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[12px] sm:text-xs text-gray-400 font-medium leading-none">
                      {product.id === 'p1' ? '900 ml' : product.id === 'p2' ? '60 Capsules' : product.id === 'p3' ? '100 ml' : product.id === 'p4' ? 'Combo Pack' : 'Wellness Combo'}
                    </p>
                    <div className="flex items-center gap-0.5 text-[#FE8B00] mt-1">
                      <Star className="fill-current w-3 h-3" />
                      <Star className="fill-current w-3 h-3" />
                      <Star className="fill-current w-3 h-3" />
                      <Star className="fill-current w-3 h-3" />
                      <Star className="fill-current w-3 h-3" />
                      <span className="text-[11px] sm:text-xs text-gray-400 font-medium ml-1">({product.rating.toFixed(1)})</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-3.5 pt-0.5 space-y-2">
                    <div className="flex items-baseline justify-between flex-wrap gap-x-1.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[15px] sm:text-base font-black text-gray-800">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[11.5px] sm:text-xs text-gray-400 line-through font-medium">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-[9.5px] sm:text-[9.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded">
                          Save ₹{product.originalPrice - product.price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full bg-[#061C0D] hover:bg-[#092813] text-white py-2 rounded-xl flex items-center justify-center gap-1.5 text-[11px] sm:text-[11px] font-bold transition-all active:scale-95 shadow-sm"
                    >
                      <span>Add to Cart</span>
                      <ShoppingCart size={11} className="fill-current" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Combo Offers Promo Card */}
      <div className="max-w-5xl mx-auto px-3 mt-6 mb-8 lg:hidden">
        <div className="bg-[#061C0D] rounded-2xl p-4 flex items-center justify-between text-white border border-[#FE8B00]/20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#FE8B00] shrink-0 border border-white/5">
              <Gift size={24} className="text-[#FE8B00] fill-[#FE8B00]/20" />
            </div>
            <div className="text-left font-sans">
              <h3 className="text-sm font-bold text-white leading-snug">Combo Offers</h3>
              <p className="text-[10px] text-white/70 leading-none mt-1">Better Together. Better Results.</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveCategory('Combo Offers')}
            className="w-8 h-8 rounded-full bg-[#FE8B00] text-[#061C0D] flex items-center justify-center shadow-md active:scale-90 transition-all hover:bg-white shrink-0"
            aria-label="View combo offers"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP PC ONLY VIEW (Sidebar Layout) */}
      {/* ========================================================================= */}

      <div className="max-w-5xl mx-auto px-6 mt-8 hidden lg:grid grid-cols-12 gap-6">
        
        {/* Left Column: Sidebar (3 cols) */}
        <aside className="col-span-3 space-y-6">
          
          {/* Categories Box */}
          <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#061C0D] text-white px-4 py-3 flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider">
              <LayoutGrid size={15} className="text-[#FE8B00]" />
              <span>Categories</span>
            </div>
            <div className="p-2 space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold font-sans transition-all text-left cursor-pointer border ${
                      isSelected
                        ? 'bg-[#FAF4EB] text-[#061C0D] border-transparent font-extrabold shadow-sm'
                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-[#FE8B00]' : 'text-gray-400'} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Box */}
          <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#061C0D] text-white px-4 py-3 flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider">
              <SlidersHorizontal size={15} className="text-[#FE8B00]" />
              <span>Filters</span>
            </div>
            
            <div className="p-4 space-y-5 text-left font-sans">
              {/* Price Range */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                  <span>Price Range</span>
                  <span className="text-gray-400 font-semibold select-none">^</span>
                </div>
                <div className="pt-2 px-1">
                  <div className="h-1 bg-gray-200 rounded-full relative">
                    <div className="absolute left-0 right-0 h-full bg-[#FE8B00]"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-[#FE8B00] shadow-sm"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-[#FE8B00] shadow-sm"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mt-2">
                    <span>₹0</span>
                    <span>₹2000+</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* Product Form Checkboxes */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-800 block">Product Form</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#061C0D] rounded w-3.5 h-3.5" defaultChecked />
                    <span>Syrup</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#061C0D] rounded w-3.5 h-3.5" />
                    <span>Capsules</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#061C0D] rounded w-3.5 h-3.5" />
                    <span>Oil</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#061C0D] rounded w-3.5 h-3.5" />
                    <span>Combo</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

        </aside>

        {/* Right Column: Products Content (9 cols) */}
        <main className="col-span-9 space-y-6">
          
          {/* Top Products toolbar */}
          <div className="flex justify-between items-center bg-white border border-gray-150 px-5 py-3.5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-gray-600 font-sans">
              Showing {filteredProducts.length} of {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600 font-sans">Sort by:</span>
              <button className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold text-gray-700 font-sans shadow-sm hover:bg-gray-100 transition-colors">
                <span>Popular</span>
                <ChevronDown size={12} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              if (product.isUpcoming) {
                return (
                  <div 
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white border border-gray-150 rounded-2xl p-4 flex flex-col justify-between h-[300px] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden text-left cursor-pointer"
                  >
                    <div className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                      Coming Soon
                    </div>
                    <div className="w-full h-36 bg-[#F9FDF9] rounded-xl flex flex-col items-center justify-center text-gray-300 gap-1 border border-gray-50 mt-1">
                      <Package size={32} className="text-gray-300 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Under Formulation</span>
                    </div>
                    <div className="text-left mt-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-sm font-bold text-gray-900 leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-medium font-sans mt-0.5">
                          {product.category}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                        className="w-full bg-[#092813] hover:bg-[#06281C] text-white text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-sm active:scale-95 mt-2"
                      >
                        Prebook Now
                      </button>
                    </div>
                  </div>
                );
              }

              const isBestseller = product.badges?.some(b => b.toUpperCase().includes('BEST'));
              const isInWishlist = wishlistItems.some(item => item.id === product.id);
              return (
                <div 
                  key={product.id}
                  className="bg-white border border-gray-155 rounded-2xl p-3 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 relative group h-auto pb-3.5 text-left"
                >
                  {/* Product Image Container (1:1 Ratio) */}
                  <div 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-full aspect-square bg-[#F9FDF9] rounded-xl overflow-hidden flex items-center justify-center relative cursor-pointer"
                  >
                    {isBestseller && (
                      <span className="absolute top-2.5 left-2.5 bg-[#061C0D] text-white text-[8px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
                        Bestseller
                      </span>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) onToggleWishlist(product);
                      }}
                      className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-500 transition-colors z-10"
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={14} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
                    </button>

                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="text-left mt-2.5 flex flex-col font-sans">
                    <div className="flex flex-col gap-0.5">
                      <h3 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-sans text-xs font-bold text-gray-900 leading-snug line-clamp-1 hover:text-[#FE8B00] cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium leading-none">
                        {product.id === 'p1' ? '900 ml' : product.id === 'p2' ? '60 Capsules' : product.id === 'p3' ? '100 ml' : 'Combo Pack'}
                      </p>
                      <div className="flex items-center gap-0.5 text-[#FE8B00] mt-1">
                        <Star className="fill-current w-3 h-3" />
                        <Star className="fill-current w-3 h-3" />
                        <Star className="fill-current w-3 h-3" />
                        <Star className="fill-current w-3 h-3" />
                        <Star className="fill-current w-3 h-3" />
                        <span className="text-[9px] text-gray-400 font-medium ml-1">({product.rating.toFixed(1)})</span>
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex flex-col items-start gap-1 mt-3.5 pt-0.5">
                      <span className="text-sm font-black text-gray-800">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                          <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded">
                            Save ₹{product.originalPrice - product.price}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#061C0D] hover:bg-[#092813] text-white px-3 py-1.5 rounded-full flex items-center gap-1 text-[9px] font-bold transition-all active:scale-95 shadow-sm mt-3 w-full justify-center"
                    >
                      <span>Add to Cart</span>
                      <ShoppingCart size={9} className="fill-current" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Combo Banner */}
          <div className="grid grid-cols-1 gap-4 pt-4">
            
            {/* Combo Banner (Removed as per single product logic) */}
            {/* 
            <div className="bg-[#061C0D] rounded-2xl p-5 flex items-center justify-between text-white border border-[#FE8B00]/25 shadow-md text-left">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#FE8B00] leading-snug">Diabetes Wellness Combo</h3>
                  <p className="text-xs text-white/95 font-semibold">Diabocare Syrup + Capsules</p>
                  <p className="text-[10px] text-white/70">Better Together. Better Results.</p>
                </div>
                <button 
                  onClick={() => navigate('/product/p4')}
                  className="bg-[#FE8B00] text-[#061C0D] text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-md hover:bg-white transition-all cursor-pointer"
                >
                  Shop Combo →
                </button>
              </div>
              
              <div className="w-[84px] h-[84px] rounded-xl overflow-hidden flex items-center justify-center p-1 bg-white shrink-0 shadow-sm">
                <img src="/assets/content/banner-01.jpg" alt="Diabetes Wellness Combo" className="w-full h-full object-contain select-none" />
              </div>
            </div>
            */}

            {/* Card 2: Special Combo Offers commented out
            <div className="bg-[#061C0D] rounded-2xl p-5 flex items-center justify-between text-white border border-[#FE8B00]/25 shadow-md text-left">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#FE8B00] leading-snug">Special Combo Offers</h3>
                  <p className="text-xs text-white/95 font-semibold">Save More On Wellness</p>
                  <p className="text-[10px] text-white/70 font-sans leading-none">Better Together. Better Results.</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('Combo Offers')}
                  className="bg-[#FE8B00] text-[#061C0D] text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-md hover:bg-white transition-all"
                >
                  Explore Offers →
                </button>
              </div>
              
              <div className="w-[84px] aspect-square rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-center p-1 relative group/tooltip cursor-pointer">
                <Gift className="text-[#FE8B00]/70 w-5 h-5 mb-0.5" />
                <span className="text-white text-[7px] font-bold">200 x 200 px</span>
                <span className="text-[#FE8B00] text-[6px] font-semibold opacity-60">ID: special_combo_gift</span>
                
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tooltip:block bg-gray-900 text-white text-[9px] font-sans rounded-lg p-2.5 w-48 shadow-lg border border-white/10 z-30 pointer-events-none text-left leading-normal">
                  <span className="text-[#FE8B00] font-bold block">ID: special_combo_gift</span>
                  <span className="text-[#FE8B00] font-bold block mt-0.5">SIZE: 200 x 200 px</span>
                  <span className="text-[#FE8B00] font-bold block mt-1">DESCRIPTION:</span>
                  A golden wrapped gift box with a green ribbon and a tag.
                </div>
              </div>
            </div>
            */}

          </div>

        </main>
      </div>

      {/* 5. Desktop Footer Trust Ribbon */}
      <div className="max-w-5xl mx-auto px-6 mt-12 mb-8 hidden lg:block">
        <div className="bg-[#FAF4EB] border border-[#FE8B00]/20 rounded-2xl py-5 px-8 flex justify-between items-center text-center shadow-sm">
          
          <div className="flex items-center gap-3.5 flex-1 justify-center text-left">
            <div className="w-10 h-10 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] shrink-0">
              <Leaf size={18} />
            </div>
            <div className="leading-tight font-sans">
              <div className="text-xs font-bold text-gray-800">Authentic</div>
              <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Inspired by Premium Quality</div>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-gray-200"></div>
          
          <div className="flex items-center gap-3.5 flex-1 justify-center text-left">
            <div className="w-10 h-10 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="leading-tight font-sans">
              <div className="text-xs font-bold text-gray-800">Quality Assured</div>
              <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Quality You Can Trust</div>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-gray-200"></div>
          
          <div className="flex items-center gap-3.5 flex-1 justify-center text-left">
            <div className="w-10 h-10 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] shrink-0">
              <Shield size={18} />
            </div>
            <div className="leading-tight font-sans">
              <div className="text-xs font-bold text-gray-800">Quality Checked</div>
              <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Safe & Effective</div>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-gray-200"></div>
          
          <div className="flex items-center gap-3.5 flex-1 justify-center text-left">
            <div className="w-10 h-10 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] shrink-0">
              <Users size={18} />
            </div>
            <div className="leading-tight font-sans">
              <div className="text-xs font-bold text-gray-800">Trusted by Customers</div>
              <div className="text-[10px] text-gray-500 font-semibold mt-0.5">10,000+ Happy Families</div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 6. Floating Cart Drawer */}
      {totalCartCount > 0 && lastAddedItem && (
        <div className="fixed bottom-[64px] left-0 right-0 z-40 px-4 animate-fade-in lg:hidden">
          <div className="bg-white border border-gray-250 rounded-full px-4 py-2.5 shadow-lg flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-155 flex items-center justify-center overflow-hidden shrink-0">
                <img src={lastAddedItem.image} alt={lastAddedItem.name} className="w-7 h-7 object-contain" />
              </div>
              <div className="text-left font-sans leading-tight">
                <h4 className="text-[10px] font-bold text-gray-800 line-clamp-1">{lastAddedItem.name}</h4>
                <span className="text-[8px] text-gray-400 font-medium">
                  {lastAddedItem.id === 'p1' ? '900 ml' : lastAddedItem.id === 'p2' ? '60 Capsules' : lastAddedItem.id === 'p3' ? '100 ml' : 'Combo Pack'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-sans text-xs font-bold text-gray-800">
                ₹{lastAddedItem.price}
              </span>
              <button
                onClick={() => navigate('/cart')}
                className="bg-[#FE8B00] text-[#061C0D] text-[10px] font-bold py-2 px-4 rounded-full shadow-md active:scale-95 transition-all"
              >
                View Cart ({totalCartCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prebooking Modal Overlay */}
      {prebookProd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#F9FDF9] rounded-3xl p-6 max-w-md w-full border border-gray-150 shadow-xl relative text-left">
            <h3 className="font-serif text-lg font-bold text-[#092813] mb-1">Prebook Upcoming Product</h3>
            <p className="text-[10px] text-gray-550 font-semibold mb-4">Be the first to receive updates and exclusive offers when this product launches.</p>
            
            <form onSubmit={handlePrebookSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">Product Name</label>
                <input 
                  type="text" 
                  value={prebookProd} 
                  disabled 
                  className="w-full px-3.5 py-2.5 text-xs font-bold rounded-lg bg-white/50 border border-gray-200 text-gray-600 font-sans cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">Your Name*</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  placeholder="e.g. Rajesh Patil"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-250 bg-white focus:outline-none focus:border-[#092813] font-sans font-semibold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">Mobile Number*</label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  placeholder="e.g. 9373986362"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-255 bg-white focus:outline-none focus:border-[#092813] font-sans font-semibold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">Full Address*</label>
                <textarea 
                  name="address"
                  required 
                  rows={2}
                  placeholder="e.g. Flat 302, Green Meadows, MG Road"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-255 bg-white focus:outline-none focus:border-[#092813] font-sans font-semibold text-gray-800 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">City*</label>
                  <input 
                    type="text" 
                    name="city"
                    required 
                    placeholder="e.g. Shrirampur"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-255 bg-white focus:outline-none focus:border-[#092813] font-sans font-semibold text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">Pincode*</label>
                  <input 
                    type="text" 
                    name="pincode"
                    required 
                    placeholder="e.g. 411057"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-255 bg-white focus:outline-none focus:border-[#092813] font-sans font-semibold text-gray-800"
                  />
                </div>
              </div>

              {prebookStatus && (
                <p className={`text-[10px] font-bold ${prebookStatus.includes('successful') ? 'text-green-700' : 'text-red-650'}`}>
                  {prebookStatus}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => { setPrebookProd(null); setPrebookStatus(null); }}
                  className="flex-1 border border-gray-250 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={prebookLoading}
                  className="flex-1 bg-[#092813] hover:bg-[#06281C] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {prebookLoading ? 'Submitting...' : 'Confirm Prebook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;
