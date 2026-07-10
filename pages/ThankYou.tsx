import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  ShoppingBag,
  Home,
  RefreshCcw,
  Loader2,
  FileText,
  Truck,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sprout,
  Check,
  MapPin,
  Calendar,
  Box,
  ClipboardList,
  Leaf,
  Headphones,
  CreditCard
} from 'lucide-react';

const API_BASE = "https://swavalambiindia.com/swavalambi_api/get_order_details.php";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  // prevents duplicate purchase events
  const purchaseTracked = useRef(false);

  /* ================= GET PARAMS ================= */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const st = params.get('status') || 'success';
    const id = params.get('order_id') || '';

    setStatus(st);
    setOrderId(id);
    
    if (id) {
      fetchOrder(id);
    } else {
      // Fallback for visual mock rendering
      setOrderData({
        order_id: 'PRV123456789',
        payment_method: 'cod',
        amount: '1598.00',
        customer: {
          email: 'care@swavalambiindia.com',
          phone: '+91 93739 86362'
        },
        products: []
      });
      setLoading(false);
    }
  }, [location]);

  /* ================= FETCH ORDER ================= */
  const fetchOrder = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}?order_id=${id}`);
      const data = await res.json();

      if (data.status === 'success') {
        setOrderData(data);
      } else {
        setOrderData({
          order_id: id,
          payment_method: 'cod',
          amount: '1598.00',
          customer: {
            email: 'care@swavalambiindia.com',
            phone: '+91 93739 86362'
          },
          products: []
        });
      }
    } catch (e) {
      setError('Unable to load order details');
    } finally {
      setLoading(false);
    }
  };

  /* ================= PURCHASE EVENT ================= */
  useEffect(() => {
    if (!orderData) return;
    if (status !== "success") return;
    if (purchaseTracked.current) return;

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value: parseFloat(orderData.amount),
        currency: "INR",
        content_type: "product",
        contents: orderData.products?.map((p: any) => ({
          id: p.sku || p.name,
          quantity: Number(p.qty),
          item_price: Number(p.price)
        })) || [],
        num_items: orderData.products?.length || 0
      });

      purchaseTracked.current = true;
      console.log("FB Purchase Fired");
    }
  }, [orderData, status]);

  const isSuccess = status === 'success';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#092813] font-sans bg-[#F9FDF9]">
        <Loader2 className="animate-spin mr-2" />
        Loading order details...
      </div>
    );
  }

  return (
    <div className="pt-[106px] md:pt-28 pb-16 bg-[#F9FDF9] min-h-screen font-sans text-gray-800 antialiased relative overflow-hidden">
      
      {/* Background Leaves decoration */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-20 hidden md:block">
        <Leaf size={120} className="text-[#092813] rotate-[15deg] fill-current opacity-5" />
      </div>
      <div className="absolute top-40 right-20 pointer-events-none opacity-20 hidden md:block">
        <Leaf size={90} className="text-[#092813] rotate-[45deg] fill-current opacity-5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        {/* HERO SECTION - CENTER ALIGNED EXACTLY LIKE MOCKUP */}
        <section className="py-8 md:py-12 mb-4 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="max-w-2xl flex flex-col items-center">
            
            {/* Check Circle Icon */}
            <div className="w-14 h-14 bg-[#E2ECE9] border-2 border-[#092813] rounded-full flex items-center justify-center text-[#092813] mb-5 shadow-sm">
              <Check size={28} strokeWidth={3} />
            </div>

            {/* Main Thank You Headers */}
            <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-[#092813] leading-tight mb-2 tracking-tight text-center">
              {isSuccess ? 'Thank You!' : 'Payment Failed'}
            </h1>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#0D382B] mb-3 tracking-tight text-center">
              {isSuccess ? 'Your Order is Confirmed' : 'Please Try Again'}
            </h2>

            {/* Leaf Separator */}
            <div className="flex items-center justify-center gap-2 my-3 text-[#FE8B00]">
              <span className="h-[1.5px] w-10 bg-[#FE8B00]/35 rounded-full"></span>
              <Leaf size={14} className="fill-current" />
              <span className="h-[1.5px] w-10 bg-[#FE8B00]/35 rounded-full"></span>
            </div>

            {/* Subtext */}
            <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed max-w-lg mb-6 text-center">
              {isSuccess 
                ? "We've received your order and it's now being processed. You will receive a confirmation email shortly."
                : "There was an issue processing your payment. Please verify your details or retry checkout."}
            </p>

            {isSuccess && (
              <div className="bg-[#EBF1E6] border border-[#092813]/10 rounded-2xl p-4 flex items-center justify-center gap-3 text-center max-w-md shadow-sm">
                <Leaf size={16} className="text-[#092813] shrink-0" />
                <div className="text-center">
                  <h4 className="text-[11px] font-bold text-[#092813] uppercase tracking-wider leading-none">Your wellness journey is our priority.</h4>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1">We truly appreciate your trust in Swavalambi India.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {isSuccess && orderData ? (
          <>
            {/* GRID DETAILS */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-150 p-6 md:p-10 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:divide-x divide-gray-150">
                
                {/* Column 1: Order Details */}
                <div className="pb-6 md:pb-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-[#EAF1EE] flex items-center justify-center text-[#092813] shrink-0">
                        <ClipboardList size={16} />
                      </div>
                      <h3 className="font-serif text-base font-extrabold text-gray-900 tracking-wide">Order Details</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
                      <div>
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                        <strong className="text-xs text-gray-900 font-mono mt-0.5 block">#{orderData.order_id}</strong>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order Date</span>
                        <strong className="text-xs text-gray-900 font-medium mt-0.5 block">
                          {orderData.created_at ? new Date(orderData.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Recently Purchased'}
                        </strong>
                      </div>
                      <div className="mt-1">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <Truck size={10} className="text-[#092813]" /> Estimated Delivery
                        </span>
                        <strong className="text-xs text-[#092813] font-medium mt-0.5 block">5-7 Business Days</strong>
                      </div>
                      <div className="mt-1">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <CreditCard size={10} className="text-[#092813]" /> Payment Method
                        </span>
                        <strong className="text-xs text-gray-900 font-medium mt-0.5 block">
                          {orderData.payment_method === 'cod' ? 'Cash on Delivery (COD)' : 'UPI / Online'}
                          <span className="text-[10px] text-gray-500 block">Paid ₹{orderData.amount}</span>
                        </strong>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-2 text-[11px] text-gray-600 font-medium font-sans">
                      <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Confirmation Details</span>
                      <p className="flex items-center gap-2 text-gray-500"><Mail size={13} className="text-[#092813] shrink-0" /> {orderData.customer?.email || 'care@swavalambiindia.com'}</p>
                      <p className="flex items-center gap-2 text-gray-500"><Phone size={13} className="text-[#092813] shrink-0" /> {orderData.customer?.phone || '+91 93739 86362'}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/shop')}
                    className="w-full border border-gray-250 hover:border-[#092813] hover:text-[#092813] text-gray-700 transition-all py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mt-8 cursor-pointer bg-white"
                  >
                    View Order Details &rarr;
                  </button>
                </div>

                {/* Column 2: Track Your Order */}
                <div className="pt-6 md:pt-0 md:pl-8 lg:pl-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-[#EAF1EE] flex items-center justify-center text-[#092813] shrink-0">
                        <MapPin size={16} />
                      </div>
                      <h3 className="font-serif text-base font-extrabold text-gray-900 tracking-wide">Track Your Order</h3>
                    </div>

                    {/* Timeline stepper - with responsive sizing and alignment to avoid cut-off */}
                    <div className="relative flex justify-between items-center py-4 mb-6 select-none w-full max-w-md mx-auto px-1 sm:px-2">
                      
                      {/* Connecting Line background */}
                      <div className="absolute top-[24px] sm:top-[28px] left-[5%] right-[5%] h-[1.5px] border-t border-dashed border-gray-200 -z-0"></div>
                      
                      {[
                        { label: 'Order Confirmed', icon: FileText, active: true },
                        { label: 'Packed', icon: Box, active: false },
                        { label: 'In Transit', icon: Truck, active: false },
                        { label: 'Out for Delivery', icon: Home, active: false },
                        { label: 'Delivered', icon: Check, active: false }
                      ].map((step, idx) => {
                        const Icon = step.icon;
                        return (
                          <div key={idx} className="flex flex-col items-center z-10 w-[20%] text-center">
                            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all ${
                              step.active 
                                ? 'bg-[#092813] border-[#FE8B00] text-white shadow-sm' 
                                : 'bg-white border-gray-200 text-gray-400'
                            }`}>
                              <Icon size={12} className="sm:size-[14px]" />
                            </div>
                            <span className="text-[7.5px] sm:text-[9px] font-bold text-gray-700 mt-2.5 block leading-tight max-w-[62px] mx-auto break-words">
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                      Once your order is handed over to our courier partner, you will receive real-time updates and tracking links via SMS & Email.
                    </p>
                  </div>

                  <div>
                    <button 
                      onClick={() => navigate('/shop')}
                      className="w-full bg-[#092813] hover:bg-[#06281C] text-white transition-all py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mt-8 cursor-pointer shadow-sm"
                    >
                      Track Order &rarr;
                    </button>

                    <div className="bg-[#FAF4EB]/70 border border-[#FE8B00]/15 rounded-xl p-3 flex items-start gap-2.5 mt-4">
                      <Headphones size={15} className="text-[#092813] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-500 font-semibold leading-normal">
                        You will receive updates on your order status via SMS & Email.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* WHAT HAPPENS NEXT? */}
            <div className="text-center my-10">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-[1px] w-12 sm:w-20 bg-gray-200"></span>
                <h3 className="font-serif text-sm sm:text-base font-extrabold text-gray-800 uppercase tracking-wider">
                  What happens next?
                </h3>
                <span className="h-[1px] w-12 sm:w-20 bg-gray-200"></span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  {
                    title: 'Order Processing',
                    desc: 'We are preparing your order with care.',
                    icon: FileText
                  },
                  {
                    title: 'Packed with Care',
                    desc: 'Your order will be packed securely and hygienically.',
                    icon: Box
                  },
                  {
                    title: 'On Its Way',
                    desc: 'Our trusted delivery partner will ship your order.',
                    icon: Truck
                  },
                  {
                    title: 'Delivered to You',
                    desc: 'Enjoy your wellness products at home.',
                    icon: Home
                  }
                ].map((step, idx) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={idx} className="bg-white border border-gray-150 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:translate-y-[-2px] transition-all duration-350">
                      <div className="w-12 h-12 rounded-full bg-[#EBF1E6] border border-[#092813]/10 flex items-center justify-center text-[#092813] mb-3">
                        <IconComponent size={20} />
                      </div>
                      <h4 className="text-[12px] font-bold text-gray-900 leading-tight">{step.title}</h4>
                      <p className="text-[11px] text-gray-500 font-semibold mt-2 leading-normal">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CONTACT & EXPLORE SPLIT BOX */}
            <div className="bg-white border border-gray-150 rounded-[32px] p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm mb-8 overflow-hidden relative">
              
              {/* Left Column: Contact */}
              <div className="col-span-12 md:col-span-5 md:pr-6 border-b md:border-b-0 md:border-r border-gray-150 pb-6 md:pb-0 flex flex-col items-center text-center justify-between h-full">
                <div className="w-10 h-10 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mb-3">
                  <Leaf size={18} />
                </div>
                <div className="space-y-1 mb-6 text-center">
                  <h3 className="font-serif text-base font-extrabold text-[#092813] text-center">We're here for your wellness, always.</h3>
                  <p className="text-[11px] text-gray-500 font-semibold text-center">Need help or have any questions?</p>
                </div>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-[#092813] border border-[#092813]/25 hover:bg-[#092813] hover:text-white rounded-xl font-bold py-2.5 px-5 flex items-center justify-center gap-1.5 transition-all text-[10px] uppercase tracking-wider cursor-pointer shadow-sm mx-auto"
                >
                  <span>Contact Us</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Middle Column: Explore */}
              <div className="col-span-12 md:col-span-4 md:px-4 flex flex-col items-center text-center justify-between h-full">
                <div className="space-y-1 mb-6 text-center">
                  <h3 className="font-serif text-base font-extrabold text-[#092813] text-center">Explore more for a healthier you</h3>
                  <p className="text-[11px] text-gray-500 font-semibold text-center">Discover our range of authentic Authentic products.</p>
                </div>
                <button 
                  onClick={() => navigate('/shop')}
                  className="bg-white text-[#092813] border border-[#092813]/25 hover:bg-[#092813] hover:text-white rounded-xl font-bold py-2.5 px-5 flex items-center justify-center gap-1.5 transition-all text-[10px] uppercase tracking-wider cursor-pointer shadow-sm mx-auto"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Right Column: Wellness image display */}
              <div className="col-span-12 md:col-span-3 flex justify-center md:justify-end">
                <img 
                  src="/assets/content/ayurvedic_wellness.png" 
                  alt="Authentic Wellness Range" 
                  className="h-28 md:h-32 w-auto object-contain rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/content/shop-page-img.png";
                  }}
                />
              </div>

            </div>

            {/* TRUST RIBBON */}
            <div className="bg-white border border-gray-150 py-5 rounded-[24px] grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-[9px] font-bold uppercase tracking-wider text-gray-500 shadow-sm px-4">
              <span className="flex items-center justify-center gap-1.5"><Sprout size={13} className="text-[#092813]" /> Authentic Products</span>
              <span className="flex items-center justify-center gap-1.5"><ShieldCheck size={13} className="text-[#092813]" /> Secure Payments</span>
              <span className="flex items-center justify-center gap-1.5">🚚 FREE Delivery Across India</span>
              <span className="flex items-center justify-center gap-1.5"><Clock size={13} className="text-[#092813]" /> Easy Returns</span>
              <span className="flex items-center justify-center gap-1.5"><Phone size={13} className="text-[#092813]" /> Dedicated Support</span>
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-gray-150 text-center font-sans">
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Order Inquiry Failed</h2>
            <p className="text-xs text-gray-500 mb-6">{error || 'Could not retrieve your confirmation details.'}</p>
            <button onClick={() => navigate('/shop')} className="bg-[#092813] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer">
              Return to Shop
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ThankYou;
