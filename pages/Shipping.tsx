
import React from 'react';
import { Truck, Mail, Phone, Clock, MapPin } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-swavalambi-moss/10 rounded-full flex items-center justify-center mx-auto mb-4 text-swavalambi-moss">
            <Truck size={32} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-swavalambi-dark mb-4">Shipping & Delivery</h1>
          <p className="text-swavalambi-stone font-serif italic">Last updated: September 15, 2025</p>
          <div className="w-24 h-1 bg-swavalambi-moss mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 md:p-12 rounded-organic shadow-lg border-hand-drawn space-y-8 font-serif text-swavalambi-dark/90 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Shipping Methods and Timeframes</h2>
            <p className="text-swavalambi-stone mb-4">We use reputable courier services to deliver our products safely to your doorstep. The following options are available:</p>
            
            <div className="overflow-hidden border border-swavalambi-sand rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-swavalambi-sand/20 text-swavalambi-dark">
                            <th className="p-4 font-bold border-b border-swavalambi-sand">Service Type</th>
                            <th className="p-4 font-bold border-b border-swavalambi-sand">Estimated Delivery</th>
                            <th className="p-4 font-bold border-b border-swavalambi-sand">Coverage</th>
                        </tr>
                    </thead>
                    <tbody className="text-swavalambi-stone text-sm md:text-base">
                        <tr className="border-b border-swavalambi-sand/30">
                            <td className="p-4">Standard Shipping</td>
                            <td className="p-4">3-7 business days</td>
                            <td className="p-4">All over India</td>
                        </tr>
                        <tr>
                            <td className="p-4">Express Shipping</td>
                            <td className="p-4">1-3 business days</td>
                            <td className="p-4">Major cities only</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Shipping Costs</h2>
            <p className="mb-4 text-swavalambi-stone">Shipping costs vary depending on the order value and destination:</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <li className="bg-swavalambi-moss/5 border border-swavalambi-moss/20 p-4 rounded-lg text-center">
                  <span className="block font-bold text-swavalambi-dark text-lg mb-1">Orders &gt; ₹1000</span>
                  <span className="text-swavalambi-moss font-bold">Free Shipping</span>
               </li>
               <li className="bg-white border border-swavalambi-sand p-4 rounded-lg text-center">
                  <span className="block font-bold text-swavalambi-dark text-lg mb-1">Orders &lt; ₹1000</span>
                  <span className="text-swavalambi-stone">₹50 Flat Charge</span>
               </li>
               <li className="bg-white border border-swavalambi-sand p-4 rounded-lg text-center">
                  <span className="block font-bold text-swavalambi-dark text-lg mb-1">Express</span>
                  <span className="text-swavalambi-stone">₹100 Additional</span>
               </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Order Processing</h2>
            <p className="text-swavalambi-stone">
              Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Tracking Your Order</h2>
            <p className="text-swavalambi-stone">
              Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on the courier's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Delivery Issues</h2>
            <p className="mb-4 text-swavalambi-stone">If you encounter any issues with your delivery (Package not received, Damaged, Wrong items), please contact us within 7 days of shipment.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">International Shipping</h2>
            <div className="flex items-center gap-3 bg-swavalambi-clay/10 p-4 rounded-lg text-swavalambi-dark">
                <MapPin size={24} className="text-swavalambi-clay" />
                <p>Currently, we only ship within India. International shipping is not available at this time.</p>
            </div>
          </section>

          {/* Contact Section */}
          <div className="bg-swavalambi-sand/10 p-8 rounded-2xl border border-swavalambi-sand mt-8">
            <h3 className="text-xl font-bold text-swavalambi-dark mb-4">Questions about delivery?</h3>
            <p className="text-swavalambi-stone mb-6">Contact us at:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-swavalambi-dark">Swavalambi India Multitrade Private Limited</p>
                <div className="mt-4 space-y-2">
                    <p className="flex items-center gap-2 text-sm font-bold text-swavalambi-moss"><Phone size={16}/> +91 72727 7702</p>
                    <p className="flex items-center gap-2 text-sm font-bold text-swavalambi-moss"><Mail size={16}/> care@swavalambiindia.com</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                 <div className="flex items-start gap-3">
                    <Clock size={20} className="text-swavalambi-clay mt-1" />
                    <div className="text-sm text-swavalambi-stone">
                        <p><span className="font-bold text-swavalambi-dark">Mon-Sat:</span> 10:00 AM - 6:00 PM</p>
                        <p><span className="font-bold text-swavalambi-dark">Sunday:</span> Closed</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shipping;
