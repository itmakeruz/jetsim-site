import { ASSETS } from "@/assets";
import { APP_ROUTES } from "@/router/path";
import { useTariffStore } from "@/store/tariffStore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CartButton = () => {
  const { selectedTariffs } = useTariffStore();
  const { t } = useTranslation();
  const cartCount = selectedTariffs.reduce(
    (acc, tariff) => acc + tariff.quantity,
    20
  );
  return (
    <Link
      to={`${APP_ROUTES.CART}`}
      className="flex flex-col items-center md:gap-1 text-black md:text-sm text-[12px] font-medium"
    >
      <div>
        <img
          src={ASSETS.cart}
          alt="cart"
          className="md:w-[26px] md:h-[26px] w-[28px] h-[28px]"
        />
      </div>
      <span className="relative leading-none">
        <span className="hidden md:block">{t("nav.korzina")}</span>
        {cartCount > 0 && (
          <span className="leading-none absolute bottom-full md:right-0 py-[2px] px-[4px] md:text-xs text-[10px] bg-[#FECA00] text-black font-semibold rounded-full">
            {cartCount}
          </span>
        )}
      </span>
    </Link>
  );
};

export default CartButton;
