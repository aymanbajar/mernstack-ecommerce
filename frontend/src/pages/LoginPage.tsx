import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth/AuthContext";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export default function LoginPage() {
  const { t } = useTranslation();
  // nagigate hook for redirecting after login
  const navigate = useNavigate();

  // Form state for email and password
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  //error state
  const [error, setError] = useState<string | null>(null);
  //auth hook for login
  const { login } = useAuth();
  //update form state on input change
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
    try{
        
    const response = await axios.post(
      `${BASE_URL}/user/login`,
      {
        email: dataForm.email,
        password: dataForm.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
    const token = response.data  ;
    if(!token){
        setError(t("Login failed. Please check your credentials and try again."));
        return; 
    }
    login(dataForm.email, token)
    navigate("/");
  } catch (err: any) {
    // معالجة الخطأ القادم من السيرفر أو الاتصال
    setError(
      t("Login failed. Please check your credentials and try again.")
    );
    console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-50"></div>
              <FaShoppingCart className="text-6xl text-indigo-600 relative z-10 animate-bounce" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            {t("Welcome Back!")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("Login to your account to continue shopping")}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
          <form onSubmit={(e) => {
            e.preventDefault();
          }} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {t("Email Address")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder={t("Enter your email")}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {t("Password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder={t("Enter your password")}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  {t("Remember me")}
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                >
                  {t("Forgot password?")}
                </a>
              </div>
            </div>

            {/* Error Message */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={onHandleSubmit}
           >
              <FaSignInAlt className="text-xl" />
              <span>{t("Sign In")}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Social Login Buttons */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">{t("Error")}!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Register Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              {t("Don't have an account?")}{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
              >
                {t("Create one now")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
