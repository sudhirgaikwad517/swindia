
import React from 'react';
import { FileText, Mail, Phone, Clock, Scale } from 'lucide-react';

const Terms = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-swavalambi-moss/10 rounded-full flex items-center justify-center mx-auto mb-4 text-swavalambi-moss">
            <Scale size={32} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-swavalambi-dark mb-4">Terms & Conditions</h1>
          <p className="text-swavalambi-stone font-serif italic">Last updated: September 15, 2025</p>
          <div className="w-24 h-1 bg-swavalambi-moss mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 md:p-12 rounded-organic shadow-lg border-hand-drawn space-y-8 font-serif text-swavalambi-dark/90 leading-relaxed">
          
          <p className="text-lg text-swavalambi-dark font-medium border-l-4 border-swavalambi-accent pl-4 bg-swavalambi-accent/5 py-2">
            Welcome to Swavalambi India Multitrade Private Limited. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Intellectual Property Rights</h2>
            <p className="text-swavalambi-stone">
              Unless otherwise stated, Swavalambi India Multitrade Private Limited and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Restrictions</h2>
            <p className="mb-4 text-swavalambi-stone">You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-6 space-y-2 text-swavalambi-stone marker:text-swavalambi-moss">
              <li>Publishing any website material in any other media</li>
              <li>Selling, sublicensing, and/or otherwise commercializing any website material</li>
              <li>Using this website in any way that is or may be damaging to this website</li>
              <li>Using this website contrary to applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Products and Services</h2>
            <p className="text-swavalambi-stone">
              All products and services offered are subject to availability. We reserve the right to discontinue any product or service at any time. Prices for our products are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Medical Disclaimer</h2>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800 text-sm">
                <p><strong>Important:</strong> The information provided on this website is for general informational purposes only and does not constitute medical advice. Always consult with a healthcare professional before using any medication or healthcare product.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Limitation of Liability</h2>
            <p className="text-swavalambi-stone">
              In no event shall Swavalambi India Multitrade Private Limited, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Governing Law & Jurisdiction</h2>
            <p className="text-swavalambi-stone">
              These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the courts located in Maharashtra for the resolution of any disputes.
            </p>
          </section>

          {/* Contact Section */}
          <div className="bg-swavalambi-sand/10 p-8 rounded-2xl border border-swavalambi-sand mt-8">
            <h3 className="text-xl font-bold text-swavalambi-dark mb-4">Contact Us</h3>
            <p className="text-swavalambi-stone mb-6">If you have any questions about these Terms & Conditions, please contact us at:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-swavalambi-dark">Swavalambi India Multitrade Private Limited</p>
                <p className="text-sm text-swavalambi-stone">Shrirampur - 413709, Maharashtra</p>
                <div className="mt-4 space-y-2">
                    <p className="flex items-center gap-2 text-sm font-bold text-swavalambi-moss"><Phone size={16}/> +91 93739 86362</p>
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

export default Terms;
