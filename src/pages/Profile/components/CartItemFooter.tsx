import React from "react";
import AvailableCountriesButton from "./AvailableCountriesButton";
import TotalAmount from "./TotalAmount";

interface CartItemFooterProps {
  onOpenModal: () => void;
  hasRegions: boolean;
  totalAmount: number;
}

const CartItemFooter: React.FC<CartItemFooterProps> = ({
  onOpenModal,
  hasRegions,
  totalAmount,
}) => {
  return (
    <div className="flex items-center justify-between gap-[28px]">
      <AvailableCountriesButton onClick={onOpenModal} disabled={!hasRegions} />
      <TotalAmount amount={totalAmount} />
    </div>
  );
};

export default CartItemFooter;
