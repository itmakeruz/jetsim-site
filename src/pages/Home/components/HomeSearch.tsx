import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllRegions } from "@/hooks/queries";
import { useQuery } from "@tanstack/react-query";
import type { Region } from "@/types/api";
import SelectedRegionChip from "./HomeSearch/SelectedRegionChip";
import SearchInput from "./HomeSearch/SearchInput";
import RegionDropdown from "./HomeSearch/RegionDropdown";

const MAX_SELECTIONS = 3;

function HomeSearch() {
  const [inputValue, setInputValue] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  // Regionlarni API dan olish
  const { data: allRegionsData, isLoading: isLoadingAll } = useQuery({
    queryKey: ["regions", inputValue, i18n.language],
    queryFn: () => getAllRegions(inputValue, 1000000),
  });

  const regions = allRegionsData?.data || [];

  // Tashqariga bosilganda dropdown yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Input o'zgarishini boshqarish
  const handleSearchChange = (value: string) => {
    setInputValue(value);
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  // Region tanlash
  const handleSelectRegion = (region: Region) => {
    if (selectedRegions.length >= MAX_SELECTIONS) {
      return;
    }

    if (selectedRegions.some((r) => r.id === region.id)) {
      return;
    }

    setSelectedRegions([...selectedRegions, region]);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  // Region olib tashlash
  const handleRemoveRegion = (regionId: number) => {
    setSelectedRegions(selectedRegions.filter((r) => r.id !== regionId));
  };

  // Input focus
  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-[730px]">
      <div ref={searchRef} className="relative">
        <form className="border border-[#8A8AC7] bg-[#F0F0FB] rounded-[10px] relative">
          <div className="flex items-center flex-wrap gap-2 p-2 pr-14 min-h-[60px]">
            {/* Tanlangan regionlar */}
            {selectedRegions.map((region) => (
              <SelectedRegionChip
                key={region.id}
                region={region}
                onRemove={handleRemoveRegion}
              />
            ))}

            {/* Qidiruv input */}
            <SearchInput
              value={inputValue}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              selectedCount={selectedRegions.length}
            />
          </div>
        </form>

        {/* Dropdown ro'yxat */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[10px] border border-[#E8EDF2] shadow-lg max-h-[400px] overflow-y-auto overscroll-contain z-50"
          >
            <RegionDropdown
              regions={regions}
              selectedRegions={selectedRegions}
              isLoading={isLoadingAll}
              onSelectRegion={handleSelectRegion}
              maxSelections={MAX_SELECTIONS}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeSearch;
