import { useState, useRef } from "react";
import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { APP_ROUTES } from "../../router/path";
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
              <img
                src={ASSETS.logo}
                alt="logo"
                className="w-[150px] md:w-[150px] sm:w-[110px] object-contain"
              />
            </Link>
            <div className="hidden lg:flex xl:gap-[30px] gap-[20px]">
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
              className="block lg:hidden text-2xl bg-none border-none cursor-pointer p-[5px]"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              ☰
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-5">
            <HeaderBtn
              count={cartCount}
              onClick={() => navigate(APP_ROUTES.PROFILE + "?tab=cart")}
              text={t("nav.korzina")}
            />
            {isAuthenticated && (
              <HeaderBtn
                onClick={() => navigate(APP_ROUTES.PROFILE + "?tab=profile")}
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
                className="fixed top-0 right-0 w-[50%] sm:w-[55%] h-full bg-white p-5 sm:p-[10px] shadow-[-2px_0_15px_rgba(0,0,0,0.1)] z-[1000] overflow-y-auto"
                ref={menuRef}
              >
                <button
                  className="absolute top-2.5 right-2.5 text-xl bg-none border-none cursor-pointer text-black p-0 z-[1001]"
                  onClick={handleCloseMenu}
                >
                  ×
                </button>
                <div className="mt-[30px]">
                  <div className="flex flex-col items-start gap-[15px] w-full">
                    <Link
                      className="text-black hover:text-gray-600 transition-colors"
                      to={APP_ROUTES.HOME}
                    >
                      {t("nav.all")}
                    </Link>
                    <Link
                      className="text-black hover:text-gray-600 transition-colors"
                      to={APP_ROUTES.HOW_WORKS}
                    >
                      {t("nav.how")}
                    </Link>
                    <Link
                      className="text-black hover:text-gray-600 transition-colors"
                      to={APP_ROUTES.FAQ}
                    >
                      F.A.Q
                    </Link>
                    <Link
                      className="text-black hover:text-gray-600 transition-colors"
                      to={APP_ROUTES.ABOUT}
                    >
                      {t("nav.about")}
                    </Link>
                  </div>
                  <div className="flex flex-col items-start gap-[15px] w-full mt-5">
                    {isAuthenticated && (
                      <>
                        <div className="bg-[#d9d9d9] px-[19px] py-[5px] flex items-center gap-2.5 rounded-[10px] overflow-hidden cursor-pointer w-[120px] justify-start">
                          <p className="font-bold text-black text-sm leading-[21px]">
                            {t("nav.korzina")}
                          </p>
                          <div className="w-[35px] sm:w-[30px] h-[22px] sm:h-[20px] rounded-[10px] bg-[#e31d1c] text-white flex items-center justify-center text-[15px] sm:text-[14px] font-semibold">
                            {cartCount}
                          </div>
                        </div>
                        <div
                          className="bg-[#d9d9d9] px-[19px] py-[5px] flex items-center gap-2.5 rounded-[10px] overflow-hidden cursor-pointer w-[120px] justify-start"
                          onClick={() => {
                            navigate(APP_ROUTES.PROFILE + "?tab=profile");
                            setIsMenuOpen(false);
                          }}
                        >
                          <p className="font-bold text-black text-sm leading-[21px]">
                            {t("nav.cabinet")}
                          </p>
                        </div>
                      </>
                    )}
                    {!isAuthenticated && (
                      <div
                        className="bg-[#d9d9d9] px-[19px] py-[5px] flex items-center gap-2.5 rounded-[10px] overflow-hidden cursor-pointer w-[120px] justify-start"
                        onClick={handleOpenModal}
                      >
                        <p className="font-bold text-black text-sm leading-[21px]">
                          {t("nav.login")}
                        </p>
                      </div>
                    )}
                    <div className="p-0">
                      <select
                        value={currentLang.code}
                        onChange={changeLanguage}
                        className="bg-[#d9d9d9] border-none rounded-[10px] py-[5px] px-2.5 font-bold text-sm leading-[21px] text-black cursor-pointer outline-none w-full"
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
