import UsagePanel from "@/components/UsagePanel";
import { useTranslation } from "react-i18next";
import type { Myesim } from "@/types/api";
import { formatDate } from "@/lib/utils";

interface ActiveSimInfoProps {
  sim: Myesim;
}

const ActiveSimInfo: React.FC<ActiveSimInfoProps> = ({ sim }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <UsagePanel simId={sim.id} status={sim.status} snapshot={sim.usage_snapshot} />
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
