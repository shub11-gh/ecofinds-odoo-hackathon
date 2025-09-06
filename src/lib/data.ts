
import type { Product, User, Category, Purchase, SubCategory, RepairShop } from './types';

export const categories: { name: Category, subcategories: SubCategory<Category>[] }[] = [
    { name: 'Electronics', subcategories: ['Laptops', 'Mobiles', 'Tablets'] },
    { name: 'Furniture', subcategories: ['Sofa', 'Chair', 'Table'] },
    { name: 'Clothing', subcategories: ['Jackets', 'Jeans', 'Accessories'] },
    { name: 'Books', subcategories: ['Fiction', 'Non-Fiction', 'Comics'] },
    { name: 'Other', subcategories: ['Home Decor', 'Art', 'Miscellaneous'] },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'A stylish vintage leather jacket, perfect for all seasons. Minor wear and tear, adding to its character.',
    price: 75.00,
    category: 'Clothing',
    subcategory: 'Jackets',
    imageUrl: 'https://imgs.search.brave.com/pxgSfB2yGAUMdW7SI35bNJXlJRWQy3UOJGimJscrTV8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by92aW50YWdl/LWxlYXRoZXItYmlr/ZXItamFja2V0LTI2/MG53LTE5NDA0MDIw/MC5qcGc',
    userId: '2',
    imageHint: 'leather jacket'
  },
  {
    id: '2',
    title: 'Mid-Century Modern Armchair',
    description: 'A beautifully restored mid-century modern armchair. Upholstery is new, frame is original wood.',
    price: 350.00,
    category: 'Furniture',
    subcategory: 'Chair',
    imageUrl: 'https://imgs.search.brave.com/8cJVPvsR_GB5LK1Z0XG1ncJ41Jr1ioN5RRaYhc7ZLs4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oYXJk/YmFja25vdmVscy5j/b20vY2RuL3Nob3Av/ZmlsZXMvQnJvbnRl/c19ub19UZW5hbnQu/cG5nP3Y9MTczMzE0/MDE4NCZ3aWR0aD01/MzM',
    userId: '2',
    imageHint: 'modern armchair'
  },
  {
    id: '3',
    title: 'Classic Sci-Fi Novel Collection',
    description: 'A set of 5 classic science fiction novels from the 1960s. All first editions in good condition.',
    price: 120.00,
    category: 'Books',
    subcategory: 'Fiction',
    imageUrl: 'https://picsum.photos/600/400',
    userId: '2',
    imageHint: 'book collection'
  },
  {
    id: '4',
    title: 'Portable Bluetooth Speaker',
    description: 'Slightly used portable Bluetooth speaker with excellent sound quality and long battery life. Comes with charging cable.',
    price: 45.00,
    category: 'Electronics',
    subcategory: 'Mobiles', // Assuming this fits best
    imageUrl: 'https://picsum.photos/600/400',
    userId: '3',
    imageHint: 'bluetooth speaker'
  },
  {
    id: '5',
    title: 'Handmade Ceramic Vase',
    description: 'A unique handmade ceramic vase with intricate patterns. Perfect for home decor.',
    price: 30.00,
    category: 'Other',
    subcategory: 'Home Decor',
    imageUrl: 'https://picsum.photos/600/400',
    userId: '2',
    imageHint: 'ceramic vase'
  },
  {
    id: '6',
    title: 'Designer Denim Jeans',
    description: 'Gently worn designer denim jeans, size 32/32. No visible signs of wear.',
    price: 60.00,
    category: 'Clothing',
    subcategory: 'Jeans',
    imageUrl: 'https://picsum.photos/600/400',
    userId: '3',
    imageHint: 'denim jeans'
  }
];

export const mockUser: User = {
  id: '1',
  username: 'SustainableSam',
  email: 'sam@example.com',
  phone: '123-456-7890',
  location: 'Greenville, USA',
  about: 'Passionate about upcycling and finding new homes for pre-loved items.',
  ecoScore: 78,
  ecoTips: [
    "Consider using biodegradable packaging when you ship items.",
    "Highlight the durable and long-lasting nature of your products in descriptions.",
    "Group multiple items for a single buyer to reduce shipping emissions."
  ],
  ecoCertification: "Silver",
  activity: [
    { month: 'Jan', listings: 5, sales: 3 },
    { month: 'Feb', listings: 7, sales: 4 },
    { month: 'Mar', listings: 6, sales: 5 },
    { month: 'Apr', listings: 8, sales: 6 },
    { month: 'May', listings: 10, sales: 8 },
    { month: 'Jun', listings: 9, sales: 7 },
  ],
  stats: {
    itemsSold: 33,
    totalEarnings: 2450.75,
    activeListings: 9,
  }
};

export const mockCart: Product[] = [
  mockProducts[1],
  mockProducts[3]
];

export const mockPurchases: Purchase[] = [
  {
    ...mockProducts[4],
    purchaseDate: '2024-07-28',
    estimatedArrival: '2024-08-05',
    trackingNumber: '1Z999AA10123456784',
    trackingStatus: 'Out for Delivery'
  }
];

export const repairCategories = ['Electronics', 'Furniture', 'Clothing', 'Appliances', 'Jewelry', 'Other'];

export const mockRepairShops: RepairShop[] = [
    {
        id: 'shop-1',
        name: 'Gadget Gurus',
        category: 'Electronics',
        distance: '1.2 miles away',
        contact: '555-0101',
        description: 'Expert repairs for all your electronic devices, from phones to laptops. Same-day screen repairs available.'
    },
    {
        id: 'shop-2',
        name: 'The Wood Whisperer',
        category: 'Furniture',
        distance: '2.5 miles away',
        contact: '555-0102',
        description: 'Specializing in the restoration and repair of wooden furniture. We bring your cherished pieces back to life.'
    },
    {
        id: 'shop-3',
        name: 'Stitch in Time',
        category: 'Clothing',
        distance: '3.1 miles away',
        contact: '555-0103',
        description: 'Professional alterations and repairs for all types of clothing. From simple hems to complex tailoring.'
    },
     {
        id: 'shop-4',
        name: 'Appliance Avengers',
        category: 'Appliances',
        distance: '4.0 miles away',
        contact: '555-0104',
        description: 'Fast and reliable repairs for all major home appliances. Certified technicians for washers, dryers, and more.'
    },
    {
        id: 'shop-5',
        name: 'The Gem Clinic',
        category: 'Jewelry',
        distance: '4.5 miles away',
        contact: '555-0105',
        description: 'Delicate and precise jewelry repair. We handle everything from ring sizing to stone replacement with care.'
    },
    {
        id: 'shop-6',
        name: 'Fix-It-All Workshop',
        category: 'Other',
        distance: '5.2 miles away',
        contact: '555-0106',
        description: 'A general repair shop for anything else you can think of. If it\'s broken, we can probably fix it!'
    }
];
