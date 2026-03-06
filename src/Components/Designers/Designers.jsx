import React from "react";

const companies = [
    {
        name: "Unique Design",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740466806085--Messenger_creation_4D4BF230-75CC-4580-A6C6-5B77D4AED49E.webp&w=3840&q=75",
        desc: " Ճարտարապետական ​​3D մոդելների մշակում ըստ ձեր գծագրերի և էսքիզների (ինտերիեր, էքստերիեր, կահույք):",
    },
    {
        name: "ARCHITECTUM LLC",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739358817839--WhatsApp_Image_2025-02-12_at_15.01.36_b320a8a6.webp&w=3840&q=75",
        desc: "1. Էսքիզային նախագծերի մշակում, ցուցադրական նյութերի պատրաստում",
    },
    {
        name: "Luminar Studio",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739528262438--WhatsApp_Image_2025-02-14_at_13.51.57_73d0dfcd.webp&w=3840&q=75",
        desc: " Նախագծման ընթացքում մեր փորձառու մասնագետները կիրառում են միմիայն առաջադեմ համակարգչային ծրագրեր՝ ",
    },
    {
        name: "SILAS DESIGN AND CONSTRUCTION",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743664023548--photo_2025-04-03_11-05-29.webp&w=3840&q=75",
        desc: "SILAS DESIGN AND CONSTRUCTION հիմնադրվել է 2010 թվականին: Այն մասնագիտացված է բնակարանների, ",
    },
    {
        name: "ԻՄԵՅՋՄԵՆ Ինտերիեր-դիզայնի և Ճարտարապետության արվեստանոց",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739859337970--Logo_IMAGEMAN.webp&w=3840&q=75",
        desc: "ԻՄԵՅՋՄԵՆ արվեստանոցը հիմնադրվել է 1999 թվականին, ինտերիեր դիզայներ Միքայել Կարսյանի կողմից:",
    },
    {
        name: "ԴԱԱՊ ճարտարապետական արվեստանոց",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739874444574--WhatsApp_Image_2025-02-18_at_14.15.03_101ceb94.webp&w=3840&q=75",
        desc: " ԴԱԱՊ ճարտարապետական արվեստանոցը նախկին «QC Architects»-ի համահիմնադիր ճարտարապետ Ալեքսանդր Դանիելյանի։",
    },
    {
        name: "ՆԵՐԳԱՂԹ ՃԱՐՏԱՐԱՊԵՏԱԿԱՆ ԱՐՎԵՍՏԱՆՈՑ",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740464484847--IMG_20250225_101526_731.webp&w=3840&q=75",
        desc: "Ներգաղթ ճարտարապետական արվեստանոցը հիմնադրվել է 2006թ․-ին։ Իր գործունեության ընթացքում արվեստանոցը",
    },
    {
        name: "Ջի–Էմ–Ջի Ինթիրիորս",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1741863888966--Logo_16x10.webp&w=3840&q=75",
        desc: "Ջի–Էմ–Ջի Ինթիրիորս ստուդիան հիմնադրվել է 2018 թվականին, ճարտարապետ- դիզայներ Գարրի Մակիչյանի կողմից ",
    },
    {
        name: "«Archimikanika» արվեստանոց",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743496374536--photo_2025-04-01_12-07-17_(3).webp&w=3840&q=75",
        desc: "«Archimikanika» արվեստանոցը հիմնադրվել է 2013թ.-ին ճարտարապետ Միքայելա և արվեստաբան Նիկա Էլբակյանների կողմից: ։",
    },
    {
        name: "Elmi Design Studio",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743515286102--530DE1F7-D095-4A8B-BBC0-64BA3DFA4C6F%5B1%5D.webp&w=3840&q=75",
        desc: "Նախագծում ենք տարածքներ ժամանակակից մոտեցումներով։",
    },
    {
        name: "UPROject",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1745225933703--WhatsApp_Image_2025-04-21_at_12.34.35_3c21b472.webp&w=3840&q=75",
        desc: "Ճարտարապետություն, ինտերիերի դիզայն, գրաֆիկ դիզայն Մեր ընկերությունը զբաղբվում է տարբեր նշանակության։",
    },
    {
        name: "Ակկուռատ Գրուպ ՍՊԸ",
        img: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1745317648399--WhatsApp_Image_2025-02-24_at_14.49.41_c7e30489.webp&w=3840&q=75",
        desc: "  «Ակկուռատ Գրուպ» ընկերությունը հիմնադրվել է 2002թ.-ին: Սկզբնական շրջանում, կրելով այլ անվանում, ընկերությունը ։",
    }
];
const CompanyCard = ({ company }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
            {/* Նկարի բլոկը՝ ամբողջ լայնությամբ */}
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <img
                    src={company.img}
                    alt={company.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Տեքստային բլոկը՝ padding-ով */}
            <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{company.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    {company.desc}
                </p>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Դիզայներներ
                </h1>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {companies.map((company, index) => (
                        <CompanyCard key={index} company={company} />
                    ))}
                </div>
            </div>
        </div>
    );
}