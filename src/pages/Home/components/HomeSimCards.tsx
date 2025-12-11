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
  const { i18n } = useTranslation();
  const category = categories.find((cat) => cat.id === activeCategory);
  const categoryKey = category?.key || null;
  const { data: regionGroupResponse, isLoading } = useQuery({
    queryKey: ["regionGroup", categoryKey, i18n.language],
    queryFn: () => regionGroupsQuery(categoryKey),
    enabled: !!activeCategory,
  });

  const regionGroups = regionGroupResponse?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-3">
      {!isLoading
        ? regionGroups?.map((regionGroup: RegionGroup) => (
            <SimCard key={regionGroup.id} regionGroup={regionGroup as any} />
          ))
        : Array.from({ length: 12 }).map((_, index) => (
            <SimCardSkeleton key={index} />
          ))}
    </div>
  );
}

export default HomeSimCards;
