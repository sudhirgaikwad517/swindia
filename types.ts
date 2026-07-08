
export interface ProductBenefit {
  title: string;
  description: string;
  icon: 'blood' | 'energy' | 'shield' | 'balance';
}

export interface ProductIngredient {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  sku: string; // Added SKU field
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  category: string;
  badges?: string[];
  description: string;
  benefits: string[];
  detailedBenefits?: ProductBenefit[];
  ingredients: string[];
  detailedIngredients?: ProductIngredient[];
  stock: number;
  dosage?: string;
  dosageFreq?: string;
  usageInfo?: string;
  qualityAssurance?: string[];
  safetyInfo?: string;
  testimonials?: Testimonial[];
  bottlesSold?: string;
  isUpcoming?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}


export interface Testimonial {
  youtubeId: string;
}

interface Window {
  fbq: any;
  _fbq: any;
}

