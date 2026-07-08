
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import Cart from './pages/Cart';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import Refunds from './pages/Refunds';
import ThankYou from './pages/ThankYou'; // Imported ThankYou Page
import TrackOrder from './pages/TrackOrder'; // Imported TrackOrder Page
import Orders from './pages/Orders'; // Imported Orders Page
import Profile from './pages/Profile'; // Imported Profile Page
import MoreMenu from './pages/MoreMenu'; // Imported MoreMenu Page
import MobileBottomNav from './components/MobileBottomNav'; // Imported MobileBottomNav Component
import Chatbot from './components/Chatbot';

import { CartItem, Product } from './types';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Wrapper to use router hooks
const AppContent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const navigate = useNavigate();

  // --- CART LOGIC ---
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // --- BUY NOW LOGIC (Add & Go to Checkout) ---
  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    navigate('/checkout');
  };

  // --- WISHLIST LOGIC ---
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const wishlistCount = wishlistItems.length;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header wishlistCount={wishlistCount} cartCount={cartCount} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Home 
              onAddToCart={handleBuyNow} 
              wishlistItems={wishlistItems}
              onToggleWishlist={handleToggleWishlist}
            />
          } />
          <Route path="/shop" element={
            <Shop 
              onAddToCart={handleBuyNow}
              wishlistItems={wishlistItems}
              onToggleWishlist={handleToggleWishlist}
              cartItems={cartItems}
            />
          } />
           <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={
            <ProductDetail 
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              wishlistItems={wishlistItems}
              onToggleWishlist={handleToggleWishlist}
            />
          } />
          <Route path="/cart" element={
            <Cart 
              items={cartItems} 
              onUpdateQuantity={handleUpdateQuantity} 
              onRemoveItem={handleRemoveFromCart} 
            />
          } />
          <Route path="/wishlist" element={
            <Wishlist 
              items={wishlistItems}
              onAddToCart={handleBuyNow}
              onToggleWishlist={handleToggleWishlist}
            />
          } />
          <Route path="/checkout" element={<Checkout items={cartItems} onClearCart={handleClearCart} />} />
          <Route path="/thank-you" element={<ThankYou />} /> {/* New Route */}
          <Route path="/track-order" element={<TrackOrder />} /> {/* Track Order Route */}
          <Route path="/orders" element={<Orders />} /> {/* Orders Route */}
          <Route path="/profile" element={<Profile />} /> {/* Profile Route */}
          <Route path="/more" element={<MoreMenu />} /> {/* More Menu Route */}
          
          {/* Policy Pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/refunds" element={<Refunds />} />

          {/* Fallback routes */}
          <Route path="*" element={
            <Shop 
              onAddToCart={handleBuyNow}
              wishlistItems={wishlistItems}
              onToggleWishlist={handleToggleWishlist}
              cartItems={cartItems}
            />
          } />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav cartCount={cartCount} />
      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <Router>
       <AppContent />
    </Router>
  );
}

export default App;
