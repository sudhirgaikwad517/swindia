import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CartItem } from "../types";
import {
  Truck,
  CreditCard,
  Shield,
  ArrowRight,
  Loader2,
  AlertTriangle,
  Lock,
  Zap,
  CheckCircle,
  HelpCircle
} from "lucide-react";

/* ================= API CONFIGURATION ================= */
const API_URL = "https://swavalambiindia.com/swavalambi_api/insert_order.php";

interface CheckoutProps {
  items: CartItem[];
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, onClearCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("easebuzz");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    pinCode: "",
  });

  const initiateCheckoutFired = useRef(false);
  const addPaymentInfoFired = useRef(false);

  // DYNAMIC PRICE CALCULATION
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const activePrice = paymentMethod === "cod" ? (item.originalPrice || item.price) : item.price;
      return sum + activePrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 499 ? 0 : 99;
  const total = subtotal + shipping;
  
  // Calculate potential savings for UI incentive
  const codTotal = items.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const onlineTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const potentialSavings = codTotal - onlineTotal;

  useEffect(() => {
    if (items.length === 0 && !isRedirecting) {
      navigate("/shop");
    }
  }, [items, navigate, isRedirecting]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return (
      shippingDetails.fullName.trim() !== "" &&
      shippingDetails.phone.trim().length >= 10 &&
      shippingDetails.street.trim() !== "" &&
      shippingDetails.city.trim() !== "" &&
      shippingDetails.pinCode.trim().length === 6
    );
  };

  const fireAddPaymentInfo = () => {
    if (addPaymentInfoFired.current) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "AddPaymentInfo", {
        value: total,
        currency: "INR",
        num_items: items.length,
        content_type: "product",
        contents: items.map(item => ({
          id: item.sku,
          quantity: item.quantity,
          item_price: paymentMethod === "cod" ? item.originalPrice : item.price
        }))
      });
      addPaymentInfoFired.current = true;
    }
  };

  const fireInitiateCheckout = () => {
    if (initiateCheckoutFired.current) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", {
        value: total,
        currency: "INR",
        num_items: items.length,
      });
      initiateCheckoutFired.current = true;
    }
  };

  useEffect(() => {
    fireInitiateCheckout();
  }, []);

  const initiateOrder = async () => {
    setPaymentError(null);
    if (!validateForm()) {
      setPaymentError("Please fill in all required shipping fields correctly.");
      window.scrollTo(0, 0);
      return;
    }

    fireAddPaymentInfo();
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('firstname', shippingDetails.fullName);
      formData.append('email', shippingDetails.email || "customer@swavalambi.com");
      formData.append('phone', shippingDetails.phone);
      formData.append('address1', shippingDetails.street);
      formData.append('city', shippingDetails.city);
      formData.append('zipcode', shippingDetails.pinCode);
      formData.append('amount', total.toFixed(2));
      formData.append('productinfo', items.map(i => i.name).join(', '));
      formData.append('paymentMethod', paymentMethod);

      items.forEach((item) => {
          const finalPrice = paymentMethod === "cod" ? (item.originalPrice || item.price) : item.price;
          formData.append('product_sku[]', item.sku);
          formData.append('product_name[]', item.name);
          formData.append('product_qty[]', item.quantity.toString());
          formData.append('product_price[]', finalPrice.toString());
      });

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const textResponse = await response.text();
      let result;
      try { result = JSON.parse(textResponse); } catch (e) { throw new Error("Backend connection error."); }

      if (result.status === "success") {
        if (paymentMethod === "cod") {
          finalizeOrder(result.order_id || "ORD-" + Date.now());
        } else if (result.payment_url) {
          setIsRedirecting(true);
          window.location.href = result.payment_url;
        }
      } else {
        throw new Error(result.message || "Order submission failed.");
      }
    } catch (error: any) {
      setPaymentError(error.message);
      setIsProcessing(false);
    }
  };

  const finalizeOrder = (id: string) => {
    setIsRedirecting(true);
    onClearCart();
    setIsProcessing(false);
    setTimeout(() => {
      navigate(`/thank-you?status=success&order_id=${id}`);
    }, 100);
  };

  return (
    <div className="pt-[106px] md:pt-28 pb-20 min-h-screen bg-[#F9FDF9]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Progress Timeline Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-[#092813] mb-3 text-center">
            Checkout
          </h1>
          <div className="flex items-center justify-center gap-1 sm:gap-4 text-[9px] md:text-xs font-sans text-gray-500 font-bold uppercase tracking-wider select-none mb-4">
            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle size={14} /> Cart</span>
            <span className="h-[1.5px] w-6 sm:w-12 bg-emerald-600"></span>
            <span className="flex items-center gap-1 text-[#092813]"><span className="w-4 h-4 rounded-full bg-[#092813] text-white flex items-center justify-center text-[8px] font-bold">2</span> Checkout</span>
            <span className="h-[1.5px] w-6 sm:w-12 bg-gray-300"></span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[8px] font-bold">3</span> Payment</span>
            <span className="h-[1.5px] w-6 sm:w-12 bg-gray-300"></span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[8px] font-bold">4</span> Confirmation</span>
          </div>
          <p className="text-[10px] text-gray-500 font-sans tracking-wide">Almost there! Complete your details and place your order.</p>
        </div>

        {paymentError && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl mb-8 flex items-start gap-4 shadow-sm animate-bounce text-left">
            <AlertTriangle className="shrink-0 mt-1" />
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{paymentError}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SHIPPING & PAYMENT FORM (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Delivery Address Card */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-150 text-left space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-[#092813] text-white flex items-center justify-center font-bold text-sm font-sans">1</span>
                <h2 className="text-lg font-serif font-bold text-gray-900">Delivery Address</h2>
              </div>
              
              <div className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name*</label>
                  <input 
                    name="fullName" 
                    value={shippingDetails.fullName} 
                    onChange={handleInputChange} 
                    placeholder="Enter your full name" 
                    className="w-full border border-gray-250 p-3 rounded-xl focus:border-[#092813] outline-none font-semibold text-gray-800 bg-gray-50/50" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">10-digit Phone*</label>
                  <input 
                    name="phone" 
                    value={shippingDetails.phone} 
                    onChange={handleInputChange} 
                    placeholder="Enter 10-digit mobile number" 
                    maxLength={10} 
                    className="w-full border border-gray-250 p-3 rounded-xl focus:border-[#092813] outline-none font-semibold text-gray-800 bg-gray-50/50" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Address*</label>
                  <input 
                    name="street" 
                    value={shippingDetails.street} 
                    onChange={handleInputChange} 
                    placeholder="House No., Building, Street, Area" 
                    className="w-full border border-gray-250 p-3 rounded-xl focus:border-[#092813] outline-none font-semibold text-gray-800 bg-gray-50/50" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">City*</label>
                    <input 
                      name="city" 
                      value={shippingDetails.city} 
                      onChange={handleInputChange} 
                      placeholder="City" 
                      className="w-full border border-gray-250 p-3 rounded-xl focus:border-[#092813] outline-none font-semibold text-gray-800 bg-gray-50/50" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">PIN Code*</label>
                    <input 
                      name="pinCode" 
                      value={shippingDetails.pinCode} 
                      onChange={handleInputChange} 
                      placeholder="PIN Code" 
                      maxLength={6} 
                      className="w-full border border-gray-250 p-3 rounded-xl focus:border-[#092813] outline-none font-semibold text-gray-800 bg-gray-50/50" 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Card */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-150 text-left space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-[#092813] text-white flex items-center justify-center font-bold text-sm font-sans">2</span>
                <h2 className="text-lg font-serif font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="space-y-4 font-sans">
                {/* ONLINE OPTION */}
                <label className={`relative flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'easebuzz' ? 'border-[#092813] bg-[#EBF1E6]/20 shadow-sm' : 'border-gray-200 hover:border-[#092813]/50'}`}>
                  <input type="radio" checked={paymentMethod === 'easebuzz'} onChange={() => setPaymentMethod('easebuzz')} className="w-5 h-5 accent-[#092813] shrink-0" />
                  <div className="ml-4 flex-1">
                    <span className="block font-extrabold text-sm text-gray-900">Pay Online (UPI, Card, Net Banking)</span>
                    <span className="text-[10px] text-green-700 font-bold flex items-center gap-1 mt-0.5">
                       <Zap size={11} fill="currentColor" /> Extra Savings & Instant Discount Applied
                    </span>
                  </div>
                  <div className="bg-green-600 text-white text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold ml-2">Recommended</div>
                </label>
                
                {/* COD OPTION */}
                <label className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#FE8B00] bg-[#FAF4EB]/30 shadow-sm' : 'border-gray-200'}`}>
                  <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 accent-[#FE8B00] shrink-0" />
                  <div className="ml-4">
                    <span className="block font-bold text-sm text-gray-800">Cash on Delivery (COD)</span>
                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">Pay in cash when order is delivered</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SUMMARY & TRUST BLOCKS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Order Summary Box */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-150 text-left">
              <h2 className="text-lg font-serif font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
                {items.map((item) => {
                  const displayPrice = paymentMethod === "cod" ? (item.originalPrice || item.price) : item.price;
                  return (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-[#F9FDF9]/60 rounded-lg border border-gray-100" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-900 leading-tight">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">₹{(displayPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

              {/* INCENTIVE BANNER */}
              {paymentMethod === 'cod' && potentialSavings > 0 && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex items-center gap-3 animate-pulse">
                  <CheckCircle className="text-blue-600 shrink-0" size={20} />
                  <p className="text-xs text-blue-800">
                    Switch to <b>Online Payment</b> and save <b>₹{potentialSavings}</b> on this order!
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-gray-100 font-sans text-xs">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-xl text-gray-900 pt-2"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>

              <button
                onClick={initiateOrder}
                disabled={isProcessing || isRedirecting}
                className="w-full bg-[#092813] text-white font-sans font-bold py-4 rounded-full mt-8 hover:bg-[#06281C] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer text-xs uppercase tracking-wider"
              >
                {isProcessing || isRedirecting ? <Loader2 className="animate-spin" /> : <>Place Order <ArrowRight size={16} /></>}
              </button>
              
              <p className="text-center text-[9px] text-gray-400 mt-4 uppercase tracking-widest font-bold">
                Safe & Secure Payments
              </p>
            </div>

            {/* Why shop with us? */}
            <div className="bg-white border border-gray-150 rounded-[28px] p-6 shadow-sm text-left space-y-4">
              <h3 className="font-serif text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Why shop with us?</h3>
              <div className="space-y-3 text-xs text-gray-600 font-sans font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-[#092813]" />
                  <span>Authentic Products</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-[#092813]" />
                  <span>Safe & Secure Payments</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-[#092813]" />
                  <span>Easy Returns & Refunds</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-[#092813]" />
                  <span>Dedicated Customer Support</span>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="bg-[#FAF4EB]/70 border border-[#FE8B00]/20 rounded-[28px] p-6 text-left space-y-4 shadow-sm text-gray-800">
              <div className="space-y-1">
                <h3 className="font-serif text-sm font-bold text-gray-900">Need Help?</h3>
                <p className="text-[10px] text-gray-500 font-semibold">We are here to assist you with your order.</p>
              </div>
              <div className="space-y-2 text-[10.5px] font-bold text-gray-600 font-sans">
                <p>Call / WhatsApp: +91 93739 86362</p>
                <p>Email: care@swavalambiindia.com</p>
                <p>Mon - Sat | 10:00 AM - 6:00 PM</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};