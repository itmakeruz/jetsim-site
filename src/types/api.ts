// Region Category Types
export interface Region {
  id: number;
  name: string;
  image: string;
}
export interface RegionGroup {
  id: number;
  name: string;
  image: string;
  min_price: number;
  created_at: string;
  regions: Region[];
}

export interface SingleRegion {
  id: number;
  name: string;
  image: string;
}

export interface LocalItem {
  id: number;
  name: string;
  price_sell: number;
  quantity_internet: number;
  validity_period: number;
  region_group: RegionGroup;
  regions: Region[];
}
export interface ApiResponse {
  local: LocalItem[];
  regional: LocalItem[];
  global: LocalItem[];
  name: string;
  image: string;
  id: string;
}
export interface SingleRegionResponse {
  data: ApiResponse;
  message: string;
  success: boolean;
}

export interface RegionGroupResponse {
  success: boolean;
  message: string;
  data: RegionGroup[];
  meta: {
    totalPage: number;
    totalSize: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalItems: number;
  };
}

export interface RegionResponse {
  success: boolean;
  message: string;
  data: Region[];
  meta: {
    totalPage: number;
    totalSize: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalItems: number;
  };
}

export interface Tariff {
  id: number;
  name: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  is_popular: boolean;
  is_4g: boolean;
  is_5g: boolean;
  quantity_sms: number;
  quantity_minute: number;
  quantity_internet: number;
  validity_period: number;
  price_sell: number;
  type: {
    id: number;
    name: string;
  };
  regions: Region[];
  created_at: string;
  day_left?: number;
  usage?: number;
  qrcode?: string;
  region_group: RegionGroup;
}

export interface TariffResponse {
  success: boolean;
  data: {
    regions: Region[];
    tariffs: {
      local: Tariff[];
      regional: Tariff[];
      global: Tariff[];
    };
  };
}

// Processed data for display
export interface ProcessedTariff {
  id: number;
  name: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  is_popular: boolean;
  is_4g: boolean;
  is_5g: boolean;
  quantity_sms: number;
  quantity_minute: number;
  quantity_internet: number;
  validity_period: number;
  price_sell: number;
  type: "TURBO" | "STANDARD" | "ECONOMY" | null;
  created_at: string;
}

export interface RegionWithTariffs {
  id: number;
  name_ru: string;
  image: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  tariffs: ProcessedTariff[];
}

// Cart API Types
export interface CartItemFromAPI {
  id: number;
  region: Region;
  tariff: Tariff;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    items: CartItemFromAPI[];
    total: number;
  };
}

// Static Orders API Types
export interface StaticOrderItem {
  id: number;
  region: Region;
  tariff: Tariff;
  quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
  remaining_days?: number;
  remaining_traffic?: number;
  usage?: number;
}

export interface StaticOrdersResponse {
  success: boolean;
  message: string;
  data: StaticOrderItem[];
}
