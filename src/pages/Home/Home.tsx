import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import SimCard from "../../components/SimCard/SimCard";
import { regionAPI } from "../../services/api.service";
import type { RegionGroup, Region, RegionResponse } from "../../types/api";
import { getImageUrl } from "../../config/imageUtils";
import Loader from "../../components/Loader";
import { CategoryButton } from "../../components/Buttons";
import { regionGroupsQuery } from "../../hooks/queries";
import HomeHero from "./components/HomeHero";
import HomeSearch from "./components/HomeSearch";
import HomeCategories from "./components/HomeCategories";

const Home: React.FC = () => {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [allRegions, setAllRegions] = useState<Region[]>([]);

  const { data: regionGroupsResponse, isLoading: isRegionGroupsLoading } =
    useQuery({
      queryKey: ["regionGroups"],
      queryFn: regionGroupsQuery,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    });

  const { data: regionResponse, isLoading: isRegionLoading } = useQuery({
    queryKey: ["regions", activeCategory, page],
    queryFn: async () => {
      const response = await regionAPI.getRegions(activeCategory, null, page);
      return response.data as RegionResponse;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const regionCategories = regionGroupsResponse || [];
  const regions = regionResponse?.data;
  const loading = isRegionGroupsLoading || isRegionLoading;
  const hasNextPage = regionResponse?.meta?.hasNextPage || false;

  return (
    <div className="container">
      <div className="content">
        <HomeHero />
        <HomeSearch />

        {/* <CartDisplay /> */}
        <HomeCategories />

        {/* <div className="relative space-y-[25px]">
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
            regions.map((region: Region) => (
              <SimCard key={region.id} region={region} />
            ))
          )}
        </div> */}
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
