import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSave,
  FaCog,

} from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };

  const onSubmit = async () => {
    // Validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError(t("Passwords do not match"));
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/user/update`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          ...(formData.password && { password: formData.password }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(t("Profile updated successfully!"));
        setError("");
        // Clear password fields
        setFormData({ ...formData, password: "", confirmPassword: "" });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(t("Failed to update profile"));
      }
      setSuccess("");
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50"></div>
              <FaCog className="text-6xl text-blue-600 relative z-10 animate-spin-slow" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("Account Settings")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t("Manage your account settings and preferences")}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3">
        
            {/* Content Area */}
            <div className="lg:col-span-3 p-8">
              <div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {t("Profile Information")}
                    </h2>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {t("Verified")}
                    </span>
                  </div>
                  </div> 

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* First Name */}
                      <div className="relative">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          {t("First Name")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                            placeholder={t("Enter first name")}
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="relative">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          {t("Last Name")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                            placeholder={t("Enter last name")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
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
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("Enter email address")}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                        />
                      </div>
                    </div>

                    {/* Password Section */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        {t("Change Password")}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {t("Leave blank to keep current password")}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* New Password */}
                        <div className="relative">
                          <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            {t("New Password")}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaLock className="text-gray-400" />
                            </div>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                              placeholder={t("Enter new password")}
                            />
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            {t("Confirm Password")}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaLock className="text-gray-400" />
                            </div>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                              placeholder={t("Confirm new password")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
                        {success}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <FaSave className="text-xl" />
                        <span>{t("Save Changes")}</span>
                      </button>
                      <button
                        type="button"
                        className="px-6 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                      >
                        {t("Cancel")}
                      </button>
                    </div>
                  </form>
                </div>
              

        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}