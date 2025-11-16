import { useCart } from "../contexts/Cart/CartContext";
import { useTranslation } from "react-i18next";
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, totalAmount, updateItemInCart,deleteItemInCart , clearCart} = useCart();
  const { t } = useTranslation();
  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    updateItemInCart(productId, quantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
            <FaShoppingCart className="text-6xl text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("cart empty !")}
          </h2>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaShoppingCart />
            {t("continue Shopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-full md:w-32 h-48 md:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${item.unitPrice}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <button
                          onClick={() =>
                            handleQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-md"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-md"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>

                      <button
                      onClick={() =>deleteItemInCart(item.productId)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-110">
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {t("subtotal")} : ${(item.unitPrice || 0) * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t("cart order Summary")}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="h-px bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    {t("cart total")}
                  </span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 mb-4">
                <MdShoppingCartCheckout className="text-2xl" />
                {t("cart checkout")}
              </button>

              <Link
                to="/"
                className="block w-full py-3 text-center text-purple-600 font-semibold hover:text-pink-600 transition-colors duration-300"
              >
                {t("cart continueShopping")}
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center text-xs text-gray-600">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <span>{t("cart secure checkout")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      🚚
                    </div>
                    <span>{t("cart free shipping")}</span>
                  </div>
                </div>
                   <div>
          <button
                onClick={() => clearCart()}
                className="mt-4 w-full py-3 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t("cart clear cart")}
              </button>
          </div>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
}
