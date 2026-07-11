import React from 'react';
import { Star, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { REVIEW_SUMMARY } from '../productContent';

const Reviews: React.FC = () => {
  const writtenReviews = [
    {
      name: "Rajesh Patil",
      location: "Pune, Maharashtra",
      rating: 5,
      date: "May 24, 2026",
      text: "Swavalambi Sea Buckthorn Juice vaprayla suruvat kelyanantar mazi energy levels khup active ahet. Fatigue ani weakness kam zali. Khup chan Authentic product aahe!"
    },
    {
      name: "Sneha Kulkarni",
      location: "Mumbai, Maharashtra",
      rating: 5,
      date: "May 18, 2026",
      text: "Maza aai sathi mi he juice order kela hota. Ek mahinyatach tichi skin glow ani energy madhe khup changla badal disla. Completely premium ani natural aahe. Highly recommended!"
    },
    {
      name: "Amol Deshmukh",
      location: "Nashik, Maharashtra",
      rating: 4,
      date: "May 12, 2026",
      text: "Aamcha poorna kutumbat wellness sathi aamhi Swavalambi India chich products vaparto. Sea Buckthorn Juice apratim aahe. Daily immunity support sathi khup madat karte."
    },
    {
      name: "Prakash Shinde",
      location: "Kolhapur, Maharashtra",
      rating: 5,
      date: "May 05, 2026",
      text: "Kolhapur madhe mazyakade delivery khup fast milali. 3 mahine vaparlyanantar mala freshness ani stamina madhe fark disla. Sea Buckthorn Juice mazyasathi ek varadaan tharle aahe."
    },
    {
      name: "Savita Pawar",
      location: "Chhatrapati Sambhajinagar, Maharashtra",
      rating: 4,
      date: "April 28, 2026",
      text: "Sea Buckthorn Juice khup convenient aahe. Office madhe astana ghenyasaathi sophe padte. Herbal ingredients aslyamule digestion pan khup changle zale aahe."
    },
    {
      name: "Rahul Gaikwad",
      location: "Solapur, Maharashtra",
      rating: 5,
      date: "April 20, 2026",
      text: "Pehle natural juices madhe maza vishwas navhta, pan Swavalambi Sea Buckthorn Juice che results pahun maza vichar badalla. Divasbhaar taaje-tawane vatnyaat yacha motha wata aahe."
    },
    {
      name: "Deepali Chavan",
      location: "Thane, Maharashtra",
      rating: 5,
      date: "April 15, 2026",
      text: "Quality khupch changli aahe. Lab tested aslyamule aamhi nirbhaypane vapru shakto. Packaging pan khup premium aani safe hoti. Dhanyawad Swavalambi team!"
    },
    {
      name: "Sanjay More",
      location: "Satara, Maharashtra",
      rating: 4,
      date: "April 02, 2026",
      text: "Genuine Authentic formula aahe. Omega 3, 6, 7, 9 ani Vitamin C cha yogya pramanasathi mazyasathi khup labhdayak tharle. Daily wellness sathi uttam paryay!"
    },
    {
      name: "Anjali Joshi",
      location: "Sangli, Maharashtra",
      rating: 5,
      date: "March 25, 2026",
      text: "Regular use kelyanantar energy ani skin health madhe fark disla. Authentic lifestyle aani Swavalambi products chya madatine mala navin ayushya milale."
    }
  ];

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
            Read authentic experiences from families who transformed their wellness journey with Swavalambi India Sea Buckthorn Juice.
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
              onClick={() => window.open('https://wa.me/919373986362?text=Hi%2C%20I%20want%20to%20share%20a%20review%20for%20Sea%20Buckthorn%20Juice.', '_blank')}
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

      <div className="container mx-auto px-6 max-w-5xl mt-12">
        <div className="text-left mb-8 border-l-4 border-[#092813] pl-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#092813]">Customer Experiences</h2>
          <p className="text-xs text-gray-550 font-semibold mt-1">Verified reviews from our valued patrons.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writtenReviews.map((rev, idx) => (
            <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 relative text-left">
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <div className="flex text-[#96C77E] gap-0.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className={`w-3 h-3 ${sIdx < rev.rating ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-[9px] text-gray-400 font-semibold">{rev.date}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  "{rev.text}"
                </p>
              </div>
              
              <div className="border-t border-gray-100 pt-3 mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#092813]/10 flex items-center justify-center text-[#092813] font-black text-xs uppercase font-serif shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900">{rev.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
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
            onClick={() => window.open('https://wa.me/919373986362?text=Hi%2C%20I%20need%20a%20consultation.', '_blank')}
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
