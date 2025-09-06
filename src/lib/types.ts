export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Books' | 'Other';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  userId: string;
  imageHint: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  ecoScore?: number;
  ecoTips?: string[];
  ecoCertification?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Purchase extends Product {
  purchaseDate: string;
  estimatedArrival: string;
  trackingNumber: string;
}
