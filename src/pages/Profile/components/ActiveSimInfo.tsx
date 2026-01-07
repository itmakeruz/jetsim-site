import { useTranslation } from "react-i18next";
import type { Myesim } from "@/types/api";
import { formatDate, formatNumber } from "@/lib/utils";

interface ActiveSimInfoProps {
  sim: Myesim;
}

const ActiveSimInfo: React.FC<ActiveSimInfoProps> = ({ sim }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 justify-between">
          {t("sims.trafic")}
          <span className="text-[#112D6C] font-bold">
            {formatNumber(sim?.quantity_internet - sim?.usage || 0)} мб
          </span>
        </div>
        <div className="relative bg-[#D2E7FF] w-full h-[16px] rounded-[12px] overflow-hidden">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `100%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 justify-between">
          {t("sims.srok")}
          <span className="text-[#112D6C] font-bold">{sim.day_left} дней</span>
        </div>
        <div className="relative bg-[#D2E7FF] w-full h-[16px] rounded-[12px] overflow-hidden">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `100%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span>{t("sims.set")}</span>
        <div className="text-white flex items-center gap-3 text-[12px]">
          {sim.is_4g ? (
            <span className="bg-[#34C759] w-[38px] h-[18px] font-bold rounded-[12px] flex justify-center items-center">
              4G
            </span>
          ) : (
            ""
          )}{" "}
          {sim.is_5g ? (
            <span className="bg-[#34C759] w-[38px] h-[18px] font-bold rounded-[12px] flex justify-center items-center">
              5G
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex gap-1 justify-between">
        {t("sims.created_at")}
        <span className="text-[#112D6C] font-bold">
          {formatDate(sim?.created_at || "-")}
        </span>
      </div>
      <div className="flex gap-1 justify-between">
        {t("sims.expire_date")}
        <span className="text-[#112D6C] font-bold">
          {formatDate(sim?.expire_date || "-")}
        </span>
      </div>
      <div className="flex gap-1 justify-between">
        ICCID
        <span className="text-[#112D6C] font-bold">{sim.iccid || "-"}</span>
      </div>
    </div>
  );
};

export default ActiveSimInfo;
