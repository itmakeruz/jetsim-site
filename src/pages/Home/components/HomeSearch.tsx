import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  // Regionlarni tanlaganda navigate qilish
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRegions.length > 0) {
      const ids = selectedRegions.map((r) => r.id).join("-");
      navigate(`/tariffs/ids=${ids}`);
    }
  };

  return (
    <div className="mx-auto w-full md:mt-4 mt-2 max-w-[730px]">
      <div ref={searchRef} className="relative">
        <form
          onSubmit={handleSearchSubmit}
          className="border border-[#8A8AC7] bg-[#F0F0FB] md:rounded-[10px] rounded-[6px] relative"
        >
          <div className="flex items-center flex-wrap md:gap-2 gap-1 md:p-2 p-1 md:pr-14 pr-2 md:min-h-[60px] min-h-[50px]">
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
