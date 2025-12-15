import { useEffect, useMemo, useState } from "react";
import { ASSETS } from "@/assets";
import HeaderLeft from "./components/HeaderLeft";
import HeaderRight from "./components/HeaderRight";
import LogoutModal from "./components/LogoutModal";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useAuthStore } from "@/store/authStore";
import { useTariffStore } from "@/store/tariffStore";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const { setSelectedTariffs } = useTariffStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setSelectedTariffs([]);
    setIsMobileMenuOpen(false);
    setIsLogoutModalOpen(false);
    navigate(APP_ROUTES.HOME);
  };

  const navLinks = useMemo(
    () => [
      { to: APP_ROUTES.HOME, label: t("nav.all") },
      { to: APP_ROUTES.HOW_WORKS, label: t("nav.how") },
      { to: APP_ROUTES.FAQ, label: t("nav.faq") },
      { to: APP_ROUTES.ABOUT, label: t("nav.about") },
    ],
    [t]
  );

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="relative z-[11]">
        <div className="container">
          <div className="flex relative z-[1] justify-between items-center my-[10px]">
            <HeaderLeft onMenuClick={() => setIsMobileMenuOpen(true)} />
            <Link to={APP_ROUTES.HOME} className="md:hidden">
              <img
                src={ASSETS.logo}
                alt="logo"
                className="w-[140px] object-contain shrink-0"
              />
            </Link>
            <HeaderRight />
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed h-[100svh] left-0 right-0 top-0 z-[100] bg-black/40 md:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-lg z-[41] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <Link
                to={APP_ROUTES.HOME}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={ASSETS.logo}
                  alt="logo"
                  className="w-[140px] object-contain shrink-0"
                />
              </Link>
              <button
                aria-label="Close menu"
                className="text-2xl px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-4 px-5 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base font-medium text-[#212b36]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-5 pb-5 flex flex-col gap-3">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <button
                    className="w-full rounded-[10px] border border-[#212b36] py-3 text-[#212b36] font-semibold"
                    onClick={() => {
                      navigate(APP_ROUTES.PROFILE);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("nav.cabinet")}
                  </button>
                  <button
                    className="w-full rounded-[10px] bg-[#212b36] text-white py-3 font-semibold"
                    onClick={() => {
                      setIsLogoutModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t("nav.exit")}
                  </button>
                </div>
              ) : (
                <button
                  className="w-full rounded-[10px] bg-[#112D6C] text-white py-3 font-semibold"
                  onClick={() => {
                    navigate(APP_ROUTES.LOGIN);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t("nav.login")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
