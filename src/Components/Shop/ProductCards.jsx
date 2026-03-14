import { ShoppingCart, Heart } from 'lucide-react';
import { useStore, useFavorite } from "../../store/useStore"; 

export default ({ item }) => {
  // Կանչում ենք store-ը՝ պահպանելով ռեակտիվությունը
  const cart = useStore((state) => state.cart);
  const cartL = useFavorite((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const toggleLike = useFavorite((state) => state.addToCartL);

  // Ստուգում ենք ակտիվությունը
  const isInCart = cart.some((c) => c.id === item.id);
  const isLiked = cartL.some((c) => c.id === item.id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-gray-50">
        <img src={item.img} className="h-full w-full object-cover" />
        
        {/* Like Button */}
        <button 
          onClick={() => toggleLike(item)}
          className={`absolute right-3 top-3 p-2 rounded-full transition-colors ${
            isLiked ? 'text-red-600 bg-white' : 'text-gray-400 bg-white/80 hover:text-red-600'
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900">{item.title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-black">{item.price} ԴՐ.</span>
          
          <button 
            onClick={() => {
              addToCart(item)
              console.log(item);
              
            }}
            className={`p-2 rounded-xl border-2 transition-all ${
              isInCart 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : 'border-emerald-400 text-emerald-500 hover:bg-emerald-500 hover:text-white'
            }`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};