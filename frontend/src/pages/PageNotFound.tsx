import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

export default function PageNotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <h1 className="text-[200px] font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-none animate-pulse">
                        404
                    </h1>
                    {/* Floating Icons */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-32 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center animate-bounce">
                            <FaExclamationTriangle className="text-6xl text-purple-600" />
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full opacity-20 -z-10 animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        {t("Oops! Page Not Found")}
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                        {t("The page you're looking for doesn't exist or has been moved to another location.")}
                    </p>

                    {/* Search Suggestion */}
                    <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-100">
                        <div className="flex items-center justify-center gap-3 text-gray-700">
                            <FaSearch className="text-2xl text-purple-600" />
                            <p className="text-sm">
                                {t("Try searching for what you need or go back to the homepage")}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <FaHome className="text-xl" />
                            {t("Go to Homepage")}
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-300 hover:shadow-lg"
                        >
                            <MdArrowBack className="text-xl" />
                            {t("Go Back")}
                        </button>
                    </div>
                </div>

                {/* Popular Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: t("Shop"), path: "/", icon: "🛍️" },
                        { name: t("Cart"), path: "/cart", icon: "🛒" },
                        { name: t("Orders"), path: "/my-orders", icon: "📦" },
                        { name: t("Account"), path: "/settings", icon: "👤" },
                    ].map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="text-3xl mb-2">{link.icon}</div>
                            <p className="text-sm font-semibold text-gray-700">{link.name}</p>
                        </Link>
                    ))}
                </div>

                {/* Bottom Note */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    {t("Error Code")}: 404 | {t("Need help?")} <a href="mailto:support@example.com" className="text-purple-600 hover:underline font-semibold">support@example.com</a>
                </p>
            </div>
        </div>
    );
}