import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth/AuthContext";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = async () => {
    if (!dataForm.email || !dataForm.password) {
      setError(t("Please fill in all fields"));
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        { email: dataForm.email, password: dataForm.password },
        { headers: { "Content-Type": "application/json" } }
      );
      
      const token = response.data;
      if (!token) {
        setError(t("Login failed. Invalid credentials."));
        setIsLoading(false);
        return;
      }

      // Check if user is actually admin by decoding token
      let role = 'user';
      try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          role = payload.role;
      } catch (e) {
          // Ignore
      }

      if (role !== 'admin') {
          setError(t("Access Denied: You do not have administrative privileges."));
          setIsLoading(false);
          return;
      }

      login(dataForm.email, token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(t("Login failed. Please check your credentials."));
      console.error("Admin login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-800 rounded-full shadow-2xl border border-gray-700">
              <FaUserShield className="text-5xl text-blue-500" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            {t("Admin Portal")}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {t("Restricted access. Authorized personnel only.")}
          </p>
        </div>

        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-700">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                {t("Administrator Email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder={t("admin@example.com")}
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                {t("Password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              onClick={onHandleSubmit}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <FaUserShield className="text-xl" />
              )}
              <span>{t("Secure Login")}</span>
            </button>
          </form>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative mt-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
