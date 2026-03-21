import React from 'react';
import { useFavorite } from "../../store/useStore";
import ProductCards from '../Shop/ProductCards';

export default function Favorite() {
  const myCart = useFavorite((state) => state.cart);

  return (
    <div className="bg-[#f8f9fa] md:px-20 py-4 font-sans">
      <div className="mx-auto max-w-8xl">
        <h1 className="text-2xl font-black uppercase text-gray-800">Իմ Զամբյուղը</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {myCart && myCart.length > 0 ? (
            myCart.map(product => <ProductCards key={product.id} item={product} />)
          ) : (
            <p className="text-gray-500">Զամբյուղը դատարկ է</p>
          )}
        </div>
      </div>
    </div>
  );
}