import { useTranslation } from "react-i18next";
import ActiveSimCard from "./components/ActiveSimCard";
import Empty from "../Empty/Empty";
import { useSimcardStore } from "@/store/simcardStore";
import { useState, useRef, useEffect } from "react";
import type { ActiveSim } from "@/types/api";
import ActivationPanel from "./components/ActivationPanel";
import { useQueryClient } from "@tanstack/react-query";
import { inactiveSimsQuery } from "@/hooks/queries";

const InactivePage = () => {
  const { t, i18n } = useTranslation();
  const { inactiveSims, setInactiveSims } = useSimcardStore();
  const [activeSim, setActiveSim] = useState<ActiveSim | null>(null);
  const activationPanelRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Polling for sims with can_activate: false
  useEffect(() => {
    const simsNeedingPolling = inactiveSims.filter(
      (sim) => !sim.can_activate && sim.status == "COMPLETED"
    );

    if (simsNeedingPolling.length === 0) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        // Fetch fresh data
        const result = await inactiveSimsQuery();

        // Update store with fresh data
        if (result?.data) {
          setInactiveSims(result.data);

          // Invalidate query cache to keep it in sync
          queryClient.invalidateQueries({
            queryKey: ["inactiveSims", i18n.language],
          });
        }
      } catch (error) {
        console.error("Error refetching inactive sims:", error);
      }
    }, 5000); // 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [inactiveSims, queryClient, i18n.language, setInactiveSims]);

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
          <div key={sim.id} className="relative">
            <ActiveSimCard
              sim={sim}
              isInactive={activeSim?.id === sim.id}
              onActivate={() => setActiveSim(sim)}
            />
            {!sim.can_activate && sim.status == "COMPLETED" && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[20px] z-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="loader"></div>
                  <p className="text-sm text-gray-600">Активация...</p>
                </div>
              </div>
            )}
          </div>
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
