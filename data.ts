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
    name: 'Swavalambi Sea Buckthorn Juice (100 ml)',
    tagline: 'Pure Health Boost',
    price: 899,
    rating: 4.9,
    reviews: 150,
    image: '/assets/content/image-Photoroom%20(21).png',
    gallery: [],
    category: 'Juices & Tonics',
    badges: ['BESTSELLER'],
    description: 'A pure Sea Buckthorn juice packed with vitamins, minerals, and antioxidants to boost immunity and promote overall wellness.',
    benefits: ['Boosts Immunity', 'Rich in Vitamin C', 'Promotes Skin Health', 'Supports Digestion'],
    ingredients: ['Sea Buckthorn', 'Amla', 'Turmeric', 'Ginger', 'Black Pepper'],
    stock: 80,
    dosage: "10-20ml",
    dosageFreq: "Twice daily",
    usageInfo: "Mix 10-20ml in a glass of water and consume on an empty stomach.",
    bottlesSold: 'New'
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
    text: "Effective and Genuine. This syrup has become a part of our daily routine.",
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'r3',
    name: 'Amol Deshmukh',
    location: 'Nashik, Maharashtra',
    rating: 5,
    text: "Best product for sugar management. Great results with regular use.",
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