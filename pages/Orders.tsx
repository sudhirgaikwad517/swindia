import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Truck, CheckCircle, Package } from 'lucide-react';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const ordersList = [
    {
      id: 'PRV123456789',
      date: '12 May 2024',
      itemsCount: 2,
      price: 1598.00,
      status: 'In Transit',
      statusColor: 'text-green-700 bg-green-50 border-green-600/10'
    },
    {
      id: 'PRV987654321',
      date: '08 May 2024',
      itemsCount: 1,
      price: 897.00,
      status: 'Delivered',
      statusColor: 'text-gray-700 bg-gray-50 border-gray-400/10'
    }
  ];

  const filteredOrders = activeTab === 'all' 
    ? ordersList 
    : ordersList.filter(o => o.status.toLowerCase().replace(' ', '') === activeTab);

  return (
    <div className="pt-[106px] md:pt-28 pb-20 bg-[#F9FDF9] min-h-screen">
      <div className="container mx-auto px-6 max-w-lg">
        
        <h1 className="font-serif text-2xl font-extrabold text-[#092813] mb-6 text-center">My Orders</h1>

        {/* Tab Filters */}
        <div className="flex border-b border-swavalambi-sand/50 mb-6 text-xs font-bold uppercase tracking-wider text-swavalambi-stone">
          {['all', 'intransit', 'delivered'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-center transition border-b-2 ${
                activeTab === tab ? 'border-[#092813] text-[#092813]' : 'border-transparent hover:text-[#092813]'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'intransit' ? 'Processing' : 'Delivered'}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-swavalambi-sand/55 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-swavalambi-sand/35 pb-3">
                  <div>
                    <span className="text-[10px] text-swavalambi-stone font-semibold">Order ID</span>
                    <h4 className="font-mono text-sm font-bold text-swavalambi-dark">#{order.id}</h4>
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-swavalambi-stone font-semibold">
                  <span>{order.date}</span>
                  <span className="text-swavalambi-dark">{order.itemsCount} {order.itemsCount > 1 ? 'Items' : 'Item'} • ₹{order.price.toFixed(2)}</span>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => navigate(`/track-order?order_id=${order.id}`)}
                    className="flex-1 bg-[#092813] hover:bg-[#06281C] text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                  >
                    <Truck size={12} /> TRACK ORDER
                  </button>
                  <button 
                    onClick={() => navigate(`/track-order?order_id=${order.id}`)}
                    className="flex-1 border border-swavalambi-sand hover:border-[#092813] text-swavalambi-stone hover:text-[#092813] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition"
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-swavalambi-sand/55 shadow-sm text-center">
              <span className="w-12 h-12 rounded-full bg-[#EBF1E6] flex items-center justify-center text-[#092813] mx-auto mb-3"><Package size={20} /></span>
              <p className="text-xs font-semibold text-swavalambi-stone">No orders found in this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Orders;
