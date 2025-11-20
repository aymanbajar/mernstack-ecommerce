import { useAuth } from "../contexts/Auth/AuthContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingBag, FaMapMarkerAlt, FaClock, FaBoxOpen } from "react-icons/fa";
import { MdReceipt } from "react-icons/md";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function MyOrderPage() {
    const { myOrders, getMyOrders } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        getMyOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    if (!myOrders || myOrders.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <FaShoppingBag className="text-6xl text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {t("No Orders Yet")}
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {t("You haven't placed any orders yet. Start shopping now!")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        {t("My Orders")}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {t("Track and manage your orders")}
                    </p>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {myOrders.map(({_id, address, orderItems, total, createdAt, status}) => (
                        <div 
                            key={_id} 
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            {/* Order Header */}
                            <div className="bg-linear-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <MdReceipt className="text-white text-2xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">{t("Order ID")}</p>
                                            <p className="font-bold text-gray-800">#{_id.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            {createdAt ? new Date(createdAt).toLocaleDateString() : t("Recent")}
                                        </span>
                                    </div>

                                    <div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                            status === 'delivered' 
                                                ? 'bg-green-100 text-green-700' 
                                                : status === 'shipped'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {status ? t(status) : t("Processing")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    {/* Shipping Address */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <FaMapMarkerAlt className="text-purple-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{t("Shipping Address")}</p>
                                            <p className="font-semibold text-gray-800">{address}</p>
                                        </div>
                                    </div>

                                    {/* Order Items Count */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                                <FaBoxOpen className="text-pink-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{t("Items")}</p>
                                            <p className="font-semibold text-gray-800">
                                                {orderItems.length} {t("items")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("Order Items")}:</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {orderItems.slice(0, 4).map((item: any, index: number) => (
                                            <div 
                                                key={index}
                                                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                                            >
                                                {item.product?.image && (
                                                    <img 
                                                        src={item.product.image} 
                                                        alt={item.product.title}
                                                        className="w-full h-24 object-cover rounded-lg mb-2"
                                                    />
                                                )}
                                                <p className="text-xs font-medium text-gray-700 line-clamp-2 mb-1">
                                                    {item.product?.title || t("Product")}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {t("Qty")}: {item.quantity}
                                                </p>
                                            </div>
                                        ))}
                                        {orderItems.length > 4 && (
                                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-center">
                                                <p className="text-sm font-semibold text-gray-600">
                                                    +{orderItems.length - 4} {t("more")}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Total Amount */}
                                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                                    <span className="text-lg font-semibold text-gray-700">{t("Total Amount")}:</span>
                                    <span className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        ${total?.toFixed(2) || "0.00"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}