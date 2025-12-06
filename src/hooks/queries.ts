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

export const useRegionGroupsQuery = (
  type: string | null = null,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["regionGroups", type],
    queryFn: () => regionGroupsQuery(type),
    enabled: enabled && !!type,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
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
  type: string | null = null,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["regions", searchTerm, page, type],
    queryFn: () => regionsQuery(searchTerm, page, type),
    enabled,
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
