import { useTranslation } from "react-i18next";
import ActiveSimCard from "./components/ActiveSimCard";
import Empty from "../Empty/Empty";
import { useSimcardStore } from "@/store/simcardStore";
import { useState, useRef, useEffect } from "react";
import type { Myesim } from "@/types/api";
import ActivationPanel from "./components/ActivationPanel";
import { useQueryClient } from "@tanstack/react-query";
import { myesimsQuery } from "@/hooks/queries";

const InactivePage = () => {
  const { t, i18n } = useTranslation();
  const { myesims, setMyesims } = useSimcardStore();
  const [activeSim, setActiveSim] = useState<Myesim | null>(null);
  const activationPanelRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const pollingCountRef = useRef<Map<number, number>>(new Map());

  // Polling for sims with can_activate: false (max 3 times)
  useEffect(() => {
    const { myesims: currentInactiveSims } = useSimcardStore.getState();

    // Clean up counters for sims that are no longer in the list or can_activate is true
    currentInactiveSims.forEach((sim) => {
      if (sim.can_activate || sim.status !== "CREATED") {
        pollingCountRef.current.delete(sim.id);
      }
    });

    const simsNeedingPolling = currentInactiveSims.filter(
      (sim) => !sim.can_activate && sim.status === "CREATED"
    );

    if (simsNeedingPolling.length === 0) {
      return;
    }

    // Initialize counters for new sims
    simsNeedingPolling.forEach((sim) => {
      if (!pollingCountRef.current.has(sim.id)) {
        pollingCountRef.current.set(sim.id, 0);
      }
    });

    const intervalId = setInterval(async () => {
      try {
        // Get current sims from store to check fresh status
        const { myesims: latestInactiveSims } = useSimcardStore.getState();
        const currentSims = latestInactiveSims.filter(
          (sim) => !sim.can_activate && sim.status === "CREATED"
        );

        // Check if any sim still needs polling (hasn't reached 3 attempts)
        const activeSimsForPolling = currentSims.filter((sim) => {
          const count = pollingCountRef.current.get(sim.id) || 0;
          return count < 3;
        });

        if (activeSimsForPolling.length === 0) {
          clearInterval(intervalId);
          return;
        }

        // Fetch fresh data
        const result = await myesimsQuery();

        // Update store with fresh data
        if (result?.data) {
          setMyesims(result.data);

          // Increment polling count for each sim that was polled
          activeSimsForPolling.forEach((sim) => {
            const currentCount = pollingCountRef.current.get(sim.id) || 0;
            pollingCountRef.current.set(sim.id, currentCount + 1);
          });

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
  }, [myesims, queryClient, i18n.language, setMyesims]);

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

  if (myesims.length === 0) {
    return <Empty text={t("my.no_orders") || "Нет активных SIM-карт"} />;
  }

  return (
    <div
      className={`flex flex-col gap-5 ${activeSim ? "md:pb-6 pb-16" : "pb-6"}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
        {myesims.map((sim) => (
          <div key={sim.id} className="relative">
            <ActiveSimCard
              sim={sim}
              isInactive={activeSim?.id === sim.id}
              onActivate={() => setActiveSim(sim)}
            />
            {!sim.can_activate &&
              sim.status !== "COMPLETED" &&
              sim.status !== "FAILED" && (
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
