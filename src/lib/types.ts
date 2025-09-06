export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Books' | 'Other';

export type SubCategory<T extends Category> = T extends 'Electronics'
  ? 'Laptops' | 'Mobiles' | 'Tablets'
  : T extends 'Furniture'
  ? 'Sofa' | 'Chair' | 'Table'
  : T extends 'Clothing'
  ? 'Jackets' | 'Jeans' | 'Accessories'
  : T extends 'Books'
  ? 'Fiction' | 'Non-Fiction' | 'Comics'
  : T extends 'Other'
  ? 'Home Decor' | 'Art' | 'Miscellaneous'
  : never;

export type TrackingStatus = 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  subcategory: SubCategory<Category>;
  imageUrl: string;
  userId: string;
  imageHint: string;
}

export interface UserActivity {
    month: string;
    listings: number;
    sales: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  ecoScore?: number;
  ecoTips?: string[];
  ecoCertification?: string;
  activity?: UserActivity[];
  stats?: {
    itemsSold: number;
    totalEarnings: number;
    activeListings: number;
  }
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Purchase extends Product {
  purchaseDate: string;
  estimatedArrival: string;
  trackingNumber: string;
  trackingStatus: TrackingStatus;
}
