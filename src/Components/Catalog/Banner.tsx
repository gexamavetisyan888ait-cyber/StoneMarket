import React from "react";
import { useRealtimeCollection } from "../../lib/hook";
import { Product } from "../../store/useStore"; // Եթե սա ապրանքների բաներն է

/**
 * Banner կոմպոնենտ:
 * Եթե սա ստատիկ է, React.FC տիպավորումը բավարար է:
 */
const Banner: React.FC = () => {
  // Օրինակ, եթե հետագայում ուզենաս տվյալներ ստանալ.
  // const { data: banners, loading } = useRealtimeCollection<any>("db/banners");

  return (
    <div className="mt-8 relative w-full rounded-3xl overflow-hidden shadow-lg group">
      <img
        src="https://stonemarket.am/_next/image?url=%2Fimages%2Frocket-line.jpg&w=3840&q=75"
        className="w-full h-auto min-h-[120px] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        alt="Stone Market Banner"
      />
      {/* Overlay - ավելացվել է պաշտպանվածություն սխալներից */}
      <div 
        className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
};

export default Banner;