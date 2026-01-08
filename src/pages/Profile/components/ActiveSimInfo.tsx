import { useTranslation } from "react-i18next";
import type { Myesim } from "@/types/api";
import { formatDate, formatNumber } from "@/lib/utils";

interface ActiveSimInfoProps {
  sim: Myesim;
}

const ActiveSimInfo: React.FC<ActiveSimInfoProps> = ({ sim }) => {
  const { t } = useTranslation();

  // Calculate traffic remaining percentage
  const trafficUsed = sim?.usage || 0;
  const trafficTotal = sim?.quantity_internet || 0;
  const trafficRemaining = trafficTotal - trafficUsed;
  const trafficPercentage =
    trafficTotal > 0
      ? Math.min(100, Math.max(0, (trafficRemaining / trafficTotal) * 100))
      : 0;

  // Calculate days remaining percentage
  // const daysLeft = sim?.day_left || 0;
  // const totalDays = sim?.validity_period || 0;
  // const daysPercentage =
  //   totalDays > 0
  //     ? Math.min(100, Math.max(0, (daysLeft / totalDays) * 100))
  //     : 0;

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
              width: `${trafficPercentage}%`,
            }}
          ></div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-1">
        <div className="flex gap-1 justify-between">
          {t("sims.srok")}
          <span className="text-[#112D6C] font-bold">{sim.day_left} дней</span>
        </div>
        <div className="relative bg-[#D2E7FF] w-full h-[16px] rounded-[12px] overflow-hidden">
          <div
            className="absolute top-0 left-0 bg-[#112D6C] h-full rounded-[6px] flex items-center px-2"
            style={{
              width: `${daysPercentage}%`,
            }}
          ></div>
        </div>
      </div> */}
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
        ICCID
        <span className="text-[#112D6C] font-bold">{sim.iccid || "-"}</span>
      </div>
    </div>
  );
};

export default ActiveSimInfo;
