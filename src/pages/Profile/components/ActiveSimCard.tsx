import React, { useState } from "react";
import type { ActiveSim } from "@/types/api";
import TariffHeader from "./TariffHeader";
import ActiveSimInfo from "./ActiveSimInfo";
import CartItemFooter from "./CartItemFooter";
import RegionsModal from "../../Tariffs/components/RegionsModal";

interface ActiveSimCardProps {
  sim: ActiveSim;
  onActivate?: () => void;
  isInactive?: boolean;
}

const ActiveSimCard: React.FC<ActiveSimCardProps> = ({
  sim,
  onActivate,
  isInactive,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (sim.regions && sim.regions.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`bg-[#E1E5E85E] border p-5 flex flex-col gap-4 rounded-[20px] relative ${
          isInactive ? "border-[#112D6C]" : "border-transparent"
        }`}
      >
        <TariffHeader
          image={sim.region_group.image}
          name={sim.region_group.name}
          title={sim.tariff_name}
        />
        <ActiveSimInfo sim={sim} />
        <hr />
        <CartItemFooter
          onOpenModal={handleOpenModal}
          hasRegions={!!sim.regions && sim.regions.length > 0}
          onActivate={onActivate}
        />
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
