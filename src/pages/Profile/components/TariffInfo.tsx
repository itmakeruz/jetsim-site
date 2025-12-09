import { useTranslation } from "react-i18next";
import type { cartTariff } from "@/types/api";

interface TariffInfoProps {
  tariff: cartTariff;
}

const TariffInfo: React.FC<TariffInfoProps> = ({ tariff }) => {
  const { t } = useTranslation();

  return (
    <>
      <p>
        {t("sims.trafic")}{" "}
        <span className="font-bold">
          {tariff.quantity_internet.toLocaleString()}мб
        </span>
      </p>
      <p>
        {t("sims.srok")}{" "}
        <span className="font-bold">{tariff.validity_period} дней</span>
      </p>
      <p>
        {t("sims.set")}
        <span className="font-bold">
          {" "}
          {tariff.is_4g ? "4G" : ""} {tariff.is_5g ? "5G" : ""}
        </span>
      </p>
      <p>
        {t("sims.price")}{" "}
        <span className="font-bold">
          {tariff.price_sell.toLocaleString()} руб.
        </span>
      </p>
    </>
  );
};

export default TariffInfo;
