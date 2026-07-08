
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

interface WishlistProps {
  items: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ items, onAddToCart, onToggleWishlist }) => {
  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 text-center min-h-[70vh] flex flex-col items-center justify-center bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
        <div className="w-24 h-24 bg-swavalambi-sand/30 rounded-full flex items-center justify-center mb-6 text-swavalambi-stone animate-pulse">
           <Heart size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-swavalambi-dark mb-2">Your Wishlist is Empty</h2>
        <p className="text-swavalambi-stone font-serif italic text-lg mb-8">Save your favorite remedies here for later.</p>
        <Link to="/shop" className="bg-swavalambi-dark text-white px-10 py-4 rounded-full font-serif font-bold hover:bg-swavalambi-moss transition-colors shadow-lg">
          Explore the Apothecary
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="font-hand text-2xl text-swavalambi-clay">Your Saved Remedies</span>
          <h1 className="font-serif text-4xl font-bold text-swavalambi-dark mt-2">My Wishlist ({items.length})</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                isInWishlist={true}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
