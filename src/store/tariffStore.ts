import { create } from "zustand";
import type { Tariff } from "@/types/api";

interface TariffStore {
  selectedTariff: Tariff | null;
  setSelectedTariff: (tariff: Tariff | null) => void;
  selectedTariffs: Tariff[];
  setSelectedTariffs: (tariffs: Tariff[]) => void;
}

export const useTariffStore = create<TariffStore>((set) => ({
  selectedTariffs: [],
  setSelectedTariffs: (tariffs) =>
    set({
      selectedTariffs: tariffs,
    }),
  selectedTariff: null,
  setSelectedTariff: (tariff) =>
    set({
      selectedTariff: tariff,
    }),
}));
