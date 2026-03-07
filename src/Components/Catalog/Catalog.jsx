import React from "react";
import Sidebar from "./SideBar";
import Hero from "./Hero";


function Banner() {
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

export default function App() {
  return (
    <div className="bg-[#f8f9fa] py-6 px-4 md:px-12">
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          <Hero />
        </div>

        <div className="w-full">
          <Banner />
        </div>
      </div>
    </div>
  );
}
