import React from 'react';
import { Star, MessageCircle, Play, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const Reviews: React.FC = () => {
  const writtenReviews = [
    {
      name: "Rajesh Patil",
      location: "Pune, Maharashtra",
      rating: 5,
      date: "May 24, 2026",
      text: "Swavalambi Sea Buckthorn Juice vaprayla suruvat kelyanantar mazi sugar levels khup changlya paddhatine control madhe aali aahe. Mala aata fatigue ani weakness janvat nahi. Energy levels khup active ahet. Khup chan Authentic product aahe!"
    },
    {
      name: "Sneha Kulkarni",
      location: "Mumbai, Maharashtra",
      rating: 5,
      date: "May 18, 2026",
      text: "Maza aai sathi mi he combo order kela hota. Ek mahinyatach ticha HbA1c levels madhe khup changla badal disla. Khas karun kontech side-effects nahit, completely premium ani organic aahe. Highly recommended!"
    },
    {
      name: "Amol Deshmukh",
      location: "Nashik, Maharashtra",
      rating: 5,
      date: "May 12, 2026",
      text: "Aamcha poorna kutumbat sugar problems sathi aamhi Swavalambi India chich products vaparto. Sea Buckthorn Juice ani Syrup cha combination apratim aahe. Sugar spikes control karayla he khupch madat karte."
    },
    {
      name: "Prakash Shinde",
      location: "Kolhapur, Maharashtra",
      rating: 5,
      date: "May 05, 2026",
      text: "Kolhapur madhe mazyakade delivery khup fast milali. 3 mahine vaparlyanantar mazi sugar test reports normal aali ahet. Sea Buckthorn Juice mazyasathi ek varadaan tharle aahe."
    },
    {
      name: "Savita Pawar",
      location: "Chhatrapati Sambhajinagar, Maharashtra",
      rating: 5,
      date: "April 28, 2026",
      text: "Sea Buckthorn Juices khup convenient ahet. Office madhe astana ghenyasaathi sophe padte. Tasach herbal ingredients aslyamule potala ras hot nahi aani digestion pan khup changle zale aahe."
    },
    {
      name: "Rahul Gaikwad",
      location: "Solapur, Maharashtra",
      rating: 5,
      date: "April 20, 2026",
      text: "Authentic medicines madhe maza vishwas navhta, pan Swavalambi Sea Buckthorn Juice che results pahun maza vichar badalla. Sugar levels maintain thevnyaat aani divasbhaar taaje-tawane vatnyaat yacha khup motha वाटा aahe."
    },
    {
      name: "Deepali Chavan",
      location: "Thane, Maharashtra",
      rating: 5,
      date: "April 15, 2026",
      text: "Quality khupch changli aahe. Heavy metals tested aslyamule aamhi nirbhaypane vapru shakto. Packaging pan khup premium aani safe hoti. Dhanyawad Swavalambi team!"
    },
    {
      name: "Sanjay More",
      location: "Satara, Maharashtra",
      rating: 5,
      date: "April 02, 2026",
      text: "Genuine Authentic formula aahe. Karela, Jamun aani Gudmar cha yogya pramanasathi mazyasathi khup labhdayak tharle. Sugar management sathi sarvat uttam paryay!"
    },
    {
      name: "Anjali Joshi",
      location: "Sangli, Maharashtra",
      rating: 5,
      date: "March 25, 2026",
      text: "Maza HbA1c khup jaast hota, pan regular syrup ghetlyaamule khup khali aala aahe. Authentic lifestyle aani Swavalambi products chya madatine mala navin ayushya milale."
    }
  ];

  return (
    <div className="pt-[106px] lg:pt-[80px] pb-20 min-h-screen bg-[#F9FDF9] font-sans antialiased text-gray-800">
      
      {/* 1. Page Header Section */}
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
            Read authentic experiences and check reviews from genuine Maharashtrian families who transformed their wellness journey with Swavalambi India.
          </p>
          
          <div className="flex justify-center items-center gap-2 pt-2 text-xs font-bold text-white/90">
            <div className="flex text-[#FE8B00] gap-0.5">
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
            </div>
            <span>4.8/5 Rating based on 10,000+ happy customers</span>
          </div>
        </div>
      </div>



      {/* 3. Written Maharashtrian Reviews Grid */}
      <div className="container mx-auto px-6 max-w-5xl mt-16">
        <div className="text-left mb-8 border-l-4 border-[#092813] pl-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#092813]">Customer Experiences</h2>
          <p className="text-xs text-gray-550 font-semibold mt-1">Verified reviews from our valued patrons in Maharashtra.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writtenReviews.map((rev, idx) => (
            <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 relative text-left">
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <div className="flex text-[#FE8B00] gap-0.5">
                    {[...Array(rev.rating)].map((_, sIdx) => (
                      <Star key={sIdx} className="fill-current w-3 h-3" />
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

      {/* 4. Authentic Expert Call-To-Action Banner */}
      <div className="container mx-auto px-6 max-w-5xl mt-16">
        <div className="bg-[#092813] text-white border border-[#FE8B00]/25 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FE8B00] leading-snug">Have a specific health concern?</h3>
            <p className="text-xs text-white/80 max-w-lg leading-relaxed">
              Get personalized consultations and health guidance from our authentic practitioners completely free.
            </p>
          </div>
          <button 
            onClick={() => window.open('https://wa.me/919373986362?text=Hi%20Swavalambi,%20I%20want%20to%20consult%20an%20Ayurvedic%2520Expert.', '_blank')}
            className="bg-[#25D366] text-white border border-[#25D366] rounded-full font-bold py-2.5 px-6 flex items-center gap-2 hover:bg-white hover:text-[#092813] hover:border-white transition-all text-xs uppercase tracking-wider shrink-0 shadow-md"
          >
            <MessageCircle size={15} className="fill-white group-hover:fill-current" />
            <span>Consult Expert</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Reviews;
