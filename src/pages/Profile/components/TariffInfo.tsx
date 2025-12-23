import { useTranslation } from "react-i18next";
import type { cartTariff } from "@/types/api";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

interface TariffInfoProps {
  tariff: cartTariff;
}

const TariffInfo: React.FC<TariffInfoProps> = ({ tariff }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  // Login qilmagan bo'lsa MB ga aylantirish, login qilgan bo'lsa kelgan data
  const displayInternet = isAuthenticated
    ? `${formatNumber(tariff.quantity_internet)} мб`
    : `${formatNumber(tariff.quantity_internet * 1024)} мб`;

  return (
    <div className="space-y-2">
      <div className=" font-medium">
        {t("sims.price")}{" "}
        <span className="text-[#112D6C] font-bold">
          {formatNumber(tariff.price_sell)} ₽
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {t("sims.trafic")}
          <span className="text-[#112D6C] font-bold">{displayInternet}</span>
        </div>
        <div className="relative bg-[#D2E7FF] w-full h-[16px] rounded-[12px] overflow-hidden">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `${
                (tariff.quantity_internet / tariff.quantity_internet) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {t("sims.srok")}
          <span className="text-[#112D6C] font-bold">
            {tariff.validity_period} дней
          </span>
        </div>
        <div className="relative bg-[#D2E7FF] w-full h-[16px] rounded-[12px] overflow-hidden">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `${
                (tariff.validity_period / tariff.validity_period) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span>{t("sims.set")}</span>
        <div className="text-white flex items-center gap-3 w-full text-[12px]">
          {tariff.is_4g ? (
            <span className="bg-[#34C759] w-[38px] h-[18px] font-bold rounded-[12px] flex justify-center items-center">
              4G
            </span>
          ) : (
            ""
          )}{" "}
          {tariff.is_5g ? (
            <span className="bg-[#34C759] w-[38px] h-[18px] font-bold rounded-[12px] flex justify-center items-center">
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
