import { create } from "zustand";
import type { ActiveSim } from "@/types/api";

interface SimcardStore {
  activeSims: ActiveSim[];
  inactiveSims: ActiveSim[];
  setActiveSims: (activeSims: ActiveSim[]) => void;
  setInactiveSims: (inactiveSims: ActiveSim[]) => void;
}

export const useSimcardStore = create<SimcardStore>((set, get) => ({
  activeSims: [],
  inactiveSims: [],
  setActiveSims: (activeSims) => set({ activeSims }),
  setInactiveSims: (inactiveSims) => set({ inactiveSims }),
}));
