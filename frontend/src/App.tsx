import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import SettingsPage from "./pages/SettingsPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./contexts/Cart/CartProvider";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          {" "}
          {/* browser router */}
          <BrowserRouter>
            {/* navbar */}
            <Navbar />

            {/* routes */}
            <Routes>
              {/* Route paths */}
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
              </Route>
            </Routes>
            {/* footer */}
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
