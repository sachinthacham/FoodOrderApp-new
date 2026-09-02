import { api } from "@/lib/api";

export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  menuItemId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  restaurantId: string;
  menuItemId?: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  async getReviewsByRestaurant(restaurantId: string): Promise<Review[]> {
    return api.get<Review[]>(`/reviews/restaurant/${restaurantId}`);
  },

  async createReview(data: CreateReviewRequest, token: string): Promise<Review> {
    return api.post<Review>("/reviews", data, token);
  }
};
