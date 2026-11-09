import { useTariffStore } from "@/store/tariffStore";
import { Link } from "react-router-dom";
import CartItem from "./components/CartItem";
import Empty from "../Empty/Empty";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
export default function CartPage() {
  const { t } = useTranslation();
  const { selectedTariffs } = useTariffStore();
  const total = selectedTariffs.reduce(
    (sum, item) => sum + item.total_amount,
    0,
  );
  const count = selectedTariffs.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );
  return selectedTariffs.length === 0 ? (
    <Empty text={t("profile.cart.empty")} />
  ) : (
    <div className="js-cart-layout">
      <div className="flex flex-col gap-4">
        {selectedTariffs.map((tariff) => (
          <CartItem key={tariff.id} tariff={tariff} />
        ))}
      </div>
      <aside className="js-panel js-cart-summary">
        <span className="js-kicker">{t("jetstream.yourOrder")}</span>
        <h2>{t("jetstream.cartSummary")}</h2>
        <div className="js-summary-line">
          <span>eSIM</span>
          <strong>{count}</strong>
        </div>
        <div className="js-summary-total">
          <span>{t("jetstream.total")}</span>
          <strong>{formatNumber(total)} ₽</strong>
        </div>
        <Link className="js-btn ew-purchase-button w-full" to="/payment">
          {t("jetstream.checkout")}
          <ArrowRight size={18} />
        </Link>
        <p className="js-small mt-4">{t("everywhere.cartNote")}</p>
        <Link className="js-text-link mt-5" to="/#tarifs">
          {t("jetstream.continueShopping")}
        </Link>
      </aside>
    </div>
  );
}
