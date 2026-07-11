
import React from 'react';
import { RefreshCw, Mail, Phone, Clock, AlertTriangle } from 'lucide-react';

const Refunds = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-swavalambi-moss/10 rounded-full flex items-center justify-center mx-auto mb-4 text-swavalambi-moss">
            <RefreshCw size={32} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-swavalambi-dark mb-4">Cancellation & Refund Policy</h1>
          <p className="text-swavalambi-stone font-serif italic">Last updated: September 15, 2025</p>
          <div className="w-24 h-1 bg-swavalambi-moss mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 md:p-12 rounded-organic shadow-lg border-hand-drawn space-y-8 font-serif text-swavalambi-dark/90 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Cancellation Policy</h2>
            <p className="mb-4 text-swavalambi-stone">You can cancel your order under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 text-swavalambi-stone marker:text-swavalambi-moss">
              <li>Orders can be cancelled within <span className="font-bold text-swavalambi-dark">24 hours</span> of placement without any charges.</li>
              <li>If the order has already been shipped, cancellation may not be possible.</li>
              <li>To cancel an order, please contact our customer service with your order details immediately.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Refund Policy</h2>
            <p className="mb-4 text-swavalambi-stone">We offer refunds under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-swavalambi-stone marker:text-swavalambi-moss">
              <li>If you received a damaged or defective product.</li>
              <li>If you received the wrong product.</li>
              <li>If the product doesn't match the description on our website.</li>
            </ul>
          </section>

          <section>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg flex items-start gap-4">
                <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
                <div>
                    <h3 className="font-bold text-amber-800 mb-1">Important Note</h3>
                    <p className="text-amber-900/80 text-sm">
                        Due to the premium quality of healthcare products, we cannot accept returns or offer refunds for products that have been opened or used, unless they are defective or damaged upon arrival.
                    </p>
                </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Refund Process</h2>
            <p className="text-swavalambi-stone">
              Once we receive your return and inspect the product, we will process your refund. The refund will be credited to your original method of payment within <span className="font-bold text-swavalambi-dark">7-10 business days</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Non-Refundable Items</h2>
            <p className="mb-4 text-swavalambi-stone">The following items are not eligible for refunds:</p>
            <ul className="list-disc pl-6 space-y-2 text-swavalambi-stone marker:text-red-400">
              <li>Opened or used products (unless defective)</li>
              <li>Products that are not in their original condition</li>
              <li>Products that are damaged due to customer misuse</li>
              <li>Shipping charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Return Shipping</h2>
            <p className="text-swavalambi-stone">
              If you are returning a product due to our error (wrong item, defective product, etc.), we will bear the return shipping costs. Otherwise, return shipping will be the customer's responsibility.
            </p>
          </section>

          {/* Contact Section */}
          <div className="bg-swavalambi-sand/10 p-8 rounded-2xl border border-swavalambi-sand mt-8">
            <h3 className="text-xl font-bold text-swavalambi-dark mb-4">Contact Us</h3>
            <p className="text-swavalambi-stone mb-6">If you have any questions regarding refunds, please contact us at:</p>
            
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

export default Refunds;
