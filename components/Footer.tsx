
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Sprout, Heart, Sun, Leaf, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#061C0D] text-swavalambi-paper pt-20 pb-24 lg:pb-8 font-sans relative overflow-hidden border-t-4 border-[#FE8B00]">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FE8B00 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Newsletter Section - "Wellness Circle" */}
        {/* <div className="bg-swavalambi-clay/20 backdrop-blur-sm rounded-organic border border-white/10 p-8 md:p-12 mb-16 text-center max-w-4xl mx-auto">
          <Sun className="mx-auto text-swavalambi-accent mb-4" size={40} />
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Join Our Wellness Circle</h2>
          <p className="font-hand text-xl text-swavalambi-sand mb-8">Receive seasonal Authentic tips, exclusive recipes, and mindful moments.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="tel" 
              placeholder="+91 Your Phone Number" 
              className="flex-1 px-6 py-3 rounded-full bg-swavalambi-paper/10 border border-swavalambi-paper/20 text-swavalambi-paper placeholder-swavalambi-paper/50 focus:outline-none focus:border-swavalambi-accent focus:bg-swavalambi-paper/20 transition-all font-serif"
            />
            <button className="px-8 py-3 bg-swavalambi-moss hover:bg-swavalambi-sand hover:text-swavalambi-dark text-white rounded-full font-serif font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join Us
            </button>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Story & Socials */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/assets/content/logo.png" alt="Swavalambi India Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-swavalambi-paper/80 leading-relaxed mb-6 font-serif">
              Bringing the ancient wisdom of Tradition to modern wellness needs with authentic, high-quality premium products.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/swavalambihealthcare/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-swavalambi-paper/20 flex items-center justify-center hover:bg-swavalambi-moss hover:border-swavalambi-moss hover:text-white transition-all transform hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/swavalambihealthcare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-swavalambi-paper/20 flex items-center justify-center hover:bg-swavalambi-moss hover:border-swavalambi-moss hover:text-white transition-all transform hover:scale-110">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-hand text-2xl text-swavalambi-sand mb-6">Quick Links</h3>
            <ul className="space-y-2 text-swavalambi-paper/80 font-serif text-sm">
              <li><Link to="/" className="hover:text-swavalambi-sand transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-swavalambi-sand transition-colors">Products</Link></li>
              {/* <li><Link to="/about" className="hover:text-swavalambi-sand transition-colors">About Us</Link></li> */}
              <li><Link to="/contact" className="hover:text-swavalambi-sand transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-swavalambi-sand transition-colors">FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-swavalambi-sand transition-colors">Track Order</Link></li>
              <li><Link to="/privacy" className="hover:text-swavalambi-sand transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-swavalambi-sand transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/terms" className="hover:text-swavalambi-sand transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refunds" className="hover:text-swavalambi-sand transition-colors">Cancellation, Return & Refund</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div>
            <h3 className="font-hand text-2xl text-swavalambi-sand mb-6">Our Products</h3>
            <ul className="space-y-3 text-swavalambi-paper/80 font-serif">
              <li><Link to="/product/p1" className="hover:text-swavalambi-sand transition-colors flex items-center gap-2"><Leaf size={14} className="text-swavalambi-moss" /> Sea Buckthorn Juice</Link></li>
              <li><Link to="/shop" className="hover:text-swavalambi-sand transition-colors flex items-center gap-2"><Leaf size={14} className="text-swavalambi-moss" /> View All Products</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Map */}
          <div>
            <h3 className="font-hand text-2xl text-swavalambi-sand mb-6">Contact Info</h3>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <ul className="space-y-4 text-swavalambi-paper/80 font-serif text-sm mb-6">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-swavalambi-moss mt-1 shrink-0" />
                  <div>
                    <span className="block">Swavalambi India Multitrade Pvt Ltd</span>
                    <span className="block text-sm">GUT NO- 324/17 GALA NO-40,</span>
                    <span className="block text-sm">SAI DARSHAN COMPLEX, Rahata,</span>
                    <span className="block text-sm">Ahmed Nagar - 423107, Maharashtra</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-swavalambi-moss shrink-0" />
                  <span>+91 72727 7702</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-swavalambi-moss shrink-0" />
                  <a href="mailto:care@swavalambiindia.com" className="hover:text-white transition-colors break-all">care@swavalambiindia.com</a>
                </li>
                <li className="flex items-start gap-3 border-t border-white/10 pt-4 mt-2">
                  <Clock size={18} className="text-swavalambi-moss mt-1 shrink-0" />
                  <div>
                    <p>Mon-Sat: 10:00 AM - 6:00 PM</p>
                    <p className="text-red-300 mt-1">Sunday: Closed</p>
                  </div>
                </li>
              </ul>

              {/* Location Map */}
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-white/20 bg-[#e8eaed] shadow-inner">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=74.46%2C19.70%2C74.51%2C19.74&layer=mapnik&marker=19.7167%2C74.4833"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  title="Swavalambi India Location"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sai+Darshan+Complex,+Rahata,+Ahmednagar,+Maharashtra+423107"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FE8B00] hover:text-white transition-colors mt-2"
              >
                <MapPin size={12} />
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-swavalambi-paper/10 pt-8 flex flex-col items-center gap-4 font-serif text-sm text-swavalambi-paper/60 text-center">
          <p>&copy; 2025 Swavalambi India Multitrade Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
