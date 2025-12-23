import { create } from "zustand";
import type { Myesim } from "@/types/api";

interface SimcardStore {
  myesims: Myesim[];
  setMyesims: (myesims: Myesim[]) => void;
}

export const useSimcardStore = create<SimcardStore>((set) => ({
  myesims: [],
  setMyesims: (myesims) => set({ myesims }),
}));
