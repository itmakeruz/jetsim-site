import { useState, useRef } from "react";
import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { APP_ROUTES } from "../../router/path";
import ModalLayout from "../Modal/Modal";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartCount } = useCart();
  const { i18n, t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logout } = useAuthStore();
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
          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <div className="flex items-center gap-5">
              <button className="flex flex-col items-center gap-1 text-[#4F7096] text-sm font-medium">
                <div>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.16509 19.5473C7.03799 15.1828 7.47443 13.0006 8.91657 11.5951C9.18312 11.3353 9.47147 11.0989 9.77847 10.8885C11.4395 9.75 13.665 9.75 18.1159 9.75H20.8831C25.3342 9.75 27.5596 9.75 29.2207 10.8885C29.5276 11.0989 29.8159 11.3353 30.0826 11.5951C31.5246 13.0006 31.9611 15.1828 32.834 19.5473C34.0872 25.8133 34.7138 28.9463 33.2713 31.1664C33.0102 31.5684 32.7053 31.9402 32.3625 32.2751C30.4684 34.125 27.2733 34.125 20.8831 34.125H18.1159C11.7258 34.125 8.53076 34.125 6.63671 32.2751C6.29375 31.9402 5.9889 31.5684 5.72773 31.1664C4.28529 28.9463 4.91189 25.8133 6.16509 19.5473Z"
                      stroke="#112D6C"
                      stroke-width="2.4375"
                    />
                    <path
                      d="M14.625 11.9999V8.12488C14.625 5.4325 16.8075 3.24988 19.5 3.24988C22.1925 3.24988 24.375 5.4325 24.375 8.12488V11.9999"
                      stroke="#112D6C"
                      stroke-width="2.4375"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14.9023 24.375C15.5716 26.2684 17.3774 27.625 19.5 27.625C21.6225 27.625 23.4284 26.2684 24.0976 24.375"
                      stroke="#112D6C"
                      stroke-width="2.4375"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <span className="relative leading-none">
                  Корзина
                  {false && (
                    <span className="leading-none absolute bottom-full right-0 py-[2px] px-[6px] text-xs bg-[#FECA00] text-black font-semibold rounded-full">
                      12
                    </span>
                  )}
                </span>
              </button>
              <button className="flex flex-col gap-1 items-center text-[#4F7096] text-sm font-medium">
                <div className="relative">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.5 34.125V30.875C32.5 27.2852 29.5898 24.375 26 24.375H13C9.41015 24.375 6.5 27.2852 6.5 30.875V34.125M26 11.375C26 14.9649 23.0898 17.875 19.5 17.875C15.9101 17.875 13 14.9649 13 11.375C13 7.78515 15.9101 4.875 19.5 4.875C23.0898 4.875 26 7.78515 26 11.375Z"
                      stroke="#001A72"
                      stroke-width="2.4375"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span className="relative leading-none">Кабинет</span>
              </button>
            </div>
            <div className="bg-[#D9D9D9] w-[1px] min-h-full shrink-0 self-stretch"></div>
            <button className="flex flex-col gap-1 items-center text-[#E84118] text-sm font-medium">
              <div className="relative">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.625 11.375L25.3337 13.6663L29.5263 17.875H13V21.125H29.5263L25.3337 25.3175L27.625 27.625L35.75 19.5M6.5 8.125H19.5V4.875H6.5C4.7125 4.875 3.25 6.3375 3.25 8.125V30.875C3.25 32.6625 4.7125 34.125 6.5 34.125H19.5V30.875H6.5V8.125Z"
                    fill="#E84118"
                  />
                </svg>
              </div>
              <span className="relative leading-none">Выйти</span>
            </button>
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
