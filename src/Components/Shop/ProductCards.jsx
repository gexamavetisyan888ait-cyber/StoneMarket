import { ShoppingCart, Heart } from 'lucide-react';
import { useRealtimeCollection } from "../../lib/hook";

export default ({ item }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-lg">
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
      <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute left-3 top-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-md border border-white/30">
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">ԿՈԴ {item.code}</span>
      </div>
      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 hover:text-red-900">
        <Heart size={16} />
      </button>
    </div>
    <div className="flex flex-1 flex-col p-4">
      <h3 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight">{item.title}</h3>
      <p className="text-[12px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">{item.desc}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-black text-gray-900">{item.price} <small className="text-[10px]">ԴՐ.</small></span>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-emerald-400 text-emerald-500 hover:bg-emerald-500 hover:text-white">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);
