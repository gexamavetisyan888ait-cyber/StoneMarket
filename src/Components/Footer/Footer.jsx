import {
    FiPhone,
    FiMessageCircle,
    FiInstagram,
    FiFacebook,
} from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function App() {
    return (
        <div className="bg-[#061922] text-white" >

            <section className="w-full px-6 py-5 flex gap-10 flex-col sm:flex-row ">


                <div className="bg-[#0c2430] border border-white/10 rounded-2xl px-5 py-2 shadow-xl w-full sm:w-[50%] ">
                    <h2 className="text-2xl font-semibold mb-2">Կապվեք մեզ հետ</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Լրացրեք տվյալները և մեր մասնագետը Ձեզ հետ կհաստատի կապ։
                    </p>

                    <div className="space-y-5">
                        <input
                            type="text"
                            placeholder="Անուն"
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-400"
                        />

                        <input
                            type="email"
                            placeholder="Էլ. հասցե"
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-400"
                        />

                        <div className="flex border border-white/20 rounded-lg overflow-hidden">
                            <div className="px-4 py-2 bg-white/5 text-sm">
                                🇦🇲 +374
                            </div>
                            <input
                                type="text"
                                placeholder="Հեռախոսահամար"
                                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
                            />
                        </div>

                        <textarea
                            placeholder="Հաղորդագրություն"
                            rows="4"
                            className="w-full bg-transparent border border-white/20 rounded-lg px-4  text-sm focus:outline-none focus:border-emerald-400"
                        />

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <input type="checkbox" />
                            <span>Համաձայն եմ պայմաններին</span>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition rounded-lg py-2 font-medium">
                            Ուղարկել
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xl w-full  h-[460px]">
                    <img
                        src="https://stonemarket.am/_next/image?url=%2Fimages%2Ffeedback.webp&w=3840&q=75"
                        alt="office"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            <footer className="bg-gradient-to-b from-[#071f2b] to-[#05161f]">

                <div className="max-w-7xl mx-auto px-6 py-7 grid md:grid-cols-2 lg:grid-cols-4 gap-16">

                    <div>
                        <img src="https://stonemarket.am/icons/logo-light.svg" />

                        <p className="text-gray-300 text-sm mb-2">
                            +374 (33) 76 - 73 - 77
                        </p>
                        <p className="text-gray-300 text-sm">
                            sstonemarket@yandex.ru
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-8">Գլխավոր</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            {[
                                "Խանութ",
                                "Բրենդներ",
                                "Մեր մասին",
                                "Կապ",
                                "Գործընկերություն",
                                "Հաճախ տրվող հարցեր",
                            ].map((item, i) => (
                                <li key={i} className="hover:text-emerald-400 cursor-pointer transition">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-8">Ծառայություններ</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            {[
                                "Արտադրական գծի աջակցում",
                                "Համագործակցության պայմաններ",
                                "Փորագրման ծառայություն",
                                "Export-ի կազմակերպում",
                                "Բեռնափոխադրում",
                            ].map((item, i) => (
                                <li key={i} className="hover:text-emerald-400 cursor-pointer transition">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-8">Հետևեք մեզ սոցիալականում</h3>

                        <div className="space-y-5 mb-10 text-sm">
                            <div className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 cursor-pointer">
                                <FiInstagram />
                                <span>stonemarket.am</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 cursor-pointer">
                                <FiFacebook />
                                <span>Stone Market</span>
                            </div>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <button className="flex items-center gap-3 bg-[#0d2a36] border border-white/10 px-5 py-3 rounded-xl text-sm hover:border-emerald-400 transition">
                                <FaApple />
                                <div>
                                    <div className="text-[10px] text-gray-400">Download on the</div>
                                    <div className="font-medium">App Store</div>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 bg-[#0d2a36] border border-white/10 px-5 py-3 rounded-xl text-sm hover:border-emerald-400 transition">
                                <FaGooglePlay />
                                <div>
                                    <div className="text-[10px] text-gray-400">Get it on</div>
                                    <div className="font-medium">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-16" />
            </footer>

            <div className="fixed right-8 bottom-8 flex flex-col gap-5">
                <button className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <FiPhone size={22} />
                </button>
                <a className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl" href="/chat">
                    <FiMessageCircle size={22} />
                </a>
            </div>

        </div>
    );
}