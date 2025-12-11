import { useTariffStore } from "@/store/tariffStore";
import type { cartTariff } from "@/types/api";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import CartItem from "./components/CartItem";
import Empty from "../Empty/Empty";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/utils";

const CartPage = () => {
  const { t } = useTranslation();
  const { selectedTariffs } = useTariffStore();
  const navigate = useNavigate();

  return (
    <div>
      {selectedTariffs.length === 0 ? (
        <Empty text={t("profile.cart.empty")} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
            {selectedTariffs.map((tariff: cartTariff) => (
              <CartItem key={tariff.id} tariff={tariff} />
            ))}
          </div>
          <button
            onClick={() => navigate(APP_ROUTES.PAYMENT)}
            className="bg-[#112D6C] text-white px-4 py-2 rounded-md w-full text-[22px] font-semibold"
          >
            {t("profile.cart.buy")}{" "}
            {formatNumber(
              selectedTariffs.reduce(
                (acc, tariff) => acc + tariff.total_amount,
                0
              )
            )}{" "}
            ₽
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
