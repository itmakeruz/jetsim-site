import { useQuery } from "@tanstack/react-query";
import { regionAPI } from "../services/api.service";
import type {
  RegionResponse,
  SingleRegionResponse,
  RegionGroupResponse,
} from "../types/api";

export const regionGroupsQuery = async (
  type: string | null = null
): Promise<RegionGroupResponse> => {
  const response = await regionAPI.getRegionGroups(type);
  return response.data as RegionGroupResponse;
};

export const getAllRegions = async (
  search: string | null = null,
  size: number | null = null
): Promise<RegionResponse> => {
  const response = await regionAPI.getRegions(search, size);
  return response.data as RegionResponse;
};

export const singleRegionQuery = async (
  id: string | number
): Promise<SingleRegionResponse> => {
  if (!id) throw new Error("Region ID is required");
  const response = await regionAPI.getRegionById(id);
  return response.data;
};

export const singleRegionGroupQuery = async (
  id: string | number
): Promise<RegionGroupResponse> => {
  if (!id) throw new Error("Region Group ID is required");
  const response = await regionAPI.getById(id);
  return response.data;
};

export const searchRegionsQuery = async (
  search: string
): Promise<RegionResponse> => {
  const response = await regionAPI.getRegions(1, null, search);
  return response.data as RegionResponse;
};

export const useSearchRegionsQuery = (
  search: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["searchRegions", search],
    queryFn: () => searchRegionsQuery(search),
    enabled: enabled && search.length > 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
