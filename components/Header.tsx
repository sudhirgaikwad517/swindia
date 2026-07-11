import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, ShoppingBag, ShoppingCart, Truck, Gift, Phone, MessageCircle, Leaf, ChevronDown } from 'lucide-react';

interface HeaderProps {
  wishlistCount?: number;
  cartCount?: number;
}

const Header: React.FC<HeaderProps> = ({ wishlistCount = 0, cartCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSearchInput(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks: { name: string; path: string; isScroll: boolean; hasDropdown?: boolean }[] = [
    { name: 'HOME', path: '/', isScroll: false },
    { name: 'SHOP', path: '/shop', isScroll: false },
    // { name: 'ABOUT US', path: '/about', isScroll: false },
    { name: 'REVIEWS', path: '/reviews', isScroll: false },
    { name: 'FAQ', path: '/faq', isScroll: false },
    { name: 'CONTACT', path: '/contact', isScroll: false },
  ];

  const handleNavClick = (link: { name: string, path: string, isScroll?: boolean }) => {
    if (link.isScroll) {
      if (location.pathname !== '/') {
        navigate(`/?scroll=${link.path}`);
      } else {
        const el = document.getElementById(link.path);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(link.path);
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col transition-all duration-300">
      
      {/* Announcement Bar */}
      <div className="bg-[#FE8B00] py-2 border-b border-[#061C0D]/10 z-50">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 max-w-6xl flex justify-center items-center text-[8px] sm:text-[10px] font-sans tracking-wider uppercase font-bold text-[#061C0D]">
          <div className="flex items-center gap-1.5 sm:gap-3.5 justify-center whitespace-nowrap">
            <span>🚚 FREE Delivery Across India</span>
            <span className="text-[#061C0D]/30">|</span>
            <span>💵 Cash on Delivery (COD) Available</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`w-full bg-white text-[#061C0D] border-b border-[#061C0D]/10 transition-all duration-300 ${isScrolled ? 'py-2 shadow-md lg:shadow-lg bg-white/95 backdrop-blur-md' : 'py-3.5 shadow-sm lg:shadow-md'}`}>
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between h-12 relative">
            
            {/* Mobile Menu Button - Far Left */}
            <button
              className="lg:hidden text-[#061C0D] hover:text-[#FE8B00] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>

            {/* Logo Layout */}
            <Link to="/" className="flex items-center shrink-0 lg:ml-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <img src="/assets/content/logo.png" alt="Swavalambi India Logo" className="h-16 md:h-20 w-auto object-contain" />
            </Link>

            {/* Navigation links - Center (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 mx-auto">
              {navLinks.map((link) => {
                const isLinkActive = link.isScroll 
                  ? false 
                  : location.pathname === link.path;

                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link)}
                    className={`font-sans font-bold text-[13px] hover:text-[#FE8B00] transition-all relative py-1.5 flex items-center gap-0.5 ${
                      isLinkActive ? 'text-[#FE8B00] font-extrabold' : 'text-[#061C0D]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && <ChevronDown size={11} className="opacity-75" />}
                    {isLinkActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FE8B00] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Utility icons & Action Icons - Right */}
            <div className="flex items-center gap-4 text-[#061C0D] shrink-0 ml-auto lg:ml-0">
              {/* Search interface */}
              <div className="relative flex items-center">
                {showSearchInput ? (
                  <form onSubmit={handleSearchSubmit} className="absolute right-0 flex items-center bg-gray-100 border border-[#FE8B00] rounded-full px-2.5 py-0.5 animate-fade-in z-20 w-44 md:w-56">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-[#061C0D] text-[10px] placeholder-[#061C0D]/50 outline-none w-full font-sans py-0.5"
                      autoFocus
                    />
                    <button type="submit" className="text-[#061C0D] hover:text-[#FE8B00] ml-1">
                      <Search size={12} />
                    </button>
                    <button type="button" onClick={() => setShowSearchInput(false)} className="text-[#061C0D]/50 hover:text-[#061C0D] ml-1">
                      <X size={12} />
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setShowSearchInput(true)} 
                    className="hover:text-[#FE8B00] transition-colors"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Profile icon - Desktop Only */}
              <Link to="/about" className="hidden lg:block hover:text-[#FE8B00] transition-colors" aria-label="Profile">
                <User size={20} />
              </Link>

              {/* Cart icon */}
              <Link to="/cart" className="relative hover:text-[#FE8B00] transition-colors mr-1" aria-label="Shopping Cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FE8B00] text-white text-[9px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full shadow-sm font-sans">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white text-[#061C0D] z-50 transform transition-transform duration-300 ease-out lg:hidden shadow-2xl flex flex-col border-r border-[#061C0D]/10 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b border-[#061C0D]/10">
          <div className="flex items-center">
             <img src="/assets/content/logo.png" alt="Swavalambi India Logo" className="h-8 w-auto object-contain" />
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#061C0D]/60 hover:text-[#FE8B00] transition-colors">
            <X size={22} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(link);
                }}
                className="px-4 py-3.5 text-left text-[#061C0D] font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#FE8B00]/10 hover:text-[#FE8B00] rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-5 bg-gray-50 border-t border-[#061C0D]/10">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/shop');
            }}
            className="w-full bg-[#FE8B00] hover:bg-[#061C0D] text-white transition-all text-xs font-bold uppercase py-3 rounded-full text-center block"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
