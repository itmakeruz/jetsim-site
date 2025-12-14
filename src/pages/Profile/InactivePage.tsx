import { useTranslation } from "react-i18next";
import ActiveSimCard from "./components/ActiveSimCard";
import Empty from "../Empty/Empty";
import { useSimcardStore } from "@/store/simcardStore";
import { useState, useRef, useEffect } from "react";
import type { ActiveSim } from "@/types/api";
import ActivationPanel from "./components/ActivationPanel";

const InactivePage = () => {
  const { t } = useTranslation();
  const { inactiveSims } = useSimcardStore();
  const [activeSim, setActiveSim] = useState<ActiveSim | null>(null);
  const activationPanelRef = useRef<HTMLDivElement>(null);

  // Scroll to ActivationPanel when activeSim changes
  useEffect(() => {
    if (activeSim && activationPanelRef.current) {
      setTimeout(() => {
        activationPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [activeSim]);

  if (inactiveSims.length === 0) {
    return <Empty text={t("my.no_orders") || "Нет активных SIM-карт"} />;
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
        {inactiveSims.map((sim) => (
          <ActiveSimCard
            key={sim.id}
            sim={sim}
            isInactive={activeSim?.id === sim.id}
            onActivate={() => setActiveSim(sim)}
          />
        ))}
      </div>
      {activeSim && (
        <div ref={activationPanelRef}>
          <ActivationPanel sim={activeSim} />
        </div>
      )}
    </div>
  );
};

export default InactivePage;
