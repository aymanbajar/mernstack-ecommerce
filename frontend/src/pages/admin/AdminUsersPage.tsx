import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaUsers, FaUserShield, FaUser } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const { token, username } = useAuth();
  
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (window.confirm(t("Are you sure you want to change this user's role?"))) {
      try {
        await axios.put(`${BASE_URL}/admin/users/${userId}/role`, { role: newRole }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      } catch (err) {
        console.error("Error updating user role:", err);
        alert(t("Failed to update role"));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{t("Users Management")}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("View all registered users on your platform and manage their roles.")}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FaUsers className="text-gray-400" />
          {t("Registered Users")}
        </h2>
        
        {usersLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 text-xs">
                  <th className="px-4 py-3 font-medium">{t("Name")}</th>
                  <th className="px-4 py-3 font-medium">{t("Email")}</th>
                  <th className="px-4 py-3 font-medium">{t("Role")}</th>
                  <th className="px-4 py-3 font-medium">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${user.role === 'admin' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/50' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'}`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.email !== username && (
                        <div className="flex gap-2">
                          {user.role === 'admin' ? (
                            <button 
                              onClick={() => handleRoleChange(user._id, 'user')}
                              className="text-xs font-medium bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors"
                            >
                              {t("Make User")}
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleRoleChange(user._id, 'admin')}
                              className="text-xs font-medium bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors"
                            >
                              {t("Make Admin")}
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      {t("No users found.")}
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
