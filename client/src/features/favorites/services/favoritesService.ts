import { api } from "@/lib/api";

export interface Favorite {
  id: string;
  userId: string;
  restaurantId: string;
}

export const favoritesService = {
  async getMyFavorites(token: string): Promise<Favorite[]> {
    return api.get<Favorite[]>("/favorites", token);
  },

  async addFavorite(restaurantId: string, token: string): Promise<Favorite> {
    return api.post<Favorite>("/favorites", { restaurantId }, token);
  },

  async removeFavorite(restaurantId: string, token: string): Promise<void> {
    return api.delete<void>(`/favorites/${restaurantId}`, token);
  },
};
