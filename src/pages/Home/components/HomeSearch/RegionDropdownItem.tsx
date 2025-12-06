import { ChevronRight } from "lucide-react";
import { ImagePreview } from "@/components/ImgCards";
import type { Region } from "@/types/api";

interface RegionDropdownItemProps {
  region: Region;
  onSelect: (region: Region) => void;
  disabled?: boolean;
}

function RegionDropdownItem({
  region,
  onSelect,
  disabled = false,
}: RegionDropdownItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(region)}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0F0FB] transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <ImagePreview
        src={region.image}
        alt={region.name}
        width={40}
        height={40}
      />
      <span className="flex-1 text-left text-[#4F7096] font-medium">
        {region.name}
      </span>
      <ChevronRight className="w-5 h-5 text-[#4F7096]" />
    </button>
  );
}

export default RegionDropdownItem;
