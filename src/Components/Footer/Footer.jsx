import React from 'react';
import {
    FiPhone,
    FiMessageCircle,
    FiInstagram,
    FiFacebook,
} from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function App() {
    return (
        <div className="bg-[#061922] text-white min-h-screen">

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
                
                <div className="bg-[#0c2430] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl w-full lg:w-[45%] order-2 lg:order-1">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Կապվեք մեզ հետ</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Լրացրեք տվյալները և մեր մասնագետը Ձեզ հետ կհաստատի կապ։
                    </p>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Անուն"
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                        />

                        <input
                            type="email"
                            placeholder="Էլ. հասցե"
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                        />

                        <div className="flex border border-white/20 rounded-lg overflow-hidden focus-within:border-emerald-400 transition-colors">
                            <div className="px-3 sm:px-4 py-3 bg-white/5 text-xs sm:text-sm flex items-center border-r border-white/10">
                                🇦🇲 +374
                            </div>
                            <input
                                type="text"
                                placeholder="Հեռախոսահամար"
                                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                            />
                        </div>

                        <textarea
                            placeholder="Հաղորդագրություն"
                            rows="4"
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                        />

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                            <input type="checkbox" className="accent-emerald-500" />
                            <span>Համաձայն եմ պայմաններին</span>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all rounded-lg py-3 font-medium">
                            Ուղարկել
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xl w-full lg:flex-1 h-[250px] sm:h-[350px] lg:h-auto order-1 lg:order-2">
                    <img
                        src="https://stonemarket.am/_next/image?url=%2Fimages%2Ffeedback.webp&w=3840&q=75"
                        alt="office"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </section>

            <footer className="bg-gradient-to-b from-[#071f2b] to-[#05161f] mt-10">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

                    <div className="flex flex-col gap-4">
                        <img src="https://stonemarket.am/icons/logo-light.svg" className="w-48 sm:w-56 mb-2" alt="Logo" />
                        <div className="space-y-1">
                            <p className="text-gray-300 text-sm hover:text-emerald-400 cursor-pointer">+374 (33) 76 - 73 - 77</p>
                            <p className="text-gray-300 text-sm hover:text-emerald-400 cursor-pointer">stonemarket@yandex.ru</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-emerald-400 uppercase tracking-wider text-xs">Գլխավոր</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            {["Խանութ", "Բրենդներ", "Մեր մասին", "Կապ", "Գործընկերություն", "Հաճախ տրվող հարցեր"].map((item, i) => (
                                <li key={i} className="hover:text-white cursor-pointer transition-colors w-fit">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-emerald-400 uppercase tracking-wider text-xs">Ծառայություններ</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            {["Արտադրական գծի աջակցում", "Համագործակցության պայմաններ", "Փորագրման ծառայություն", "Export-ի կազմակերպում", "Բեռնափոխադրում"].map((item, i) => (
                                <li key={i} className="hover:text-white cursor-pointer transition-colors w-fit">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-emerald-400 uppercase tracking-wider text-xs">Հետևեք մեզ</h3>

                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors">
                                <FiInstagram size={18} />
                                <span>stonemarket.am</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors">
                                <FiFacebook size={18} />
                                <span>Stone Market</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                            <button className="flex items-center gap-3 bg-[#0d2a36] border border-white/10 px-4 py-2 rounded-xl text-left hover:border-emerald-400 transition-all flex-1">
                                <FaApple size={24} />
                                <div>
                                    <div className="text-[9px] text-gray-400 uppercase">Download on</div>
                                    <div className="font-medium text-xs">App Store</div>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 bg-[#0d2a36] border border-white/10 px-4 py-2 rounded-xl text-left hover:border-emerald-400 transition-all flex-1">
                                <FaGooglePlay size={20} />
                                <div>
                                    <div className="text-[9px] text-gray-400 uppercase">Get it on</div>
                                    <div className="font-medium text-xs">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-10 border-t border-white/5 mt-10 flex items-center justify-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">© 2026 Stone Market LLC</p>
                </div>
            </footer>

            <div className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 flex flex-col gap-3 sm:gap-4 z-50">
                <button className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500 hover:bg-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90">
                    <FiPhone size={20} className="sm:size-[22px]" />
                </button>
                <button className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500 hover:bg-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90">
                    <FiMessageCircle size={20} className="sm:size-[22px]" />
                </button>
            </div>

        </div>
    );
}