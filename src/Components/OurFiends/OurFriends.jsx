import React from 'react';

const partners = [
  { id: 1, name: "Petro Stone Armenia", logo: "https://api.dicebear.com/7.x/initials/svg?seed=PS&backgroundColor=f1f1f1" },
  { id: 2, name: "AG Impex", logo: "https://api.dicebear.com/7.x/initials/svg?seed=AG&backgroundColor=f1f1f1" },
  { id: 3, name: "Stone World Armenia", logo: "https://api.dicebear.com/7.x/initials/svg?seed=SW&backgroundColor=f1f1f1" },
  { id: 4, name: "Qaramshak", logo: "https://api.dicebear.com/7.x/initials/svg?seed=QA&backgroundColor=f1f1f1" },
  { id: 5, name: "Stone Park", logo: "https://api.dicebear.com/7.x/initials/svg?seed=SP&backgroundColor=f1f1f1" },
  { id: 6, name: "Mane Tiles", logo: "https://api.dicebear.com/7.x/initials/svg?seed=MT&backgroundColor=f1f1f1" },
  { id: 7, name: "Armenian Stone Studio", logo: "https://api.dicebear.com/7.x/initials/svg?seed=AS&backgroundColor=f1f1f1" },
  { id: 8, name: "Dadoyan Wood.", logo: "https://api.dicebear.com/7.x/initials/svg?seed=DW&backgroundColor=f1f1f1" },
];

const PartnerCard = ({ logo, name }) => (
  <div className="group bg-white rounded-md shadow-lg p-6 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-44 cursor-pointer">
    <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
      <img 
        src={logo} 
        alt={name} 
        className="max-h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110" 
      />
    </div>
    <p className="text-gray-600 font-semibold text-xs md:text-sm text-center mt-4 tracking-tight uppercase">
      {name}
    </p>
  </div>
);

export default function App() {
  return (
    <main className="relative min-h-screen font-sans selection:bg-emerald-500 selection:text-white">
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517055743200-ea060d921207?auto=format&fit=crop&q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
        
        <header className="text-center mb-16 space-y-6">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold uppercase tracking-[0.2em]">
            Մեր Գործընկերները
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
            Մեր գործընկերները ներկայացնում են բարձրորակ քարեր և կավեր, որոնք առաջարկում են նորարարական լուծումներ: 
            Յուրաքանչյուր գործընկեր կարևոր է մեր առաքելության համար՝ ստեղծել գեղեցիկ միջավայրեր, որտեղ քարերը պատմում են իրենց պատմությունները:
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} name={partner.name} logo={partner.logo} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button className="bg-[#00d084] p-4 rounded-full shadow-lg hover:bg-[#00b070] hover:scale-110 active:scale-95 transition-all text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="bg-[#00d084] p-4 rounded-full shadow-lg hover:bg-[#00b070] hover:scale-110 active:scale-95 transition-all text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </main>
  );
}