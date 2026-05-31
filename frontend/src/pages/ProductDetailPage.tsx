import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
import type { Product } from "../types/Product";
import { useCart } from "../contexts/Cart/CartContext";
import { useAuth } from "../contexts/Auth/AuthContext";
import { useTranslation } from "react-i18next";
import { FaStar, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addItemToCart } = useCart();
  const { token, isAuthenticated } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`);
      setProduct(res.data);
    } catch (err) {
      setError(t("Product not found"));
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setReviewMessage(t("Please login to submit a review"));
      return;
    }
    try {
      await axios.post(`${BASE_URL}/product/${id}/review`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviewMessage(t("Review submitted successfully!"));
      setComment("");
      fetchProduct(); // refresh reviews
    } catch (err: any) {
      setReviewMessage(err.response?.data || t("Failed to submit review"));
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div></div>;
  if (error || !product) return <div className="text-center p-12 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
          <FaArrowLeft /> {t("Back")}
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 mb-8 transition-colors">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <img src={product.image} alt={product.title} className="w-full h-auto object-cover rounded-2xl shadow-sm mix-blend-multiply dark:mix-blend-normal bg-gray-50 dark:bg-gray-900" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">{product.category || "Uncategorized"}</span>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.round(product.averageRating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                  ))}
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">({product.reviews?.length || 0} {t("reviews")})</span>
              </div>

              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8">${product.price}</div>

              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t("This is a premium product available at ShopHub. Ensure you grab yours before it runs out of stock!")}
              </p>

              <button 
                onClick={() => addItemToCart(product._id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaShoppingCart /> {t("Add to Cart")}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("Customer Reviews")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((rev, index) => (
                    <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800 dark:text-gray-200">{rev.userId?.firstName} {rev.userId?.lastName}</span>
                        <span className="text-sm text-gray-400 dark:text-gray-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-yellow-400 text-sm mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < rev.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">{t("No reviews yet. Be the first to review!")}</p>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 h-fit transition-colors">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">{t("Write a Review")}</h3>
              {reviewMessage && <p className="mb-4 text-sm font-bold text-blue-600 dark:text-blue-400">{reviewMessage}</p>}
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t("Rating")}</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="5">5 - {t("Excellent")}</option>
                    <option value="4">4 - {t("Very Good")}</option>
                    <option value="3">3 - {t("Good")}</option>
                    <option value="2">2 - {t("Fair")}</option>
                    <option value="1">1 - {t("Poor")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t("Review")}</label>
                  <textarea required value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder={t("Write your thoughts here...")}></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
                  {t("Submit Review")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
