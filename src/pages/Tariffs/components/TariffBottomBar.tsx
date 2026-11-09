import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTariffStore } from "@/store/tariffStore";
export default function TariffBottomBar() {
  const { selectedTariff, selectedTariffs } = useTariffStore();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const total = selectedTariffs.reduce(
    (sum, item) => sum + item.total_amount,
    0,
  );
  return (
    <div className="js-order-dock">
      <div className="container js-order-dock-inner">
        <div className="js-order-dock-title">
          <strong>{selectedTariff?.name}</strong>
          <span>
            {t("jetstream.inCart")}:{" "}
            {selectedTariffs.reduce((sum, item) => sum + item.quantity, 0)} ·{" "}
            {total.toLocaleString(
              i18n.language.startsWith("en") ? "en-US" : "ru-RU",
            )}{" "}
            ₽
          </span>
        </div>
        <button
          type="button"
          className="js-btn js-btn--blue"
          disabled={!selectedTariffs.length}
          onClick={() => navigate("/payment")}
        >
          {t("jetstream.checkout")}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
