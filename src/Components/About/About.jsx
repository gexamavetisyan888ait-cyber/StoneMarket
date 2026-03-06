import React from "react";

// --- Components ---

const FloatingContactButtons = () => (
  <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
    <a
      href="tel:+374000000"
      className="bg-[#00e676] p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white"
      aria-label="Call us"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    </a>
    <a
      href="#"
      className="bg-[#00e676] p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white"
      aria-label="WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </a>
  </div>
);

const HeroSection = () => (
  <section className="bg-[#0f171e] text-white py-24 px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-center">
        {/* Petro Stone Logo Placeholder */}
        <div className="w-16 h-16 border-2 border-white flex items-center justify-center">
            <div className="text-2xl font-black italic">P</div>
        </div>
      </div>
      <h2 className="text-xs uppercase tracking-[0.3em] mb-3 opacity-70 font-medium">PETRO STONE</h2>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">ՊԵՏՐՈ ՍԹՈՈՆ</h1>
      <p className="text-gray-400 leading-relaxed text-sm md:text-lg max-w-3xl mx-auto">
        «Պետրո Սթոուն» ընկերությունների խումբը զբաղվում է բնական քարերի արդյունահանմամբ, մշակմամբ և վաճառքով՝ 
        ապահովելով ծառայությունների ամբողջական ցիկլ։ Այն իր մեջ ներառում է մի քանի ընկերություն, որոնք առաջարկում են 
        որակյալ լուծումներ շինարարության, դիզայնի և լանդշաֆտային նախագծերի համար՝ ապահովելով հուսալիություն և երկարատև համագործակցություն գործընկերների հետ։
      </p>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="bg-white py-24 px-6 text-center text-gray-900">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wider">STONE MARKET</h2>
      <h3 className="text-xl md:text-2xl font-semibold mb-8 text-gray-800">
        Բնական քարի համաշխարհային շուկայի հայկական հարթակը
      </h3>
      <p className="text-gray-600 mb-16 leading-relaxed text-base md:text-lg max-w-4xl mx-auto">
        Stonemarket-ն առաջին հայկական օնլայն հարթակն է, որը միավորում է բնական քարի արդյունահանմամբ, 
        մշակմամբ և վաճառքով զբաղվող ընկերություններին մեկ տեղում՝ ապահովելով նրանց համար տեսանելիություն, 
        ճանաչելիություն և վստահելի գործընկերային կապեր։ Մենք միավորում ենք արտադրողներին, դիզայներներին, 
        ճարտարապետներին և մատակարարներին՝ ստեղծելով բաց, թափանցիկ և առաջադեմ միջավայր։
      </p>

      <div className="space-y-6 border-t pt-12">
        <h4 className="font-bold text-lg uppercase tracking-widest">ՄԵՐ ԱՌԱՔԵԼՈՒԹՅՈՒՆԸ</h4>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          Արտադրողներին և դիզայներներին տալ իրական հարթակ, որտեղ քարը դառնում է բրենդ, իսկ արտադրանքը՝ պատմություն։ 
          Stonemarket-ը կառուցված է գաղափարի շուրջ՝
        </p>
        <p className="text-xl font-medium italic text-gray-800 mt-6">
          «Հայկական բնական քարը պետք է խոսի ինքն իր անունից՝ որակով, դիզայնով և վստահությամբ»։
        </p>
      </div>
    </div>
  </section>
);

const MediaSection = () => (
  <section className="bg-gray-50 py-16 px-6 pb-32">
    <div className="max-w-6xl mx-auto">
      <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
        <video
          src="https://api.stonemarket.am/static/videos/hero-bg.mp4" // Սա օրինակ է, տեղադրեք ձեր իրական վիդեո հղումը
          className="w-full h-[400px] md:h-[700px] object-cover transition-transform duration-1000 group-hover:scale-105"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay subtle dark layer */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700"></div>
      </div>
    </div>
  </section>
);

// --- Main App Component ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gray-900 selection:text-white">
      <HeroSection />
      <AboutSection />
      <MediaSection />
      <FloatingContactButtons />
    </div>
  );
}
