import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import SettingsPage from "./pages/SettingsPage";
function App() {
  return (
    <>
      <AuthProvider>
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
        </Routes>
        {/* footer */}
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
