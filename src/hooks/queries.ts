import { useQuery } from "@tanstack/react-query";
import { regionAPI } from "../services/api.service";
import type { RegionResponse, SingleRegionResponse } from "../types/api";

export const regionGroupsQuery = async () => {
  const { data } = await regionAPI.getRegionGroups();
  return data.data;
};

export const regionsQuery = async (
  searchTerm: string | null = null,
  page: number = 1,
  type: string | null = null
): Promise<RegionResponse> => {
  const response = await regionAPI.getRegions(searchTerm, page, type);
  return response.data as RegionResponse;
};

export const useRegionsQuery = (
  searchTerm: string | null = null,
  page: number = 1,
  type: string | null = null
) => {
  return useQuery({
    queryKey: ["regions", searchTerm, page, type],
    queryFn: () => regionsQuery(searchTerm, page, type),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const singleRegionQuery = async (
  id: string | number
): Promise<SingleRegionResponse> => {
  if (!id) throw new Error("Region ID is required");
  const response = await regionAPI.getRegionById(id);
  return response.data;
};
