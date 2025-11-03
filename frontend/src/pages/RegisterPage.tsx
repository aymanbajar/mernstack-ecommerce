import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your registration logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50"></div>
                            <FaShoppingCart className="text-6xl text-blue-600 relative z-10 animate-bounce" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {t('Register New Account')}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {t('Join us today and start shopping!')}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div className="relative">
                            <label 
                                htmlFor="name" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('First Name')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                    placeholder={t('Enter your first name')}
                                />
                            </div>
                        </div>

                        {/* Last Name Input */}
                        <div className="relative">
                            <label 
                                htmlFor="lastname" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('Last Name')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                    placeholder={t('Enter your last name')}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('Email')}
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
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                    placeholder={t('Enter your email')}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('Password')}
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
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                    placeholder={t('Enter your password')}
                                />
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <label 
                                htmlFor="confirmPassword" 
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                {t('Confirm Password')}
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
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                    placeholder={t('Confirm your password')}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            <FaUserPlus className="text-xl" />
                            <span>{t('Create Account')}</span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">
                                {t('Already have an account?')}
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {t('Sign In')}
                    </button>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-gray-500">
                    {t('By registering, you agree to our')}{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-800 font-semibold">
                        {t('Terms of Service')}
                    </a>{' '}
                    {t('and')}{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-semibold">
                        {t('Privacy Policy')}
                    </a>
                </p>
            </div>
        </div>
    )
}