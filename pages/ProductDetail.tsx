import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { SEA_BUCKTHORN_FAQS, WHY_CHOOSE_BENEFITS_LEFT, WHY_CHOOSE_BENEFITS_RIGHT, INGREDIENTS_STORY, HOW_IT_WORKS_STEPS, TRUST_PILLARS, CUSTOMER_REVIEWS, KEY_WELLNESS_BENEFITS, REVIEW_SUMMARY } from '../productContent';
import { Product } from '../types';
import { 
  Star, Heart, Minus, Plus, CheckCircle, Truck, ShieldCheck, Leaf,
  FlaskConical, Sparkles, ArrowRight, Clock, Info, Scale, Zap, Droplet, 
  ShoppingBag, Sprout, Play, Shield, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, User, Package, Check,
  ArrowUpDown
} from 'lucide-react';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  onAddToCart,
  onBuyNow,
  wishlistItems,
  onToggleWishlist
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Look up product robustly
  const safeId = id ? id.trim() : '';
  let product = PRODUCTS.find(p => p.id === safeId);
  if (!product && safeId) {
    product = PRODUCTS.find(p => p.id.toLowerCase() === safeId.toLowerCase());
  }

  const getInitialSize = () => {
    if (!product) return 'Standard';
    if (product.id === 'p1') return '500ml';
    if (product.id === 'p2') return '60 Caps';
    if (product.id === 'p3') return '100ml';
    if (product.id === 'p4') return '900ml+60cap';
    return 'Standard';
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(getInitialSize());
  const [mainImage, setMainImage] = useState('');
  
  const galleryImages = product 
    ? (product.gallery && product.gallery.length > 0 ? product.gallery : [product.image])
    : [];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  const [showPrebookModal, setShowPrebookModal] = useState(false);
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
      product_name: product?.name
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
          setShowPrebookModal(false);
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

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (Math.abs(diffX) > swipeThreshold) {
      const currentIdx = galleryImages.indexOf(mainImage);
      if (diffX > 0) {
        const nextIdx = (currentIdx + 1) % galleryImages.length;
        setMainImage(galleryImages[nextIdx]);
      } else {
        const prevIdx = (currentIdx - 1 + galleryImages.length) % galleryImages.length;
        setMainImage(galleryImages[prevIdx]);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-advance gallery image every 5 seconds (resetting timer on interaction)
  useEffect(() => {
    if (!galleryImages || galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      const currentIdx = galleryImages.indexOf(mainImage);
      const nextIdx = (currentIdx + 1) % galleryImages.length;
      setMainImage(galleryImages[nextIdx]);
    }, 5000);

    return () => clearInterval(interval);
  }, [mainImage, galleryImages]);

  const handleAddToCart = () => {
    if (product) onAddToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (product) onBuyNow(product, quantity);
  };

  // Sync main image and size on product change
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      if (product.id === 'p1') setSelectedSize('500ml');
      else if (product.id === 'p2') setSelectedSize('60 Caps');
      else if (product.id === 'p3') setSelectedSize('100ml');
      else if (product.id === 'p4') setSelectedSize('900ml+60cap');
      else setSelectedSize('Standard');
    }
  }, [product]);

  // Sticky bottom bar scroll check
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center font-serif flex flex-col items-center justify-center min-h-[60vh] bg-[#F9FDF9]">
        <div className="w-16 h-16 bg-white border border-gray-150 rounded-full flex items-center justify-center mb-4 shadow-sm">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-950 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-8 text-sm">We couldn't locate the item you are looking for.</p>
        <button onClick={() => navigate('/shop')} className="bg-[#061C0D] text-white px-8 py-3 rounded-full hover:bg-[#092813] transition-all font-bold shadow-md">
          Return to Shop
        </button>
      </div>
    );
  }

  // Adjust price based on selected size dynamically (sizes are fixed now)
  const getAdjustedPrice = () => {
    return product.price;
  };

  const getAdjustedOriginalPrice = () => {
    return product.originalPrice;
  };

  const currentPrice = getAdjustedPrice();
  const currentOriginalPrice = getAdjustedOriginalPrice();
  const discountPercentage = currentOriginalPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) 
    : 0;

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Hinglish briefs matching repository standards
  const getProductImageDetails = (id: string) => {
    switch (id) {
      case 'product_image_Sea Buckthorn Juice_syrup':
        return {
          id: 'product_image_Sea Buckthorn Juice_syrup',
          desc: 'Sea Buckthorn Juice 900ml amber bottle ki saaf studio photo. Bottle pe green floral label aur white cap hona chahiye. Background light off-white rakho aur thodi halki drop shadow.'
        };
      case 'product_image_Sea Buckthorn Juice_capsules':
        return {
          id: 'product_image_Sea Buckthorn Juice_capsules',
          desc: 'Sea Buckthorn Juice 60 Capsules ki white bottle ki studio photo. Green label aur white cap ke sath, background bilkul clean.'
        };
      case 'product_image_hair_vitalizer':
        return {
          id: 'product_image_hair_vitalizer',
          desc: 'Hair Vitalizer 200ml bottle ki clean photo. Green label aur black spray pump ke sath, background clean.'
        };
      default:
        return {
          id: 'product_image_livocare_syrup',
          desc: 'Livocare Syrup 200ml amber bottle ki studio photo. White cap aur liver-health green label, background clean.'
        };
    }
  };

  return (
    <div className="pt-[106px] pb-16 min-h-screen bg-[#F9FDF9] antialiased text-gray-800">
      
      {/* Smooth Image Carousel Transitions */}
      <style>{`
        @keyframes smoothFadeIn {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
        .animate-smooth-fade {
          animation: smoothFadeIn 0.35s ease-out forwards;
        }
      `}</style>
      
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="text-xs text-gray-500 font-sans flex items-center gap-1.5 text-left">
          <span className="cursor-pointer hover:text-[#061C0D] transition-colors" onClick={() => navigate('/')}>Home</span> 
          <span>&gt;</span>
          <span className="cursor-pointer hover:text-[#061C0D] transition-colors" onClick={() => navigate('/shop')}>Shop</span> 
          <span>&gt;</span>
          <span className="cursor-pointer hover:text-[#061C0D] transition-colors" onClick={() => navigate(`/shop?category=${encodeURIComponent(product.category)}`)}>{product.category}</span> 
          <span>&gt;</span>
          <span className="text-[#061C0D] font-bold">{product.name}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto sm:px-6">
        
        {/* ========================================================================= */}
        {/* UPPER MAIN PRODUCT SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 bg-transparent lg:bg-white border-0 lg:border lg:border-gray-150 rounded-none lg:rounded-3xl p-0 lg:p-8 lg:shadow-sm">
          
          {/* LEFT: Image Gallery — full-bleed on mobile like hero */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            
            {/* Large central image wrapper — edge-to-edge fill */}
            <div className="w-full">
              <div 
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="w-full aspect-square bg-[#092813] border-0 lg:border lg:border-[#092813]/20 rounded-none lg:rounded-2xl relative group/tooltip cursor-pointer overflow-hidden"
              >
                
                <img 
                  key={mainImage} 
                  src={mainImage} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover object-center animate-smooth-fade" 
                />

                {/* Overlapping gold bestseller / coming soon badge */}
                {product.isUpcoming ? (
                  <div className="absolute bottom-3 right-3 bg-[#092813] border-2 border-[#FE8B00] rounded-lg py-1.5 px-3 flex flex-col items-center shadow-md select-none text-white text-left font-sans leading-none z-10">
                    <span className="text-[8px] uppercase tracking-widest text-[#FE8B00] font-black">Coming Soon</span>
                    <span className="text-[10px] font-black mt-0.5 text-white">Prebook</span>
                    <span className="text-[7.5px] font-medium text-white/80">Active</span>
                  </div>
                ) : (
                  <div className="absolute bottom-3 right-3 bg-[#092813] border-2 border-[#FE8B00] rounded-lg py-1.5 px-3 flex flex-col items-center shadow-md select-none text-white text-left font-sans leading-none z-10">
                    <span className="text-[6px] uppercase tracking-widest text-[#FE8B00] font-black">Bestseller</span>
                    <span className="text-[10px] font-black mt-0.5 text-white">2,300+</span>
                    <span className="text-[7.5px] font-medium text-white/80">Happy Customers</span>
                    <div className="flex gap-0.5 mt-0.5 text-[#FE8B00]">
                      <Star className="fill-current w-1.5 h-1.5" /> <Star className="fill-current w-1.5 h-1.5" /> <Star className="fill-current w-1.5 h-1.5" /> <Star className="fill-current w-1.5 h-1.5" /> <Star className="fill-current w-1.5 h-1.5" />
                    </div>
                  </div>
                )}

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-gray-900 text-white text-[9px] font-sans rounded-lg p-2.5 w-56 shadow-lg border border-white/10 z-30 pointer-events-none text-left leading-normal">
                  <span className="text-[#FE8B00] font-bold block">ID: {getProductImageDetails(product.id).id}</span>
                  <span className="text-[#FE8B00] font-bold block mt-0.5">SIZE: 500 x 500 px</span>
                  <span className="text-[#FE8B00] font-bold block mt-1">DESCRIPTION:</span>
                  {getProductImageDetails(product.id).desc}
                </div>
              </div>
            </div>

            {/* Slide Dot Indicators */}
            {galleryImages.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-2 flex-wrap px-4">
                {galleryImages.map((img, idx) => {
                  const isActive = mainImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#092813] w-3.5' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>
            )}

          </div>

          {/* RIGHT: Buy Panel Information (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-4 font-sans px-4 sm:px-0 pt-5 lg:pt-0 bg-white lg:bg-transparent">
            
            <div className="space-y-1">
              <span className="bg-[#FE8B00] text-[#061C0D] text-[7.5px] font-bold tracking-widest uppercase px-2 py-0.5 rounded font-sans">
                {product.isUpcoming ? 'Coming Soon' : 'Bestseller'}
              </span>
              <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mt-1">
                {product.name}
              </h1>
              <p className="text-xs text-gray-550 font-sans font-medium">
                {product.isUpcoming ? 'Under Formulation / Prebooking Active' : product.tagline}
              </p>
              {product.id === 'p1' && !product.isUpcoming && (
                <div className="space-y-1 pt-1">
                  <p className="text-[11px] text-gray-700 font-semibold">✨ Premium Himalayan Superfood for Daily Wellness</p>
                  <p className="text-[11px] text-gray-700 font-semibold">💪 Supports Immunity • Skin Health • Energy • Heart Wellness</p>
                  <p className="text-[11px] text-[#092813] font-bold">👉 Start Your Health Journey Today</p>
                </div>
              )}
            </div>

            {/* Ratings row */}
            {!product.isUpcoming && (
              <div className="flex items-center gap-2 text-xs font-sans text-gray-600">
                <div className="flex text-[#FE8B00] gap-0.5">
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-gray-800">{product.rating}</span>
                <span className="text-gray-400 font-semibold">({product.reviews.toLocaleString()}+ Reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-550 font-bold">
                  {product.bottlesSold === 'New' ? 'New Product' : `${product.bottlesSold} Bottles Sold`}
                </span>
              </div>
            )}

            {/* Price display */}
            {product.isUpcoming ? (
              <div className="space-y-0.5 border-b border-dashed border-gray-150 pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-amber-600">Under Formulation</span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200/50 text-[8.5px] font-black px-1.5 py-0.5 rounded shadow-sm animate-pulse">
                    Prebooking Active
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-0.5 border-b border-dashed border-gray-150 pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-950">₹{currentPrice.toFixed(2)}</span>
                  {currentOriginalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">₹{currentOriginalPrice.toFixed(2)}</span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[8.5px] font-black px-1.5 py-0.5 rounded shadow-sm">
                        Save ₹{currentOriginalPrice - currentPrice}
                      </span>
                    </>
                  )}
                </div>
                <span className="text-[9px] text-gray-400 font-semibold">(Inclusive of all taxes)</span>
              </div>
            )}

            {/* Key benefits list */}
            <div className="space-y-1.5 text-xs text-gray-700 font-sans font-semibold text-left">
              {product.isUpcoming && product.benefits ? (
                product.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))
              ) : product.id === 'p1' ? (
                KEY_WELLNESS_BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))
              ) : product.id === 'p3' ? (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Helps Reduce Hair Fall & Damage Effectively</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Promotes New Hair Growth & Thickness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Prevents Dandruff & Nourishes Scalp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Safe for Daily Use</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Helps Support Healthy Sugar Levels Effectively</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Improves Energy & Reduces Fatigue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Supports Better Metabolism</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    <span>Carefully Crafted</span>
                  </div>
                </>
              )}
            </div>

            {/* Size Selector */}
            {!product.isUpcoming && (
              <div className="space-y-2 pt-1.5 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Select Size</span>
                <div className="flex gap-3 justify-center">
                  {[
                    { 
                      label: product.id === 'p1' ? '500ml' 
                             : product.id === 'p2' ? '60 Caps' 
                             : product.id === 'p3' ? '100ml' 
                             : product.id === 'p4' ? '900ml+60cap' 
                             : product.id === 'p5' ? '900ml+60cap+chyawanprash'
                             : 'Standard', 
                      sub: `₹${product.price}` 
                    }
                  ].map((sizeOpt) => {
                    return (
                      <button
                        key={sizeOpt.label}
                        className="border-2 rounded-xl py-2.5 px-6 flex flex-col items-center transition-all cursor-pointer border-[#092813] bg-[#EBF1E6]/25 font-bold shadow-sm"
                      >
                        <span className="text-xs text-gray-855 font-extrabold">{sizeOpt.label}</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-0.5">{sizeOpt.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity controls & Add to Cart button row / Prebook */}
            {product.isUpcoming ? (
              <div className="pt-2">
                <button
                  onClick={() => setShowPrebookModal(true)}
                  className="w-full bg-[#092813] hover:bg-[#06281C] text-white rounded-xl font-bold text-xs uppercase tracking-wider py-4 flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Package size={16} className="text-[#FE8B00] shrink-0" />
                  <span>Pre-Book Now</span>
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="flex items-center justify-between border border-gray-300 rounded-xl bg-white p-1 sm:p-0">
                    <button onClick={decrement} className="px-4 py-2.5 text-gray-500 hover:text-black"><Minus size={14} /></button>
                    <span className="w-12 text-center text-sm font-bold text-gray-800">{quantity}</span>
                    <button onClick={increment} className="px-4 py-2.5 text-gray-500 hover:text-black"><Plus size={14} /></button>
                  </div>

                  <div className="flex flex-1 gap-3">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#092813] hover:bg-[#06281C] text-white rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider py-3.5 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag size={14} className="text-[#FE8B00] shrink-0" />
                      <span>Add to Cart</span>
                    </button>

                    <button 
                      onClick={handleBuyNow}
                      className="flex-1 bg-[#FE8B00] hover:bg-[#c29f2e] text-[#061C0D] rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider py-3.5 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

                {/* Order on WhatsApp */}
                <button 
                  onClick={() => {
                    const text = `*New Inquiry:* I want to order ${product.name} (${selectedSize}) x ${quantity}.`;
                    window.open(`https://wa.me/919373986362?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full border border-[#092813] text-[#092813] hover:bg-[#092813]/5 rounded-xl font-bold text-xs uppercase tracking-wider py-3.5 flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle size={15} className="text-[#25D366] fill-[#25D366]/20 shrink-0" />
                  <span>Order on WhatsApp</span>
                </button>
              </>
            )}

          </div>

          {/* FULL WIDTH ROW: Trust Badges (8 items spanning desktop width) */}
          <div className="lg:col-span-12 border-t border-gray-100 pt-5 mt-4 px-4 sm:px-0 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap lg:items-center lg:justify-between gap-4 text-[8.5px] lg:text-[9.5px] font-bold text-gray-500 uppercase tracking-widest font-sans text-left">
            {product.id === 'p1' ? (
              <>
                <span className="flex items-center gap-1.5"><Leaf size={12} className="text-[#FE8B00] shrink-0" /> 100% Natural</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-[#FE8B00] shrink-0" /> GMP Certified</span>
                <span className="flex items-center gap-1.5"><FlaskConical size={12} className="text-[#FE8B00] shrink-0" /> Lab Tested</span>
                <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-[#FE8B00] shrink-0" /> No Side Effects</span>
                <span className="flex items-center gap-1.5">🌏 Made in India</span>
                <span className="flex items-center gap-1.5"><Shield size={12} className="text-gray-400 shrink-0" /> Secure Payments</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-gray-400 shrink-0" /> Easy Returns</span>
                <span className="flex items-center gap-1.5"><Truck size={12} className="text-gray-400 shrink-0" /> Free Shipping</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5"><Leaf size={12} className="text-[#FE8B00] shrink-0" /> Premium Quality</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-[#FE8B00] shrink-0" /> Quality Assured</span>
                <span className="flex items-center gap-1.5"><FlaskConical size={12} className="text-[#FE8B00] shrink-0" /> Quality Checked</span>
                <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-[#FE8B00] shrink-0" /> No Side Effects</span>
                <span className="flex items-center gap-1.5">🌏 Made in India</span>
                <span className="flex items-center gap-1.5"><Shield size={12} className="text-gray-400 shrink-0" /> Secure Payments</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-gray-400 shrink-0" /> Easy Returns</span>
                <span className="flex items-center gap-1.5"><Truck size={12} className="text-gray-400 shrink-0" /> Free Shipping</span>
              </>
            )}
          </div>
        </div>

        {/* Content below product hero — restore mobile side padding */}
        <div className="px-4 sm:px-0">

        {/* BENEFITS ICON BAR */}
        <div className="bg-[#FAF4EB] border border-[#FE8B00]/25 rounded-2xl py-3 px-6 mt-6 flex flex-wrap justify-between items-center gap-4 text-xs font-bold text-gray-700 font-sans shadow-sm">
          {product.id === 'p3' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Leaf size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Reduces Hair Fall</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Scale size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Promotes Hair Growth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Zap size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Strengthens Hair Roots</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Droplet size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Prevents Dandruff & Itchiness</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Sparkles size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Nourishes Scalp Deeply</span>
              </div>
            </>
          ) : product.id === 'p1' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Sprout size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Supports Immunity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Sparkles size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Skin Health</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Zap size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Energy & Stamina</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0">
                  <Heart size={14} />
                </div>
                <span className="text-[10px] sm:text-xs">Heart Wellness</span>
              </div>
            </>
          ) : null}
        </div>

        {product.isUpcoming ? (
          <section className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8 text-center max-w-3xl mx-auto w-full">
            <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
              Under Formulation
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
              Crafting Pure Wellness
            </h2>
            <p className="text-xs text-gray-550 font-semibold mt-3 max-w-xl mx-auto leading-relaxed">
              This product is currently under rigorous research and development in our laboratory. 
              We are sourcing the finest organic herbs to ensure the highest standards of safety, efficacy, and purity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
              <div className="bg-[#F9FDF9] p-5 rounded-2xl border border-gray-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3">
                  <Leaf size={18} />
                </div>
                <h4 className="text-xs font-bold text-gray-900">Sourcing Organic Herbs</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Handpicked wildcrafted botanical ingredients directly from sustainable farmers.</p>
              </div>
              <div className="bg-[#F9FDF9] p-5 rounded-2xl border border-gray-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3">
                  <FlaskConical size={18} />
                </div>
                <h4 className="text-xs font-bold text-gray-900">Rigorous Lab Testing</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Ensuring optimal potency through careful selection of ingredients.</p>
              </div>
              <div className="bg-[#F9FDF9] p-5 rounded-2xl border border-gray-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="text-xs font-bold text-gray-900">Quality Promise</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Manufactured in quality-assured sterile environments to preserve premium life force.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <button
                onClick={() => setShowPrebookModal(true)}
                className="bg-[#092813] hover:bg-[#06281C] text-white py-3 px-8 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Pre-Book This Product
              </button>
            </div>
          </section>
        ) : product.id === 'p3' ? (
          <>
            {/* ROW: Ingredients & How It Works Side-by-Side (For p3/Hair Oil) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              
              {/* LEFT: Powerful Ingredients */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm font-sans flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Powerful Ingredients
                  </h3>
                  <span className="text-[9px] font-bold text-[#092813] border-b border-[#092813] cursor-pointer">
                    See All Ingredients
                  </span>
                </div>

                <div className="relative px-6 flex items-center flex-1">
                  <button className="absolute left-0 text-gray-400 hover:text-[#092813] transition-colors cursor-pointer" aria-label="Previous ingredient">
                    <ChevronLeft size={16} />
                  </button>

                  <div className="grid grid-cols-4 lg:grid-cols-5 gap-3 w-full justify-center">
                    {[
                      { name: "Bhringraj", sub: "Strengthens Hair Roots & Prevents Fall", img: "/assets/content/bhringraj.jpg" },
                      { name: "Amla", sub: "Rich in Vitamin C & Promotes Growth", img: "/assets/content/amla.jpg" },
                      { name: "Reetha", sub: "Cleanses Scalp & Nourishes Effectively", img: "/assets/content/reetha.jpg" },
                      { name: "Shikakai", sub: "Softens Hair & Cleanses Mildly", img: "/assets/content/shikakai.jpg" }
                    ].map((herb, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center space-y-1.5">
                        <div className="w-12 h-12 rounded-full border border-gray-150 p-0.5 bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                          <img src={herb.img} alt={herb.name} className="w-full h-full object-contain rounded-full" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[9px] font-bold text-gray-900 leading-none">{herb.name}</h4>
                          <p className="text-[7.5px] text-gray-450 font-semibold leading-tight mt-1">{herb.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="absolute right-0 text-gray-400 hover:text-[#092813] transition-colors cursor-pointer" aria-label="Next ingredient">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* RIGHT: How It Works */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm font-sans flex flex-col justify-between">
                <h3 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 text-left">
                  How Hair Vitalizer Works
                </h3>

                <div className="relative px-2 flex items-center flex-1 justify-center">
                  <div className="absolute top-[20px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-[#FE8B00]/50 hidden sm:block z-0"></div>
                  
                  <div className="grid grid-cols-4 gap-2.5 w-full relative z-10">
                    {[
                      { title: "Nourish Scalp", desc: "Penetrates scalp deeply to nourish roots", icon: Droplet },
                      { title: "Strengthen Roots", desc: "Strengthens follicles to minimize breakage", icon: Shield },
                      { title: "Stimulate Growth", desc: "Stimulates follicles to grow new hair", icon: Sprout },
                      { title: "Revitalize Hair", desc: "Improves overall hair volume & shine", icon: Sparkles }
                    ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center space-y-1.5">
                        <div className="w-10 h-10 rounded-full bg-[#061C0D] text-white border border-[#FE8B00] flex items-center justify-center shrink-0 shadow-sm">
                          <step.icon size={15} className="text-[#FE8B00]" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[9px] font-bold text-gray-900 leading-none">{step.title}</h4>
                          <p className="text-[7.5px] text-gray-400 font-semibold leading-tight mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* TRUSTED. TESTED. TRANSPARENT. & LAB REPORTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 items-stretch">
              <div className="lg:col-span-7 bg-[#092813] text-white border border-[#FE8B00]/15 rounded-3xl p-6 flex flex-col justify-center shadow-sm">
                <span className="text-[10px] font-black text-[#FE8B00] uppercase tracking-widest text-left mb-4">
                  Trusted. Tested. Transparent.
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00]">
                      <Leaf size={18} />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Quality Assured</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00]">
                      <FlaskConical size={18} />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Quality Checked</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00]">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Ayush Approved</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00]">
                      <Sprout size={18} />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Authentic</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00]">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Quality Standards</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00]">
                      <Sparkles size={18} />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">No Harmful Chemicals</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl p-6 flex items-center justify-between shadow-sm text-left">
                <div className="space-y-3 flex-1 pr-4">
                  <h4 className="font-serif text-sm font-bold text-gray-900 leading-snug">Third Party Lab Test Reports</h4>
                  <p className="text-[10px] text-gray-550 font-semibold leading-relaxed">
                    Our products are tested for heavy metals, microbes & safety.
                  </p>
                  <button 
                    onClick={() => window.open('/assets/content/report.pdf', '_blank')}
                    className="border border-[#092813] text-[#092813] hover:bg-[#092813] hover:text-white px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Report</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
                <div className="flex gap-1 items-end relative shrink-0">
                  <div className="w-12 h-16 bg-white border border-gray-200 rounded shadow-sm flex flex-col p-1 space-y-1 rotate-[-4deg] translate-x-3">
                    <div className="h-1 w-8 bg-gray-200 rounded"></div>
                    <div className="h-0.5 w-6 bg-gray-100 rounded"></div>
                    <div className="h-0.5 w-7 bg-gray-100 rounded"></div>
                    <div className="h-0.5 w-5 bg-gray-100 rounded"></div>
                  </div>
                  <div className="w-12 h-16 bg-white border border-gray-200 rounded shadow-md flex flex-col p-1 space-y-1 rotate-[4deg] z-10">
                    <div className="h-1 w-8 bg-[#092813]/30 rounded"></div>
                    <div className="h-0.5 w-6 bg-gray-100 rounded"></div>
                    <div className="h-0.5 w-7 bg-gray-100 rounded"></div>
                    <div className="h-0.5 w-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* BEFORE & AFTER RESULTS */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 lg:p-10 shadow-sm mt-8 text-center font-sans overflow-hidden">
              <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 inline-block">
                Visible Results
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-extrabold text-[#092813] tracking-tight mb-3">
                Real Results. Visible Difference.
              </h3>
              <p className="text-xs text-gray-550 font-semibold mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the transformative power of Hair Vitalizer. Formulated with authentic Authentic herbs, witness noticeable reduction in hair fall and improved scalp health with consistent use.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {/* Result 1 */}
                <div className="group bg-[#F9FDF9] border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 rounded-full border border-gray-150 shadow-sm z-20 flex items-center gap-2">
                    <Star className="w-3 h-3 text-[#FE8B00] fill-[#FE8B00]" />
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Case Study 1</span>
                    <Star className="w-3 h-3 text-[#FE8B00] fill-[#FE8B00]" />
                  </div>
                  
                  <div className="flex justify-between items-center px-2 mt-4">
                     <span className="bg-[#092813] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">Before Usage</span>
                     <span className="bg-[#FE8B00] text-[#061C0D] text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">After 4 Months</span>
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden flex shadow-sm border border-gray-150">
                    <img src="/assets/results/before1.jpeg" alt="Before" className="w-1/2 h-56 md:h-64 object-cover border-r-2 border-white/80 group-hover:scale-105 transition-transform duration-700" />
                    <img src="/assets/results/after1.jpeg" alt="After" className="w-1/2 h-56 md:h-64 object-cover border-l-2 border-white/80 group-hover:scale-105 transition-transform duration-700" />
                    {/* Center separator line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/50 -translate-x-1/2 z-10 backdrop-blur-sm"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-20 border border-gray-100">
                      <span className="text-[8px] font-black text-gray-400">VS</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-100 relative">
                    <div className="absolute -top-3 left-4 text-[#FE8B00] opacity-30 text-3xl font-serif">"</div>
                    <p className="text-[11px] font-bold text-gray-700 italic leading-relaxed relative z-10">
                      "Hair fall completely stopped and new baby hairs started appearing on the crown area."
                    </p>
                  </div>
                </div>

                {/* Result 2 */}
                <div className="group bg-[#F9FDF9] border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 rounded-full border border-gray-150 shadow-sm z-20 flex items-center gap-2">
                    <Star className="w-3 h-3 text-[#FE8B00] fill-[#FE8B00]" />
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Case Study 2</span>
                    <Star className="w-3 h-3 text-[#FE8B00] fill-[#FE8B00]" />
                  </div>
                  
                  <div className="flex justify-between items-center px-2 mt-4">
                     <span className="bg-[#092813] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">Before Usage</span>
                     <span className="bg-[#FE8B00] text-[#061C0D] text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">After 6 Months</span>
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden flex shadow-sm border border-gray-150">
                    <img src="/assets/results/before2.jpeg" alt="Before" className="w-1/2 h-56 md:h-64 object-cover border-r-2 border-white/80 group-hover:scale-105 transition-transform duration-700" />
                    <img src="/assets/results/after2.jpeg" alt="After" className="w-1/2 h-56 md:h-64 object-cover border-l-2 border-white/80 group-hover:scale-105 transition-transform duration-700" />
                    {/* Center separator line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/50 -translate-x-1/2 z-10 backdrop-blur-sm"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-20 border border-gray-100">
                      <span className="text-[8px] font-black text-gray-400">VS</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-100 relative">
                    <div className="absolute -top-3 left-4 text-[#FE8B00] opacity-30 text-3xl font-serif">"</div>
                    <p className="text-[11px] font-bold text-gray-700 italic leading-relaxed relative z-10">
                      "Severe dandruff cleared out entirely and hair thickness improved significantly across the scalp."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* REVIEWS & FAQS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 items-start">
              
              <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-6 shadow-sm text-left">
                <h3 className="font-serif text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">
                  Real People. Real Results.
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Rajesh Kadam', city: 'Pune, Maharashtra', text: 'Hair fall has reduced significantly. Scalp feels very healthy.' },
                    { name: 'Snehal Patil', city: 'Kolhapur, Maharashtra', text: 'Aamcha dandruff problem 2 weeks madhe solve jhala. Hair thickness is much better.' },
                    { name: 'Vivek Chavan', city: 'Mumbai, Maharashtra', text: 'My hair roots are stronger now. Bhringraj oil is very effective.' }
                  ].map((rev, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all font-sans">
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] text-gray-800 font-extrabold leading-snug">"{rev.text}"</p>
                        <div className="border-t border-gray-100 pt-2 flex flex-col gap-0.5">
                          <span className="text-[10px] font-black text-gray-900">{rev.name}</span>
                          <span className="text-[8px] text-gray-400 font-bold">{rev.city}</span>
                          <div className="flex text-[#FE8B00] gap-0.5 mt-1">
                            <Star className="fill-current w-2.5 h-2.5" />
                            <Star className="fill-current w-2.5 h-2.5" />
                            <Star className="fill-current w-2.5 h-2.5" />
                            <Star className="fill-current w-2.5 h-2.5" />
                            <Star className="fill-current w-2.5 h-2.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <span className="text-[10px] font-bold text-[#092813] border-b border-[#092813] cursor-pointer inline-block mt-4">
                  View More Reviews &rarr;
                </span>
              </div>

              <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl p-6 shadow-sm text-left font-sans">
                <h3 className="font-serif text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-2">
                  {[
                    { q: "How should I use Hair Vitalizer?", a: "Gently massage 5-10ml oil onto scalp. Leave it overnight or for at least 2 hours before washing with a mild shampoo." },
                    { q: "How long does it take to control hair fall?", a: "You will notice a visible reduction in hair fall within 3-4 weeks of regular usage thrice a week." },
                    { q: "Is it suitable for all hair types?", a: "Yes, it is formulated with premium herbs and cold-pressed oils, making it suitable for all hair types." },
                    { q: "Does it help with dandruff?", a: "Yes, active ingredients like Reetha and Shikakai cleanse the scalp, preventing dandruff and itchiness effectively." },
                    { q: "Are there any chemicals or parabens?", a: "No. Our Hair Vitalizer is premium, mineral-oil-free, and contains no artificial colorants or preservatives." }
                  ].map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="border-b border-gray-100 pb-2">
                        <button 
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full flex justify-between items-center py-2 text-left cursor-pointer text-xs font-bold text-gray-800 hover:text-[#092813] transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <p className="text-[10px] text-gray-550 leading-relaxed pb-2 animate-fade-in font-semibold">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 mt-6 pt-4 text-xs font-bold font-sans">
                  <span className="text-gray-500">Still have questions?</span>
                  <button 
                    onClick={() => window.open('https://wa.me/919373986362?text=I%20have%20questions%20about%20Hair%20Vitalizer', '_blank')}
                    className="bg-[#25D366] text-white border border-[#25D366] rounded-xl font-bold py-1.5 px-3 flex items-center gap-1 hover:bg-white hover:text-[#25D366] transition-all text-[10px]"
                  >
                    <MessageCircle size={12} className="fill-white" />
                    <span>Talk to our Expert</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* FAQ SECTION */}
            <section className="mt-10 pt-2">
              <div className="text-center mb-6 md:mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  FAQ
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  ❓ Frequently Asked Questions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 w-full">
                {SEA_BUCKTHORN_FAQS.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="border-b border-gray-200 pb-2">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center py-3 text-left cursor-pointer text-sm font-bold text-gray-800 hover:text-[#092813] transition-colors gap-2"
                      >
                        <span className="leading-snug">👉 {idx + 1}. {faq.q}</span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="text-xs text-gray-550 leading-relaxed pb-3 animate-fade-in font-medium whitespace-pre-line">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 1. WHY CHOOSE SEA BUCKTHORN JUICE */}
            <section className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  Key Benefits
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  Why Choose <span className="text-[#FE8B00]">Sea Buckthorn Juice?</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 font-semibold mt-2">
                  Nature's rare superfruit packed with essential nutrients for your daily wellness.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
                <div className="md:col-span-2 lg:col-span-4 space-y-5 lg:space-y-5 order-2 lg:order-none md:grid md:grid-cols-2 md:gap-5 lg:block lg:space-y-5">
                  {[
                    { ...WHY_CHOOSE_BENEFITS_LEFT[0], icon: ShieldCheck },
                    { ...WHY_CHOOSE_BENEFITS_LEFT[1], icon: Heart },
                    { ...WHY_CHOOSE_BENEFITS_LEFT[2], icon: Sparkles },
                    { ...WHY_CHOOSE_BENEFITS_LEFT[3], icon: Zap },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 text-left">
                        <div className="w-11 h-11 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] shrink-0 shadow-sm border border-[#092813]/10">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-extrabold text-gray-900 leading-tight">{item.title}</h4>
                          <p className="text-[11px] text-gray-550 font-medium leading-normal mt-1">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center relative py-2 order-1 lg:order-none">
                  <div className="relative max-w-[280px] w-full flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="h-56 sm:h-64 w-auto object-contain z-10 drop-shadow-xl mx-auto" />
                    <div className="absolute bottom-[-10px] left-[10%] right-[10%] h-6 bg-black/10 rounded-full blur-md z-0"></div>
                  </div>
                </div>

                <div className="md:col-span-2 lg:col-span-4 space-y-5 order-3 lg:order-none md:grid md:grid-cols-2 md:gap-5 lg:block">
                  {[
                    { ...WHY_CHOOSE_BENEFITS_RIGHT[0], icon: Scale },
                    { ...WHY_CHOOSE_BENEFITS_RIGHT[1], icon: Droplet },
                    { ...WHY_CHOOSE_BENEFITS_RIGHT[2], icon: Shield },
                    { ...WHY_CHOOSE_BENEFITS_RIGHT[3], icon: User },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 text-left">
                        <div className="w-11 h-11 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] shrink-0 shadow-sm border border-[#092813]/10">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-extrabold text-gray-900 leading-tight">{item.title}</h4>
                          <p className="text-[11px] text-gray-550 font-medium leading-normal mt-1">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-[9px] font-bold text-gray-550 uppercase tracking-widest font-sans px-4">
                <span className="flex items-center justify-center gap-1.5"><FlaskConical size={13} className="text-[#092813]" /> Lab Tested for Purity</span>
                <span className="flex items-center justify-center gap-1.5"><Sparkles size={13} className="text-[#092813]" /> No Side Effects</span>
                <span className="flex items-center justify-center gap-1.5"><Leaf size={13} className="text-[#092813]" /> 100% Natural Ingredients</span>
                <span className="flex items-center justify-center gap-1.5"><User size={13} className="text-[#092813]" /> Trusted by Thousands</span>
                <span className="flex items-center justify-center gap-1.5"><ShieldCheck size={13} className="text-[#092813]" /> GMP Certified Facility</span>
              </div>
            </section>

            {/* 2. INGREDIENTS STORY */}
            <section className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8 relative overflow-hidden">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  The Power of Nature
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  Our Sea Buckthorn Juice Ingredients Story
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-550 font-semibold mt-2">
                  Swavalambi's Sea Buckthorn Juice is crafted with nature's finest superfruit and packed with essential nutrients to support your overall wellness.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {INGREDIENTS_STORY.map((herb, idx) => (
                  <div key={idx} className="bg-[#F9FDF9] border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow text-left">
                    <div>
                      <div className="w-14 h-14 rounded-full border border-gray-150 p-1 bg-white shadow-sm flex items-center justify-center overflow-hidden mx-auto mb-3">
                        <img src={herb.img} alt={herb.name} className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="text-center mb-3">
                        <h4 className="text-xs font-black text-gray-900 leading-none">{herb.name}</h4>
                        <span className="text-[8px] text-gray-400 font-extrabold italic block mt-1">{herb.botanical}</span>
                      </div>
                      <p className="text-[9.5px] text-gray-500 leading-relaxed text-center font-medium border-b border-gray-100 pb-3 mb-3 min-h-[45px] flex items-center justify-center">
                        {herb.desc}
                      </p>
                      <ul className="space-y-1.5 text-[8.5px] font-bold text-gray-600">
                        {herb.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1">
                            <Check size={10} className="text-[#092813] shrink-0 mt-0.5" />
                            <span className="leading-tight">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[9px] font-bold text-gray-550 uppercase tracking-widest font-sans px-4">
                <span className="flex items-center justify-center gap-1.5"><Sprout size={13} className="text-[#092813]" /> 100% Natural</span>
                <span className="flex items-center justify-center gap-1.5"><Sparkles size={13} className="text-[#092813]" /> Synergistic Formula</span>
                <span className="flex items-center justify-center gap-1.5"><FlaskConical size={13} className="text-[#092813]" /> Ayurvedic Wisdom</span>
                <span className="flex items-center justify-center gap-1.5"><ShieldCheck size={13} className="text-[#092813]" /> Safe & Effective</span>
              </div>
            </section>

            {/* 3. HIMALAYAN STORY */}
            <section className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8 relative overflow-hidden">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  🌿 Swavalambi Sea Buckthorn Juice
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  Pure Leh-Ladakh Himalayan Berries
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-550 font-semibold mt-2">
                  🏔️ Harvested from the heights of Leh–Ladakh • 💛 100% Fresh • No Extracts • No Concentrates • No Artificial Additives
                </p>
              </div>

              <div className="space-y-8 w-full text-left">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#092813] mb-2">🌿 Nature's Pure Himalayan Superfruit</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    From the untouched, icy mountains of Leh–Ladakh, comes one of nature's most powerful superfruits — the golden Sea Buckthorn Berry (Himalayan Berry). At Swavalambi India, we carefully source these berries directly from Himalayan regions, hand-picked at peak ripeness to preserve their natural nutrition, freshness, and bio-active power.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    👉 Unlike regular juices made from extracts, powders, or concentrates, our juice is made from fresh whole berries, ensuring true natural potency.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#092813] mb-2">🏔️ From Himalayan Farms to Your Bottle</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Sea Buckthorn grows in extreme Himalayan conditions at 10,000+ feet altitude, where survival itself is difficult. Every berry is:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-3">
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Carefully hand-harvested</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Collected by local Himalayan farmers</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Processed with utmost care to preserve nutrients</li>
                  </ul>
                  <p className="text-sm text-gray-600 leading-relaxed">👉 This makes every bottle a symbol of purity, effort, and Himalayan authenticity.</p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#092813] mb-2">💛 Why Swavalambi Sea Buckthorn Juice Is Special</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Made from Fresh Whole Himalayan Berries</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Cold-Processed to Preserve Nutrition</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Rich source of Vitamin C, Omega 3, 6, 7 & 9</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Sourced ethically from Leh–Ladakh regions</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> No added sugar, no colour, no artificial flavour</li>
                  </ul>
                  <p className="text-sm font-semibold text-[#092813] mt-3">👉 Pure nature. Pure wellness. Nothing else.</p>
                </div>
                <div className="bg-[#F9FDF9] border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-serif text-lg font-bold text-[#092813] mb-3">🌞 Key Wellness Benefits</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {KEY_WELLNESS_BENEFITS.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#092813] shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#F9FDF9] border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-serif text-lg font-bold text-[#092813] mb-2">🧡 How to Use</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Shake well before use</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Take 5 ml twice daily</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Best taken on empty stomach</li>
                    <li className="flex items-start gap-2"><Check size={14} className="text-[#092813] shrink-0 mt-0.5" /> Can be diluted with lukewarm water</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">👉 For best results, use regularly for at least 3 months.</p>
                </div>
                <div className="bg-[#EBF1E6]/40 border border-[#092813]/10 rounded-2xl p-5">
                  <h3 className="font-serif text-lg font-bold text-[#092813] mb-3">✨ Purity Promise of Swavalambi</h3>
                  <p className="text-sm text-gray-600 mb-3">Every bottle of Swavalambi Sea Buckthorn Juice stands for:</p>
                  <ul className="space-y-2 text-sm text-gray-700 font-medium">
                    <li>🌿 Authentic Ayurvedic wellness</li>
                    <li>🏔️ Himalayan purity & freshness</li>
                    <li>🤝 Ethical sourcing from farmers</li>
                    <li>💛 No chemicals, no compromise</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. HOW IT WORKS */}
            <section className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  How It Works
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  The Natural Way to <span className="text-[#FE8B00]">Nourish, Balance & Heal</span> with Sea Buckthorn
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-550 font-semibold mt-2">
                  Swavalambi's Sea Buckthorn Juice works naturally with your body to support immunity, energy, skin health and overall wellness.
                </p>
              </div>

              <div className="relative flex flex-col md:flex-row justify-between items-stretch gap-6 py-6 px-4">
                <div className="absolute top-[48px] left-[10%] right-[10%] h-[1.5px] border-t border-dashed border-[#FE8B00]/50 hidden md:block -z-0"></div>

                {[
                  { ...HOW_IT_WORKS_STEPS[0], icon: Droplet },
                  { ...HOW_IT_WORKS_STEPS[1], icon: Scale },
                  { ...HOW_IT_WORKS_STEPS[2], icon: Zap },
                  { ...HOW_IT_WORKS_STEPS[3], icon: Shield },
                  { ...HOW_IT_WORKS_STEPS[4], icon: Sparkles },
                ].map((item, idx) => {
                  const StepIcon = item.icon;
                  return (
                    <div key={idx} className="flex-1 bg-[#F9FDF9] border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center relative z-10 shadow-sm">
                      <div className="absolute top-[-12px] bg-[#092813] border border-[#FE8B00] text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                        {item.step}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3 mt-1 shadow-inner">
                        <StepIcon size={16} />
                      </div>
                      <h4 className="text-[11px] font-black text-gray-900 leading-tight">{item.title}</h4>
                      <p className="text-[9.5px] text-gray-500 font-medium leading-relaxed mt-2">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-6 mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-[9px] font-bold text-gray-550 uppercase tracking-widest font-sans px-4">
                <span className="flex items-center justify-center gap-1.5"><Leaf size={13} className="text-[#092813]" /> 100% Natural</span>
                <span className="flex items-center justify-center gap-1.5"><FlaskConical size={13} className="text-[#092813]" /> No Harmful Chemicals</span>
                <span className="flex items-center justify-center gap-1.5"><ShieldCheck size={13} className="text-[#092813]" /> Natural & Safe</span>
                <span className="flex items-center justify-center gap-1.5"><Sprout size={13} className="text-[#092813]" /> Visible Results</span>
                <span className="flex items-center justify-center gap-1.5"><User size={13} className="text-[#092813]" /> Trusted by Thousands</span>
              </div>
            </section>

            {/* 5. TRUST THAT MATTERS */}
            <section className="bg-[#F9FDF9] border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  Trust That Matters
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  Pure. Safe. <span className="text-[#FE8B00]">Trusted by Thousands.</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-550 font-semibold mt-2">
                  At Swavalambi India, every bottle of Sea Buckthorn Juice is crafted with honesty, backed by science and rooted in nature.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {TRUST_PILLARS.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between text-center hover:shadow-md transition-shadow">
                    <div>
                      <h4 className="text-[11px] font-black text-gray-900 leading-tight mb-2">{item.title}</h4>
                      <p className="text-[9.5px] text-gray-400 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-gray-550 uppercase tracking-widest font-sans px-4">
                <span className="flex items-center gap-2"><Leaf size={14} className="text-[#092813]" /> Ayurvedic Wisdom</span>
                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#092813]" /> Quality Promise</span>
                <span className="text-center font-extrabold text-[#FE8B00] text-xs">PURE AYURVEDA. HONEST CARE. REAL RESULTS.</span>
                <span className="flex items-center gap-2"><Sprout size={14} className="text-[#092813]" /> Honest & Transparent</span>
                <span className="flex items-center gap-2"><User size={14} className="text-[#092813]" /> Here to Support</span>
              </div>
            </section>

            {/* 6. LOVED BY CUSTOMERS */}
            <section className="bg-[#F7F9F2] border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm mt-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="bg-[#EBF1E6] border border-[#092813]/15 text-[#092813] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                  Our Happy Customers
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-[#092813] mt-3 tracking-tight">
                  Loved by <span className="text-[#092813]">Thousands.</span> <span className="text-[#FE8B00]">Trusted Every Day.</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 font-semibold mt-2">
                  Real people. Real results. See how Swavalambi's Sea Buckthorn Juice is helping customers lead healthier, happier lives.
                </p>
              </div>

              {/* Review summary bar — soft green theme */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const fill = Math.min(1, Math.max(0, REVIEW_SUMMARY.rating - (s - 1)));
                      return (
                        <span key={s} className="relative inline-block w-4 h-4">
                          <Star size={16} className="absolute inset-0 text-gray-200 fill-gray-200" />
                          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                            <Star size={16} className="text-[#96C77E] fill-[#96C77E]" />
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {REVIEW_SUMMARY.total.toLocaleString()} Reviews
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.open('https://wa.me/919373986362?text=Hi%2C%20I%20want%20to%20share%20a%20review%20for%20Sea%20Buckthorn%20Juice.', '_blank')}
                  className="bg-[#96C77E] hover:bg-[#86b56e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Write A Review
                </button>
              </div>

              {/* Rating breakdown bars */}
              <div className="space-y-2 mb-8 max-w-xl">
                {REVIEW_SUMMARY.breakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                    <span className="w-3 text-gray-700 font-bold tabular-nums">{row.stars}</span>
                    <Star size={12} className="text-[#96C77E] fill-[#96C77E] shrink-0" />
                    <div className="flex-1 h-2.5 rounded-full bg-gray-200/70 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#96C77E] transition-all"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-gray-700 font-semibold tabular-nums">{row.count}</span>
                    <span className="w-10 text-right text-[#96C77E] font-semibold tabular-nums">({row.percent}%)</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {CUSTOMER_REVIEWS.map((rev, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between text-left hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex text-[#96C77E] gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={i < (rev.rating ?? 5) ? 'fill-current' : 'text-gray-200 fill-gray-200'} />
                        ))}
                      </div>
                      <h4 className="text-xs font-black text-gray-900 leading-snug mb-1">{rev.title}</h4>
                      <p className="text-[10px] text-gray-550 leading-relaxed font-medium">"{rev.text}"</p>
                    </div>
                    <div className="border-t border-gray-150 pt-3 mt-4 flex flex-col">
                      <span className="text-[10px] font-black text-gray-900">{rev.name}</span>
                      <span className="text-[8px] text-gray-400 font-bold">{rev.city}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#FAF4EB] border border-[#FE8B00]/25 rounded-2xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div>
                  <h4 className="text-xs font-black text-[#0D382B]">Your Health. Our Promise.</h4>
                  <p className="text-[10px] text-gray-500 font-semibold mt-1">Thank you for trusting Swavalambi India remedies.</p>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="bg-[#092813] hover:bg-[#06281C] text-white py-2.5 px-6 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Shop Sea Buckthorn Juice range &rarr;
                </button>
              </div>
            </section>
          </>
        )}

        {/* ========================================================================= */}
        {/* CROSS-SELL COMBO PROFILES */}
        {/* ========================================================================= */}
        <div className="mt-12 text-left font-sans pb-10 border-b border-gray-150">
          <h3 className="font-serif text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">
            Complete Your Wellness Journey
          </h3>

          <div className="relative px-6">
            {/* Left Chevron */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#092813] transition-colors cursor-pointer" aria-label="Previous combo">
              <ChevronLeft size={22} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS.filter(p => p.id !== product.id).map((item, idx) => {
                const offPercent = item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 0;

                return (
                  <div key={idx} className="bg-white border border-gray-150 rounded-3xl p-4 flex flex-col justify-between shadow-sm relative text-left hover:shadow-md transition-shadow">
                    {offPercent > 0 && (
                      <span className="absolute top-3 left-3 bg-[#FAF4EB] border border-[#FE8B00]/35 text-[#061C0D] text-[6.5px] font-extrabold px-2 py-0.5 rounded uppercase z-10">
                        {offPercent}% OFF
                      </span>
                    )}
                    
                    {/* 1:1 image container */}
                    <div 
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="w-full aspect-square bg-[#F9FDF9] rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-3 relative cursor-pointer mb-3 overflow-hidden"
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain max-h-[220px]" />
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-0.5 leading-tight cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                        <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                        <span className="text-[9.5px] text-gray-400 font-semibold">{item.tagline}</span>
                        <p className="text-[8.5px] text-gray-500 leading-normal line-clamp-2">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-black text-gray-950">₹{item.price}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <>
                              <span className="text-[9px] text-gray-400 line-through">₹{item.originalPrice}</span>
                              <span className="bg-red-50 text-red-650 border border-red-150 text-[6.5px] font-bold px-1 py-0.5 rounded ml-0.5 shrink-0">
                                Save ₹{item.originalPrice - item.price}
                              </span>
                            </>
                          )}
                        </div>

                        <button 
                          onClick={() => {
                            onAddToCart(item, 1);
                            alert(`${item.name} added to cart!`);
                          }}
                          className="bg-[#092813] border border-[#FE8B00]/50 hover:bg-[#FE8B00] hover:text-[#061C0D] text-white py-1.5 px-3 rounded-full text-[8.5px] font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Chevron */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#092813] transition-colors cursor-pointer" aria-label="Next combo">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        </div>{/* end mobile padding wrapper */}

      </div>

      {/* ========================================================================= */}
      {/* STICKY BOTTOM BAR (Desktop Only) */}
      {/* ========================================================================= */}
      {showStickyBar && !product.isUpcoming && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#061C0D] text-white py-3.5 px-8 hidden lg:block border-t border-[#FE8B00]/25 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] animate-fade-in text-left">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#FE8B00]/20 flex items-center justify-center overflow-hidden shrink-0">
                <img src={product.image} alt={product.name} className="w-7 h-7 object-contain" />
              </div>
              <div className="leading-tight font-sans">
                <h4 className="text-xs font-bold text-white leading-none">{product.name}</h4>
                <span className="text-[9.5px] text-white/70 block mt-1">({selectedSize})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="font-sans text-lg font-black text-[#FE8B00]">
                ₹{currentPrice.toFixed(2)}
              </span>
              
              {/* Quantity */}
              <div className="flex items-center border border-white/20 rounded-xl bg-white/5 shrink-0 h-9">
                <button onClick={decrement} className="px-2.5 text-white/70 hover:text-white"><Minus size={12} /></button>
                <span className="w-6 text-center text-xs font-bold text-white">{quantity}</span>
                <button onClick={increment} className="px-2.5 text-white/70 hover:text-white"><Plus size={12} /></button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="bg-[#092813] border border-[#FE8B00]/50 text-white hover:bg-white hover:text-black font-extrabold text-[10px] uppercase py-2 px-5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <ShoppingBag size={12} className="text-[#FE8B00] fill-[#FE8B00]" />
                <span>Add to Cart</span>
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="bg-[#FE8B00] text-[#061C0D] hover:bg-[#c29f2e] font-extrabold text-[10px] uppercase py-2.5 px-6 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prebooking Modal Overlay */}
      {showPrebookModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#F9FDF9] rounded-3xl p-6 max-w-md w-full border border-gray-150 shadow-xl relative text-left">
            <h3 className="font-serif text-lg font-bold text-[#092813] mb-1">Prebook Upcoming Product</h3>
            <p className="text-[10px] text-gray-550 font-semibold mb-4">Be the first to receive updates and exclusive offers when this product launches.</p>
            
            <form onSubmit={handlePrebookSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[8px] font-bold uppercase text-gray-500 tracking-wider mb-1 font-sans">Product Name</label>
                <input 
                  type="text" 
                  value={product.name} 
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
                  onClick={() => { setShowPrebookModal(false); setPrebookStatus(null); }}
                  className="flex-1 border border-gray-250 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors font-sans cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={prebookLoading}
                  className="flex-1 bg-[#092813] hover:bg-[#06281C] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 font-sans cursor-pointer"
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

// Helper component for Star Fill inside bestseller seal badge
const StarFill: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" className="fill-current text-[#FE8B00] shrink-0" style={{ width: size, height: size }}>
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
  </svg>
);

export default ProductDetail;
