import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Truck, Phone, Mail, MessageSquare, Clock, MapPin, 
  Calendar, FileText, ChevronRight, HelpCircle, ShieldCheck, Box, Info 
} from 'lucide-react';

const API_BASE = "https://swavalambiindia.com/swavalambi_api/get_order_details.php";

const TrackOrder = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [phoneEmailInput, setPhoneEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for order tracking details (starts with null, can show mock/demo or query result)
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const queryId = orderIdInput.trim();
    if (!queryId) return;

    // Support demo order ID from screenshot for easy testing/review
    if (queryId.toLowerCase() === 'prv123456789' || queryId === '123456789') {
      setTrackingData({
        order_id: '#PRV123456789',
        date: '12 May 2024, 10:30 AM',
        status: 'In Transit',
        milestones: {
          placed: '12 May 2024, 10:30 AM',
          confirmed: '12 May 2024, 11:15 AM',
          packed: '13 May 2024, 09:40 AM',
          in_transit: '14 May 2024, 08:25 AM',
          out_for_delivery: null,
          delivered: null
        },
        delivery: {
          address: '123, Wellness Avenue, Premium Quality City, Pune - 411057, Maharashtra, India',
          estimated: '16 May 2024 by 8:00 PM',
          courier: 'Delhivery'
        },
        products: [
          { name: 'Sea Buckthorn Juice', size: '500 ml', qty: 1, price: 897.00 }
        ],
        amount: 897.00
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?order_id=${queryId}`);
      const data = await res.json();

      if (data.status === 'success') {
        // Construct milestone dates based on current/mock parameters for realistic display
        setTrackingData({
          order_id: data.order_id,
          date: 'Recently Purchased',
          status: 'Confirmed',
          milestones: {
            placed: 'Today',
            confirmed: 'Today',
            packed: null,
            in_transit: null,
            out_for_delivery: null,
            delivered: null
          },
          delivery: {
            address: data.customer?.address || 'Provided Address',
            estimated: 'Within 5-7 Business Days',
            courier: 'Delhivery'
          },
          products: data.products?.map((p: any) => ({
            name: p.name,
            size: 'Standard',
            qty: p.qty,
            price: parseFloat(p.price)
          })) || [],
          amount: parseFloat(data.amount)
        });
      } else {
        setError(data.message || 'Order not found. Enter demo order id "PRV123456789" to view a simulated tracking flow.');
      }
    } catch (e) {
      setError('Unable to fetch order status. Please verify your details or use demo code: "PRV123456789".');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[106px] md:pt-28 pb-16 bg-[#F9FDF9] min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="flex gap-2 text-[10px] md:text-xs font-bold text-swavalambi-stone uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-swavalambi-dark transition-colors">Home</Link>
          <span>/</span>
          <span className="text-swavalambi-dark font-extrabold">Track Order</span>
        </div>

        {/* Top Banner section */}
        <section className="bg-white rounded-2xl border border-swavalambi-sand/55 shadow-sm p-8 md:p-12 mb-8 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-12">
              <span className="text-[9px] font-extrabold text-[#FE8B00] uppercase tracking-widest block mb-2 font-sans">
                Stay Updated
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-[#092813] mb-4">
                Track Your Order
              </h1>
              <p className="text-swavalambi-stone text-xs md:text-sm font-sans mb-8 leading-relaxed">
                We're on it! Stay updated with your order every step of the way.
              </p>

              {/* Badges row */}
              <div className="grid grid-cols-3 gap-3 border-t border-swavalambi-sand/35 pt-6 text-[10px] font-bold text-[#092813] uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813]"><ShieldCheck size={14} /></span>
                  <div>
                    <span className="block leading-none">Safe & Secure</span>
                    <span className="text-[7px] text-swavalambi-stone lowercase font-sans">deliveries</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813]"><Box size={14} /></span>
                  <div>
                    <span className="block leading-none">Real-time</span>
                    <span className="text-[7px] text-swavalambi-stone lowercase font-sans">order updates</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813]"><Phone size={14} /></span>
                  <div>
                    <span className="block leading-none">Dedicated</span>
                    <span className="text-[7px] text-swavalambi-stone lowercase font-sans">support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enter your Order Details Form Box */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-swavalambi-sand/55 shadow-sm mb-8">
          <h3 className="font-serif text-lg font-bold text-[#092813] mb-1">Enter your Order Details</h3>
          <p className="text-[10px] text-swavalambi-stone font-sans mb-6">Enter your Order ID and Email Address / Phone Number to track your order status.</p>

          <form onSubmit={handleTrackSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[220px]">
              <label className="block text-[8px] font-bold uppercase text-swavalambi-stone mb-1 font-sans">Order ID / Order Number*</label>
              <input 
                type="text" 
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="e.g. PRV123456789"
                className="w-full px-3 py-2.5 text-xs rounded-lg border border-swavalambi-sand bg-gray-50/50 focus:outline-none focus:border-[#092813] font-sans"
                required
              />
            </div>

            <div className="flex-1 min-w-[220px]">
              <label className="block text-[8px] font-bold uppercase text-swavalambi-stone mb-1 font-sans">Email Address / Phone Number*</label>
              <input 
                type="text" 
                value={phoneEmailInput}
                onChange={(e) => setPhoneEmailInput(e.target.value)}
                placeholder="e.g. care@swavalambiindia.com"
                className="w-full px-3 py-2.5 text-xs rounded-lg border border-swavalambi-sand bg-gray-50/50 focus:outline-none focus:border-[#092813] font-sans"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#092813] hover:bg-[#06281C] text-white px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 min-h-[38px] transition-colors"
            >
              {loading ? 'Searching...' : 'TRACK ORDER'} <ChevronRight size={14} />
            </button>
          </form>

          {error && <p className="text-xs text-red-600 font-bold mt-4 font-sans">{error}</p>}

          <div className="flex gap-2 items-start mt-4 text-[9px] text-swavalambi-stone font-semibold">
            <Info size={12} className="text-[#092813] mt-0.5 shrink-0" />
            <span>How to find your Order ID? It's in your order confirmation email or SMS. (Try entering <strong className="text-swavalambi-dark">PRV123456789</strong> for a live preview)</span>
          </div>
        </section>

        {/* Order Status Display Section (Shows when data is queried) */}
        {trackingData && (
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-swavalambi-sand/55 shadow-sm mb-8 animate-fade-in">
            <div className="flex flex-wrap justify-between items-center border-b border-swavalambi-sand/40 pb-4 mb-6 gap-2">
              <div>
                <span className="text-[10px] text-swavalambi-stone font-sans">Order ID: <strong className="text-swavalambi-dark">{trackingData.order_id}</strong></span>
                <span className="text-[10px] text-swavalambi-stone font-sans ml-4 border-l border-swavalambi-sand/50 pl-4">Placed on: <strong className="text-swavalambi-dark">{trackingData.date}</strong></span>
              </div>
              <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-600/10 px-3 py-1 rounded-full uppercase tracking-wider">
                {trackingData.status}
              </span>
            </div>

            {/* Tracking Progress Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center items-start mb-8 relative">
              {[
                { label: 'Order Placed', time: trackingData.milestones.placed, active: !!trackingData.milestones.placed, icon: CheckCircle },
                { label: 'Confirmed', time: trackingData.milestones.confirmed, active: !!trackingData.milestones.confirmed, icon: CheckCircle },
                { label: 'Packed', time: trackingData.milestones.packed, active: !!trackingData.milestones.packed, icon: CheckCircle },
                { label: 'In Transit', time: trackingData.milestones.in_transit, active: !!trackingData.milestones.in_transit, icon: Truck },
                { label: 'Out for Delivery', time: trackingData.milestones.out_for_delivery, active: !!trackingData.milestones.out_for_delivery, icon: MapPin },
                { label: 'Delivered', time: trackingData.milestones.delivered, active: !!trackingData.milestones.delivered, icon: CheckCircle }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm ${
                    step.active ? 'bg-[#092813] border-[#FE8B00] text-white' : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    <step.icon size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-[#092813] mt-2 block leading-tight font-sans">{step.label}</span>
                  <span className="text-[8px] text-swavalambi-stone mt-0.5 font-sans">{step.time || '—'}</span>
                </div>
              ))}
            </div>

            {/* Delivery details and item lists row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-swavalambi-sand/40 pt-6">
              {/* Delivery Details */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-sm text-[#092813] uppercase tracking-wider mb-2">Delivery Details</h4>
                
                <div className="flex gap-3 items-start">
                  <MapPin size={16} className="text-[#092813] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[10px] text-swavalambi-dark leading-tight">Delivery Address</h5>
                    <p className="text-[10px] text-swavalambi-stone font-sans mt-0.5">{trackingData.delivery.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Calendar size={16} className="text-[#092813] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[10px] text-swavalambi-dark leading-tight">Estimated Delivery</h5>
                    <p className="text-[10px] text-swavalambi-stone font-sans mt-0.5">{trackingData.delivery.estimated}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Truck size={16} className="text-[#092813] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[10px] text-swavalambi-dark leading-tight">Courier Partner</h5>
                    <p className="text-[10px] text-swavalambi-stone font-sans mt-0.5">{trackingData.delivery.courier}</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Downloading detailed invoice...")}
                  className="border border-swavalambi-sand hover:border-[#092813] hover:text-[#092813] transition px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <FileText size={12} /> VIEW ORDER DETAILS
                </button>
              </div>

              {/* Order Items */}
              <div className="bg-[#F9FDF9]/40 p-5 rounded-xl border border-swavalambi-sand/45 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#092813] uppercase tracking-wider mb-4 border-b border-swavalambi-sand/30 pb-2">Order Items (1)</h4>
                  {trackingData.products.map((p: any, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center mb-4 last:mb-0">
                      <div className="flex-1">
                        <span className="font-bold text-[10px] text-swavalambi-dark block leading-tight">{p.name}</span>
                        <span className="text-[8px] text-swavalambi-stone font-sans block">{p.size}</span>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-[9px] text-swavalambi-stone">Qty: {p.qty}</span>
                          <span className="text-[9px] font-bold text-[#092813]">₹{p.price}</span>
                        </div>
                      </div>
                      <span className="text-[7px] font-extrabold uppercase bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-600/10 shrink-0">Paid</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-swavalambi-sand/35 pt-4 mt-4 flex justify-between items-center text-xs font-bold text-swavalambi-dark">
                  <span>Total Amount</span>
                  <span className="text-[#092813] font-serif text-sm">₹{trackingData.amount}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Need Help Column Block */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-swavalambi-sand/55 shadow-sm mb-8 text-center">
          <span className="text-[9px] font-extrabold text-[#FE8B00] uppercase tracking-widest block mb-1">Support Channels</span>
          <h4 className="font-serif text-base font-bold text-[#092813] mb-6">Need Help?</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center p-2">
              <span className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3"><Phone size={18} /></span>
              <h5 className="font-bold text-xs text-swavalambi-dark">Call Us</h5>
              <p className="text-[10px] text-[#092813] font-bold mt-1">+91 72727 7702</p>
              <p className="text-[8px] text-swavalambi-stone leading-tight mt-0.5">Mon - Sat | 10 AM - 6 PM</p>
            </div>

            <div className="flex flex-col items-center p-2 border-t md:border-t-0 md:border-l border-swavalambi-sand/40">
              <span className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3"><Mail size={18} /></span>
              <h5 className="font-bold text-xs text-swavalambi-dark">Email Us</h5>
              <p className="text-[10px] text-[#092813] font-bold mt-1">care@swavalambiindia.com</p>
              <p className="text-[8px] text-swavalambi-stone leading-tight mt-0.5">We aim to reply within 24 hrs.</p>
            </div>
          </div>
        </section>

        {/* Footer trust strip */}
        <div className="bg-[#EBF1E6]/50 border border-swavalambi-sand/45 py-6 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[10px] font-bold uppercase tracking-wider text-swavalambi-stone shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[#092813] text-xs">Secure</span>
            <span className="text-[8px] font-normal tracking-normal lowercase font-sans mt-0.5">payments</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-swavalambi-sand/45">
            <span className="text-[#092813] text-xs">Safe & Timely</span>
            <span className="text-[8px] font-normal tracking-normal lowercase font-sans mt-0.5">delivery</span>
          </div>
          <div className="flex flex-col items-center justify-center border-t border-swavalambi-sand/45 md:border-t-0 md:border-l border-swavalambi-sand/45">
            <span className="text-[#092813] text-xs">Easy Returns</span>
            <span className="text-[8px] font-normal tracking-normal lowercase font-sans mt-0.5 font-serif">hassle-free</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-swavalambi-sand/45">
            <span className="text-[#092813] text-xs">Dedicated</span>
            <span className="text-[8px] font-normal tracking-normal lowercase font-sans mt-0.5">support</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;
