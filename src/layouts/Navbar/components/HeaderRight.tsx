import { ASSETS } from "@/assets";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/authStore";

function HeaderRight() {
  const { isAuthenticated } = useAuthStore();
  const { cartCount } = useCart();
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
                Корзина
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
              <span className="relative leading-none">Кабинет</span>
            </button>
          </div>
        ) : (
          <button className="bg-[#112D6C] text-white px-7 py-2 text-[16px] font-medium rounded-[6px]">
            Войти
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
            <span className="relative leading-none">Выйти</span>
          </button>
        ) : (
          <button className="flex flex-col items-center gap-1 text-[#4F7096] text-sm font-medium">
            <div>
              <img src={ASSETS.cart} alt="cart" width="26" height="26" />
            </div>
            <span className="relative leading-none">
              Корзина
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
