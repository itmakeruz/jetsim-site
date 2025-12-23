import React from "react";
import AvailableCountriesButton from "./AvailableCountriesButton";

interface CartItemFooterProps {
  onOpenModal: () => void;
  hasRegions: boolean;
  onActivate?: () => void;
  disabled?: boolean;
}

const CartItemFooter: React.FC<CartItemFooterProps> = ({
  onOpenModal,
  hasRegions,
  onActivate,
  disabled = false,
}) => {
  const isDisabled = disabled;

  return (
    <div className="flex flex-col gap-[10px]">
      <AvailableCountriesButton
        onClick={onOpenModal}
        disabled={!hasRegions || isDisabled}
      />
      {onActivate && (
        <button
          onClick={onActivate}
          disabled={isDisabled}
          className={`rounded-[9px] h-[50px] text-white text-base font-medium transition-opacity ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed opacity-60"
              : "bg-[#112D6C] hover:opacity-90"
          }`}
        >
          Подробнее
        </button>
      )}
    </div>
  );
};

export default CartItemFooter;
