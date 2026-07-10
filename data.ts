import { Product, Category, Review, BlogPost } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Diabetes Care', image: '/assets/content/banner-01.jpg', count: 3 },
  { id: '2', name: 'Hair Wellness', image: '/assets/content/banner-03.jpg', count: 2 },
  { id: '3', name: 'Immunity & Wellness', image: '/assets/content/banner-01.jpg', count: 3 },
  { id: '4', name: 'Wellness Combos', image: '/assets/content/banner-01.jpg', count: 2 },
  { id: '5', name: 'Juices & Tonics', image: '/assets/content/banner-01.jpg', count: 2 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'swavalambi-sea-buckthorn-juice-100ml',
    name: 'Sea Buckthorn Himalayan Juice',
    tagline: "Nature's Power of Omega 3, 6, 7, 9 & Vitamin C",
    price: 899,
    rating: 4.8,
    reviews: 2100,
    image: '/assets/content/image-Photoroom%20(21).png',
    gallery: [],
    category: 'Juices & Tonics',
    badges: ['BESTSELLER'],
    description: 'Premium Himalayan superfood made from fresh whole Leh–Ladakh Sea Buckthorn berries. Rich in Omega 3, 6, 7 & 9 and natural Vitamin C for daily immunity, skin health, energy, and heart wellness.',
    benefits: [
      'Helps support natural immunity strength',
      'Promotes healthy skin glow & anti-aging support',
      'Supports heart, liver & digestive wellness',
      'Enhances energy, stamina & vitality',
      'Helps maintain internal detox & balance',
      'Supports overall daily wellness',
    ],
    ingredients: ['Sea Buckthorn', 'Amla', 'Turmeric', 'Ginger', 'Black Pepper'],
    stock: 80,
    dosage: '5 ml',
    dosageFreq: 'Twice daily',
    usageInfo: 'Shake well before use. Take 5 ml twice daily on an empty stomach. Can be diluted with lukewarm water. For best results, use regularly for at least 3 months.',
    bottlesSold: '21,000+'
  }
];

export interface UpcomingProduct {
  id: string;
  name: string;
  category: string;
}

export const UPCOMING_PRODUCTS: UpcomingProduct[] = [];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Rajesh Patil',
    location: 'Pune, Maharashtra',
    rating: 5,
    text: "Swavalambi Sea Buckthorn Juice has really helped me keep my immunity up. I feel more energetic and active now.",
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 'r2',
    name: 'Sneha Kulkarni',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    text: "Premium, effective and Authentic. This juice has become a part of our daily routine.",
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'r3',
    name: 'Amol Deshmukh',
    location: 'Nashik, Maharashtra',
    rating: 5,
    text: "Best Authentic product for immunity and wellness. Great results with regular use.",
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Manage Diabetes Effectively',
    excerpt: 'Discover the power of our premium herbs in managing diabetes.',
    image: '/assets/content/journal-1.jpeg',
    date: 'Oct 12, 2023'
  },
  {
    id: 'b2',
    title: 'Boost Immunity the Traditional Way',
    excerpt: 'Learn about your body type and how to balance your energies for optimal health.',
    image: '/assets/content/journal-2.jpeg',
    date: 'Sep 28, 2023'
  },
  {
    id: 'b3',
    title: 'Daily Wellness Habits for Better Living',
    excerpt: 'How waking up early and following a routine can transform your physical and mental well-being.',
    image: '/assets/content/journal-3.jpeg',
    date: 'Sep 15, 2023'
  }
];

export const testimonialVideos = [
  { youtubeId: "nXXqTbRaLA8" },
  { youtubeId: "2iHyj4Wl0vI" },
  { youtubeId: "li8SwDc8thU" },
  { youtubeId: "RTs7GtmLdM4" },
  { youtubeId: "e-uLd3Zdvtc" },
  { youtubeId: "tAYtb_bP5BE" },
  { youtubeId: "m2a_-HyuNns" },
  { youtubeId: "xJlDXEUiQvk" },
  { youtubeId: "Txbhch6VSeg" },
  { youtubeId: "6LKUJxCXStM" },
  { youtubeId: "tF117sRbZbU" },
  { youtubeId: "w1OdTXG3DJE" },
  { youtubeId: "rrtHlp-cuFw" }
];