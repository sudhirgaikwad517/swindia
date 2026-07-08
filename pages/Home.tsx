import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { 
  Star, Leaf, ShieldCheck, Heart, Award, ArrowRight, MessageCircle, Truck, 
  Play, ChevronLeft, ChevronRight, ShoppingCart, Lock, Undo, Headset, 
  Check, Sprout, Shield, Zap, Package, Users
} from 'lucide-react';
import HomePremiumSections from '../components/HomePremiumSections';

interface HomeProps {
  onAddToCart: (product: any, quantity: number) => void;
  wishlistItems?: any[];
  onToggleWishlist?: (product: any) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart, wishlistItems = [], onToggleWishlist }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const productScrollRef = useRef<HTMLDivElement>(null);

  // Active review carousel state
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Scroll to section based on query param
  useEffect(() => {
    const params = new URLSearchParams(search);
    const scrollId = params.get('scroll');
    if (scrollId) {
      const el = document.getElementById(scrollId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [search]);

  const getProductImageDetails = (id: string) => {
    return {
      id: 'product_image_sea_buckthorn_juice',
      desc: 'Sea Buckthorn Juice 100ml bottle.'
    };
  };

  // Featured products
  const featuredProducts = PRODUCTS;

  // Testimonials matching PC screenshot
  const testimonials = [
    {
      stars: 5,
      text: "Swavalambi Sea Buckthorn Juice has really helped me. I feel more energetic and active now.",
      name: "Rajesh Patil",
      location: "Pune, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      stars: 5,
      text: "Premium, effective and Authentic. This juice has become a part of our daily routine.",
      name: "Sneha Kulkarni",
      location: "Mumbai, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      stars: 5,
      text: "Best Authentic product for immunity and wellness. Great results with regular use.",
      name: "Amol Deshmukh",
      location: "Nashik, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  const handlePrevReview = () => {
    setActiveReviewIdx(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setActiveReviewIdx(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#F9FDF9] text-gray-800 antialiased min-h-screen pt-0 lg:pt-16 pb-12 lg:pb-0">
      
      {/* 1. HERO SECTION - MOBILE VIEW */}
      <section className="block lg:hidden relative bg-gradient-to-br from-[#061C0D] to-[#092813] hero-bg-animated text-white pt-32 pb-14 overflow-hidden min-h-0 flex items-center">
        {/* Floating Leaves */}
        <div className="absolute top-[15%] left-[5%] opacity-15 pointer-events-none z-10 animate-leaf-1">
          <Leaf size={24} className="text-green-300 fill-green-300/10" />
        </div>
        <div className="absolute bottom-[25%] left-[12%] opacity-10 pointer-events-none z-10 animate-leaf-2">
          <Leaf size={16} className="text-green-400 fill-green-400/10" />
        </div>
        <div className="absolute top-[20%] right-[32%] opacity-20 pointer-events-none z-10 animate-leaf-3">
          <Leaf size={28} className="text-green-200 fill-green-200/10" />
        </div>
        <div className="absolute bottom-[15%] right-[8%] opacity-15 pointer-events-none z-10 animate-leaf-4">
          <Leaf size={20} className="text-green-300 fill-green-300/10" />
        </div>
        <div className="w-full mx-auto px-6 relative z-10 py-2">
          <div className="grid grid-cols-12 gap-0 items-center relative">
            
            {/* Left Content Column */}
            <div className="col-span-7 space-y-3 text-left relative z-20 pr-4">
              <div className="inline-block border border-[#FE8B00] text-[#FE8B00] text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full font-sans mb-0.5">
                Rooted in Tradition
              </div>
              <h1 className="font-serif text-lg font-bold leading-tight">
                Designed For <br />
                <span className="text-[#FE8B00]">Modern Wellness.</span>
              </h1>
              <p className="text-white/80 text-[9px] leading-relaxed max-w-lg font-sans">
                Swavalambi Sea Buckthorn Juice is a powerful blend of premium ingredients that help support immunity, skin health, and overall wellness effectively.
              </p>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-white/90">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[10px] font-bold text-white">Authentic</div>
                    <div className="font-sans text-[7px] text-white/80 font-normal mt-0.5">Ingredients</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[10px] font-bold text-white">Supports</div>
                    <div className="font-sans text-[7px] text-white/80 font-normal mt-0.5">Immunity</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[10px] font-bold text-white">Boosts</div>
                    <div className="font-sans text-[7px] text-white/80 font-normal mt-0.5">Metabolism</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[10px] font-bold text-white">Improves</div>
                    <div className="font-sans text-[7px] text-white/80 font-normal mt-0.5">Overall Health</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-3 font-sans w-full">
                <button 
                  onClick={() => navigate('/shop')}
                  className="bg-[#FE8B00] hover:bg-white text-[#061C0D] hover:text-[#092813] px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border border-[#FE8B00] shadow-md relative z-30"
                >
                  Shop Now →
                </button>
              </div>
            </div>

            {/* Right Column: Sharp Product Image */}
            <div className="col-span-5 flex justify-end items-center relative min-h-[160px] overflow-visible z-10">
              <img 
                src="/assets/content/image-Photoroom%20(21).png" 
                alt="Swavalambi Wellness Products" 
                className="absolute right-[-45px] top-1/2 -translate-y-1/2 w-[210px] max-w-none h-auto object-contain select-none pointer-events-none filter drop-shadow-2xl z-10"
                style={{ imageRendering: 'auto' }}
                loading="eager"
                decoding="async"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 1. HERO SECTION - DESKTOP VIEW */}
      <section className="hidden lg:flex relative bg-gradient-to-br from-[#061C0D] to-[#092813] hero-bg-animated text-white pt-14 pb-4 overflow-hidden min-h-[420px] items-center">
        {/* Floating Leaves */}
        <div className="absolute top-[15%] left-[5%] opacity-15 pointer-events-none z-10 animate-leaf-1">
          <Leaf size={32} className="text-green-300 fill-green-300/10" />
        </div>
        <div className="absolute bottom-[25%] left-[15%] opacity-10 pointer-events-none z-10 animate-leaf-2">
          <Leaf size={24} className="text-green-400 fill-green-400/10" />
        </div>
        <div className="absolute top-[20%] right-[35%] opacity-20 pointer-events-none z-10 animate-leaf-3">
          <Leaf size={40} className="text-green-200 fill-green-200/10" />
        </div>
        <div className="absolute bottom-[15%] right-[10%] opacity-15 pointer-events-none z-10 animate-leaf-4">
          <Leaf size={28} className="text-green-300 fill-green-300/10" />
        </div>
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl xl:max-w-[1400px] relative z-10 py-2">
          <div className="grid grid-cols-12 gap-8 lg:gap-6 items-center relative">
            
            {/* Left Content Column */}
            <div className="col-span-7 space-y-4 lg:space-y-6 text-left">
              <div className="inline-block border border-[#FE8B00] text-[#FE8B00] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-sans mb-2">
                Rooted in Tradition
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[66px] font-bold leading-tight">
                Designed For <br />
                <span className="text-[#FE8B00]">Modern Wellness.</span>
              </h1>
              <p className="text-white/80 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed max-w-xl font-sans">
                Swavalambi Sea Buckthorn Juice is a powerful blend of premium ingredients that help support immunity, skin health, and overall wellness effectively.
              </p>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-4 gap-3 pt-4 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Leaf size={20} />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[13px] sm:text-[14px] font-bold text-white">Authentic</div>
                    <div className="font-sans text-[10px] sm:text-[11px] text-white/80 font-normal mt-0.5">Ingredients</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Sprout size={20} />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[13px] sm:text-[14px] font-bold text-white">Supports</div>
                    <div className="font-sans text-[10px] sm:text-[11px] text-white/80 font-normal mt-0.5">Immunity</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Zap size={20} />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[13px] sm:text-[14px] font-bold text-white">Boosts</div>
                    <div className="font-sans text-[10px] sm:text-[11px] text-white/80 font-normal mt-0.5">Metabolism</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#FE8B00]/30 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Heart size={20} />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-serif text-[13px] sm:text-[14px] font-bold text-white">Improves</div>
                    <div className="font-sans text-[10px] sm:text-[11px] text-white/80 font-normal mt-0.5">Overall Health</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 font-sans">
                <button 
                  onClick={() => navigate('/shop')}
                  className="bg-[#FE8B00] hover:bg-white text-[#061C0D] hover:text-[#092813] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-[#FE8B00]"
                >
                  Shop Now →
                </button>
              </div>
            </div>

            {/* Right Column: Sharp Product Image */}
            <div className="col-span-5 flex justify-center items-center w-full relative min-h-[300px] lg:min-h-[420px] xl:min-h-[500px] overflow-visible z-10">
              <img 
                src="/assets/content/image-Photoroom%20(21).png" 
                alt="Swavalambi Wellness Products" 
                className="w-full max-w-[420px] lg:max-w-[620px] xl:max-w-[720px] max-h-[380px] lg:max-h-[420px] xl:max-h-[500px] h-auto object-contain select-none pointer-events-none filter drop-shadow-2xl lg:absolute lg:right-[-10px] xl:right-[-30px] lg:top-1/2 lg:-translate-y-1/2 z-10"
                style={{ imageRendering: 'auto' }}
                loading="eager"
                decoding="async"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST RIBBON */}
      {/* Desktop Ribbon */}
      <div className="hidden lg:block relative z-20">
        <div className="container mx-auto px-6 max-w-5xl -mt-12">
          <div className="bg-[#061C0D]/80 backdrop-blur-xl border border-white/10 rounded-[20px] py-6 px-10 shadow-2xl flex justify-between items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FE8B00]/10 via-transparent to-[#FE8B00]/10 pointer-events-none"></div>
            <div className="flex items-center gap-4 flex-1 justify-center">
              <Leaf size={26} className="text-[#FE8B00] shrink-0" />
              <div className="text-left leading-tight">
                <div className="font-serif text-sm font-bold text-white">Pure</div>
                <div className="font-sans text-[10px] text-white/80 font-normal tracking-wide mt-0.5">Modern Formula</div>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-4 flex-1 justify-center">
              <Award size={26} className="text-[#FE8B00] shrink-0" />
              <div className="text-left leading-tight">
                <div className="font-serif text-sm font-bold text-white">Quality</div>
                <div className="font-sans text-[10px] text-white/80 font-normal tracking-wide mt-0.5">Assured</div>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-4 flex-1 justify-center">
              <ShieldCheck size={26} className="text-[#FE8B00] shrink-0" />
              <div className="text-left leading-tight">
                <div className="font-serif text-sm font-bold text-white">Quality Checked</div>
                <div className="font-sans text-[10px] text-white/80 font-normal tracking-wide mt-0.5">Formulation</div>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-4 flex-1 justify-center">
              <Shield size={26} className="text-[#FE8B00] shrink-0" />
              <div className="text-left leading-tight">
                <div className="font-serif text-sm font-bold text-white">Safe For</div>
                <div className="font-sans text-[10px] text-white/80 font-normal tracking-wide mt-0.5">Long Term Use</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Ribbon Card */}
      <div className="block lg:hidden px-4 -mt-8 relative z-25">
        <div className="bg-white border border-gray-150 rounded-2xl py-5 px-3 shadow-md flex justify-between items-center text-center">
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] mb-1.5">
              <Leaf size={16} />
            </div>
            <span className="font-serif text-[11px] font-bold text-gray-800 leading-tight">Pure</span>
            <span className="font-sans text-[8px] text-gray-500 font-semibold mt-0.5">Modern Formula</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] mb-1.5">
              <Award size={16} />
            </div>
            <span className="font-serif text-[11px] font-bold text-gray-800 leading-tight">Quality</span>
            <span className="font-sans text-[8px] text-gray-500 font-semibold mt-0.5">Assured</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] mb-1.5">
              <ShieldCheck size={16} />
            </div>
            <span className="font-serif text-[11px] font-bold text-gray-800 leading-tight">Quality Checked</span>
            <span className="font-sans text-[8px] text-gray-500 font-semibold mt-0.5">Formulation</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 rounded-full bg-[#092813] flex items-center justify-center text-[#FE8B00] mb-1.5">
              <Shield size={16} />
            </div>
            <span className="font-serif text-[11px] font-bold text-gray-800 leading-tight">Safe For</span>
            <span className="font-sans text-[8px] text-gray-500 font-semibold mt-0.5">Long Term Use</span>
          </div>
        </div>
      </div>

      {/* 3. PREMIUM UI EXPANSION SECTIONS */}
      <HomePremiumSections />

      {/* 4. COUNTER BAR */}
      <section className="pt-2 pb-2 lg:pt-4 lg:pb-4 bg-[#F9FDF9]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#092813] rounded-[24px] py-5 sm:py-8 px-2 sm:px-6 shadow-xl flex justify-between items-center text-center text-white">
            
            {/* Item 1 */}
            <div className="flex flex-col items-center justify-center space-y-1.5 flex-1 px-1">
              <div className="text-[#FE8B00] mb-1">
                <Users className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <span className="font-serif text-sm sm:text-3xl font-bold text-white">10,000+</span>
              <div className="font-sans text-[8px] sm:text-xs text-white/80 leading-tight">
                <div>Happy</div>
                <div>Customers</div>
              </div>
            </div>

            <div className="h-10 sm:h-16 w-[1px] bg-white/15 self-center shrink-0"></div>

            {/* Item 2 */}
            <div className="flex flex-col items-center justify-center space-y-1.5 flex-1 px-1">
              <div className="text-[#FE8B00] mb-1">
                <Star className="fill-current w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <span className="font-serif text-sm sm:text-3xl font-bold text-white">4.8/5</span>
              <div className="font-sans text-[8px] sm:text-xs text-white/80 leading-tight">
                <div>Customer</div>
                <div>Rating</div>
              </div>
            </div>

            <div className="h-10 sm:h-16 w-[1px] bg-white/15 self-center shrink-0"></div>

            {/* Item 3 */}
            <div className="flex flex-col items-center justify-center space-y-1.5 flex-1 px-1">
              <div className="text-[#FE8B00] mb-1">
                <Package className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <span className="font-serif text-sm sm:text-3xl font-bold text-white">50,000+</span>
              <div className="font-sans text-[8px] sm:text-xs text-white/80 leading-tight">
                <div>Orders</div>
                <div>Delivered</div>
              </div>
            </div>

            <div className="h-10 sm:h-16 w-[1px] bg-white/15 self-center shrink-0"></div>

            {/* Item 4 */}
            <div className="flex flex-col items-center justify-center space-y-1.5 flex-1 px-1">
              <div className="text-[#FE8B00] mb-1">
                <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <span className="font-serif text-sm sm:text-3xl font-bold text-white">Pure</span>
              <div className="font-sans text-[8px] sm:text-xs text-white/80 leading-tight">
                <div>Modern Formula</div>
                <div>& Safe</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (Desktop only as shown in screenshot) */}
      <section id="reviews" className="hidden lg:block py-8 bg-[#F9FDF9] border-b border-gray-150">
        <div className="container mx-auto px-6 max-w-6xl text-center relative">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#FE8B00] block font-sans mb-1.5">
            Our Happy Customers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#092813] mb-12">
            Real People, Real Stories
          </h2>

          {/* Testimonial slider navigation buttons */}
          <button 
            onClick={handlePrevReview}
            className="absolute left-2 top-[58%] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#092813] hover:bg-[#EBF1E6] hover:border-[#092813] transition-all shadow-sm z-10"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNextReview}
            className="absolute right-2 top-[58%] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#092813] hover:bg-[#EBF1E6] hover:border-[#092813] transition-all shadow-sm z-10"
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((review, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl p-6 border border-gray-150 transition-all duration-300 text-left flex flex-col justify-between h-[250px] shadow-sm hover:shadow-md ${
                  activeReviewIdx === idx ? 'ring-2 ring-[#FE8B00]/50 scale-[1.02]' : 'opacity-90'
                }`}
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-[#FE8B00] mb-4">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="font-serif italic text-gray-700 text-xs sm:text-[13px] leading-relaxed line-clamp-4">
                    "{review.text}"
                  </p>
                </div>
                {/* Reviewer Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50 mt-4 relative">
                  <div className="leading-tight">
                    <h4 className="text-xs font-bold text-gray-800 font-sans">{review.name}</h4>
                    <span className="text-[10px] text-gray-550 font-medium">{review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCTS SECTION */}
      <section id="benefits" className="py-8 lg:py-10 bg-[#F9FDF9]">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Header Row */}
          <div className="flex justify-between items-end mb-10">
            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FE8B00] block font-sans mb-1">
                <span className="hidden lg:inline">Our Wellness Range</span>
                <span className="inline lg:hidden">Our Best Sellers</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#092813]">
                <span className="hidden lg:inline">Explore Our Authentic Products</span>
                <span className="inline lg:hidden">Explore Our Products</span>
              </h2>
            </div>
            
            {/* View All Button */}
            <div>
              <button 
                onClick={() => navigate('/shop')}
                className="hidden lg:flex items-center gap-1.5 bg-[#092813] hover:bg-[#06281C] text-white text-[11px] font-bold uppercase tracking-widest py-3 px-6 rounded-full transition-all duration-300 border border-[#FE8B00]/35"
              >
                View All Products <ArrowRight size={14} />
              </button>
              <button 
                onClick={() => navigate('/shop')}
                className="flex lg:hidden items-center gap-1.5 border border-[#092813] bg-transparent text-[#092813] text-[10px] font-bold tracking-wider py-1.5 px-4 rounded-full transition-all"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Desktop Grid Layout (4 columns in one row) */}
          <div className="hidden lg:grid grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 group/card relative overflow-hidden flex flex-col justify-between h-[390px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE8B00]/0 to-[#FE8B00]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  {/* Product Card Image Container */}
                  <div 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex items-center justify-center h-48 cursor-pointer overflow-hidden transition-all duration-500 group/image relative p-2"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-500 group-hover/card:scale-110"
                    />
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/image:block bg-gray-900 text-white text-[9px] font-sans rounded-lg p-2.5 w-48 shadow-lg border border-white/10 z-30 pointer-events-none text-left leading-normal">
                      <span className="text-[#FE8B00] font-bold block">ID: {getProductImageDetails(product.id).id}</span>
                      <span className="text-[#FE8B00] font-bold block mt-0.5">SIZE: 400 x 400 px</span>
                      <span className="text-[#FE8B00] font-bold block mt-1">DESCRIPTION:</span>
                      {getProductImageDetails(product.id).desc}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="text-left mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-serif text-sm font-bold text-[#092813] group-hover/card:text-[#FE8B00] cursor-pointer line-clamp-1 transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium font-sans mt-0.5">
                        {product.id === 'p1' ? '900 ml' : product.id === 'p2' ? '60 Capsules' : product.id === 'p3' ? '100 ml' : 'Combo Pack'}
                      </p>
                    </div>
                    
                    {/* Shop Now Action Link */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button 
                        onClick={() => onAddToCart(product, 1)}
                        className="text-xs font-bold text-[#092813] group-hover/card:text-[#FE8B00] flex items-center gap-1 uppercase tracking-widest transition-all"
                      >
                        Shop Now <ArrowRight size={13} className="group-hover/card:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scrolling Layout */}
          <div className="block lg:hidden relative">
            <div 
              ref={productScrollRef}
              className="flex gap-4 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
            >
              {featuredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white border border-gray-155 rounded-2xl p-3 shadow-sm min-w-[250px] max-w-[250px] snap-start flex gap-3 h-[140px] relative items-center"
                >
                  {/* Product Card Image Container (Left side) */}
                  <div 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex items-center justify-center w-[115px] h-[116px] overflow-hidden shrink-0 relative p-0"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                  </div>

                  {/* Product Info (Right side) */}
                  <div className="flex-1 flex flex-col justify-between h-[110px] text-left font-sans">
                    <div className="space-y-0.5">
                      <h3 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-sans text-[12px] font-bold text-gray-800 leading-snug line-clamp-2 cursor-pointer hover:text-[#FE8B00]"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[9px] text-gray-400 font-medium leading-none">
                        {product.id === 'p1' ? '900 ml' : product.id === 'p2' ? '60 Capsules' : product.id === 'p3' ? '100 ml' : 'Combo Pack'}
                      </p>
                    </div>

                    {/* Price and Cart Button row */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black text-gray-800">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[9px] text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => onAddToCart(product, 1)}
                        className="w-7 h-7 rounded-full bg-[#061C0D] text-white flex items-center justify-center shadow-sm active:scale-90 transition-all absolute bottom-3 right-3"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart size={12} className="fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Dot Indicators */}
            <div className="flex justify-center items-center gap-1.5 mt-3">
              <span className="w-4 h-1.5 rounded-full bg-[#092813]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FOOTER TRUST INDICATORS RIBBON */}
      <div className="bg-[#F9FDF9] lg:bg-[#092813] border-t border-gray-200 lg:border-t-0 py-4 lg:py-4 z-10 relative">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl grid grid-cols-3 gap-3 lg:gap-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-1 font-sans">
            <Truck size={20} className="text-[#FE8B00] mb-1" />
            <span className="text-[#092813] lg:text-white text-[10px] lg:text-xs leading-none font-bold tracking-wide">Free Shipping</span>
            <span className="text-[8px] font-normal tracking-normal text-gray-500 lg:text-white/60 font-sans mt-0.5">On Prepaid Orders</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 font-sans border-l border-gray-200 lg:border-white/10">
            <Package size={20} className="text-[#FE8B00] mb-1" />
            <span className="text-[#092813] lg:text-white text-[10px] lg:text-xs leading-none font-bold tracking-wide">Cash on Delivery</span>
            <span className="text-[8px] font-normal tracking-normal text-gray-500 lg:text-white/60 font-sans mt-0.5">Available</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 font-sans border-l border-gray-200 lg:border-white/10">
            <Lock size={20} className="text-[#FE8B00] mb-1" />
            <span className="text-[#092813] lg:text-white text-[10px] lg:text-xs leading-none font-bold tracking-wide">Secure Payment</span>
            <span className="text-[8px] font-normal tracking-normal text-gray-500 lg:text-white/60 font-sans mt-0.5">Safe</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
