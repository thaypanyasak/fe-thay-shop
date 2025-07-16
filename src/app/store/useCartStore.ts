import { create } from "zustand";
import { Product } from "@/app/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addItem: (item: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),

  addItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === product.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
