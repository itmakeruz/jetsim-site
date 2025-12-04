import { regionAPI } from "../services/api.service";

export const regionGroupsQuery = async () => {
  const { data } = await regionAPI.getRegionGroups();
  return data.data;
};
