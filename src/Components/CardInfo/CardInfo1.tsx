import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRealtimeCollection } from "../../lib/hook";
import { Heart, ShoppingCart, ChevronLeft, ShieldCheck, Truck } from 'lucide-react';
import { useStore, useFavorite, Product } from "../../store/useStore";

export default function ProductDetails(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Տվյալների ստացում Generic տիպավորմամբ
  const { data: products = [], loading } = useRealtimeCollection<Product>("db/shop");
  
  const [activeImg, setActiveImg] = useState<string | null>(null);

  // Ապրանքի որոնում
  const product = products?.find(p => p.id === id);

  // Store Actions & State
  const cart = useStore((state) => state.cart);
  const likes = useFavorite((state) => state.likes);
  const addToCart = useStore((state) => state.addToCart);
  const toggleLike = useStore((state) => state.toggleLike);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center animate-pulse text-gray-400 font-bold uppercase tracking-widest">
        Բեռնվում է...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-gray-400 uppercase">Ապրանքը չի գտնվել</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all"
        >
          ՎԵՐԱԴԱՌՆԱԼ
        </button>
      </div>
    );
  }

  const isInCart = cart.some((c) => c.id === product.id);
  const isLiked = likes.some((c) => c.id === product.id);

  return (
    <div className="bg-[#fcfcfc] pb-20 font-sans selection:bg-emerald-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-tighter group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Հետ դեպի խանութ
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Gallery */}
          <div className="w-full lg:w-[55%] flex gap-4">
            <div className="hidden md:flex flex-col gap-3">
              {[product.img].map((image, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(image)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === image || (!activeImg && idx === 0) 
                      ? 'border-emerald-500 shadow-lg' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>

            <div className="flex-1 aspect-square rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center">
              <img 
                src={activeImg || product.img} 
                className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500" 
                alt={product.title} 
              />
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-[45%] space-y-8">
            <div className="space-y-2">
              <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase bg-emerald-50 px-3 py-1 rounded-full">
                Կոդ: {product.id?.slice(0, 8).toUpperCase() || "N/A"}
              </span>
              <h1 className="text-4xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                {product.title}
              </h1>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-gray-900 tracking-tighter">
                {Number(product.price).toLocaleString()}
              </span>
              <span className="text-xl font-bold text-gray-500 italic">ԴՐ.</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 uppercase text-xs tracking-[0.2em] border-b border-gray-100 pb-2 text-emerald-600">
                Նկարագրություն
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                {product.desc || "Նկարագրությունը բացակայում է:"}
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(product)}
                  className={`flex-[4] py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 ${
                    isInCart 
                      ? 'bg-gray-900 text-white shadow-gray-200' 
                      : 'bg-[#00d285] hover:bg-[#00bc77] text-white shadow-emerald-100'
                  }`}
                >
                  <ShoppingCart size={24} />
                  {isInCart ? "ԱՎԵԼԱՑՎԱԾ Է" : "ԱՎԵԼԱՑՆԵԼ ԶԱՄԲՅՈՒՂ"}
                </button>

                <button 
                  onClick={() => toggleLike(product)}
                  className={`flex-1 flex items-center justify-center rounded-2xl border-2 transition-all active:scale-90 ${
                    isLiked 
                      ? 'border-red-500 bg-red-50 text-red-500 shadow-md' 
                      : 'border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400'
                  }`}
                >
                  <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-emerald-200">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Truck size={20}/>
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase leading-tight">Արագ <br/> Առաքում</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <ShieldCheck size={20}/>
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase leading-tight">Որակի <br/> Երաշխիք</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}