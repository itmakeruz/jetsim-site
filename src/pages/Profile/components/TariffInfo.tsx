import { useTranslation } from "react-i18next";
import type { cartTariff } from "@/types/api";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
export default function TariffInfo({ tariff }: { tariff: cartTariff }) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const gb = isAuthenticated
    ? tariff.quantity_internet / 1024
    : tariff.quantity_internet;
  return (
    <div className="ew-cart-specs">
      <div className="ew-cart-data">
        <div>
          <strong>
            {gb < 0 || gb >= 999 ? t("jetstream.unlimited") : formatNumber(gb)}
          </strong>
          {gb >= 0 && gb < 999 && <span>{t("jetstream.gb")}</span>}
          <small>{t("everywhere.mobileData")}</small>
        </div>
        <div className="ew-cart-term">
          <strong>{tariff.validity_period}</strong>
          <span>{t("jetstream.days")}</span>
        </div>
      </div>
      <div className="ew-cart-meta">
        <span>
          {[tariff.is_4g && "4G", tariff.is_5g && "5G"]
            .filter(Boolean)
            .join(" / ")}
        </span>
        <span>
          {formatNumber(tariff.price_sell)} ₽ <small>/ 1 eSIM</small>
        </span>
      </div>
    </div>
  );
}
