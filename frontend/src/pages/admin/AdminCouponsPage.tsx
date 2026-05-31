import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaTag, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function AdminCouponsPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({ code: "", discountPercentage: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/coupon`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(`${BASE_URL}/coupon`, {
        code: form.code,
        discountPercentage: Number(form.discountPercentage)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(t("Coupon created successfully!"));
      setForm({ code: "", discountPercentage: "" });
      fetchCoupons();
    } catch (err: any) {
      setMessage(err.response?.data || t("Failed to create coupon"));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t("Are you sure you want to delete this coupon?"))) {
      try {
        await axios.delete(`${BASE_URL}/coupon/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCoupons();
      } catch (err) {
        alert(t("Failed to delete coupon"));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{t("Coupons Management")}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("Create discount codes for your customers.")}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 max-w-2xl">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FaPlus className="text-gray-400" />
          {t("Create New Coupon")}
        </h2>
        {message && (
          <div className={`p-3 mb-6 rounded-md text-sm font-medium border ${message.includes('success') ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Coupon Code")}</label>
            <input type="text" required value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER20" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white uppercase placeholder-gray-400 dark:placeholder-gray-600" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Discount Percentage (%)")}</label>
            <input type="number" required min="1" max="100" value={form.discountPercentage} onChange={e => setForm({...form, discountPercentage: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors">
            {t("Create Coupon")}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FaTag className="text-gray-400" />
          {t("Active Coupons")}
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 text-xs">
                  <th className="px-4 py-3 font-medium">{t("Code")}</th>
                  <th className="px-4 py-3 font-medium">{t("Discount")}</th>
                  <th className="px-4 py-3 font-medium">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {coupons.map(coupon => (
                  <tr key={coupon._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700">{coupon.code}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">{coupon.discountPercentage}% OFF</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(coupon._id)} className="text-gray-400 hover:text-red-600 transition-colors" title={t("Delete")}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {coupons.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      {t("No coupons created yet.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
