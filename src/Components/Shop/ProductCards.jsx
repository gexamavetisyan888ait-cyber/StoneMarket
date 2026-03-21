import { ShoppingCart, Heart } from 'lucide-react';
import { useStore, useFavorite } from "../../store/useStore"; 
import { useNavigate } from 'react-router-dom'; // Ավելացրինք սա

export default ({ item }) => {
  const navigate = useNavigate(); // Հուքը էջերի միջև նավիգացիայի համար

  const cart = useStore((state) => state.cart);
  const cartL = useFavorite((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const toggleLike = useFavorite((state) => state.addToCartL);

  const isInCart = cart.some((c) => c.id === item.id);
  const isLiked = cartL.some((c) => c.id === item.id);

  return (
    <div 
      // Հիմնական դիվի վրա ավելացրինք onClick-ը
      onClick={() => navigate(`/product/${item.id}`)}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-lg cursor-pointer"
    >
      <div className="relative aspect-[4/3] bg-gray-50">
        <img src={item.img} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt={item.title} />
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Կանխում ենք էջի փոխվելը սրտիկին սեղմելիս
            toggleLike(item);
          }}
          className={`absolute right-3 top-3 p-2 rounded-full transition-colors z-10 ${
            isLiked ? 'text-emerald-500 bg-white' : 'text-gray-400 bg-white/80 hover:text-emerald-500'
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-black text-lg text-gray-800">{item.price} ԴՐ.</span>
          
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Կանխում ենք էջի փոխվելը զամբյուղին սեղմելիս
              addToCart(item);
              console.log("Added to cart:", item);
            }}
            className={`p-2 rounded-xl border-2 transition-all z-10 ${
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