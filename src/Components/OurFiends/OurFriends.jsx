import React from 'react';

const partners = [
    { id: 1, name: "Petro Stone Armenia", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fpetro-stone.png&w=3840&q=75" },
    { id: 2, name: "AG Impex", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fag-impex.png&w=3840&q=75" },
    { id: 3, name: "Stone World Armenia", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fstone-world.png&w=3840&q=75" },
    { id: 4, name: "Qaramshak", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fqaramshak.png&w=3840&q=75" },
    { id: 5, name: "Stone Park", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fstone-park.png&w=3840&q=75" },
    { id: 6, name: "Mane Tiles", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fmane-tiles.png&w=3840&q=75" },
    { id: 7, name: "Armenian Stone Studio", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Farmenian-stone-studio.png&w=3840&q=75" },
    { id: 8, name: "Dadoyan Wood.", logo: "https://stonemarket.am/_next/image?url=%2Fimages%2Fdadoyan-wood.png&w=3840&q=75" },
];

const PartnerCard = ({ logo, name }) => (
    <div className="group bg-white rounded-md shadow-md p-4 sm:p-6 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-2xl h-32 sm:h-40 cursor-pointer">
        <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
            <img
                src={logo}
                alt={name}
                className="max-h-10 sm:max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
            />
        </div>
        <p className="text-gray-800 font-semibold text-[9px] sm:text-[10px] md:text-xs text-center mt-2 sm:mt-3 tracking-wider uppercase line-clamp-1">
            {name}
        </p>
    </div>
);

export default function PartnersSection() {
    const bgUrl = "https://stonemarket.am/_next/image?url=%2Fimages%2Fproject1.jpeg&w=3840&q=75";

    return (
        <section
            className="relative w-full py-12 sm:py-24 px-4 sm:px-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgUrl}')` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

                <header className="text-center mb-10 sm:mb-16 max-w-4xl">
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-4 sm:mb-8">
                        Մեր Գործընկերները
                    </h2>
                    <p className="text-gray-199 text-xs sm:text-sm md:text-base leading-relaxed opacity-90 px-2">
                        Մեր գործընկերները ներկայացնում են բարձրորակ քարեր և կոպեր, որոնք առաջարկում են նորարարական լուծումներ: Յուրաքանչյուր գործընկեր կարևոր է մեր առաքելության համար՝ ստեղծել գեղեցիկ միջավայրեր, որտեղ քարերը պատմում են իրենց պատմությունները:
                    </p>
                </header>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full max-w-6xl">
                    {partners.map((partner) => (
                        <PartnerCard key={partner.id} name={partner.name} logo={partner.logo} />
                    ))}
                </div>
            </div>
        </section>
    );
}