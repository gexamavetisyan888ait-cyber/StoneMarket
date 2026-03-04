import React from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const navLinks = [
    "Գլխավոր",
    "Խանութ",
    "Բրենդներ",
    "Մեր մասին",
    "Կապ",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex flex-col leading-tight cursor-pointer">
            <img className="text-2xl font-bold text-emerald-500 tracking-wide" src="https://stonemarket.am/icons/logo-primary.svg"/>
          
            
          
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-700 hover:text-emerald-500 transition font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-emerald-500 hover:text-emerald-500 transition">
                <FiSearch size={18} />
              </button>

              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-emerald-500 hover:text-emerald-500 transition">
                <FiUser size={18} />
              </button>

              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-emerald-500 hover:text-emerald-500 transition">
                <FiHeart size={18} />
              </button>

              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-emerald-500 hover:text-emerald-500 transition">
                <FiShoppingCart size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://flagcdn.com/w40/am.png"
                alt="Armenia"
                className="w-6 h-4 object-cover rounded-sm"
              />
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}