import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import SimCard from "../../components/SimCard/SimCard";
import CartDisplay from "../../components/CartDisplay/CartDisplay";
import { regionAPI } from "../../services/api.service";
import type { RegionCategory, Region, RegionResponse } from "../../types/api";
import { getImageUrl } from "../../config/imageUtils";
import Loader from "../../components/Loader";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [allRegions, setAllRegions] = useState<Region[]>([]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue || null);
    }, 500); // 500ms kutadi

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setSearchTerm(null);
    setInputValue("");
    setPage(1);
    setAllRegions([]);
  };

  // Reset page when search or category changes
  useEffect(() => {
    setPage(1);
    setAllRegions([]);
  }, [searchTerm, activeCategory]);

  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useQuery(
    {
      queryKey: ["regionCategories"],
      queryFn: async () => {
        const response = await regionAPI.getCategories();
        return response.data.data;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    }
  );

  const { data: regionResponse, isLoading: isRegionLoading } = useQuery({
    queryKey: ["regions", activeCategory, searchTerm, page],
    queryFn: async () => {
      const response = await regionAPI.getRegions(
        activeCategory,
        searchTerm,
        page
      );
      return response.data as RegionResponse;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // Update allRegions when new data arrives
  useEffect(() => {
    if (regionResponse?.data) {
      if (page === 1) {
        setAllRegions(regionResponse.data);
      } else {
        setAllRegions((prev) => [...prev, ...regionResponse.data]);
      }
    }
  }, [regionResponse, page]);

  const regionCategories = categoriesResponse || [];
  const regions = allRegions;
  const loading = isCategoriesLoading || isRegionLoading;
  const hasNextPage = regionResponse?.meta?.hasNextPage || false;

  return (
    <div className="container">
      <div className="content">
        <div className="flex flex-col items-center mt-[40px] gap-[32px]">
          <h1 className="text-center text-[44px] max-w-[930px] leading-[1.3] font-extrabold text-[#393939]">
            {t("sims.title")}
          </h1>
          <div className="flex flex-col items-center">
            <p className="subtitle">{t("sims.subtitle")}</p>
            <p className="subtitle">{t("sims.subtitle2")}</p>
          </div>
          <input
            type="text"
            placeholder={t("sims.search_placeholder")}
            value={inputValue}
            onChange={handleSearch}
            className="bg-[#E8EDF2] max-w-[730px] w-full p-5 text-center text-base text-[#4F7096] rounded-[10px] outline-none"
          />
        </div>

        {/* Cart Display */}
        <CartDisplay />
        <div className="flex gap-[25px] justify-center items-center mt-[20px] mb-[25px]">
          {regionCategories.map((category: RegionCategory) => (
            <button
              key={category.id}
              onClick={() => {
                if (activeCategory === category.id) {
                  setActiveCategory(null);
                } else {
                  setActiveCategory(category.id);
                }
              }}
              className={`${
                activeCategory === category.id ? "bg-main-blue text-white" : ""
              } flex items-center gap-2 border border-main-blue px-[12px] py-[10px] rounded-[12px] text-[18px]`}
            >
              <img
                className="w-[25px] h-[25px] object-contain"
                src={`${getImageUrl(category.icon)}`}
                alt={category.name}
              />
              {category.name}{" "}
            </button>
          ))}
        </div>

        <div className="relative space-y-[25px]">
          {loading && page === 1 ? (
            <Loader
              isFullScreen={false}
              className="static bg-transparent my-4"
            />
          ) : regions.filter((region: Region) => region.tariffs.length > 0)
              .length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">
                {searchTerm ? t("sims.no_results") : t("sims.no_data")}
              </p>
            </div>
          ) : (
            regions
              .filter((region: Region) => region.tariffs.length > 0)
              .map((region: Region) => (
                <SimCard key={region.id} region={region} />
              ))
          )}
        </div>
        {hasNextPage && (
          <div className="flex justify-center items-center mt-[25px]">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="border border-main-blue text-black px-[20px] py-[10px] rounded-[10px] hover:bg-main-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && page > 1 ? t("sims.loading") : t("sims.show_all")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
