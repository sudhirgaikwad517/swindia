
import React from 'react';
import { Shield, Lock, Mail, Phone, Clock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-swavalambi-paper bg-[url('https://www.transparenttextures.com/patterns/premium-paper.png')]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-swavalambi-moss/10 rounded-full flex items-center justify-center mx-auto mb-4 text-swavalambi-moss">
            <Shield size={32} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-swavalambi-dark mb-4">Privacy Policy</h1>
          <p className="text-swavalambi-stone font-serif italic">Last updated: September 15, 2025</p>
          <div className="w-24 h-1 bg-swavalambi-moss mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 md:p-12 rounded-organic shadow-lg border-hand-drawn space-y-8 font-serif text-swavalambi-dark/90 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4 flex items-center gap-2">
              Introduction
            </h2>
            <p className="text-swavalambi-stone">
              At Swavalambi India Multitrade Private Limited, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website, products, and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Information We Collect</h2>
            <p className="mb-4 text-swavalambi-stone">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-swavalambi-stone marker:text-swavalambi-moss">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Demographic information (postal code, preferences, interests)</li>
              <li>Medical information relevant to providing healthcare services</li>
              <li>Payment information for processing transactions</li>
              <li>Website usage data through cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">How We Use Your Information</h2>
            <p className="mb-4 text-swavalambi-stone">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-swavalambi-stone marker:text-swavalambi-moss">
              <li>To provide and personalize our healthcare services</li>
              <li>To process your orders and transactions</li>
              <li>To communicate with you about products, services, and promotions</li>
              <li>To improve our website, products, and customer service</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4 flex items-center gap-2">
              <Lock size={20} className="text-swavalambi-moss" /> Data Security
            </h2>
            <p className="text-swavalambi-stone">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted and stored securely.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-swavalambi-dark mb-4">Changes to This Policy</h2>
            <p className="text-swavalambi-stone">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Contact Section within Policy */}
          <div className="bg-swavalambi-sand/10 p-8 rounded-2xl border border-swavalambi-sand mt-8">
            <h3 className="text-xl font-bold text-swavalambi-dark mb-4">Have Questions?</h3>
            <p className="text-swavalambi-stone mb-6">If you have any questions about this Privacy Policy, please contact us at:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-swavalambi-dark">Swavalambi India Multitrade Private Limited</p>
                <p className="text-sm text-swavalambi-stone">Shrirampur - 413709, Maharashtra</p>
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

export default PrivacyPolicy;
