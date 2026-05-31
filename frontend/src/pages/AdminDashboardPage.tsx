import { useTranslation } from "react-i18next";
import { FaBoxOpen, FaUsers, FaChartLine, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
import { useAuth } from "../contexts/Auth/AuthContext";

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users'>('overview');

  // --- Add Product State ---
  const [productForm, setProductForm] = useState({ title: "", image: "", price: "", stock: "" });
  const [productMessage, setProductMessage] = useState("");

  // --- Users List State ---
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // --- Fetch Users ---
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setUsersLoading(false);
    }
  };

  // --- Handle Product Submit ---
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductMessage("");
    try {
      await axios.post(`${BASE_URL}/product`, productForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductMessage(t("Product added successfully!"));
      setProductForm({ title: "", image: "", price: "", stock: "" });
    } catch (err) {
      console.error(err);
      setProductMessage(t("Failed to add product."));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-down">
        {/* Header & Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t("Admin Dashboard")}
          </h1>
          <p className="text-gray-500 mb-8">
            {t("Manage your store, view statistics, and control user access.")}
          </p>

          <div className="flex border-b border-gray-200 gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 text-lg font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t("Overview")}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 text-lg font-medium transition-colors ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t("Add Product")}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 text-lg font-medium transition-colors ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t("Manage Users")}
            </button>
          </div>
        </div>

        {/* Tab Content: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-down">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t("Total Products")}</h3>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <FaBoxOpen className="text-2xl" />
                </div>
              </div>
              <p className="text-4xl font-bold">124</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t("Total Orders")}</h3>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <FaChartLine className="text-2xl" />
                </div>
              </div>
              <p className="text-4xl font-bold">856</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t("Total Users")}</h3>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <FaUsers className="text-2xl" />
                </div>
              </div>
              <p className="text-4xl font-bold">4,231</p>
            </div>
          </div>
        )}

        {/* Tab Content: ADD PRODUCT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-fade-in-down max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaPlus className="text-blue-500" /> {t("Add New Product")}
            </h2>
            {productMessage && (
              <div className={`p-4 mb-6 rounded-xl ${productMessage.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {productMessage}
              </div>
            )}
            <form onSubmit={handleAddProduct} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("Product Title")}</label>
                <input type="text" required value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("Image URL")}</label>
                <input type="url" required value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("Price")}</label>
                  <input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("Stock")}</label>
                  <input type="number" required value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors">
                {t("Publish Product")}
              </button>
            </form>
          </div>
        )}

        {/* Tab Content: USERS */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-fade-in-down">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaUsers className="text-blue-500" /> {t("Registered Users")}
            </h2>
            {usersLoading ? (
              <p className="text-gray-500">{t("Loading users...")}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                      <th className="p-4 font-semibold rounded-tl-xl">{t("Name")}</th>
                      <th className="p-4 font-semibold">{t("Email")}</th>
                      <th className="p-4 font-semibold">{t("Role")}</th>
                      <th className="p-4 font-semibold rounded-tr-xl">{t("Joined")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-800">{user.firstName} {user.lastName}</td>
                        <td className="p-4 text-gray-600">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 text-sm">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
