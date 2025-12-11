import React, { useState } from "react";
import type { cartTariff } from "@/types/api";
import TariffHeader from "./TariffHeader";
import TariffInfo from "./TariffInfo";
import QuantityControl from "./QuantityControl";
import CartItemFooter from "./CartItemFooter";
import RegionsModal from "../../Tariffs/components/RegionsModal";
import { useTariffStore } from "@/store/tariffStore";
import { useQueryClient } from "@tanstack/react-query";

interface CartItemProps {
  tariff: cartTariff;
}

const CartItem: React.FC<CartItemProps> = ({ tariff }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { increaseQuantity, decreaseQuantity } = useTariffStore();

  const handleOpenModal = () => {
    if (tariff.regions && tariff.regions.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleIncrease = async () => {
    await increaseQuantity(tariff);
    queryClient.invalidateQueries({ queryKey: ["cartItems"] });
  };

  const handleDecrease = async () => {
    await decreaseQuantity(tariff);
    queryClient.invalidateQueries({ queryKey: ["cartItems"] });
  };
  return (
    <>
      <div className="bg-[#E1E5E85E] p-5 flex flex-col gap-4 rounded-[20px] relative">
        <TariffHeader
          image={tariff.image}
          name={tariff.name}
          title={tariff.name}
        />
        <TariffInfo tariff={tariff} />
        <QuantityControl
          count={tariff.quantity || 1}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          totalAmount={tariff.total_amount}
        />
        <hr />
        <CartItemFooter
          onOpenModal={handleOpenModal}
          hasRegions={!!tariff.regions && tariff.regions.length > 0}
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
