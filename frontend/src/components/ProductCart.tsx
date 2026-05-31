import { useTranslation } from "react-i18next";
import { useCart } from "../contexts/Cart/CartContext";
import { useWishlist } from "../contexts/Wishlist/WishlistContext";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
  category?: string;
  averageRating?: number;
}

export default function ProductCart({
  _id,
  title,
  image,
  price,
  category,
  averageRating
}: Props) {
  const { addItemToCart } = useCart();
  const { t } = useTranslation();
  const { wishlistIds, toggleWishlist } = useWishlist();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full overflow-hidden group">
      
      {/* Image Container */}
      <Link to={`/product/${_id}`} className="relative h-64 w-full bg-gray-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center p-6">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out mix-blend-multiply dark:mix-blend-normal"
        />
        {category && (
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm uppercase tracking-wider z-10">
            {category}
          </div>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(_id); }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all transform hover:scale-110 active:scale-95"
        >
          <FaHeart className={`w-5 h-5 ${wishlistIds.includes(_id) ? 'text-red-500 dark:text-red-500' : ''}`} />
        </button>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-all duration-300 pointer-events-none"></div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product Name */}
        <Link to={`/product/${_id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 transition-colors duration-300 min-h-[3.5rem] mb-2">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4 text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(averageRating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
          ))}
        </div>

        <div className="flex-grow"></div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${price}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">USD</span>
          </div>
         
        </div>

        {/* Add to Cart Button */}
        <button 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          onClick={() => _id && addItemToCart(_id)}
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