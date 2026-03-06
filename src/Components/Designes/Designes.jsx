import React from 'react';
import { useRealtimeCollection } from "../../lib/hook";

const DesignerCard = ({ designer }) => (
  <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 flex flex-col cursor-pointer border border-gray-100 h-full">
    <div className="w-full aspect-[16/10] bg-gray-50 rounded-lg overflow-hidden mb-3 sm:mb-4 border border-gray-50">
      <img 
        src={designer.logo} 
        alt={designer.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <h3 className="text-[12px] sm:text-[13px] font-bold text-gray-900 uppercase leading-tight tracking-tight line-clamp-1">
        {designer.title}
      </h3>
      <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed line-clamp-2 min-h-[32px]">
        {designer.description}
      </p>
    </div>
  </div>
);

export default function DesignersSection() {

  const { data: designers, loading, error } = useRealtimeCollection("db/designes");

  return (
    <div className="bg-[#f3f4f6] py-8 sm:py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Դիզայներներ
          </h2>
        </div>

        {error && <p className="text-center text-red-500">Սխալ տվյալների բեռնման ժամանակ</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {loading 
            ? Array(4).fill(0).map((_, i) => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />)
            : designers.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))
          }
        </div>

        <div className="flex justify-center">
          <button className="w-full sm:w-auto bg-[#00d084] hover:bg-[#00b070] text-white font-bold py-3 sm:py-2.5 px-10 rounded-md transition-colors text-xs sm:text-sm uppercase tracking-wide">
            Ավելին
          </button>
        </div>
      </div>
    </div>
  );
}