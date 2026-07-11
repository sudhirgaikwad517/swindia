import React, { useRef } from 'react';
import { Star, MessageCircle, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { REVIEW_SUMMARY, CUSTOMER_REVIEWS, CUSTOMER_VIDEOS } from '../productContent';

const Reviews: React.FC = () => {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const videoScrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pt-[106px] lg:pt-[80px] pb-20 min-h-screen bg-[#F7F9F2] font-sans antialiased text-gray-800">
      
      <div className="bg-[#092813] text-white py-12 lg:py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1 bg-[#FE8B00] text-[#061C0D] text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            <Sparkles size={11} className="fill-current" />
            <span>Real Results</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Loved by Our Customers
          </h1>
          <p className="text-white/80 font-sans text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Real photos and experiences from customers who chose Swavalambi India Sea Buckthorn Juice.
          </p>
          
          <div className="flex justify-center items-center gap-2 pt-2 text-xs font-bold text-white/90">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => {
                const fill = Math.min(1, Math.max(0, REVIEW_SUMMARY.rating - (s - 1)));
                return (
                  <span key={s} className="relative inline-block w-4 h-4">
                    <Star size={16} className="absolute inset-0 text-white/25 fill-white/25" />
                    <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                      <Star size={16} className="text-[#96C77E] fill-[#96C77E]" />
                    </span>
                  </span>
                );
              })}
            </div>
            <span>{REVIEW_SUMMARY.rating}/5 Rating based on {REVIEW_SUMMARY.total.toLocaleString()}+ happy customers</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl mt-10">
        <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => {
                  const fill = Math.min(1, Math.max(0, REVIEW_SUMMARY.rating - (s - 1)));
                  return (
                    <span key={s} className="relative inline-block w-4 h-4">
                      <Star size={16} className="absolute inset-0 text-gray-200 fill-gray-200" />
                      <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                        <Star size={16} className="text-[#96C77E] fill-[#96C77E]" />
                      </span>
                    </span>
                  );
                })}
              </div>
              <span className="text-sm font-bold text-gray-800">
                {REVIEW_SUMMARY.total.toLocaleString()} Reviews
              </span>
            </div>
            <button
              type="button"
              onClick={() => window.open('https://wa.me/9172727702?text=Hi%2C%20I%20want%20to%20share%20a%20review%20for%20Sea%20Buckthorn%20Juice.', '_blank')}
              className="bg-[#96C77E] hover:bg-[#86b56e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              Write A Review
            </button>
          </div>

          <div className="space-y-2 max-w-xl">
            {REVIEW_SUMMARY.breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                <span className="w-3 text-gray-700 font-bold tabular-nums">{row.stars}</span>
                <Star size={12} className="text-[#96C77E] fill-[#96C77E] shrink-0" />
                <div className="flex-1 h-2.5 rounded-full bg-gray-200/70 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#96C77E]"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-gray-700 font-semibold tabular-nums">{row.count}</span>
                <span className="w-10 text-right text-[#96C77E] font-semibold tabular-nums">({row.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer videos — reels-style */}
      {CUSTOMER_VIDEOS.length > 0 && (
        <div className="container mx-auto px-6 max-w-5xl mt-12">
          <div className="text-left mb-4 border-l-4 border-[#092813] pl-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#092813]">Customer Videos</h2>
            <p className="text-xs text-gray-550 font-semibold mt-1">Watch real experiences from our customers.</p>
          </div>
          <div className="relative">
            <div
              ref={videoScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CUSTOMER_VIDEOS.map((vid) => (
                <div
                  key={vid.id}
                  className="relative shrink-0 w-[42%] sm:w-[28%] lg:w-[18%] aspect-[9/16] rounded-xl overflow-hidden bg-black snap-start border border-gray-200 shadow-sm"
                >
                  <video
                    ref={(node) => {
                      videoRefs.current[vid.id] = node;
                      if (node) {
                        node.muted = true;
                        node.play().catch(() => {});
                      }
                    }}
                    src={vid.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="auto"
                  />
                </div>
              ))}
            </div>
            {CUSTOMER_VIDEOS.length > 2 && (
              <button
                type="button"
                onClick={() => videoScrollRef.current?.scrollBy({ left: 180, behavior: 'smooth' })}
                className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-600 hover:text-[#092813] cursor-pointer"
                aria-label="Next videos"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-5xl mt-12">
        <div className="text-left mb-8 border-l-4 border-[#092813] pl-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#092813]">Customer Photo Reviews</h2>
          <p className="text-xs text-gray-550 font-semibold mt-1">Real product photos shared by our customers.</p>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CUSTOMER_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-150 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 text-left snap-start shrink-0 w-[80%] sm:w-[48%] lg:w-[32%]"
              >
                {rev.image && (
                  <div className="aspect-[4/3] bg-[#F7F9F2] overflow-hidden">
                    <img
                      src={rev.image}
                      alt={`${rev.name} review`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1 justify-between min-h-[150px]">
                  <div className="space-y-2">
                    <div className="flex text-[#96C77E] gap-0.5">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className={`w-3 h-3 ${sIdx < rev.rating ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} />
                      ))}
                    </div>
                    <h4 className="text-xs font-black text-gray-900">{rev.title}</h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium line-clamp-3">"{rev.text}"</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-4">
                    <h4 className="text-xs font-black text-gray-900">{rev.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold">{rev.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 font-semibold mt-2 text-center sm:hidden">← Swipe for more reviews →</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl mt-16">
        <div className="bg-[#092813] text-white border border-[#FE8B00]/25 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FE8B00] leading-snug">Have a specific health concern?</h3>
            <p className="text-xs text-white/80 max-w-lg leading-relaxed">
              Get personalized consultations and health guidance from our authentic practitioners completely free.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.open('https://wa.me/9172727702?text=Hi%2C%20I%20need%20a%20consultation.', '_blank')}
            className="bg-[#FE8B00] hover:bg-[#e67e00] text-[#061C0D] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <MessageCircle size={14} />
            Talk to Expert
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
