import { useTranslation } from "react-i18next";
import React, { useState, useRef, useCallback, useEffect } from "react";
import type { cartTariff } from "@/types/api";
import TariffHeader from "./TariffHeader";
import TariffInfo from "./TariffInfo";
import QuantityControl from "./QuantityControl";
import CartItemFooter from "./CartItemFooter";
import RegionsModal from "../../Tariffs/components/RegionsModal";
import { useTariffStore } from "@/store/tariffStore";
import { useQueryClient } from "@tanstack/react-query";

const DEBOUNCE_MS = 400;

interface CartItemProps {
  tariff: cartTariff;
}

const CartItem: React.FC<CartItemProps> = ({ tariff }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { increaseQuantity, decreaseQuantity } = useTariffStore();
  const invalidateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const debouncedInvalidate = useCallback(() => {
    if (invalidateTimeoutRef.current)
      clearTimeout(invalidateTimeoutRef.current);
    invalidateTimeoutRef.current = setTimeout(() => {
      invalidateTimeoutRef.current = null;
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    }, DEBOUNCE_MS);
  }, [queryClient]);

  useEffect(() => {
    return () => {
      if (invalidateTimeoutRef.current)
        clearTimeout(invalidateTimeoutRef.current);
    };
  }, []);

  const handleOpenModal = () => {
    if (tariff.regions && tariff.regions.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIncrease = () => {
    increaseQuantity(tariff);
    debouncedInvalidate();
  };

  const handleDecrease = () => {
    decreaseQuantity(tariff);
    debouncedInvalidate();
  };
  return (
    <>
      <div className="js-product-card ew-cart-item">
        <TariffHeader image={tariff.image} title={tariff.name} />
        <TariffInfo tariff={tariff} />
        <div className="ew-cart-item-actions">
          <QuantityControl
            count={tariff.quantity || 1}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            totalAmount={tariff.total_amount}
          />

          <CartItemFooter
            onOpenModal={handleOpenModal}
            hasRegions={!!tariff.regions && tariff.regions.length > 0}
          />
        </div>
      </div>

      <RegionsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        regions={tariff.regions || []}
        title={`${t("jetstream.coverage")}: ${tariff.name}`}
      />
    </>
  );
};

export default CartItem;
