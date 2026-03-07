import { useRealtimeCollection } from "../../lib/hook";

export default function Banner() {
  return (
    <div className="mt-8 relative w-full rounded-3xl overflow-hidden shadow-lg group">
      <img
        src="https://stonemarket.am/_next/image?url=%2Fimages%2Frocket-line.jpg&w=3840&q=75"
        className="w-full h-auto min-h-[120px] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        alt="Banner"
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all"></div>
    </div>
  );
}