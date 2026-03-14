import { create } from 'zustand';

const useStore = create((set) => ({
  // Սկզբնական վիճակ (State)
  cart: [],
  favorites: [],

  // Զամբյուղի գործողություններ
  addToCart: (product) => set((state) => {
    const isPresent = state.cart.find(item => item.id === product.id);
    if (!isPresent) {
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }
    return state; // Եթե արդեն կա, ոչինչ չենք անում (կամ կարող ես քանակը ավելացնել)
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  // Like-երի գործողություններ
  toggleLike: (product) => set((state) => {
    const isLiked = state.favorites.find(item => item.id === product.id);
    if (isLiked) {
      // Եթե արդեն լայքած է, հանում ենք ցուցակից
      return { favorites: state.favorites.filter(item => item.id !== product.id) };
    } else {
      // Եթե լայքած չէ, ավելացնում ենք
      return { favorites: [...state.favorites, product] };
    }
  }),
}));

export default useStore;