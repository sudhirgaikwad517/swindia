
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 499 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 text-center min-h-[70vh] flex flex-col items-center justify-center bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
        <div className="w-24 h-24 bg-swavalambi-sand/30 rounded-full flex items-center justify-center mb-6 text-swavalambi-stone animate-pulse">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-swavalambi-dark mb-2">Your Basket is Empty</h2>
        <p className="text-swavalambi-stone font-serif italic text-lg mb-8">Premium Quality is waiting for you.</p>
        <Link to="/shop" className="bg-swavalambi-dark text-white px-10 py-4 rounded-full font-serif font-bold hover:bg-swavalambi-moss transition-colors shadow-lg">
          Explore the Apothecary
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-serif text-swavalambi-dark mb-8 font-bold border-b border-swavalambi-sand pb-4 inline-block">Your Wellness Basket <span className="text-swavalambi-stone text-2xl font-normal">({items.length})</span></h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 bg-white rounded-organic shadow-sm p-8 border-hand-drawn">
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-6 items-center border-b border-swavalambi-sand/50 last:border-0 pb-8 last:pb-0">
                  <div className="w-24 h-24 rounded-2xl bg-swavalambi-sand/20 overflow-hidden shrink-0 border border-swavalambi-sand">
                    {/* CHANGED: object-cover -> object-contain, added p-2 */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <Link to={`/product/${item.id}`} className="font-serif font-bold text-xl text-swavalambi-dark hover:text-swavalambi-clay transition-colors">
                      {item.name}
                    </Link>
                    <span className="text-sm font-sans text-swavalambi-moss font-bold block mt-1 uppercase tracking-wide">{item.category}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-swavalambi-sand rounded-full">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-3 hover:text-swavalambi-clay transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold font-serif">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-3 hover:text-swavalambi-clay transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="block font-serif font-bold text-xl text-swavalambi-dark">₹{item.price * item.quantity}</span>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-swavalambi-stone hover:text-red-500 underline mt-1 font-serif"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-swavalambi-sand border-dashed">
               <Link to="/shop" className="inline-flex items-center text-swavalambi-clay font-bold font-serif hover:text-swavalambi-dark transition-colors">
                 <ArrowLeft size={18} className="mr-2" /> Continue Browsing
               </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-organic shadow-lg p-8 border border-swavalambi-sand sticky top-28">
              <h2 className="text-2xl font-hand text-swavalambi-clay mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 font-serif text-swavalambi-dark/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-swavalambi-moss font-bold">Premium Gift (Free)</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Donation (Tree Planting)</span>
                  <span className="text-swavalambi-moss">Included</span>
                </div>
              </div>
              
              <div className="border-t border-swavalambi-sand pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg font-serif">Total</span>
                  <span className="text-3xl font-serif font-bold text-swavalambi-dark">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-swavalambi-dark text-swavalambi-paper font-serif font-bold py-4 rounded-full hover:bg-swavalambi-moss transition-colors shadow-md mb-6 text-lg"
              >
                Checkout Securely
              </button>
              
              <div className="bg-swavalambi-sand/20 p-4 rounded-lg flex gap-3 items-start">
                 <ShieldCheck className="text-swavalambi-moss shrink-0" size={20} />
                 <p className="text-xs text-swavalambi-stone font-sans leading-relaxed">
                   We use secure SSL encryption to protect your data. Your wellness journey is safe with us.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
