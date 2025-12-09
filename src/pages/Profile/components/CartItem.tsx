import React, { useState } from "react";
import type { Tariff } from "@/types/api";
import TariffHeader from "./TariffHeader";
import TariffInfo from "./TariffInfo";
import QuantityControl from "./QuantityControl";
import RegionsModal from "../../Tariffs/components/RegionsModal";

interface CartItemProps {
  tariff: Tariff;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  dropdownRef: (el: HTMLDivElement | null) => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  tariff,
  onIncrease,
  onDecrease,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (tariff.regions && tariff.regions.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border border-[#0000004D] text-[14px] p-5 flex flex-col gap-2 rounded-[10px] relative">
        <TariffHeader
          image={tariff.image}
          name={tariff.name}
          title={tariff.name}
        />
        <TariffInfo tariff={tariff} />
        <QuantityControl
          count={tariff.quantity || 1}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onOpenRegions={handleOpenModal}
        />
      </div>

      <RegionsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        regions={tariff.regions || []}
        title={`Доступные страны: ${tariff.name}`}
      />
    </>
  );
};

export default CartItem;
