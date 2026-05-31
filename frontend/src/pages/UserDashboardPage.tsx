import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/Auth/AuthContext";
import { FaUserCircle, FaBoxOpen, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserDashboardPage() {
  const { t } = useTranslation();
  const { username, myOrders } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-down">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-lg p-8 text-white flex items-center gap-6">
          <FaUserCircle className="text-6xl text-blue-100" />
          <div>
            <h1 className="text-3xl font-bold mb-1">
              {t("Hello, ")} {username ? username.split('@')[0] : t("User")}!
            </h1>
            <p className="text-blue-100">
              {t("Welcome to your personal dashboard.")}
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders Card */}
          <div 
            onClick={() => navigate('/my-orders')}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 cursor-pointer hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                <FaBoxOpen className="text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t("My Orders")}</h2>
            </div>
            <p className="text-gray-500 mb-4">
              {t("Track your past orders, view invoices, and check shipping status.")}
            </p>
            <div className="text-blue-600 font-semibold flex items-center gap-2">
              {t("View Orders")} &rarr;
            </div>
          </div>

          {/* Settings Card */}
          <div 
            onClick={() => navigate('/settings')}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 cursor-pointer hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
                <FaCog className="text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t("Account Settings")}</h2>
            </div>
            <p className="text-gray-500 mb-4">
              {t("Manage your personal information, address, and security settings.")}
            </p>
            <div className="text-purple-600 font-semibold flex items-center gap-2">
              {t("Go to Settings")} &rarr;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
