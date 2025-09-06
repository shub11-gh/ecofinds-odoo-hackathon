
import { create } from 'zustand';
import type { Product } from './types';

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isItemInCart: (productId: string) => boolean;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product) => {
    if (get().isItemInCart(product.id)) {
      console.log('Product already in cart');
      return;
    }
    set((state) => ({ items: [...state.items, product] }));
  },
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  isItemInCart: (productId) =>
    get().items.some((item) => item.id === productId),
  clearCart: () => set({ items: [] }),
}));
