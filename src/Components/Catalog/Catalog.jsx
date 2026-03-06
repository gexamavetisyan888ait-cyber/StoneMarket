import React from "react";

const menuItems = [
    { name: "Բնական քար", icon: "🚀" },
    { name: "Արհեստական քար", icon: "🪨" },
    { name: "Հաստոցներ", icon: "⚙️" },
    { name: "Քարամշակման գործիքներ", icon: "🛠️" },
    { name: "Քիմիական նյութեր", icon: "🧴" },
    { name: "Արտադրական ծառայություններ", icon: "🏭" },
    { name: "Mane Tiles", icon: "🏛️" },
];

function Sidebar() {
    return (
        <div className="bg-white w-full lg:w-80 rounded-2xl shadow-sm p-6 space-y-4 h-fit">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Կատեգորիաներ</h3>
            {menuItems.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 text-gray-700 hover:text-emerald-500 transition-all cursor-pointer p-3 hover:bg-gray-50 rounded-xl"
                >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold text-sm md:text-base">{item.name}</span>
                </div>
            ))}
        </div>
    );
}

function Hero() {
    return (
        <div className="flex-1 w-full">
            <img
                src="https://kamnemir.ru/images/cms/data/projects/gallery/box/21.jpg"
                className="w-full h-[300px] md:h-[600px] object-cover rounded-3xl shadow-md transition-transform duration-500 hover:brightness-95"
                alt="Stone Project"
            />
        </div>
    );
}

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