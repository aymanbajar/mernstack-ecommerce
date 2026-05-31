import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
import { useAuth } from "../contexts/Auth/AuthContext";
import ProductCart from "../components/ProductCart";
import type { Product } from "../types/Product";

export default function WishlistPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-pink-500 to-red-500 py-16 px-4 text-center text-white shadow-inner mb-10">
        <FaHeart className="text-5xl mx-auto mb-4 animate-pulse text-white/90" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          {t("My Wishlist")}
        </h1>
        <p className="text-lg text-pink-100 max-w-2xl mx-auto">
          {t("All your favorite products saved in one place.")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-600"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl">{t("Your wishlist is empty.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div key={product._id}>
                <ProductCart {...product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
