import { useTranslation } from "react-i18next";
import type { cartTariff } from "@/types/api";

interface TariffInfoProps {
  tariff: cartTariff;
}

const TariffInfo: React.FC<TariffInfoProps> = ({ tariff }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-1">
      <div className="text-[16px] text-[#4F7096] font-medium">
        {t("sims.price")} <span>{tariff.price_sell.toLocaleString()} ₽</span>
      </div>
      <div className="flex items-center gap-7">
        <span className="w-[110px] shrink-0">{t("sims.trafic")}</span>
        <div className="relative bg-[#D2E7FF] w-full h-[30px] rounded-[6px]">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `${
                (tariff.quantity_internet / tariff.quantity_internet) * 100
              }%`,
            }}
          >
            <span className="text-white text-[14px] font-medium">
              {tariff.quantity_internet - 0} мб
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <span className="w-[110px] shrink-0">{t("sims.srok")}</span>
        <div className="relative bg-[#D2E7FF] w-full h-[30px] rounded-[6px]">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `${
                (tariff.validity_period / tariff.validity_period) * 100
              }%`,
            }}
          >
            <span className="text-white text-[14px] font-medium">
              {tariff.validity_period - 0} дней
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <span className="w-[110px] shrink-0">{t("sims.set")}</span>
        <div className="text-white flex items-center gap-2 justify-end w-full">
          {tariff.is_4g ? (
            <span className="bg-[#34C759] px-4 py-2 font-bold rounded-[6px] inline-block">
              4G
            </span>
          ) : (
            ""
          )}{" "}
          {tariff.is_5g ? (
            <span className="bg-[#34C759] px-4 py-2 font-bold rounded-[6px] inline-block">
              5G
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffInfo;
