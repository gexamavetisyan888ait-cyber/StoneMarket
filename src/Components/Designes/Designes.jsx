import React from 'react';

const designers = [
  {
    id: 1,
    title: "Unique Design",
    description: "Ճարտարապետական ​​3D մոդելների մշակում ըստ ձեր գծագրերի և էսքիզների (ինտերիեր, էքստերիեր, կահույք): ...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740466806085--Messenger_creation_4D4BF230-75CC-4580-A6C6-5B77D4AED49E.webp&w=3840&q=75"
  },
  {
    id: 2,
    title: "ARCHITECTUM LLC",
    description: "1. Էսքիզային նախագծերի մշակում, ցուցադրական նյութերի պատրաստում...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739358817839--WhatsApp_Image_2025-02-12_at_15.01.36_b320a8a6.webp&w=3840&q=75"
  },
  {
    id: 3,
    title: "LUMINAR studio",
    description: "Նախագծման ընթացքում մեր փորձառու մասնագետները կիրառում են միմիայն առաջադեմ համակարգչային ծրագրեր՝...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739528262438--WhatsApp_Image_2025-02-14_at_13.51.57_73d0dfcd.webp&w=3840&q=75"
  },
  {
    id: 4,
    title: "SILAS DESIGN AND CONSTRUCTION",
    description: "SILAS DESIGN AND CONSTRUCTION հիմնադրվել է 2010 թվականին: Այն մասնագիտացված է բնակարանների, ...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743664023548--photo_2025-04-03_11-05-29.webp&w=3840&q=75"
  },
  {
    id: 5,
    title: "ԻՄԵՋՄԵՆ Ինտերիեր-դիզայնի և...",
    description: "ԻՄԵՅՋՄԵՆ արվեստանոցը հիմնադրվել է 1999 թվականին, ինտերիեր դիզայներ Միքայել Կարսյանի կողմից: ...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739859337970--Logo_IMAGEMAN.webp&w=3840&q=75"
  },
  {
    id: 6,
    title: "ԴԱԱՊ ճարտարապետական արվեստանոց",
    description: "ԴԱԱՊ ճարտարապետական արվեստանոցը նախկին «QC Architects»-ի համահիմնադիր ճարտարապետ Ալեքսանդր Դանիելյանի նոր բիզնես նախագիծն է:...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739874444574--WhatsApp_Image_2025-02-18_at_14.15.03_101ceb94.webp&w=3840&q=75"
  },
  {
    id: 7,
    title: "ՆԵՐԳԱՂԹ ՃԱՐՏԱՐԱՊԵՏԱԿԱՆ...",
    description: "Ներգաղթ ճարտարապետական արվեստանոցը հիմնադրվել է 2006թ․-ին։ Իր գործունեության ընթացքում ...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740464484847--IMG_20250225_101526_731.webp&w=3840&q=75"
  },
  {
    id: 8,
    title: "Ջի-Էմ-Ջի Ինտերիերս",
    description: " Ջի–Էմ–Ջի Ինթիրիորս ստուդիան հիմնադրվել է 2018 թվականին, ճարտարապետ- դիզայներ Գարրի Մակիչյանի կողմից: ...",
    logo: "https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1741863888966--Logo_16x10.webp&w=3840&q=75"
  },
];

const DesignerCard = ({ designer }) => (
  <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 flex flex-col cursor-pointer border border-gray-100 h-full">
    <div className="w-full aspect-[16/10] bg-gray-50 rounded-lg overflow-hidden mb-3 sm:mb-4 border border-gray-50">
      <img 
        src={designer.logo} 
        alt={designer.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <h3 className="text-[12px] sm:text-[13px] font-bold text-gray-900 uppercase leading-tight tracking-tight line-clamp-1">
        {designer.title}
      </h3>
      <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed line-clamp-2 min-h-[32px]">
        {designer.description}
      </p>
    </div>
  </div>
);

export default function DesignersSection() {
  return (
    <div className="bg-[#f3f4f6] py-8 sm:py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Դիզայներներ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {designers.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>

        <div className="flex justify-center">
          <button className="w-full sm:w-auto bg-[#00d084] hover:bg-[#00b070] text-white font-bold py-3 sm:py-2.5 px-10 rounded-md transition-colors text-xs sm:text-sm uppercase tracking-wide">
            Ավելին
          </button>
        </div>
      </div>
    </div>
  );
}