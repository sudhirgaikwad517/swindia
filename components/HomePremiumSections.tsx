import React, { useEffect, useRef } from 'react';
import { Leaf, ShieldCheck, Heart, ArrowRight, Activity, Beaker } from 'lucide-react';

const HomePremiumSections: React.FC = () => {
  const philosophyRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up-active');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-[#F9FDF9]">
      <style>{`
        .animate-fade-up-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      {/* --- 1. THE SWAVALAMBI PHILOSOPHY (Split Screen) --- */}
      <section ref={philosophyRef} className="py-16 lg:py-24 overflow-hidden relative scroll-animate">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-[#092813]/5 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="absolute -inset-4 bg-[#FE8B00]/5 rounded-3xl transform -rotate-3 scale-105"></div>
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl h-[400px] lg:h-[600px] group">
                <img
                  src="/assets/content/image-Photoroom%20(21).png"
                  alt="Premium Herbs"
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061C0D]/80 via-[#061C0D]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-sans text-xs tracking-widest uppercase mb-4">
                    <Leaf size={14} className="text-[#FE8B00]" /> Premium Sourcing
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 text-left">
              <span className="text-[#FE8B00] text-[11px] font-bold uppercase tracking-widest font-sans mb-3 flex items-center gap-2">
                Our Philosophy <div className="h-[1px] w-12 bg-[#FE8B00]"></div>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#061C0D] leading-tight mb-6">
                Bridging Ancient <br /> Wisdom With <br /> <span className="text-[#66AA41]">Modern Precision.</span>
              </h2>
              <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                At Swavalambi, we believe true wellness comes from premium quality. We don't just create supplements; we craft holistic wellness experiences designed for the modern lifestyle. Every formulation is meticulously researched, strictly tested, and deeply rooted in centuries of Indian heritage.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#092813] text-[#FE8B00] flex items-center justify-center mb-2">
                    <Beaker size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-[#061C0D] text-lg">Expertly Crafted</h4>
                  <p className="font-sans text-xs text-gray-500">Rigorous testing for guaranteed efficacy.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#FE8B00] text-white flex items-center justify-center mb-2">
                    <Activity size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-[#061C0D] text-lg">High Bioavailability</h4>
                  <p className="font-sans text-xs text-gray-500">Maximum absorption by your body.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE SWAVALAMBI PROMISE (Glassmorphic Floating Cards) --- */}
      <section ref={promiseRef} className="py-20 relative bg-gradient-to-br from-[#061C0D] to-[#092813] overflow-hidden scroll-animate">
        {/* Background ambient elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FE8B00 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FE8B00] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#66AA41] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <span className="text-[#FE8B00] text-[11px] font-bold uppercase tracking-widest font-sans mb-3 block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-16">
            The Swavalambi Promise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] text-left hover:-translate-y-4 transition-transform duration-500 group shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FE8B00]/0 to-[#FE8B00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#FE8B00] mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Leaf size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3 relative z-10">Purest Sourcing</h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed relative z-10">We source our ingredients directly from local Himalayan farmers, ensuring no pesticides or heavy metals ever touch your supplements.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] text-left hover:-translate-y-4 transition-transform duration-500 group shadow-2xl relative overflow-hidden mt-0 md:mt-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#66AA41]/0 to-[#66AA41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#66AA41] mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3 relative z-10">No Toxins Ever</h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed relative z-10">Zero artificial colors, flavors, or harmful preservatives. What you see on our label is exactly what goes into your body.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] text-left hover:-translate-y-4 transition-transform duration-500 group shadow-2xl relative overflow-hidden mt-0 md:mt-24">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FE8B00]/0 to-[#FE8B00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#FE8B00] mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Heart size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3 relative z-10">Doctor Formulated</h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed relative z-10">Every product is crafted by doctors with decades of experience to ensure maximum efficacy and perfect balance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. FEATURED INGREDIENTS (Interactive Grid)
      <section ref={ingredientsRef} className="py-20 lg:py-28 bg-[#F9FDF9] relative scroll-animate">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-[#FE8B00] text-[11px] font-bold uppercase tracking-widest font-sans mb-3 block">
              The Magic Inside
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#061C0D] leading-tight">
              Premium Finest Ingredients
            </h2>
          </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="relative h-[250px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src="/assets/content/image-Photoroom%20(21).png" alt="Sea Buckthorn" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C0D] via-[#061C0D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="font-serif text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Sea Buckthorn</h3>
                <p className="font-sans text-white/80 text-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">Rich in Omega 3, 6, 7 & 9, Vitamin C and antioxidants. Boosts immunity and skin health.</p>
              </div>
            </div>

            <div className="relative h-[250px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src="/assets/content/amla.jpg" alt="Amla" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C0D] via-[#061C0D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="font-serif text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Amla</h3>
                <p className="font-sans text-white/80 text-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">A powerful source of Vitamin C and antioxidants that help strengthen immunity.</p>
              </div>
            </div>

            <div className="relative h-[250px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src="/assets/content/turmeric.png" alt="Turmeric" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C0D] via-[#061C0D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="font-serif text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Turmeric</h3>
                <p className="font-sans text-white/80 text-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">Known for its premium anti-inflammatory and antioxidant properties.</p>
              </div>
            </div>

            <div className="relative h-[250px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src="/assets/content/ginger.png" alt="Ginger" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C0D] via-[#061C0D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="font-serif text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Ginger</h3>
                <p className="font-sans text-white/80 text-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">Helps improve digestion and supports nutrient absorption effectively.</p>
              </div>
            </div>
            <div className="relative h-[250px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src="/assets/content/black_pepper.png" alt="Black Pepper" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C0D] via-[#061C0D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="font-serif text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Black Pepper</h3>
                <p className="font-sans text-white/80 text-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">Enhances absorption of nutrients and supports overall health.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      --- */}

    </div>
  );
};

export default HomePremiumSections;
