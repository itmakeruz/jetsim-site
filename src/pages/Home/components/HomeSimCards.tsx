import SimCard from "@/components/SimCard/SimCard";
import type { Region } from "@/types/api";
import { useRegionsQuery } from "@/hooks/queries";

function HomeSimCards() {
  const { data: regionResponse } = useRegionsQuery(null, null, 1);
  const regions = regionResponse?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {regions?.map((region: Region) => (
        <SimCard key={region.id} region={region} />
      ))}
    </div>
  );
}

export default HomeSimCards;
