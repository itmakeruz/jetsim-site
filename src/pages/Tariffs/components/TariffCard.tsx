import { useState } from "react";
import { ImagePreview } from "@/components/ImgCards";
import { getImageUrl } from "@/config/imageUtils";
import { ASSETS } from "@/assets";
import type { Tariff } from "@/types/api";
import RegionsModal from "./RegionsModal";

interface TariffCardProps {
  tariff: Tariff;
}

export default function TariffCard({ tariff }: TariffCardProps) {
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
      <div className="shadow-[0px_4px_8.4px_0px_#AAAFB361] bg-white z-1 group overflow-hidden relative border border-[#E8EDF2] rounded-[12px] px-[18px] py-[20px] flex flex-col gap-[15px]">
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
        <button
          onClick={handleOpenModal}
          disabled={!tariff.regions || tariff.regions.length === 0}
          className="bg-[#1978E51A] rounded-[9px] px-[9px] flex items-center justify-center gap-2 py-[6px] hover:bg-[#1978E52A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
