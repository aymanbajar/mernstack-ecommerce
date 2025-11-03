import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaCreditCard } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white mt-auto relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Payment Methods */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h3 className="text-lg font-semibold tracking-wide text-gray-300">
            {t("We Accept")}
          </h3>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {[
              { color: "text-blue-400", name: "Visa" },
              { color: "text-orange-400", name: "Mastercard" },
              { color: "text-purple-400", name: "PayPal" },
            ].map((card, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <FaCreditCard className={card.color} />
                <span className="text-sm text-gray-300">{card.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-3 relative">
          <h3 className="text-lg font-semibold text-gray-300 relative">
            {t("Get In Touch")}
            <span className="absolute -bottom-1 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 w-14 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></span>
          </h3>

          <p className="text-sm text-gray-400">{t("Follow us:")}</p>
          <ul className="flex justify-center md:justify-end gap-4">
            <li>
              <a
                href="https://www.instagram.com/bajarayman/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-pink-500/40"
                aria-label="Instagram"
              >
                <FaSquareInstagram className="text-xl text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://www.github.com/aymanbajar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-gray-500/40"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/eymenbacar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl text-white" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-6 pb-4 text-center text-gray-400 text-sm">
        © 2025{" "}
        <span className="text-white font-semibold">
          {t("developed by Ayman Bajar")}
        </span>
        . {t("All rights reserved")}.
      </div>
    </footer>
  );
}
