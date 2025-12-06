import SimCard from "@/components/SimCard/SimCard";
import type { Region } from "@/types/api";
import { useRegionsQuery } from "@/hooks/queries";
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
  const type = category?.key === "local" ? null : category?.key || null;

  const { data: regionResponse, isLoading } = useRegionsQuery(null, 1, type);
  const regions = regionResponse?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {!isLoading
        ? regions?.map((region: Region) => (
            <SimCard key={region.id} region={region} />
          ))
        : Array.from({ length: 12 }).map((_, index) => (
            <SimCardSkeleton key={index} />
          ))}
    </div>
  );
}

export default HomeSimCards;
