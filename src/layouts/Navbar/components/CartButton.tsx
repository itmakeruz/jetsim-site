import { ASSETS } from "@/assets";
import { APP_ROUTES } from "@/router/path";
import { useTariffStore } from "@/store/tariffStore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CartButton = () => {
  const { selectedTariffs } = useTariffStore();

  const { t } = useTranslation();
  const cartCount = selectedTariffs.reduce(
    (acc, tariff) => acc + tariff.count,
    0
  );
  return (
    <Link
      to={`${APP_ROUTES.CART}`}
      className="flex flex-col items-center gap-1 text-[#4F7096] text-sm font-medium"
    >
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
    </Link>
  );
};

export default CartButton;
