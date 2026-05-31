import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import SettingsPage from "./pages/SettingsPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./contexts/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrderPage from "./pages/MyOrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PageNotFound from './pages/PageNotFound';
import AdminRoute from "./components/AdminRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";

// Layouts
import StoreLayout from "./components/layouts/StoreLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Admin Pages
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCouponsPage from "./pages/admin/AdminCouponsPage";

import ProductDetailPage from "./pages/ProductDetailPage";
import { WishlistProvider } from "./contexts/Wishlist/WishlistContext";
import { ThemeProvider } from "./contexts/Theme/ThemeContext";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  
                  {/* Storefront Layout (Normal Users) */}
                  <Route element={<StoreLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Protected Storefront Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<UserDashboardPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/my-orders" element={<MyOrderPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                </Route>
              </Route>

              {/* Admin Login (Standalone Page) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Dashboard Layout (Protected) */}
              <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminOverviewPage />} />
                  <Route path="/admin/orders" element={<AdminOrdersPage />} />
                  <Route path="/admin/products" element={<AdminProductsPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/coupons" element={<AdminCouponsPage />} />
                </Route>
              </Route>

              {/* Catch-all 404 */}
              <Route path="*" element={<PageNotFound />} />
              
            </Routes>
          </BrowserRouter>
        </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;
