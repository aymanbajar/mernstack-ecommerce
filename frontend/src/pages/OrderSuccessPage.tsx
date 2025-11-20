import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaShoppingBag, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
            <div className={`max-w-2xl w-full transition-all duration-700 transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Success Icon Animation */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                        <FaCheckCircle className="text-white text-6xl" />
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-200 rounded-full opacity-20 -z-10 animate-pulse"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-green-100 rounded-full opacity-10 -z-20"></div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        {t("Order Success!")}
                    </h1>
                    
                    <p className="text-gray-600 text-lg mb-8">
                        {t("Thank you for your purchase! Your order has been confirmed.")}
                    </p>

                  


                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/my-orders"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <FaShoppingBag />
                            {t("View Orders")}
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:border-green-500 hover:text-green-600 transition-all duration-300 hover:shadow-lg"
                        >
                            <FaHome />
                            {t("Back to Home")}
                        </Link>
                    </div>
                </div>

                {/* Bottom Note */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    {t("Need help? Contact our support team at")} <a href="mailto:support@example.com" className="text-green-600 hover:underline font-semibold">support@example.com</a>
                </p>
            </div>
        </div>
    );
}