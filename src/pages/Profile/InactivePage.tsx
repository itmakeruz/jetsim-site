import { useTranslation } from "react-i18next";
import ActiveSimCard from "./components/ActiveSimCard";
import Empty from "../Empty/Empty";
import { useSimcardStore } from "@/store/simcardStore";

const InactivePage = () => {
  const { t } = useTranslation();
  const { inactiveSims } = useSimcardStore();

  const handleActivate = (simId: number) => {
    // TODO: Implement activation logic
    console.log("Activating SIM:", simId);
  };

  if (inactiveSims.length === 0) {
    return <Empty text={t("my.no_orders") || "Нет активных SIM-карт"} />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
          {inactiveSims.map((sim) => (
            <ActiveSimCard
              key={sim.id}
              sim={sim}
              onActivate={() => handleActivate(sim.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InactivePage;
