import { useState, useRef } from "react";
import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { APP_ROUTES } from "../../router/path";
import "./Navbar.css";
import ModalLayout from "../Modal/Modal";
import { useCart } from "../../context/CartContext";
import { removeToken } from "../../config/api";
import HeaderBtn from "../../components/headerStuffs/HeaderBtn";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartCount } = useCart();
  const { i18n, t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();
  const languages = [
    { code: "ru", label: "Ру" },
    { code: "en", label: "En" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <header className="relative z-[1]">
      <div className="container">
        <div className="flex relative z-[1] justify-between items-center my-[10px]">
          <div className="flex items-center xl:gap-[50px] gap-[30px]">
            <Link to={APP_ROUTES.HOME}>
              <img src={ASSETS.logo} alt="logo" className="header-logo" />
            </Link>
            <div className="flex xl:gap-[30px] gap-[20px]">
              <Link
                className="xl:text-base text-sm font-medium"
                to={APP_ROUTES.HOME}
              >
                {t("nav.all")}
              </Link>
              <Link
                className="xl:text-base text-sm font-medium"
                to={APP_ROUTES.HOW_WORKS}
              >
                {t("nav.how")}
              </Link>
              <Link
                className="xl:text-base text-sm font-medium"
                to={APP_ROUTES.FAQ}
              >
                F.A.Q
              </Link>
              <Link
                className="xl:text-base text-sm font-medium"
                to={APP_ROUTES.ABOUT}
              >
                {t("nav.about")}
              </Link>
            </div>
            <button
              className="burger-menu"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                console.log("Menu toggled:", !isMenuOpen);
              }}
            >
              ☰
            </button>
          </div>
          <div className="flex items-center">
            <HeaderBtn
              count={cartCount}
              onClick={handleOpenModal}
              text={t("nav.korzina")}
            />
            {isAuthenticated && (
              <HeaderBtn
                onClick={() => {
                  navigate(APP_ROUTES.PROFILE);
                }}
                text={t("nav.cabinet")}
              />
            )}

            {isAuthenticated ? (
              <HeaderBtn onClick={removeToken} text={t("nav.exit")} />
            ) : (
              <HeaderBtn onClick={handleOpenModal} text={t("nav.login")} />
            )}
            {/* <div className="header-btn language-btn">
              <select
                value={currentLang.code}
                onChange={changeLanguage}
                className="language-select"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="mobile-menu"
                ref={menuRef}
              >
                <button className="close-btn" onClick={handleCloseMenu}>
                  ×
                </button>
                <div className="mobile-menu-content">
                  <div className="header-nav">
                    <Link className="header-link" to={APP_ROUTES.HOME}>
                      {t("nav.all")}
                    </Link>
                    <Link className="header-link" to={APP_ROUTES.HOW_WORKS}>
                      {t("nav.how")}
                    </Link>
                    <Link className="header-link" to={APP_ROUTES.FAQ}>
                      F.A.Q
                    </Link>
                    <Link className="header-link" to={APP_ROUTES.ABOUT}>
                      {t("nav.about")}
                    </Link>
                  </div>
                  <div className="header-right">
                    {isAuthenticated && (
                      <div className="header-btn">
                        <p className="header-text">{t("nav.korzina")}</p>
                        <div className="header-span">{cartCount}</div>
                      </div>
                    )}
                    <div className="header-btn" onClick={handleOpenModal}>
                      <p className="header-text">{t("nav.login")}</p>
                    </div>
                    <div className="header-btn language-btn">
                      <select
                        value={currentLang.code}
                        onChange={changeLanguage}
                        className="language-select"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isModalOpen && (
          <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
