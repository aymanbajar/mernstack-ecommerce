import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaChartPie, FaBoxOpen, FaUsers, FaSignOutAlt, FaStore } from "react-icons/fa";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function AdminLayout() {
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0B0F19] font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#111827] flex flex-col border-r border-gray-200 dark:border-gray-800 relative z-20 shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800/80">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl text-white shadow-md shadow-blue-500/20">
            <FaStore className="text-xl" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-wide">STORE ADMIN</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{username?.split('@')[0]}</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 z-10 overflow-y-auto">
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 px-3">Menu</div>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <FaChartPie className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} /> 
                <span>Overview</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <FaBoxOpen className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} /> 
                <span>Orders</span>
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <FaBoxOpen className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} /> 
                <span>Products</span>
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <FaUsers className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} /> 
                <span>Users</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/coupons"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <FaBoxOpen className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} /> 
                <span>Coupons</span>
              </>
            )}
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800/80 z-10">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-xl transition-all duration-200 group"
          >
            <FaSignOutAlt className="text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 text-gray-900 dark:text-gray-100 bg-slate-50 dark:bg-[#0B0F19]">
        <div className="p-8 max-w-7xl mx-auto min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
