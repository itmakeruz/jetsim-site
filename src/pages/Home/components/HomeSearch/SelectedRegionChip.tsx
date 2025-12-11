import { X } from "lucide-react";
import { ImagePreview } from "@/components/ImgCards";
import type { Region } from "@/types/api";

interface SelectedRegionChipProps {
  region: Region;
  onRemove: (regionId: number) => void;
}

function SelectedRegionChip({ region, onRemove }: SelectedRegionChipProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-[#E8EDF2] md:rounded-[8px] rounded md:px-2 px-1 md:py-1 py-0.5 shadow-sm">
      <ImagePreview
        src={region.image}
        alt={region.name}
        width={24}
        height={24}
      />
      <span className="text-sm text-[#4F7096] font-medium whitespace-nowrap">
        {region.name}
      </span>
      <button
        type="button"
        onClick={() => onRemove(region.id)}
        className="ml-1 p-0.5 hover:bg-[#F0F0FB] rounded-full transition-colors"
      >
        <X className="w-3.5 h-3.5 text-[#4F7096]" />
      </button>
    </div>
  );
}

export default SelectedRegionChip;
