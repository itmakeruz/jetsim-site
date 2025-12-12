import { useTranslation } from "react-i18next";
import type { ActiveSim } from "@/types/api";
import { formatNumber } from "@/lib/utils";

interface ActiveSimInfoProps {
  sim: ActiveSim;
}

const ActiveSimInfo: React.FC<ActiveSimInfoProps> = ({ sim }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {t("sims.trafic")}
          <span className="text-[#112D6C] font-bold">
            {formatNumber(sim.usage)} мб
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
        <div className="flex gap-1">
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
      <div className="flex items-center gap-3">
        <span>{t("sims.set")}</span>
        <div className="text-white flex items-center gap-3 w-full text-[12px]">
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
    </div>
  );
};

export default ActiveSimInfo;
