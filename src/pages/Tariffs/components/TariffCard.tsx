import { useState } from "react";
import { ImagePreview } from "@/components/ImgCards";
import { getImageUrl } from "@/config/imageUtils";
import { ASSETS } from "@/assets";
import type { Tariff } from "@/types/api";
import RegionsModal from "./RegionsModal";
import { useTariffStore } from "@/store/tariffStore";

interface TariffCardProps {
  tariff: Tariff;
}

export default function TariffCard({ tariff }: TariffCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    selectedTariffs,
    setSelectedTariffs,
    setSelectedTariff,
    selectedTariff,
  } = useTariffStore();
  const selectedTariffData = selectedTariffs.find((t) => t.id === tariff.id);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tariff.regions && tariff.regions.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = () => {
    const exists = selectedTariffs.find((t) => t.id === tariff.id);

    if (!exists) {
      setSelectedTariffs([...selectedTariffs, { ...tariff, count: 0 }]);
    }

    setSelectedTariff(tariff);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`shadow-[0px_4px_8.4px_0px_#AAAFB361] bg-white z-1 group overflow-hidden relative border rounded-[12px] 2xl:px-[18px] px-4 2xl:py-[20px] py-4 flex flex-col gap-[15px] cursor-pointer transition-all ${
          selectedTariff?.id === tariff.id
            ? "border-[#1978E5] border-[2px]"
            : "border-[#E8EDF2] border-[2px]"
        }`}
      >
        <div className="flex items-center gap-[18px]">
          <ImagePreview
            src={getImageUrl(tariff?.region_group?.image || "")}
            alt={tariff.name}
            width={66}
            height={66}
          />
          <h2 className="text-[20px] font-semibold text-black">
            {tariff.name}
          </h2>
        </div>
        <div className="flex items-center justify-between text-[16px] font-medium">
          <span className="text-[#4F7096]">
            {(tariff.quantity_internet / 1024).toFixed(0)}GB/
            {tariff.validity_period} дней
          </span>
          <span className="text-[#1978E5]">
            {tariff?.price_sell?.toLocaleString()} ₽
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenModal}
            disabled={!tariff.regions || tariff.regions.length === 0}
            className="bg-[#1978E51A] w-full rounded-[9px] px-[9px] flex items-center justify-center gap-2 py-[6px] hover:bg-[#1978E52A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            <img
              src={ASSETS.availableCountries}
              alt="available countries"
              width="24"
              height="24"
            />
            <span className="text-[#1978E5] text-[20px] font-normal">
              Доступные страны
            </span>
          </button>
          {selectedTariffData && selectedTariffData.count > 0 && (
            <span className="bg-[#1978E5] shrink-0 text-white text-base font-semibold rounded-full w-[32px] h-[32px] flex items-center justify-center">
              {selectedTariffData?.count}
            </span>
          )}
        </div>
      </div>

      <RegionsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        regions={tariff.regions || []}
        title={`Доступные страны: ${tariff.name}`}
      />
    </>
  );
}
