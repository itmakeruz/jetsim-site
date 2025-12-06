import SimCard from "@/components/SimCard/SimCard";
import type { Region, RegionGroup } from "@/types/api";
import { useRegionsQuery, useRegionGroupsQuery } from "@/hooks/queries";
import SimCardSkeleton from "@/components/SimCard/SimCardSkeleton";

const categories = [
  {
    id: 1,
    name: "Популярный",
    key: "popular",
  },
  {
    id: 2,
    name: "Локальные",
    key: "local",
  },
  {
    id: 3,
    name: "Региональные",
    key: "regional",
  },
  {
    id: 4,
    name: "Глобальные",
    key: "global",
  },
];

interface HomeSimCardsProps {
  activeCategory: number | null;
}

function HomeSimCards({ activeCategory }: HomeSimCardsProps) {
  const category = categories.find((cat) => cat.id === activeCategory);
  const categoryKey = category?.key || null;

  // Agar regional yoki global bo'lsa, region-group endpointidan foydalanamiz
  const isRegionGroupCategory =
    categoryKey === "regional" || categoryKey === "global";

  const { data: regionResponse, isLoading: isLoadingRegions } = useRegionsQuery(
    null,
    1,
    isRegionGroupCategory ? null : categoryKey,
    !isRegionGroupCategory
  );

  const { data: regionGroupResponse, isLoading: isLoadingRegionGroups } =
    useRegionGroupsQuery(
      isRegionGroupCategory ? categoryKey : null,
      isRegionGroupCategory
    );

  const isLoading = isRegionGroupCategory
    ? isLoadingRegionGroups
    : isLoadingRegions;

  const regions = isRegionGroupCategory
    ? regionGroupResponse?.data
    : regionResponse?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {!isLoading
        ? regions?.map((region: Region | RegionGroup) => (
            <SimCard key={region.id} region={region as Region} />
          ))
        : Array.from({ length: 12 }).map((_, index) => (
            <SimCardSkeleton key={index} />
          ))}
    </div>
  );
}

export default HomeSimCards;
