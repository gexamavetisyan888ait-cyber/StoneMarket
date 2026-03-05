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
        <div className="bg-white w-full lg:w-64 rounded-2xl shadow-sm p-5 space-y-4 h-fit">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Կատեգորիաներ</h3>
            {menuItems.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 text-gray-700 hover:text-emerald-500 transition-colors cursor-pointer p-2 hover:bg-gray-50 rounded-xl"
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm md:text-base">{item.name}</span>
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
                className="w-full h-[250px] md:h-[420px] object-cover rounded-3xl shadow-md"
                alt="Stone Project"
            />
        </div>
    );
}

function Banner() {
    return (
        <div className="mt-6 relative w-full rounded-3xl overflow-hidden shadow-lg group">
            <img 
                src="https://stonemarket.am/_next/image?url=%2Fimages%2Frocket-line.jpg&w=3840&q=75" 
                className="w-full h-auto min-h-[150px] object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Banner" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
        </div>
    );
}

export default function App() {
    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    <Sidebar />
                    <Hero />
                </div>
                <Banner />
            </div>
        </div>
    );
}
