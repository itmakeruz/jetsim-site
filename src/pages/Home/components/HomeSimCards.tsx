import SimCard from "@/components/SimCard/SimCard";
import { regionAPI } from "@/services/api.service";
import type { Region, RegionResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";

function HomeSimCards() {
  // const [page, setPage] = useState(1);

  const { data: regionResponse } = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const response = await regionAPI.getRegions(null, null, 1);
      return response.data as RegionResponse;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const regions = regionResponse?.data;
  // const loading = isRegionLoading;
  // const hasNextPage = regionResponse?.meta?.hasNextPage || false;
  console.log(regions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {regions?.map((region: Region) => (
        <SimCard key={region.id} region={region} />
      ))}
    </div>
  );
}

export default HomeSimCards;
