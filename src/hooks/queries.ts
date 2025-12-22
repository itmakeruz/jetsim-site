import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { cartAPI, regionAPI } from "../services/api.service";
import type {
  RegionResponse,
  SingleRegionResponse,
  RegionGroupResponse,
  TariffResponse,
  CartResponse,
  ActiveSimsResponse,
} from "../types/api";

export const regionGroupsQuery = async (
  type: string | null = null,
  size: number = 20,
  page: number = 1
): Promise<RegionGroupResponse> => {
  const response = await regionAPI.getRegionGroups(type, size, page);
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

export const tariffsQuery = async (
  id: string | number
): Promise<TariffResponse> => {
  if (!id) throw new Error("Tariff ID is required");
  const response = await regionAPI.getTariffs(id);
  return response.data;
};

export const searchRegionsQuery = async (
  search: string
): Promise<RegionResponse> => {
  const response = await regionAPI.getRegions(search, null);
  return response.data as RegionResponse;
};

export const useSearchRegionsQuery = (
  search: string,
  enabled: boolean = true
) => {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["searchRegions", search, i18n.language],
    queryFn: () => searchRegionsQuery(search),
    enabled: enabled && search.length > 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const cartItemsQuery = async (): Promise<CartResponse> => {
  const response = await cartAPI.getCart();
  return response.data as CartResponse;
};

export const inactiveSimsQuery = async (): Promise<ActiveSimsResponse> => {
  const response = await cartAPI.getInactiveSims();
  return response.data as ActiveSimsResponse;
};
export const activeSimsQuery = async (): Promise<ActiveSimsResponse> => {
  const response = await cartAPI.getActiveSims();
  return response.data as ActiveSimsResponse;
};

export const tariffsByRegionIdsQuery = async (
  ids: string
): Promise<TariffResponse> => {
  const response = await regionAPI.getTariffsByRegionIds(ids);
  return response.data as TariffResponse;
};
