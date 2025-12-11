import React from "react";
import AvailableCountriesButton from "./AvailableCountriesButton";

interface CartItemFooterProps {
  onOpenModal: () => void;
  hasRegions: boolean;
  onActivate?: () => void;
}

const CartItemFooter: React.FC<CartItemFooterProps> = ({
  onOpenModal,
  hasRegions,
  onActivate,
}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <AvailableCountriesButton onClick={onOpenModal} disabled={!hasRegions} />
      {onActivate &&<button onClick={onActivate} className="bg-[#112D6C] rounded-[9px] h-[50px] text-white text-base font-medium">Активировать</button>}
    </div>
  );
};

export default CartItemFooter;
