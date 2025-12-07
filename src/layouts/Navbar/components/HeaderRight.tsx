import { ASSETS } from "@/assets";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { useTranslation } from "react-i18next";

function HeaderRight() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-5">
      <LanguageSwitcher />
      <>
        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            <button className="flex flex-col items-center gap-1 text-[#4F7096] text-sm font-medium">
              <div>
                <img src={ASSETS.cart} alt="cart" width="26" height="26" />
              </div>
              <span className="relative leading-none">
                {t("nav.korzina")}
                {cartCount > 0 && (
                  <span className="leading-none absolute bottom-full right-0 py-[2px] px-[6px] text-xs bg-[#FECA00] text-black font-semibold rounded-full">
                    {cartCount}
                  </span>
                )}
              </span>
            </button>
            <button className="flex flex-col gap-1 items-center text-[#4F7096] text-sm font-medium">
              <div className="relative">
                <img src={ASSETS.user} alt="user" width="26" height="26" />
              </div>
              <span className="relative leading-none">{t("nav.cabinet")}</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(APP_ROUTES.LOGIN)}
            className="bg-[#112D6C] text-white px-7 py-2 text-[16px] font-medium rounded-[6px]"
          >
            {t("nav.login")}
          </button>
        )}
      </>
      <div className="bg-[#D9D9D9] w-[1px] min-h-full shrink-0 self-stretch"></div>
      <>
        {isAuthenticated ? (
          <button className="flex flex-col gap-1 items-center text-[#E84118] text-sm font-medium">
            <div className="relative">
              <img src={ASSETS.logout} alt="logout" width="26" height="26" />
            </div>
            <span className="relative leading-none">{t("nav.exit")}</span>
          </button>
        ) : (
          <button className="flex flex-col items-center gap-1 text-[#4F7096] text-sm font-medium">
            <div>
              <img src={ASSETS.cart} alt="cart" width="26" height="26" />
            </div>
            <span className="relative leading-none">
              {t("nav.korzina")}
              {cartCount > 0 && (
                <span className="leading-none absolute bottom-full right-0 py-[2px] px-[6px] text-xs bg-[#FECA00] text-black font-semibold rounded-full">
                  {cartCount}
                </span>
              )}
            </span>
          </button>
        )}
      </>
    </div>
  );
}

export default HeaderRight;
