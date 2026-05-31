import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBoxOpen, FaCheckCircle, FaTruck, FaClock } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function AdminOrdersPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(`${BASE_URL}/admin/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Error updating order status:", err);
      alert(t("Failed to update status"));
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Delivered') return <span className="flex items-center gap-1.5 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2.5 py-1 rounded-md text-xs font-medium w-fit border border-green-200 dark:border-green-800/50"><FaCheckCircle/> {t("Delivered")}</span>;
    if (status === 'Shipped') return <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-2.5 py-1 rounded-md text-xs font-medium w-fit border border-blue-200 dark:border-blue-800/50"><FaTruck/> {t("Shipped")}</span>;
    return <span className="flex items-center gap-1.5 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 px-2.5 py-1 rounded-md text-xs font-medium w-fit border border-yellow-200 dark:border-yellow-800/50"><FaClock/> {t("Pending")}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{t("Orders Management")}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("Track and update customer orders.")}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FaBoxOpen className="text-gray-400" />
          {t("All Orders")}
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
                  <th className="px-4 py-3 font-medium">{t("Order ID")}</th>
                  <th className="px-4 py-3 font-medium">{t("Customer")}</th>
                  <th className="px-4 py-3 font-medium">{t("Total")}</th>
                  <th className="px-4 py-3 font-medium">{t("Status")}</th>
                  <th className="px-4 py-3 font-medium">{t("Action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {order._id.substring(18)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{order.userId?.firstName} {order.userId?.lastName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{order.userId?.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">{getStatusBadge(order.status || 'Pending')}</td>
                    <td className="px-4 py-3">
                      <select 
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-xs rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 outline-none"
                      >
                        <option value="Pending">{t("Pending")}</option>
                        <option value="Shipped">{t("Shipped")}</option>
                        <option value="Delivered">{t("Delivered")}</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      {t("No orders found.")}
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
