import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBoxOpen, FaUsers, FaChartLine, FaDollarSign } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function AdminOverviewPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);

  // Mock data for the chart since we don't have historical sales by date yet in backend
  const data = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{t("Dashboard Overview")}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("Welcome to the Admin Panel. Here are your live store metrics.")}</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t("Total Revenue")}</h3>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaDollarSign />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">${stats.totalRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t("Total Orders")}</h3>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaChartLine />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.totalOrders}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t("Total Products")}</h3>
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaBoxOpen />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.totalProducts}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t("Total Users")}</h3>
                <div className="p-2.5 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaUsers />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.totalUsers}</p>
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t("Revenue Overview (Last 7 Days)")}</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" className="dark:stroke-gray-800/80" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" activeDot={{r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
