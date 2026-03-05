import React from "react";

const menuItems = [
  { name: "Բնական քար", icon: "🧱" },
  { name: "Արհեստական քար", icon: "🪨" },
  { name: "Հաստոցներ", icon: "⚙️" },
  { name: "Քարամշակման գործիքներ", icon: "🛠️" },
  { name: "Քիմիական նյութեր", icon: "🧴" },
  { name: "Արտադրական ծառայություններ", icon: "🏭" },
  { name: "Mane Tiles", icon: "🏛️" },
];

function Sidebar() {
  return (
    <div className="bg-white w-64 rounded-2xl shadow p-5 space-y-4">
      {menuItems.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"
        >
          <span className="text-xl">{item.icon}</span>
          <span className="font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div className="flex-1">
      <img
        src="https://kamnemir.ru/images/cms/data/projects/gallery/box/21.jpg"
        className="w-full h-[420px] object-cover rounded-3xl"
      />
    </div>
  );
}

function Banner() {
  return (
    <div className="relative  text-white rounded-3xl overflow-hidden p-12 text-center">
<img src="https://stonemarket.am/_next/image?url=%2Fimages%2Frocket-line.jpg&w=3840&q=75" alt="" />
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-gray-100  p-6">
      <div className="max-w-8xl mx-auto">

        <div className="flex gap-6">
          <Sidebar />
          <Hero />
        </div>

        <Banner />

      </div>

  
    </div>
  );
}