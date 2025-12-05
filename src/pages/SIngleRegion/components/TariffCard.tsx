import { ImagePreview } from "@/components/ImgCards";
import { getImageUrl } from "@/config/imageUtils";
import { ASSETS } from "@/assets";
import type { LocalItem } from "@/types/api";

interface TariffCardProps {
  tariff: LocalItem;
  regionImage: string;
}

export default function TariffCard({ tariff, regionImage }: TariffCardProps) {
  return (
    <div className="shadow-[0px_4px_8.4px_0px_#AAAFB361] bg-white z-1 group overflow-hidden relative border border-[#E8EDF2] rounded-[12px] px-[18px] py-[20px] flex flex-col gap-[15px]">
      <div className="flex items-center gap-[18px]">
        <ImagePreview
          src={getImageUrl(regionImage)}
          alt={tariff.name}
          width={66}
          height={66}
        />
        <h2 className="text-[20px] font-semibold text-black">{tariff.name}</h2>
      </div>
      <div className="flex items-center justify-between text-[16px] font-medium">
        <span className="text-[#4F7096]">
          {tariff.quantity_internet / 1024}GB/{tariff.validity_period} дней
        </span>
        <span className="text-[#1978E5]">
          {tariff.price_sell.toLocaleString()} ₽
        </span>
      </div>
      <button className="bg-[#1978E51A] rounded-[9px] px-[9px] flex items-center justify-center gap-2 py-[6px]">
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
  );
}
