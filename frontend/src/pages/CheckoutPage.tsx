import { useCart } from "../contexts/Cart/CartContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BASE_URL } from "../constants/BASE_URL";
import axios from "axios";
import { useAuth } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { cartItems, totalAmount } = useCart();
  const [address, setAddress] = useState("");
  const {token} = useAuth();
  const navigate = useNavigate();
  
  const handleConfirmOrder = async () => {
    if (!address)  return;
    const response =  await axios.post(`${BASE_URL}/cart/checkout`,
      {address
      },{
         headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      }

    )
    if(response.status !== 200){
      return;
  }
  navigate  ('/order-success');
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t("checkout")}
          </h1>
          <p className="text-gray-600 text-lg">
            {t("Complete your purchase securely")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
         {/* left Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t("Order Summary")}
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex  flex-row justify-evenly  items-center w-full">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} x ${item.unitPrice?.toFixed(2)}
                      </p>
                      <p className="text-purple-600 font-bold text-sm mt-1">
                        ${((item.unitPrice || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>{t("Subtotal")}</span>
                  <span className="font-semibold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <button 
              onClick={() => handleConfirmOrder()}
              className="w-full mt-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3">
                  
                <FaCheckCircle className="text-2xl" />
                {t("Pay Now")}
              </button>
            </div>
          </div>

          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t("Shipping Information")}
                </h2>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("Address")}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder={t("123 Main Street")}
                    required
                  />
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t("Payment Method")}
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 border-2 border-purple-500 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                  <FaCreditCard className="text-3xl text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Card</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-gray-50 transition-colors">
                  <MdPayment className="text-3xl text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">PayPal</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-gray-50 transition-colors">
                  <FaLock className="text-3xl text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Crypto</p>
                </button>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
