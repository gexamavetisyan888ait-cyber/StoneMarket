import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      // Ֆունկցիա՝ ստանալու համար զամբյուղը
      getCart: () => get().cart,

      // Ֆունկցիա՝ ստանալու համար լայքած ապրանքները
      getFavorites: () => get().favorites,

      toggleLike: (product) => set((state) => ({
        favorites: state.favorites.some((item) => item.id === product.id)
          ? state.favorites.filter((item) => item.id !== product.id)
          : [...state.favorites, product]
      })),

      addToCart: (product) => set((state) => ({
        cart: state.cart.some((item) => item.id === product.id)
          ? state.cart.filter((item) => item.id !== product.id)
          : [...state.cart, product]
      })),
    }),
    {
      name: 'shopping-storage', 
    }
  )
);