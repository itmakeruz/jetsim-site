import { useState, useEffect } from "react";
import SimCard from "@/components/SimCard/SimCard";
import type { RegionGroup } from "@/types/api";
import { regionGroupsQuery } from "@/hooks/queries";
import SimCardSkeleton from "@/components/SimCard/SimCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { categories } from "@/constants";
import { useTranslation } from "react-i18next";

interface HomeSimCardsProps {
  activeCategory: number | null;
}

function HomeSimCards({ activeCategory }: HomeSimCardsProps) {
  const { i18n, t } = useTranslation();
  const [page, setPage] = useState(1);
  const [allRegionGroups, setAllRegionGroups] = useState<RegionGroup[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const category = categories.find((cat) => cat.id === activeCategory);
  const categoryKey = category?.key || null;

  const { data: regionGroupResponse, isLoading } = useQuery({
    queryKey: ["regionGroup", categoryKey, i18n.language, page],
    queryFn: () => regionGroupsQuery(categoryKey, 12, page),
    enabled: !!activeCategory,
  });

  // Reset when category changes
  useEffect(() => {
    if (activeCategory) {
      setPage(1);
      setAllRegionGroups([]);
    }
  }, [activeCategory]);

  // Update allRegionGroups when new data arrives
  useEffect(() => {
    if (regionGroupResponse?.data) {
      if (page === 1) {
        setAllRegionGroups(regionGroupResponse.data);
      } else {
        setAllRegionGroups((prev) => [...prev, ...regionGroupResponse.data]);
      }
      setIsLoadingMore(false);
    }
  }, [regionGroupResponse, page]);

  const hasNextPage = regionGroupResponse?.meta?.hasNextPage ?? false;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  const isInitialLoading = isLoading && page === 1;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-3">
        {!isInitialLoading
          ? allRegionGroups.map((regionGroup: RegionGroup) => (
              <SimCard key={regionGroup.id} regionGroup={regionGroup as any} />
            ))
          : Array.from({ length: 12 }).map((_, index) => (
              <SimCardSkeleton key={index} />
            ))}
        {isLoadingMore &&
          Array.from({ length: 6 }).map((_, index) => (
            <SimCardSkeleton key={`loading-${index}`} />
          ))}
      </div>

      {!isInitialLoading && hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 bg-[#112D6C] text-white font-semibold rounded-[10px] hover:bg-[#0e2459] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore
              ? t("common.loading") || "Yuklanmoqda..."
              : t("common.load_more") || "Yana yuklash"}
          </button>
        </div>
      )}
    </>
  );
}

export default HomeSimCards;
