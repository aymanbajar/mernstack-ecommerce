import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";
import { BASE_URL } from  '../constants/BASE_URL'
import type { Product } from "../types/Product";
import axios from "axios";
import {useTranslation} from 'react-i18next';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const {t} = useTranslation();

  const categories = ["All", "Uncategorized", "Electronics", "Clothing", "Home & Garden", "Sports"];

  useEffect(() => {
    fetchProducts();
  }, [category, minPrice, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${BASE_URL}/product?category=${category}`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;
      
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      setError(t('Failed to fetch products.'));
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg w-full text-center shadow-lg animate-fade-in-down">
          <svg className="w-16 h-16 text-red-50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-700 mb-2">{t("Oops! Something went wrong.")}</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 md:py-24 px-4 text-center text-white shadow-inner mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md animate-fade-in-down">
          {t("Welcome to ShopHub")}
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto drop-shadow-sm">
          {t("Discover our exclusive collection of premium products at unbeatable prices.")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit transition-colors">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t("Filters")}</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">{t("Category")}</h3>
            <div className="flex flex-col gap-2">
              {categories.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="category" checked={category === c} onChange={() => setCategory(c)} className="text-blue-600 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                  <span className={`${category === c ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">{t("Price Range")}</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors" />
              <span className="text-gray-400 dark:text-gray-500">-</span>
              <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
              <p className="text-xl">{t("No products match your filters.")}</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id}>
                <ProductCart {...product} />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;