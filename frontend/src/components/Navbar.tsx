// hooks
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {useAuth} from "../contexts/Auth/AuthContext"
// Icons
import { IoCart, IoPerson, IoSettings } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate(); //navigate hook from react-router
  //states
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const { t, i18n } = useTranslation();
  const{username,isAuthenticated} = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  function handleDisplayMenu() {
    setDisplayMenu((prev) => !prev);
  }

  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng") || "en";
    setSelectedLang(storedLang);
    i18n.changeLanguage(storedLang);
  }, [i18n]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Icon and Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <FaShoppingCart className="text-3xl text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div className="text-2xl font-bold text-white tracking-wide group-hover:scale-105 transition-transform duration-300">
              ShopHub
            </div>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <select
              value={selectedLang}
              onChange={handleChange}
              className="bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 cursor-pointer"
            >
              <option value="en" className="text-black">
                {t("English")}
              </option>
              <option value="ar" className="text-black">
                {t("Arabic")}
              </option>
              <option value="tr" className="text-black">
                {t("Turkish")}
              </option>
            </select>
        
            {isAuthenticated ? (
              
           
            <div className="relative">
              <button
                onClick={handleDisplayMenu}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Account menu"
              >
                <MdAccountCircle className="text-3xl text-white hover:scale-110 transition-transform duration-300" />
              </button>

              {/* Dropdown Menu */}
              {displayMenu && (
                <div className="absolute mt-3 right-0 w-52 bg-white shadow-2xl rounded-xl border border-gray-200 py-2 text-base animate-fade-in-down">
                  
                 <button
                    onClick={() => {
                     
                      setDisplayMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <IoPerson className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">   {username ? `${username.slice(0, username.indexOf("@"))}` : ""}</span>
                  </button>


                  <button
                    onClick={() => {
                      navigate("/settings");
                      setDisplayMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <IoSettings className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{t("Settings")}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/order");
                      setDisplayMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <FaBoxOpen className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{t("My Orders")}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/cart");
                      setDisplayMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <IoCart className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{t("Shopping Cart")}</span>
                  </button>

                  <hr className="my-2 border-gray-200" />

                  <button
                    onClick={() => {
                      navigate("/login");
                      setDisplayMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <BiLogOut className="text-red-500 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{t("Logout")}</span>
                  </button>
                </div>
              )}
            </div>
            ) : (
              <button
                onClick={() => { navigate("/login") }}
                className="bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-lg border border-white/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              >
                {t("Login")}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
