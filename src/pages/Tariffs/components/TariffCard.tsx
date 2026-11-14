import { useState } from "react";
import { ImagePreview } from "@/components/ImgCards";
import { getImageUrl } from "@/config/imageUtils";
import { ASSETS } from "@/assets";
import type { Tariff } from "@/types/api";
import { isUnlimitedTariff } from "@/lib/tariffKind";
import RegionsModal from "./RegionsModal";
import DescriptionModal from "./DescriptionModal";
import ESIMSupportModal from "./ESIMSupportModal";
import { useTariffStore } from "@/store/tariffStore";
import { Info, Minus, Plus, ShoppingCart } from "lucide-react";

interface TariffCardProps {
  tariff: Tariff;
}

export default function TariffCard({ tariff }: TariffCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isESIMSupportModalOpen, setIsESIMSupportModalOpen] = useState(false);

  const { selectedTariffs, setSelectedTariff, increaseQuantity, decreaseQuantity } =
    useTariffStore();

  const cartItem = selectedTariffs.find((t) => t.id === tariff.id);
  const quantity = cartItem?.quantity ?? 0;
  const inCart = quantity > 0;

  const hasRegions = Boolean(tariff.regions && tariff.regions.length > 0);

  const addToCart = () => {
    increaseQuantity(tariff);
    setSelectedTariff(tariff);
  };

  // Проверку поддержки eSIM показываем только при первом добавлении:
  // дальше пользователь уже подтвердил, что устройство подходит
  const handleAddClick = () => {
    if (inCart) {
      addToCart();
      return;
    }
    setIsESIMSupportModalOpen(true);
  };

  return (
    <>
      <div
        className={`group relative z-1 flex flex-col gap-4 overflow-hidden rounded-[14px] bg-white
          px-4 py-4 2xl:px-[18px] 2xl:py-5 transition-all duration-200
          shadow-[0px_4px_8.4px_0px_#AAAFB361]
          ${
            inCart
              ? "border-[2px] border-[#1978E5]"
              : "border-[2px] border-[#E8EDF2] hover:border-[#1978E5]/45"
          }`}
      >
        <div className="flex items-center gap-[18px] pr-8">
          <ImagePreview
            src={getImageUrl(tariff?.region_group?.image || "")}
            alt={tariff.name}
            width={58}
            height={58}
          />
          <h2 className="flex-1 text-[19px] font-semibold leading-tight text-black">
            {tariff.name}
          </h2>

          {tariff.description && (
            <button
              type="button"
              onClick={() => setIsDescriptionModalOpen(true)}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#1978E51A]"
              title="Подробнее о тарифе"
              aria-label="Подробнее о тарифе"
            >
              <Info className="h-5 w-5 text-[#1978E5]" />
            </button>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <span className="rounded-lg bg-[#F1F5FB] px-2.5 py-1 text-[14px] font-medium text-[#4F7096]">
            {isUnlimitedTariff(tariff) ? "∞ Безлимит" : `${tariff.quantity_internet} GB`} · {tariff.validity_period} дней
          </span>
          <span className="text-[22px] font-bold leading-none text-[#1978E5]">
            {tariff?.price_sell?.toLocaleString()} ₽
          </span>
        </div>

        <button
          type="button"
          onClick={() => hasRegions && setIsModalOpen(true)}
          disabled={!hasRegions}
          className="flex items-center justify-center gap-2 rounded-[9px] bg-[#1978E51A] px-[9px] py-[7px]
            transition-colors hover:bg-[#1978E52A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src={ASSETS.availableCountries} alt="" aria-hidden="true" width="20" height="20" />
          <span className="text-[15px] font-medium text-[#1978E5]">Доступные страны</span>
        </button>

        {inCart ? (
          <div className="flex items-center justify-between gap-2 rounded-[10px] border border-[#1978E5] bg-[#1978E5]/[0.06] p-1">
            <button
              type="button"
              onClick={() => decreaseQuantity(tariff)}
              aria-label="Уменьшить количество"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#1978E5] shadow-sm transition-colors hover:bg-[#1978E5] hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="text-[15px] font-semibold text-[#1978E5]">
              В корзине: {quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(tariff)}
              aria-label="Увеличить количество"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#1978E5] shadow-sm transition-colors hover:bg-[#1978E5] hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddClick}
            className="flex items-center justify-center gap-2 rounded-[10px] bg-[#1978E5] px-4 py-2.5
              text-[15px] font-semibold text-white transition-all duration-200
              hover:bg-[#1565C0] hover:shadow-[0_8px_18px_-8px_rgba(25,120,229,0.8)]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            Добавить в корзину
          </button>
        )}
      </div>

      <RegionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        regions={tariff.regions || []}
        title={`Доступные страны: ${tariff.name}`}
      />

      <DescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        title={tariff.name}
        description={tariff.description || ""}
      />

      <ESIMSupportModal
        isOpen={isESIMSupportModalOpen}
        onClose={() => setIsESIMSupportModalOpen(false)}
        onConfirm={addToCart}
      />
    </>
  );
}
