import { useTranslation } from "react-i18next";
import type { Region } from "@/types/api";
import RegionDropdownItem from "./RegionDropdownItem";

interface RegionDropdownProps {
  regions: Region[];
  selectedRegions: Region[];
  isLoading: boolean;
  onSelectRegion: (region: Region) => void;
  maxSelections?: number;
}

function RegionDropdown({
  regions,
  selectedRegions,
  isLoading,
  onSelectRegion,
  maxSelections = 3,
}: RegionDropdownProps) {
  const { t } = useTranslation();

  // Tanlangan regionlarni filter qilish
  const availableRegions = regions.filter(
    (region) => !selectedRegions.some((r) => r.id === region.id)
  );

  const isMaxReached = selectedRegions.length >= maxSelections;

  if (isLoading) {
    return (
      <div className="p-4 text-center text-[#4F7096]">
        {t("common.loading") || "Загрузка..."}
      </div>
    );
  }

  if (availableRegions.length === 0) {
    return (
      <div className="p-4 text-center text-[#4F7096]">
        {t("common.no_results") || "Результаты не найдены"}
      </div>
    );
  }

  return (
    <div>
      {availableRegions.map((region) => (
        <RegionDropdownItem
          key={region.id}
          region={region}
          onSelect={onSelectRegion}
          disabled={isMaxReached}
        />
      ))}
    </div>
  );
}

export default RegionDropdown;
