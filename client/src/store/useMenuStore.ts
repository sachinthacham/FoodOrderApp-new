// src/store/useMenuStore.ts
import { create } from "zustand";

type MenuState = {
  selectedCategory: string | null;
  setCategory: (category: string | null) => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  selectedCategory: null,
  setCategory: (category) => set({ selectedCategory: category }),
}));
