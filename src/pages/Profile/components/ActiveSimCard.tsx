import React, { useState } from "react";
import type { Myesim } from "@/types/api";
import TariffHeader from "./TariffHeader";
import ActiveSimInfo from "./ActiveSimInfo";
import CartItemFooter from "./CartItemFooter";
import RegionsModal from "../../Tariffs/components/RegionsModal";

interface ActiveSimCardProps {
  sim: Myesim;
  onActivate?: () => void;
  isInactive?: boolean;
}

const ActiveSimCard: React.FC<ActiveSimCardProps> = ({
  sim,
  onActivate,
  isInactive,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFailed = sim.status === "FAILED";

  const handleOpenModal = () => {
    if (sim.regions && sim.regions.length > 0 && !isFailed) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleActivate = () => {
    if (!isFailed && onActivate) {
      onActivate();
    }
  };
  console.log(sim);

  return (
    <>
      <div
        className={`bg-[#E1E5E85E] border p-5 flex flex-col gap-4 rounded-[20px] relative transition-all ${
          isInactive ? "border-[#112D6C]" : "border-transparent"
        } ${isFailed ? "opacity-60 grayscale cursor-not-allowed" : ""}`}
      >
        {isFailed && (
          <div className="absolute inset-0 bg-black/5 rounded-[20px] z-10 pointer-events-none" />
        )}

        {/* Failed Status Badge */}
        {isFailed && (
          <div className="absolute top-4 right-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Недоступно
          </div>
        )}

        <div
          className={`${
            isFailed ? "pointer-events-none" : ""
          } flex flex-col gap-4`}
        >
          <TariffHeader
            image={sim.region_group.image}
            title={sim.tariff_name}
          />
          <ActiveSimInfo sim={sim} />
          <hr />
          <CartItemFooter
            onOpenModal={handleOpenModal}
            hasRegions={!!sim.regions && sim.regions.length > 0}
            onActivate={handleActivate}
            disabled={isFailed}
          />
        </div>
      </div>

      <RegionsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        regions={sim.regions || []}
        title={`Доступные страны: ${sim.tariff_name}`}
      />
    </>
  );
};

export default ActiveSimCard;
