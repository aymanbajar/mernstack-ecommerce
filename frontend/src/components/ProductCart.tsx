import { useTranslation } from "react-i18next";
import { useCart } from "../contexts/Cart/CartContext";

export interface Props {
  _id?: string;
  title?: string;
  image?: string;
  price?: number;
}

export default function ProductCart({ _id, title, image, price }: Props) {
    const {t} = useTranslation();
    const { addItemToCart } = useCart();

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img 
          src={image} 
          alt={title || "product"} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="p-5 space-y-3">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-blue-600">${price}</span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
         
        </div>

        {/* Add to Cart Button */}
        <button 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          onClick={() => addItemToCart(_id)}
        >
          <svg 
            className="w-5 h-5 group-hover/btn:animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <span>{t('Add to cart')}</span>
        </button>
      </div>
    </div>
  );
}