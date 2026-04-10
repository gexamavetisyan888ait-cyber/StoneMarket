import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Ապրանքի ինտերֆեյսը (Տիպավորումը)
export interface Product {
  id: string; // Փոխված է string-ի Firebase-ի և useParams-ի հետ համապատասխանության համար
  title: string;
  price: string | number;
  img: string;
  desc?: string;
  code?: string;
}

// 2. Հիմնական Store-ի տիպերը
interface StoreState {
  favorites: Product[];
  cart: Product[];
  getCart: () => Product[];
  getFavorites: () => Product[];
  toggleLike: (product: Product) => void;
  addToCart: (product: Product) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      getCart: () => get().cart,
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
    { name: 'shopping-storage' }
  )
);

// 3. Favorite Store-ի տիպերը (եթե օգտագործում ես առանձին)
interface FavoriteState {
  likes: Product[];
  cart: Product[]; 
  getCart: () => Product[];
  getFavorites: () => Product[];
  addToCartL: (product: Product) => void;
}

export const useFavorite = create<FavoriteState>()(
  persist(
    (set, get) => ({
      likes: [],
      cart: [], 
      getCart: () => get().cart,
      getFavorites: () => get().likes,

      addToCartL: (product) => set((state) => ({
        cart: state.cart.some((item) => item.id === product.id)
          ? state.cart.filter((item) => item.id !== product.id)
          : [...state.cart, product]
      })),
    }),
    { name: 'shopping-favorite' }
  )
);