import {create} from 'zustand';

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({cart: [...state.cart, product]})),
  removeFromCart: (product) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== product.id),
    })),
}));