import {create} from 'zustand';
import { Course } from '@/types';


interface CartState {
    cart: Course[];
    addToCart: (product: Course) => void;
    removeFromCart: (product: Course) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({cart: [...state.cart, product]})),
  removeFromCart: (product) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== product.id),
    })),
}));