import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Heart, Sprout, Globe, ShieldCheck, Microscope, BookOpen, Sun, 
  Shield, Users, Target, Eye, FlaskConical, Package, ArrowRight, Award,
  TrendingUp, Lightbulb
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  // Hinglish Image Briefs
  const getProductImageDetails = (id: string) => {
    switch (id) {
      case 'about_hero_product':
        return {
          id: 'product_image_sea_buckthorn_juice',
          desc: 'Sea Buckthorn Juice 100ml amber bottle on a rustic slate platter alongside a mortar and pestle, with fresh green leaves around.'
        };
      case 'about_mission_vision_image':
        return {
          id: 'about_mission_vision_image',
          desc: 'A stone mortar and pestle filled with fresh green herbs on a clean light background.'
        };
      case 'about_story_sprout':
        return {
          id: 'about_story_sprout',
          desc: 'Close-up of hands holding a fresh green sprout with fertile soil.'
        };
      case 'about_story_microscope':
        return {
          id: 'about_story_microscope',
          desc: 'A scientist in a lab looking through a microscope to test herbal formulas.'
        };
      case 'about_story_preparation':
        return {
          id: 'about_story_preparation',
          desc: 'A stone mortar and pestle surrounded by bowls of ground herbal powders like turmeric and amla.'
        };
      default:
        return {
          id: 'placeholder',
          desc: 'About Us wellness graphic placeholder.'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FDF9] antialiased pt-0 lg:pt-16">
      
      {/* Custom Keyframe Animations Style Block */}
      <style>{`
        @keyframes leafFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(12deg); }
          50% { transform: translate(8px, -12px) rotate(18deg); }
        }
        @keyframes leafFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(-45deg); }
          50% { transform: translate(-8px, 12px) rotate(-38deg); }
        }
        @keyframes leafFloat3 {
          0%, 100% { transform: translate(0, 0) rotate(90deg); }
          50% { transform: translate(12px, -8px) rotate(82deg); }
        }
        @keyframes leafFloat4 {
          0%, 100% { transform: translate(0, 0) rotate(30deg); }
          50% { transform: translate(-6px, -10px) rotate(24deg); }
        }
        @keyframes sealFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-leaf-1 {
          animation: leafFloat1 6s ease-in-out infinite;
        }
        .animate-leaf-2 {
          animation: leafFloat2 7s ease-in-out infinite;
        }
        .animate-leaf-3 {
          animation: leafFloat3 8s ease-in-out infinite;
        }
        .animate-leaf-4 {
          animation: leafFloat4 9s ease-in-out infinite;
        }
        .animate-seal {
          animation: sealFloat 5s ease-in-out infinite;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* MOBILE VIEW */}
      {/* ========================================================================= */}
      <div className="lg:hidden">
        
        {/* 1. Mobile Hero Section */}
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
              {/* Left Content */}
              <div className="col-span-7 text-left space-y-3 relative z-20 pr-4">
                <span className="text-[9px] font-bold text-[#FE8B00] uppercase tracking-widest block font-sans">
                  About Us
                </span>
                <h1 className="font-serif text-lg font-bold leading-tight">
                  Rooted In Tradition. <br />
                  <span className="text-[#FE8B00]">Committed To <br /> Your Wellness.</span>
                </h1>
                <p className="text-white/80 font-sans text-[9px] leading-relaxed">
                  At Swavalambi India, we blend the timeless wisdom of Tradition with modern research to create safe, effective and high-quality wellness products.
                </p>
                
                {/* Inspired/Backed Info Box */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-6 h-6 rounded-full border border-[#FE8B00]/35 flex items-center justify-center text-[#FE8B00] shrink-0">
                    <Leaf size={12} />
                  </div>
                  <div className="text-[8px] font-bold leading-tight font-sans">
                    <div className="text-white">Inspired by Premium Quality.</div>
                    <div className="text-[#FE8B00]">Backed by Science.</div>
                  </div>
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

        {/* New Founder Story Section (Mobile) */}
        <section id="founder-story-mobile" className="px-4 py-8 bg-[#F9FDF9] relative z-25 -mt-6">
          <div className="bg-white border border-gray-155 rounded-[28px] overflow-hidden shadow-lg flex flex-col">
            
            {/* Image at top */}
            <div className="w-full relative overflow-hidden bg-gray-50 flex justify-center">
              <img 
                src="/assets/content/vaibhav-dhus.PNG" 
                alt="Vaibhav Dhus Founder" 
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>

            {/* Text story */}
            <div className="p-5 text-left font-sans bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')] bg-repeat flex flex-col gap-6">
              <div>
                {/* Founder Story tag */}
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[6px] text-[#FE8B00]">♦</span>
                    <div className="h-[1px] w-12 bg-[#FE8B00]/60"></div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#092813] font-sans">Founder Story</span>
                  <div className="flex items-center gap-1">
                    <div className="h-[1px] w-12 bg-[#FE8B00]/60"></div>
                    <span className="text-[6px] text-[#FE8B00]">♦</span>
                  </div>
                </div>

                {/* Heading */}
                <h2 className="font-serif text-2xl font-extrabold text-[#092813] leading-tight mb-1">
                  From <span className="text-[#FE8B00]">Purpose</span> <br />
                  To <span className="text-[#FE8B00]">Transformation</span>
                </h2>

                {/* Subheading */}
                <p className="text-[8px] font-bold text-gray-505 uppercase tracking-widest mb-5">
                  THE VISION BEHIND SWAVALAMBI INDIA
                </p>

                {/* Points list */}
                <div className="space-y-5">
                  {/* Point 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                      <Leaf size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">A Journey Driven by Purpose</h4>
                      <p className="text-[10px] text-gray-605 leading-relaxed font-medium">
                        Swavalambi India was founded with a simple yet powerful mission — to create high-quality wellness solutions that genuinely improve lives while maintaining the wisdom of Tradition and the standards of modern healthcare.
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">Building Trust Through Results</h4>
                      <p className="text-[10px] text-gray-605 leading-relaxed font-medium">
                        Under the leadership of Vaibhav Dhus, Swavalambi India has focused on delivering products designed to support long-term wellness, customer trust and meaningful transformation.
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                      <FlaskConical size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">A Commitment to Excellence</h4>
                      <p className="text-[10px] text-gray-605 leading-relaxed font-medium">
                        Every formulation reflects a commitment to quality, research, authenticity and customer satisfaction, helping our customers move toward healthier lives.
                      </p>
                    </div>
                  </div>

                  {/* Point 4 */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">The Road Ahead</h4>
                      <p className="text-[10px] text-gray-650 leading-relaxed font-medium">
                        The vision continues to expand with innovation, education and wellness solutions that empower people to live healthier, stronger and more confident lives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature, Name, and Values Card */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
                <div className="leading-tight">
                  <span className="font-hand text-3xl text-[#FE8B00] block mb-0.5">Vaibhav Dhus</span>
                  <h4 className="text-[9px] font-extrabold text-[#092813] uppercase tracking-wider">Vaibhav Dhus</h4>
                  <span className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest">Founder, Swavalambi India</span>
                </div>

                {/* Values Card */}
                <div className="border border-[#FE8B00]/40 rounded-xl p-3.5 bg-white shadow-sm grid grid-cols-4 gap-1.5 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Award size={22} className="text-[#FE8B00] mb-1" />
                    <span className="text-[8.5px] font-black text-[#092813] uppercase tracking-wide mt-1">Quality Focused</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-gray-100">
                    <Leaf size={22} className="text-[#FE8B00] mb-1" />
                    <span className="text-[8.5px] font-black text-[#092813] uppercase tracking-wide mt-1">Tradition Inspired</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-gray-100">
                    <Users size={22} className="text-[#FE8B00] mb-1" />
                    <span className="text-[8.5px] font-black text-[#092813] uppercase tracking-wide mt-1">Customer First</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-gray-100">
                    <Lightbulb size={22} className="text-[#FE8B00] mb-1" />
                    <span className="text-[8.5px] font-black text-[#092813] uppercase tracking-wide mt-1">Innovation Driven</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2. Mobile Mission & Vision Section */}
        <section className="px-4 py-4 relative z-25">
          <div className="bg-white border border-gray-155 rounded-[28px] p-5 shadow-lg">
            <div className="grid grid-cols-12 gap-3 items-center">
              
              {/* Left texts */}
              <div className="col-span-8 space-y-4 text-left font-sans">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#FE8B00]">
                    <span>Our Mission</span>
                    <div className="h-[1px] w-6 bg-[#FE8B00]"></div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-705 leading-relaxed">
                    To make authentic Authentic wellness accessible to every home and help people live healthier, effectively.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#FE8B00]">
                    <span>Our Vision</span>
                    <div className="h-[1px] w-6 bg-[#FE8B00]"></div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-705 leading-relaxed">
                    To be a trusted global Authentic brand that empowers better lives through pure, premium and effective solutions.
                  </p>
                </div>
              </div>

              {/* Right image */}
              <div className="col-span-4 flex justify-center">
                <img 
                  src="/assets/content/image-Photoroom%20(21).png" 
                  alt="Authentic Wellness" 
                  className="w-full aspect-[4/5] max-w-[85px] object-cover rounded-xl shadow-sm"
                />
              </div>

            </div>
          </div>
        </section>

        {/* 3. Mobile Values Section */}
        <section className="bg-[#061C0D] text-white py-10 px-6 mt-8">
          <div className="text-left mb-6 font-sans">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#FE8B00]">
              <span>Our Values</span>
              <div className="h-[1.5px] w-8 bg-[#FE8B00]"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Leaf, title: "Purity", desc: "We use pure, premium and high-quality ingredients." },
              { icon: Shield, title: "Trust", desc: "Honest practices and complete transparency." },
              { icon: Sprout, title: "Effectiveness", desc: "Backed by research to deliver visible results." },
              { icon: Users, title: "Care", desc: "We care for our customers and wellness." }
            ].map((v, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-full border border-[#FE8B00]/35 flex items-center justify-center text-[#FE8B00]">
                  <v.icon size={16} />
                </div>
                <h4 className="text-[10px] font-bold text-white font-sans">{v.title}</h4>
                <p className="text-[7.5px] text-white/70 leading-normal font-sans px-0.5">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Mobile Journey Timeline Section */}
        <section className="py-10 px-6 bg-[#F9FDF9]">
          <div className="text-left mb-8 font-sans">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#FE8B00]">
              <span>Our Journey</span>
              <div className="h-[1.5px] w-8 bg-[#FE8B00]"></div>
            </div>
          </div>

          {/* Horizontal timeline */}
          <div className="relative font-sans pt-4 pb-2">
            {/* Timeline connector line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-[1.5px] bg-[#FE8B00]/45 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-4 gap-2 relative z-10">
              {[
                { year: "2018", title: "The Beginning", desc: "Started with a vision to promote premium healing through Tradition.", icon: Leaf },
                { year: "2019–21", title: "Research & Development", desc: "Blended ancient wisdom with modern science to create effective formulas.", icon: FlaskConical },
                { year: "2022", title: "Product Launch", desc: "Launched our first range of wellness products Trusted by Customers.", icon: Package },
                { year: "Today & Beyond", title: "Today & Beyond", desc: "Growing together with a mission to make Tradition global.", icon: Users }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Timeline circle badge */}
                  <div className="w-12 h-12 rounded-full bg-[#092813] border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] shadow-md mb-2 cursor-pointer active:scale-90 transition-all">
                    <step.icon size={18} />
                  </div>
                  
                  <span className="text-[9px] font-bold text-gray-800">{step.year}</span>
                  <span className="text-[8px] font-extrabold text-[#FE8B00] uppercase leading-tight mt-0.5 text-center">{step.title}</span>
                  <p className="text-[7px] text-gray-500 leading-normal text-center mt-1 px-0.5">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Mobile Bottom Trust Card */}
        <section className="px-4 pb-12">
          <div className="bg-[#061C0D] border border-[#FE8B00]/20 rounded-2xl p-4 flex items-center justify-between text-white shadow-md text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FE8B00] shrink-0 border border-white/5">
                <Leaf size={18} />
              </div>
              <div className="font-sans leading-tight">
                <h3 className="text-xs font-bold text-white">Trusted by our customers</h3>
                <p className="text-[8.5px] text-white/70 mt-0.5">10,000+ happy customers across India and growing.</p>
              </div>
            </div>
            
            {/* Avatars */}
            <div className="flex items-center shrink-0">
              <div className="flex -space-x-1.5">
                <img className="w-5 h-5 rounded-full border border-[#061C0D]" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <img className="w-5 h-5 rounded-full border border-[#061C0D]" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="w-5 h-5 rounded-full border border-[#061C0D]" src="https://randomuser.me/api/portraits/men/67.jpg" alt="User" />
              </div>
              <div className="w-7 h-5 rounded-md bg-[#FE8B00] text-[#061C0D] text-[7px] font-bold flex items-center justify-center shadow-sm ml-1">
                10K+
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* DESKTOP PC VIEW */}
      {/* ========================================================================= */}
      <div className="hidden lg:block pb-16">
        
        {/* 1. PC Hero Section */}
        <section className="hidden lg:flex relative bg-[#092813] hero-bg-animated text-white pt-14 pb-4 overflow-hidden min-h-[420px] items-center mb-12">
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
              
              {/* Left Content */}
              <div className="col-span-7 space-y-4 lg:space-y-6 text-left">
                <div className="inline-block border border-[#FE8B00] text-[#FE8B00] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-sans mb-2">
                  About Swavalambi India
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[66px] font-bold leading-tight">
                  Rooted In Tradition. <br />
                  <span className="text-[#FE8B00]">Committed To Your Wellness.</span>
                </h1>
                <p className="text-white/80 font-sans text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed max-w-xl">
                  At Swavalambi India, we blend the timeless wisdom of Tradition with modern research to create safe, effective and high-quality wellness products for a healthier you, every day.
                </p>
                
                {/* Feature Tags inline */}
                <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold uppercase tracking-wider font-sans text-white/90">
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Leaf size={11} className="text-[#FE8B00]" /> Inspired by Premium Quality
                  </span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Microscope size={11} className="text-[#FE8B00]" /> Backed by Science
                  </span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Heart size={11} className="text-[#FE8B00]" /> Made with Care
                  </span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Users size={11} className="text-[#FE8B00]" /> Trusted by Customers
                  </span>
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

        {/* New Founder Story Section (Desktop) */}
        <section id="founder-story" className="py-12 bg-[#F9FDF9] relative z-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-12 gap-0 items-stretch bg-white border border-gray-155 rounded-[32px] overflow-hidden shadow-md">
              
              {/* Left Column: Image (5 cols) - Overlap enabled */}
              <div className="col-span-5 relative min-h-[520px] overflow-visible">
                <img 
                  src="/assets/content/vaibhav-dhus.PNG" 
                  alt="Vaibhav Dhus Founder" 
                  className="absolute inset-y-0 left-0 w-[calc(100%+120px)] h-full object-cover select-none pointer-events-none z-0 max-w-none"
                />
              </div>

              {/* Right Column: Story & Details (7 cols) - Uses curved background */}
              <div className="col-span-7 p-8 pl-16 flex flex-col justify-between text-left font-sans bg-transparent relative min-h-[520px]">
                
                {/* SVG Background Curve masking the overlap */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 700 1000" preserveAspectRatio="none">
                  {/* Ivory background path */}
                  <path 
                    d="M 0,0 L 700,0 L 700,1000 L 0,1000 C 120,750 120,250 0,0 Z" 
                    fill="#F9FDF9" 
                  />
                  {/* Gold border path */}
                  <path 
                    d="M 0,0 C 120,250 120,750 0,1000" 
                    fill="none" 
                    stroke="#FE8B00" 
                    strokeWidth="4" 
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Content wrapper to float on top of SVG */}
                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  <div>
                    {/* Founder Story tag with diamond flanking lines */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-[6px] text-[#FE8B00]">♦</span>
                        <div className="h-[1px] w-12 bg-[#FE8B00]/60"></div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#092813] font-sans">Founder Story</span>
                      <div className="flex items-center gap-1">
                        <div className="h-[1px] w-12 bg-[#FE8B00]/60"></div>
                        <span className="text-[6px] text-[#FE8B00]">♦</span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h2 className="font-serif text-3xl lg:text-4xl font-extrabold text-[#092813] leading-tight mb-2">
                      From <span className="text-[#FE8B00]">Purpose</span> <br />
                      To <span className="text-[#FE8B00]">Transformation</span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-[9px] lg:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                      THE VISION BEHIND SWAVALAMBI INDIA
                    </p>

                    {/* List of 4 points */}
                    <div className="space-y-6">
                      {/* Point 1 */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                          <Leaf size={24} />
                        </div>
                        <div>
                          <h4 className="text-[12px] lg:text-[13px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">A Journey Driven by Purpose</h4>
                          <p className="text-[11px] lg:text-xs text-gray-600 leading-relaxed font-medium">
                            Swavalambi India was founded with a simple yet powerful mission — to create high-quality wellness solutions that genuinely improve lives while maintaining the wisdom of Tradition and the standards of modern healthcare.
                          </p>
                        </div>
                      </div>

                      {/* Point 2 */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                          <ShieldCheck size={24} />
                        </div>
                        <div>
                          <h4 className="text-[12px] lg:text-[13px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">Building Trust Through Results</h4>
                          <p className="text-[11px] lg:text-xs text-gray-600 leading-relaxed font-medium">
                            Under the leadership of Vaibhav Dhus, Swavalambi India has focused on delivering products designed to support long-term wellness, customer trust and meaningful transformation.
                          </p>
                        </div>
                      </div>

                      {/* Point 3 */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                          <FlaskConical size={24} />
                        </div>
                        <div>
                          <h4 className="text-[12px] lg:text-[13px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">A Commitment to Excellence</h4>
                          <p className="text-[11px] lg:text-xs text-gray-600 leading-relaxed font-medium">
                            Every formulation reflects a commitment to quality, research, authenticity and customer satisfaction, helping our customers move toward healthier lives.
                          </p>
                        </div>
                      </div>

                      {/* Point 4 */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] bg-white shrink-0 shadow-sm">
                          <TrendingUp size={24} />
                        </div>
                        <div>
                          <h4 className="text-[12px] lg:text-[13px] font-bold text-[#FE8B00] uppercase tracking-wider mb-0.5">The Road Ahead</h4>
                          <p className="text-[11px] lg:text-xs text-gray-650 leading-relaxed font-medium">
                            The vision continues to expand with innovation, education and wellness solutions that empower people to live healthier, stronger and more confident lives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signature, Name, and Bottom Card */}
                  <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col gap-6">
                    {/* Signature block */}
                    <div className="flex justify-between items-end">
                      <div className="leading-tight">
                        <span className="font-hand text-3xl text-[#FE8B00] block mb-1">Vaibhav Dhus</span>
                        <h4 className="text-[10px] font-extrabold text-[#092813] uppercase tracking-wider">Vaibhav Dhus</h4>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Founder, Swavalambi India</span>
                      </div>
                    </div>

                    {/* Core values bottom sub-card */}
                    <div className="border border-[#FE8B00]/40 rounded-xl p-4 bg-white shadow-sm grid grid-cols-4 gap-2 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Award size={26} className="text-[#FE8B00] mb-1" />
                        <span className="text-[10px] font-black text-[#092813] uppercase tracking-wider mt-1.5">Quality Focused</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-gray-100 font-sans">
                        <Leaf size={26} className="text-[#FE8B00] mb-1" />
                        <span className="text-[10px] font-black text-[#092813] uppercase tracking-wider mt-1.5">Tradition Inspired</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-gray-100 font-sans">
                        <Users size={26} className="text-[#FE8B00] mb-1" />
                        <span className="text-[10px] font-black text-[#092813] uppercase tracking-wider mt-1.5">Customer First</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-gray-100 font-sans">
                        <Lightbulb size={26} className="text-[#FE8B00] mb-1" />
                        <span className="text-[10px] font-black text-[#092813] uppercase tracking-wider mt-1.5">Innovation Driven</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 2. PC Mission, Vision & Core Values Section */}
        <section className="container mx-auto px-6 max-w-5xl mb-12">
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Mission & Vision Stack (5 cols) */}
            <div className="col-span-5 space-y-4">
              
              {/* Our Mission */}
              <div className="bg-[#F9FDF9] border border-gray-150 rounded-2xl p-6 shadow-sm text-left relative overflow-hidden group/card">
                {/* Leaf Watermarks */}
                <div className="absolute -bottom-4 -left-4 text-[#092813]/5 pointer-events-none select-none">
                  <Leaf size={72} className="rotate-45" />
                </div>
                <div className="absolute -bottom-2 -right-4 text-[#092813]/5 pointer-events-none select-none">
                  <Leaf size={60} className="-rotate-12" />
                </div>

                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#092813] border border-[#FE8B00]/50 flex items-center justify-center text-[#FE8B00] shadow-sm shrink-0">
                    <Target size={22} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed relative z-10 pl-16 -mt-2">
                  To make authentic Authentic wellness accessible to every home and help people live healthier, effectively.
                </p>
              </div>

              {/* Our Vision */}
              <div className="bg-[#F9FDF9] border border-gray-150 rounded-2xl p-6 shadow-sm text-left relative overflow-hidden group/card">
                {/* Leaf Watermarks */}
                <div className="absolute -bottom-4 -left-4 text-[#092813]/5 pointer-events-none select-none">
                  <Leaf size={72} className="rotate-45" />
                </div>
                <div className="absolute -bottom-2 -right-4 text-[#092813]/5 pointer-events-none select-none">
                  <Leaf size={60} className="-rotate-12" />
                </div>

                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#FE8B00] border border-[#092813]/20 flex items-center justify-center text-white shadow-sm shrink-0">
                    <Eye size={22} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed relative z-10 pl-16 -mt-2">
                  To be a trusted global Authentic brand that empowers better lives through pure, premium and effective solutions.
                </p>
              </div>

            </div>

            {/* Right Column: Values list (7 cols) */}
            <div className="col-span-7 text-left pl-8 border-l border-gray-200 relative pt-2">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="font-serif text-lg font-bold text-[#092813]">Our Core Values</h3>
                <div className="h-[1px] w-12 bg-[#FE8B00]"></div>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-2 divide-x divide-gray-200 w-full">
                {[
                  { icon: Leaf, title: "Purity", desc: "Pure ingredients, premium goodness." },
                  { icon: ShieldCheck, title: "Trust", desc: "Honest practices and complete transparency." },
                  { icon: Sprout, title: "Effectiveness", desc: "Backed by research to deliver real results." },
                  { icon: Users, title: "Care", desc: "We care for our customers and their wellness journey." },
                  { icon: Award, title: "Quality", desc: "Highest quality in every product we make." }
                ].map((v, idx) => (
                  <div key={idx} className={`flex flex-col items-center text-center space-y-2 ${idx > 0 ? 'pl-2' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-[#EBF1E6] border border-[#092813]/10 flex items-center justify-center text-[#092813] shadow-sm shrink-0">
                      <v.icon size={16} />
                    </div>
                    <h4 className="text-[11px] font-bold text-[#092813] font-sans">{v.title}</h4>
                    <p className="text-[9px] text-gray-500 leading-normal font-sans">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3. PC Stats, Story & Collage Section */}
        <section className="container mx-auto px-6 max-w-5xl mb-6">
          <div className="grid grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Numbers card (5 cols) */}
            <div className="col-span-5 bg-[#061C0D] border border-[#FE8B00]/35 rounded-[20px] p-6 shadow-xl text-white">
              <div className="text-center mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full border-t border-[#FE8B00]/20"></div>
                </div>
                <span className="relative bg-[#061C0D] px-4 text-xs font-bold uppercase tracking-widest text-[#FE8B00] font-sans">
                  Swavalambi In Numbers
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center w-full">
                <div className="flex flex-col items-center">
                  <Users size={20} className="text-[#FE8B00] mb-2" />
                  <div className="text-base font-bold text-white">10,000+</div>
                  <div className="text-[8px] text-white/70 font-sans mt-0.5 leading-tight">Happy Customers</div>
                </div>

                <div className="flex flex-col items-center border-l border-[#FE8B00]/10">
                  <Package size={20} className="text-[#FE8B00] mb-2" />
                  <div className="text-base font-bold text-white">50,000+</div>
                  <div className="text-[8px] text-white/70 font-sans mt-0.5 leading-tight">Orders Delivered</div>
                </div>

                <div className="flex flex-col items-center border-l border-[#FE8B00]/10">
                  <FlaskConical size={20} className="text-[#FE8B00] mb-2" />
                  <div className="text-base font-bold text-white">100%</div>
                  <div className="text-[8px] text-white/70 font-sans mt-0.5 leading-tight">Carefully Crafted</div>
                </div>

                <div className="flex flex-col items-center border-l border-[#FE8B00]/10">
                  <ShieldCheck size={20} className="text-[#FE8B00] mb-2" />
                  <div className="text-base font-bold text-white">Quality</div>
                  <div className="text-[8px] text-white/70 font-sans mt-0.5 leading-tight">Assured</div>
                </div>
              </div>
            </div>

            {/* Center Column: Our Story (4 cols) */}
            <div className="col-span-4 text-left flex flex-col justify-between py-2 pl-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#FE8B00] font-sans">
                  <span>Our Story</span>
                  <div className="h-[1px] w-8 bg-[#FE8B00]"></div>
                </div>
                <h3 className="font-serif text-[22px] font-bold text-[#092813] leading-snug">
                  The Perfect Blend Of <br /> Ancient Wisdom <br /> & Modern Science
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Our journey began with a simple belief - Tradition has the power to heal and enhance lives. Today, we combine traditional herbs with modern technology to create products you can trust.
                </p>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="bg-[#092813] hover:bg-[#06281C] text-white text-[10px] font-bold uppercase tracking-wider py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all mt-4 self-start flex items-center gap-2 border border-[#FE8B00]/20"
              >
                <span>Know More About Our Journey</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Right Column: Collage (3 cols) */}
            <div className="col-span-3 flex gap-3 items-center justify-end">
              {/* Left Stack (2 small images) */}
              <div className="flex flex-col gap-3">
                {/* Sprout collage item */}
                <div className="w-[84px] h-[84px] rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                  <img 
                    src="/assets/content/journal-1.jpeg" 
                    alt="Story Sprout" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Microscope collage item */}
                <div className="w-[84px] h-[84px] rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                  <img 
                    src="/assets/content/journal-2.jpeg" 
                    alt="Story Microscope" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Big Image (mortar collage item) */}
              <div className="w-[124px] h-[180px] rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                <img 
                  src="/assets/content/journal-3.jpeg" 
                  alt="Story Preparation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
};

// Helper component for Star svg inside seal badge
const StarFill: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" className="fill-current text-[#FE8B00] shrink-0" style={{ width: size, height: size }}>
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
  </svg>
);

export default About;
