
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Leaf, Eye, X, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInWishlist?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  const navigate = useNavigate();

  const handleModalBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    // Note: onAddToCart in App.tsx now handles navigation to checkout
    onClose();
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-swavalambi-dark/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-organic w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border-hand-drawn" 
        style={{ animation: 'slideUp 0.4s ease-out forwards' }}
      >
         <style>{`
           @keyframes slideUp {
             from { opacity: 0; transform: translateY(20px); }
             to { opacity: 1; transform: translateY(0); }
           }
         `}</style>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-swavalambi-moss hover:text-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-swavalambi-sand/20 relative min-h-[300px] flex items-center justify-center p-8">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-50"></div>
           <img 
             src={product.image} 
             alt={product.name} 
             className="w-full h-auto object-contain mix-blend-multiply max-h-[400px] drop-shadow-xl"
           />
           <div className="absolute top-6 left-6 flex flex-col gap-2 items-start">
             {product.badges?.map(badge => (
               <span 
                 key={badge} 
                 className={`
                   text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-sm font-sans flex items-center gap-1
                   ${badge.toLowerCase().includes('best') ? 'bg-swavalambi-accent text-swavalambi-dark' : 'bg-swavalambi-dark text-white'}
                 `}
                 style={{ borderRadius: '0 12px 0 12px' }}
               >
                 {badge.toLowerCase().includes('best') && <Star size={10} className="fill-current" />}
                 {badge}
               </span>
             ))}
           </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
          <div className="mb-2 flex items-center gap-2">
             <span className="text-xs font-bold text-swavalambi-moss uppercase tracking-widest bg-swavalambi-moss/10 px-2 py-1 rounded-md">{product.category}</span>
             <div className="flex items-center gap-1 ml-auto">
               <Star size={14} className="text-swavalambi-accent fill-current" />
               <span className="text-xs font-serif text-swavalambi-stone">{product.rating} ({product.reviews} reviews)</span>
             </div>
          </div>

          <h2 className="font-serif font-bold text-3xl text-swavalambi-dark mb-2 leading-tight">{product.name}</h2>
          <p className="font-sans text-xl font-bold text-gray-900 mb-6">{product.tagline}</p>

          <p className="text-swavalambi-stone font-serif leading-relaxed mb-6 flex-grow">
            {product.description}
          </p>

          {product.benefits && (
            <div className="mb-8 p-4 bg-swavalambi-sand/10 rounded-xl border border-swavalambi-sand/30">
              <h4 className="font-bold text-swavalambi-dark font-serif text-sm mb-3">Key Benefits</h4>
              <ul className="grid grid-cols-1 gap-2">
                {product.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-swavalambi-stone font-serif">
                    <Leaf size={14} className="text-swavalambi-moss mt-1 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-swavalambi-sand/50 border-dashed flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                 {product.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-swavalambi-stone line-through font-serif">₹{product.originalPrice}</span>
                       <span className="text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded shadow-sm">
                         {discountPercentage}% OFF
                       </span>
                    </div>
                 )}
                 <span className="text-3xl font-bold font-serif text-swavalambi-dark">₹{product.price}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
                <button 
                  onClick={handleModalBuyNow}
                  className="flex-1 py-3 px-6 rounded-full font-serif font-bold transition-all shadow-lg flex items-center justify-center gap-2 bg-[#FE8B00] text-white hover:bg-[#061C0D] hover:text-[#FE8B00] hover:scale-[1.02]"
                >
                  BUY NOW <ArrowRight size={18} />
                </button>
            </div>
          </div>
          
          <Link 
            to={`/product/${product.id}`} 
            className="text-center mt-6 text-xs font-bold uppercase tracking-widest text-swavalambi-stone hover:text-swavalambi-dark border-b border-transparent hover:border-swavalambi-dark inline-block w-max mx-auto transition-all"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInWishlist = false, onToggleWishlist }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product); // Calls App.tsx handleBuyNow which navigates to checkout
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  // Helper for badge color
  const getBadgeStyle = (badge: string) => {
    const b = badge.toLowerCase();
    if (b.includes('sale') || b.includes('off')) return 'bg-red-600 text-white border-red-700';
    if (b.includes('new')) return 'bg-swavalambi-moss text-white border-swavalambi-dark';
    if (b.includes('best') || b.includes('value')) return 'bg-swavalambi-accent text-swavalambi-dark border-yellow-600';
    return 'bg-swavalambi-dark text-white border-gray-800';
  };

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative h-full flex flex-col">
      {/* Modal Portal */}
      {showQuickView && (
        <QuickViewModal 
          product={product} 
          onClose={() => setShowQuickView(false)} 
          onAddToCart={onAddToCart} 
        />
      )}

      {/* Card Content */}
      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative z-10 flex flex-col h-full bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]">
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-110 ${isInWishlist ? 'bg-red-50 text-red-500' : 'bg-white text-swavalambi-stone hover:text-red-500'}`}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} className={isInWishlist ? "fill-current" : ""} />
        </button>

        {/* Quick View Button */}
        <button
           onClick={(e) => {
             e.preventDefault();
             setShowQuickView(true);
           }}
           className="absolute top-16 right-4 z-30 w-9 h-9 bg-white text-swavalambi-dark rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-swavalambi-moss hover:text-white"
           title="Quick View"
        >
           <Eye size={18} />
        </button>

        {/* Badges - Enhanced */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
          {product.badges?.map((badge) => (
            <div 
              key={badge} 
              className={`
                ${getBadgeStyle(badge)}
                text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest shadow-lg font-sans border-b-2
                transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl
                flex items-center gap-1.5
              `}
              style={{ 
                borderRadius: '0 12px 0 12px', 
              }}
            >
              {badge.toLowerCase().includes('best') && <Star size={10} className="fill-current animate-pulse" />}
              {badge.toLowerCase().includes('new') && <Sparkles size={10} className="animate-pulse" />}
              {badge}
            </div>
          ))}
        </div>

        {/* Image - Organic Mask */}
        <Link to={`/product/${product.id}`} className="block relative pt-[100%] overflow-hidden bg-swavalambi-sand/20 m-3 rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
            loading="lazy"
          />
        </Link>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-swavalambi-moss uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-swavalambi-accent fill-current" />
              <span className="text-xs font-serif text-swavalambi-stone">{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="group-hover:text-swavalambi-clay transition-colors">
            <h3 className="font-serif font-bold text-lg text-swavalambi-dark leading-tight mb-2">{product.name}</h3>
          </Link>
          
          {/* Tagline updated to darker color */}
          <p className="text-sm text-gray-900 font-bold font-sans mb-4 line-clamp-2">{product.tagline}</p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-swavalambi-sand/30 border-dashed">
            <div className="flex flex-col">
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                   <span className="text-xs text-swavalambi-stone line-through font-serif">₹{product.originalPrice}</span>
                   {/* Dynamically calculated discount */}
                   <span className="text-[10px] font-bold text-white bg-green-600 px-1.5 py-0.5 rounded shadow-sm">
                     {discountPercentage}% OFF
                   </span>
                </div>
              )}
              <span className="font-bold text-swavalambi-dark text-xl font-serif">₹{product.price}</span>
            </div>
            
            <div className="flex gap-2 flex-1 justify-end">
                <button 
                  onClick={handleBuyNow}
                  className="px-6 h-10 rounded-full flex items-center justify-center transition-all shadow-md bg-[#FE8B00] text-white hover:bg-[#061C0D] hover:shadow-xl hover:text-[#FE8B00] font-bold text-xs uppercase tracking-wider group-hover:scale-105 duration-300 w-full max-w-[140px]"
                  aria-label="Buy Now"
                  title="Buy Now"
                >
                  BUY NOW
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
