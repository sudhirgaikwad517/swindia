import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Leaf, MessageCircle, ChevronDown, Sprout, Package } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Query',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const { name, email, phone, subject, message } = formData;
    const text = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Subject:* ${subject}\n*Message:* ${message}`;
    
    // WhatsApp API URL (Phone: 919373986362)
    const phoneNumber = "919373986362";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  // Hinglish Image Briefs
  const getProductImageDetails = (id: string) => {
    switch (id) {
      case 'contact_hero_illustration':
        return {
          id: 'contact_hero_illustration',
          desc: 'A stone mortar and pestle filled with fresh green herbs on a clean slate base. Warm lighting, premium look.'
        };
      case 'contact_bottom_illustration':
        return {
          id: 'contact_bottom_illustration',
          desc: 'A small wooden bowl filled with green herbal leaves next to a dark glass dropper bottle, sitting on a clean white surface.'
        };
      default:
        return {
          id: 'placeholder',
          desc: 'Contact Us wellness graphic placeholder.'
        };
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#F9FDF9] flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white border border-gray-150 rounded-[28px] max-w-md mx-4 shadow-lg text-left">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#092813]">
            <Leaf size={32} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3 text-center">Redirecting to WhatsApp...</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed text-center">
            Your message has been drafted. Please click the send button in WhatsApp to complete the inquiry.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-[#061C0D] hover:bg-[#092813] text-white py-3 rounded-full font-bold transition-all shadow-md active:scale-95"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FDF9] antialiased">
      
      {/* 1. Hero Banner Section */}
      <section className="bg-[#061C0D] text-white pt-[106px] pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#092813] rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        
        <div className="container mx-auto px-2 max-w-5xl grid grid-cols-12 gap-4 items-center relative z-10">
          
          {/* Left Content */}
          <div className="col-span-12 text-left space-y-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#FE8B00] uppercase tracking-widest block font-sans">
              <span>Contact Us</span>
              <div className="h-[1px] w-6 bg-[#FE8B00]"></div>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              We're Here To <br />
              <span className="text-[#FE8B00]">Help You</span>
            </h1>
            <p className="text-white/80 font-sans text-[10px] sm:text-xs leading-relaxed max-w-md">
              Have a question or need support? <br /> We'd love to hear from you.
            </p>
            
            {/* Tagline row */}
            <div className="flex items-center gap-2 pt-2">
              <Leaf size={12} className="text-[#FE8B00]" />
              <span className="text-[10px] sm:text-xs text-white/80 font-medium font-sans">
                Rooted in Tradition. Committed to You.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* RESPONSIVE LAYOUT (Mobile Stacked, Desktop Side-by-Side) */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-4 max-w-5xl -mt-6 relative z-25 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Get In Touch Card (5 cols on PC) */}
          <div className="lg:col-span-5 bg-white border border-gray-150 rounded-[28px] p-5 lg:p-6 shadow-lg text-left">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#FE8B00] mb-6 font-sans">
              <span>Get In Touch</span>
              <div className="h-[1px] w-6 bg-[#FE8B00]"></div>
            </div>

            <div className="space-y-4">
              {/* Call Us */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#061C0D] text-white flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="font-sans leading-tight">
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Call Us</h4>
                    <span className="text-xs font-bold text-gray-800 block mt-0.5">+91 93739 86362</span>
                    <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">Mon – Sat | 10:00 AM – 6:00 PM</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-[#FE8B00]/35 flex items-center justify-center text-[#FE8B00] shrink-0">
                  <Phone size={12} />
                </div>
              </div>

              {/* WhatsApp Us */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#061C0D] text-white flex items-center justify-center shrink-0">
                    <MessageCircle size={18} />
                  </div>
                  <div className="font-sans leading-tight">
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp Us</h4>
                    <span className="text-xs font-bold text-gray-800 block mt-0.5">+91 93739 86362</span>
                    <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">Mon – Sat | 10:00 AM – 6:00 PM</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-[#FE8B00]/35 flex items-center justify-center text-[#FE8B00] shrink-0">
                  <MessageCircle size={12} />
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#061C0D] text-white flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="font-sans leading-tight">
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Us</h4>
                    <span className="text-xs font-bold text-gray-850 block mt-0.5">care@swavalambiindia.com</span>
                    <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">We reply within 24 hours</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-[#FE8B00]/35 flex items-center justify-center text-[#FE8B00] shrink-0">
                  <Mail size={12} />
                </div>
              </div>

              {/* Visit Us */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#061C0D] text-white flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="font-sans leading-tight">
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Visit Us</h4>
                    <span className="text-xs font-bold text-gray-850 block mt-0.5">Swavalambi India Multitrade Private Limited</span>
                    <span className="text-[9.5px] text-gray-500 font-semibold block mt-0.5 leading-normal">
                      GUT NO- 324/17 GALA NO-40, <br />
                      SAI DARSHAN COMPLEX, Rahata, <br />
                      Ahmed Nagar - 423107, Maharashtra
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-[#FE8B00]/35 flex items-center justify-center text-[#FE8B00] shrink-0">
                  <MapPin size={12} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Send Message Card (7 cols on PC) */}
          <div className="lg:col-span-7 bg-[#F6F4EF] border border-gray-150 rounded-[28px] p-5 lg:p-6 shadow-md text-left">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#FE8B00] mb-6 font-sans">
              <span>Send Us A Message</span>
              <div className="h-[1px] w-6 bg-[#FE8B00]"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {/* Name & Email Row */}
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#092813] transition-colors"
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#092813] transition-colors"
                  required
                />
              </div>

              {/* Phone Number */}
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#092813] transition-colors"
                required
              />

              {/* Subject Dropdown */}
              <div className="relative">
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#092813] transition-colors appearance-none cursor-pointer font-sans"
                  required
                >
                  <option value="Product Query">Product Query</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Consultation Bookings">Consultation Bookings</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Message */}
              <textarea 
                name="message"
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#092813] transition-colors"
                required
              ></textarea>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="bg-[#061C0D] hover:bg-[#092813] text-white py-3 rounded-full flex items-center justify-center gap-2 w-full font-bold font-sans active:scale-95 transition-all shadow-md mt-2 text-xs"
              >
                <Send size={13} className="text-[#FE8B00]" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 4. Bottom Trust Card Banner */}
      <section className="container mx-auto px-4 max-w-5xl pb-16">
        <div className="bg-white border border-gray-155 rounded-[28px] p-5 flex items-center justify-between text-left shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#061C0D] border-2 border-[#FE8B00] flex items-center justify-center text-[#FE8B00] shrink-0">
              <Leaf size={20} />
            </div>
            <div className="font-sans leading-relaxed">
              <h3 className="text-sm font-bold text-gray-900">We value your trust.</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                Our team is always here to support your wellness journey.
              </p>
            </div>
          </div>
          
          {/* Sprout Image Placeholder on Right */}
          <div className="flex justify-center relative group/tooltip cursor-pointer shrink-0 ml-4">
            <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] border border-dashed border-[#092813]/25 rounded-xl bg-[#F9FDF9] flex flex-col items-center justify-center p-1 text-center select-none">
              <Sprout className="text-[#092813]/40 mb-0.5 w-4 h-4" />
              <span className="text-gray-700 text-[5.5px] font-bold font-sans">200 x 200 px</span>
            </div>
            
            {/* Tooltip on Hover */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tooltip:block bg-gray-900 text-white text-[9px] font-sans rounded-lg p-2.5 w-48 shadow-lg border border-white/10 z-30 pointer-events-none text-left leading-normal">
              <span className="text-[#FE8B00] font-bold block">ID: contact_bottom_illustration</span>
              <span className="text-[#FE8B00] font-bold block mt-0.5">SIZE: 200 x 200 px</span>
              <span className="text-[#FE8B00] font-bold block mt-1">DESCRIPTION:</span>
              {getProductImageDetails('contact_bottom_illustration').desc}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
