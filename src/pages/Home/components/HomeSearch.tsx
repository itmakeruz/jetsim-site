import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllRegions } from "@/hooks/queries";
import { ImagePreview } from "@/components/ImgCards";
import { ChevronRight, X, Search } from "lucide-react";
import type { Region } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

function HomeSearch() {
  const [inputValue, setInputValue] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Agar input bo'sh bo'lsa, barcha regionlarni olish
  const { data: allRegionsData, isLoading: isLoadingAll } = useQuery({
    queryKey: ["regions", inputValue],
    queryFn: () => getAllRegions(inputValue, 1000000),
  });

  const regions = allRegionsData?.data || [];

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    // Dropdown har doim ochiq bo'lsin
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  const handleSelectRegion = (region: Region) => {
    if (selectedRegions.length >= 3) {
      return; // Maksimal 3 ta
    }

    // Agar allaqachon tanlangan bo'lsa, qo'shmaslik
    if (selectedRegions.some((r) => r.id === region.id)) {
      return;
    }

    setSelectedRegions([...selectedRegions, region]);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  const handleRemoveRegion = (regionId: number) => {
    setSelectedRegions(selectedRegions.filter((r) => r.id !== regionId));
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-[730px]">
      <div ref={searchRef} className="relative">
        <form className="border border-[#8A8AC7] bg-[#F0F0FB] rounded-[10px] relative">
          <div className="flex items-center">
            <input
              type="text"
              placeholder={t("common.search_placeholder")}
              value={inputValue}
              onChange={handleSearch}
              onFocus={handleInputFocus}
              className="w-full p-5 pr-12 text-base text-[#4F7096] outline-none bg-transparent"
            />
            <button className="absolute right-2 bg-[#8A8AC7] rounded-[10px] w-[50px] h-[50px] flex items-center justify-center">
              <Search className="w-6 h-6 text-[#FFFFFF]" />
            </button>
          </div>
        </form>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[10px] border border-[#E8EDF2] shadow-lg max-h-[400px] overflow-y-auto overscroll-contain z-50"
          >
            {isLoadingAll ? (
              <div className="p-4 text-center text-[#4F7096]">
                {t("common.loading") || "Загрузка..."}
              </div>
            ) : regions.length > 0 ? (
              <div>
                {regions.map((region: Region) => {
                  const isSelected = selectedRegions.some(
                    (r) => r.id === region.id
                  );
                  return (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => handleSelectRegion(region)}
                      disabled={isSelected || selectedRegions.length >= 3}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0F0FB] transition-colors ${
                        isSelected || selectedRegions.length >= 3
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
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
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-[#4F7096]">
                {t("common.no_results") || "Результаты не найдены"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Regions */}
      {selectedRegions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {selectedRegions.map((region) => (
            <div
              key={region.id}
              className="flex items-center gap-2 bg-white border border-[#E8EDF2] rounded-[8px] px-3 py-2 shadow-sm"
            >
              <ImagePreview
                src={region.image}
                alt={region.name}
                width={30}
                height={30}
              />
              <span className="text-sm text-[#4F7096] font-medium">
                {region.name}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveRegion(region.id)}
                className="ml-1 p-1 hover:bg-[#F0F0FB] rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-[#4F7096]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeSearch;
