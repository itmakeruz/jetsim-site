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
    0
  );

  return (
    <Link
      to={`${APP_ROUTES.CART}`}
      className="flex items-center gap-2 rounded-full px-2.5 py-2 text-[13px] font-medium text-[#0d141c]
        transition-colors hover:bg-black/[0.04] md:text-sm"
    >
      {/* Счётчик вешаем на саму иконку: раньше он крепился к подписи и наезжал на неё */}
      <span className="relative shrink-0">
        <img src={ASSETS.cart} alt="" aria-hidden="true" className="h-[24px] w-[24px]" />
        {cartCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center
            rounded-full bg-[#FECA00] px-1 text-[10px] font-bold leading-none text-black">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </span>
      <span className="hidden md:block">{t("nav.korzina")}</span>
    </Link>
  );
};

export default CartButton;
