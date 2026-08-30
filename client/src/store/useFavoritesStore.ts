import { create } from "zustand";
import { favoritesService } from "@/features/favorites/services/favoritesService";
import { toast } from "./useToastStore";

interface FavoritesState {
  restaurantIds: Set<string>;
  isLoaded: boolean;
  loadFavorites: (token: string) => Promise<void>;
  toggleFavorite: (restaurantId: string, token: string) => Promise<void>;
  isFavorite: (restaurantId: string) => boolean;
  reset: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  restaurantIds: new Set(),
  isLoaded: false,

  loadFavorites: async (token: string) => {
    try {
      const favorites = await favoritesService.getMyFavorites(token);
      set({
        restaurantIds: new Set(favorites.map((f) => f.restaurantId)),
        isLoaded: true,
      });
    } catch {
      set({ isLoaded: true });
    }
  },

  isFavorite: (restaurantId: string) => get().restaurantIds.has(restaurantId),

  toggleFavorite: async (restaurantId: string, token: string) => {
    const current = get().restaurantIds;
    const wasFavorite = current.has(restaurantId);

    // Optimistic update
    const next = new Set(current);
    if (wasFavorite) {
      next.delete(restaurantId);
    } else {
      next.add(restaurantId);
    }
    set({ restaurantIds: next });

    try {
      if (wasFavorite) {
        await favoritesService.removeFavorite(restaurantId, token);
        toast.info("Removed from favorites");
      } else {
        await favoritesService.addFavorite(restaurantId, token);
        toast.success("Added to favorites");
      }
    } catch (err: any) {
      // Revert on failure
      set({ restaurantIds: current });
      toast.error(err.message || "Failed to update favorites");
    }
  },

  reset: () => set({ restaurantIds: new Set(), isLoaded: false }),
}));
