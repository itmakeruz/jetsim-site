// Region Category Types
export interface Region {
  id: number;
  name: string;
  image: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  tariffs: Tariff[];
}

export interface RegionCategory {
  id: number;
  name: string;
  icon: string;
  regions: Region[];
  created_at: string;
}

export interface RegionCategoryResponse {
  success: boolean;
  message: string;
  data: RegionCategory[];
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
}

export interface TariffResponse {
  success: boolean;
  message: string;
  data: Tariff[];
  meta: {
    totalPage: number;
    totalSize: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalItems: number;
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
