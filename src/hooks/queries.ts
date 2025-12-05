import { useQuery } from "@tanstack/react-query";
import { regionAPI } from "../services/api.service";
import type { RegionResponse, SingleRegionResponse } from "../types/api";

export const regionGroupsQuery = async () => {
  const { data } = await regionAPI.getRegionGroups();
  return data.data;
};

export const regionsQuery = async (
  categoryId: number | null = null,
  searchTerm: string | null = null,
  page: number = 1
): Promise<RegionResponse> => {
  const response = await regionAPI.getRegions(categoryId, searchTerm, page);
  return response.data as RegionResponse;
};

export const useRegionsQuery = (
  categoryId: number | null = null,
  searchTerm: string | null = null,
  page: number = 1
) => {
  return useQuery({
    queryKey: ["regions", categoryId, searchTerm, page],
    queryFn: () => regionsQuery(categoryId, searchTerm, page),
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
