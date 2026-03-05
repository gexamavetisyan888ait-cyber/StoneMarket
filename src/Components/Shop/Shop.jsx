import React from 'react';
import { ShoppingCart, Heart, Phone, MessageCircle } from 'lucide-react';

const PRODUCTS = [
  { id: 1, code: 'N073', title: 'Բետոնե Սեղան N073', desc: 'Սեղան բետոնից՝ յուրահատուկ և արտահայտիչ դիզայնով։...', price: '600,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N073-1--1772700511503.webp&w=3840&q=75' },
  { id: 2, code: 'N097', title: 'Տրավերտինե հավաքածու N097', desc:'Սեղան և նստարաններ բնական տրավերտին քարից՝ ...', price: '2,500,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N097--1772606804540.webp&w=3840&q=75' },
  { id: 3, code: 'N093', title: 'Տրավերտինե դեկոր N093', desc: 'Սուրճի սեղան բնական տրավերտին քարից՝ յուրահատուկ և ժամանակակից դիզայնով։...', price: '100,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N093--1772606461964.webp&w=3840&q=75' },
  { id: 4, code: 'N082', title: 'Բուշարդա N082', desc: 'Բնական տրավերտին քարից մոմակալ՝ նրբագեղ և ջերմ ձևավորմամբ։...', price: '120,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N082--1772547557216.webp&w=3840&q=75' },
  { id: 5, code: 'N076', title: 'Բետոնե Սեղան N076', desc: 'Բնական տրավերտին քարից բաժակի տակդիրների հավաքածու՝ էլեգանտ և գործնական ձևավորմամբ։...', price: '600,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N076--1772547139235.webp&w=3840&q=75' },
  { id: 6, code: 'N096', title: 'Տրավերտինե հավաքածու N096', desc: 'Սուրճի սեղան բնական տրավերտին քարից՝ լակոնիկ և ժամանակակից ձևավորմամբ։...', price: '2,500,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N091--1772525128594.webp&w=3840&q=75' },
  { id: 7, code: 'N095', title: 'Տրավերտինե դեկոր N095', desc: 'Բնական տրավերտին քարից Դեկոր՝ մինիմալիստական և ժամանակակից դիզայնով։...', price: '100,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F51--1772289339921.webp&w=3840&q=75' },
  { id: 8, code: 'N094', title: 'Բուշարդա N094', desc: 'Կոնսոլ բնական տրավերտին քարից՝ էլեգանտ և մինիմալիստական ձևավորմամբ։...', price: '120,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N094--1772526193011.webp&w=3840&q=75' },
  { id: 9, code: 'N092', title: 'Բետոնե Սեղան N092', desc: 'Սեղան բնական տրավերտին քարից՝ յուրահատուկ կորաձև դիզայնով։...', price: '600,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N092--1772525821969.webp&w=3840&q=75' },
  { id: 10, code: 'N091', title: 'Տրավերտինե հավաքածու N091', desc: 'Սեղան բնական տրավերտին քարից՝ մինիմալիստական և ժամանակակից դիզայնով։...', price: '2,500,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N091--1772525128594.webp&w=3840&q=75' },
  { id:11, code: 'N003', title: 'Տրավերտինե դեկոր N003', desc: 'Չափս - 320մմ', price: '100,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N087--1771516046630.webp&w=3840&q=75' },
  { id: 12, code: 'N002', title: 'Բուշարդա N002', desc: 'Չափս - 200մմ', price: '120,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F50--1772289267500.webp&w=3840&q=75' },
  { id: 13, code: 'N073', title: 'Բետոնե Սեղան N090', desc: 'Սեղան բնական տրավերտին քարից՝ նրբաճաշակ և ամուր ձևավորմամբ։...', price: '600,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N090--1772183225619.webp&w=3840&q=75' },
  { id:14, code: 'N097', title: 'Տրավերտինե հավաքածու N001', desc: 'Չափս - 380մմ', price: '2,500,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F49--1772182708560.webp&w=3840&q=75' },
  { id:15, code: 'N082', title: 'Տրավերտինե դեկոր N087', desc: 'Բնական քարե սեղան՝ քանդակային հիմքով և փափուկ կորություններով...', price: '100,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N087--1771516046630.webp&w=3840&q=75' },
  { id: 16, code: 'N007', title: 'Բուշարդա N083', desc: 'Մինիմալիստական քարե սեղան՝ հստակ գծերով և բնական տրավերտինի նուրբ տեքստուրայով։...', price: '120,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N083--1771513468233.webp&w=3840&q=75' },
  { id: 17, code: 'N073', title: 'Բետոնե Սեղան N007', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար։', price: '600,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F45--1771352932080.webp&w=3840&q=75' },
  { id: 18, code: 'N097', title: 'Տրավերտինե հավաքածու N006', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար։', price: '2,500,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F42--1771352825805.webp&w=3840&q=75' },
  { id: 19, code: 'N082', title: 'Տրավերտինե դեկոր N005', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար։ ', price: '100,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F39--1771352739919.webp&w=3840&q=75' },
  { id: 20, code: 'N007', title: 'Բուշարդա N004', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար:', price: '120,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F36--1771352625856.webp&w=3840&q=75' },
  { id: 21, code: 'N073', title: 'Բետոնե Սեղան N003', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար։', price: '600,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F35--1771352101825.webp&w=3840&q=75' },
  { id: 22, code: 'N097', title: 'Տրավերտինե հավաքածու N002', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար։', price: '2,500,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F33--1771352042947.webp&w=3840&q=75' },
  { id: 23, code: 'N082', title: 'Տրավերտինե դեկոր N001', desc: 'Նախատեսված է բնական քարի մակերեսը կոպտացնելու, դեկորատիվ տեսք տալու և սահունությունը նվազեցնելու համար։ ', price: '100,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F32--1771351971555.webp&w=3840&q=75' },
  { id:24, code: 'N007', title: 'Բուշարդա N017', desc: 'Նախատեսված է քարի եզրերը կլորացնելու, ձևավորելու համար։', price: '120,000', img: 'https://stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F27--1771351250950.webp&w=3840&q=75' },
];

const ProductCard = ({ item }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-lg">
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
      <img 
        src={item.img} 
        alt={item.title} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute left-3 top-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md border border-white/30">
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">ԿՈԴ {item.code}</span>
      </div>

      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 backdrop-blur-sm transition-colors hover:text-red-500">
        <Heart size={16} fill="currentColor" className="fill-transparent hover:fill-red-500" />
      </button>
    </div>

    <div className="flex flex-1 flex-col p-4">
      <h3 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight">{item.title}</h3>
      <p className="text-[12px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">{item.desc}</p>
      
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-black text-gray-900">
          {item.price} <small className="text-[10px] font-bold">ԴՐ.</small>
        </span>
        
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-emerald-400 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white active:scale-95">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);


export default function StoneMarketGrid() {
  return (
    <div className=" bg-[#f8f9fa] p-4 md:p-8 font-sans">
      <div className="mx-auto max-w-8xl">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-800">Stone Market</h1>
          <p className="text-xs text-gray-400 tracking-widest uppercase">Premium Stone Decor</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
}