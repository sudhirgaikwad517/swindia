import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, Leaf, Phone, Mail, Clock, HelpCircle, 
  ShieldCheck, Sprout, Heart, ArrowRight, Truck, CheckCircle, FlaskConical, MessageCircle, Star 
} from 'lucide-react';
import { SEA_BUCKTHORN_FAQS } from '../productContent';

const Faq: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(0); // Open first one by default

  const faqs = [
    ...SEA_BUCKTHORN_FAQS.map((faq, idx) => ({
      q: `${idx + 1}. ${faq.q}`,
      a: faq.a,
    })),
    {
      q: '12. Do you ship across India?',
      a: 'Yes, we ship to almost all pincodes across India. FREE delivery across India and Cash on Delivery (COD) is available.',
    },
  ];

  return (
    <div className="pt-0 lg:pt-16 pb-0 min-h-screen bg-[#F9FDF9] antialiased text-gray-800">
      
      {/* 1. HERO SECTION - MOBILE VIEW */}
      <section className="block lg:hidden relative bg-[#092813] hero-bg-animated text-white pt-32 pb-14 overflow-hidden min-h-0 flex items-center">
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
              <div className="inline-flex items-center gap-1.5 border border-[#FE8B00] text-[#FE8B00] text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full font-sans mb-0.5">
                <Leaf size={11} className="fill-[#FE8B00]" />
                <span>FAQ</span>
              </div>
              <h1 className="font-serif text-lg font-bold leading-tight">
                Your Questions. <br />
                <span className="text-[#FE8B00]">Clearly Answered.</span>
              </h1>
              <p className="text-white/80 text-[9px] leading-relaxed max-w-lg font-sans">
                We're here to help you make informed choices about your health and wellness.
              </p>
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
      <section className="hidden lg:flex relative bg-[#092813] hero-bg-animated text-white pt-14 pb-4 overflow-hidden min-h-[420px] items-center">
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
              <div className="inline-flex items-center gap-1.5 border border-[#FE8B00] text-[#FE8B00] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-sans mb-2">
                <Leaf size={11} className="fill-[#FE8B00]" />
                <span>FAQ</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[66px] font-bold leading-tight text-white">
                Your Questions. <br />
                <span className="text-[#FE8B00]">Clearly Answered.</span>
              </h1>
              <p className="text-white/80 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed max-w-xl font-sans">
                We're here to help you make informed choices about your health and wellness.
              </p>
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

      {/* 2. Main content container */}
      <div className="container mx-auto px-6 max-w-5xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FAQ List (7 cols / 60%) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-150 pb-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#092813] flex items-center justify-center text-[#FE8B00] shrink-0">
                <HelpCircle size={16} />
              </div>
              <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider">
                Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ Accordions */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white border border-gray-155 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer font-sans text-xs font-bold text-gray-800 hover:text-[#092813] transition-colors gap-4"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#092813] shrink-0 font-light text-base select-none">
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-left animate-fade-in border-t border-gray-50/50">
                        <p className="text-[10.5px] text-gray-550 leading-relaxed font-semibold">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar elements (5 cols / 40%) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box 1: Still Have Questions? */}
            <div className="bg-[#FAF4EB]/70 border border-[#FE8B00]/20 rounded-3xl p-6 text-center space-y-4 shadow-sm text-gray-800">
              <div className="w-12 h-12 rounded-full bg-[#092813] text-[#FE8B00] flex items-center justify-center mx-auto shadow-sm">
                <Phone size={18} />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-sm font-bold text-gray-900">Still Have Questions?</h3>
                <p className="text-[10px] text-gray-500 font-semibold">Our support team is here to help you.</p>
              </div>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-[#092813] border border-[#FE8B00]/30 text-[#FE8B00] hover:bg-[#FE8B00] hover:text-[#092813] py-2 px-6 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Contact Us</span>
                <ArrowRight size={10} />
              </button>
              
              <div className="border-t border-gray-200/50 pt-4 space-y-2 text-[10.5px] font-bold text-gray-600 font-sans text-left px-2">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#092813]/70" />
                  <span>+91 72727 7702</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#092813]/70" />
                  <a href="mailto:care@swavalambiindia.com" className="hover:text-black transition-colors">care@swavalambiindia.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#092813]/70" />
                  <span>Mon – Sat | 10 AM – 6 PM</span>
                </div>
              </div>
            </div>

            {/* Box 2: Why Choose Authentic? */}
            <div className="bg-[#FAF4EB]/70 border border-[#FE8B00]/20 rounded-3xl p-6 text-center space-y-4 shadow-sm text-gray-800">
              <div className="w-12 h-12 rounded-full bg-[#092813] text-[#FE8B00] flex items-center justify-center mx-auto shadow-sm">
                <Leaf size={18} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-sm font-bold text-gray-900">Why Choose Authentic?</h3>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed px-1">
                  Tradition focuses on addressing the root cause, not just the symptoms. It works in harmony with your body to promote long-term balance and premium healing.
                </p>
              </div>
              <button 
                onClick={() => navigate('/about')}
                className="text-[10px] font-bold text-[#092813] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer border-b border-[#092813] hover:text-[#FE8B00] hover:border-[#FE8B00] transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight size={10} />
              </button>
            </div>

            {/* Box 3: Our Promise */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 text-left space-y-5 shadow-sm text-gray-800">
              <h3 className="font-serif text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Our Promise</h3>
              
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0 mt-0.5">
                    <Leaf size={13} />
                  </div>
                  <div className="leading-tight">
                    <h5 className="font-bold text-gray-900">Premium Ingredients</h5>
                    <p className="text-[9.5px] text-gray-500 font-semibold mt-0.5">No harmful chemicals or additives</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0 mt-0.5">
                    <ShieldCheck size={13} />
                  </div>
                  <div className="leading-tight">
                    <h5 className="font-bold text-gray-900">Science-Backed Tradition</h5>
                    <p className="text-[9.5px] text-gray-500 font-semibold mt-0.5">Traditional wisdom, validated by modern research</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] shrink-0 mt-0.5">
                    <CheckCircle size={13} />
                  </div>
                  <div className="leading-tight">
                    <h5 className="font-bold text-gray-900">Trust. Quality. Care.</h5>
                    <p className="text-[9.5px] text-gray-550 font-semibold mt-0.5">We are committed to your health and happiness</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Bottom CTA Banner (Ready to take next step?) */}
      <div className="container mx-auto px-6 max-w-5xl mb-12">
        <div className="bg-[#FAF4EB]/70 border border-[#FE8B00]/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#092813] text-[#FE8B00] flex items-center justify-center shrink-0 shadow-sm">
              <Leaf size={24} className="fill-[#FE8B00]/20" />
            </div>
            <div className="leading-tight font-sans">
              <h3 className="text-sm font-bold text-gray-900">Your health journey matters to us.</h3>
              <p className="text-[10px] text-gray-500 font-semibold mt-1">We're with you, every step of the way.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ready to take the next step?</span>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-[#092813] text-white border border-[#092813] hover:bg-white hover:text-[#092813] hover:border-[#092813] rounded-full font-bold py-2.5 px-6 flex items-center gap-2 transition-all text-[10px] uppercase tracking-wider shrink-0 shadow-md cursor-pointer"
            >
              <span>Shop Sea Buckthorn Juice</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Footer Trust Ribbon */}
      <div className="bg-[#061C0D] text-white py-5 border-t border-[#FE8B00]/15">
        <div className="container mx-auto px-6 max-w-5xl flex flex-wrap justify-between items-center gap-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider select-none text-white/80">
          <span className="flex items-center gap-1.5">🚚 FREE Delivery Across India</span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#FE8B00]" /> Safe & Secure (Payments)</span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#FE8B00]" /> Genuine (Products)</span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5"><Sprout size={13} className="text-[#FE8B00]" /> Dedicated Support (We're here to help)</span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#FE8B00]" /> Easy Returns (Hassle-free)</span>
        </div>
      </div>

    </div>
  );
};

export default Faq;
