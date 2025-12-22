import { api } from "@/lib/api";

export interface CreateCheckoutSessionRequest {
  restaurantId: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
  orderId: string;
}

export interface SessionStatusResponse {
  status: string;
  paymentStatus: string;
  customerEmail?: string;
}

export const paymentService = {
  async createCheckoutSession(
    data: CreateCheckoutSessionRequest,
    token: string
  ): Promise<CreateCheckoutSessionResponse> {
    return api.post<CreateCheckoutSessionResponse>(
      "/payment/create-checkout-session",
      data,
      token
    );
  },

  async getSessionStatus(
    sessionId: string,
    token: string
  ): Promise<SessionStatusResponse> {
    return api.get<SessionStatusResponse>(
      `/payment/session-status?sessionId=${sessionId}`,
      token
    );
  },
};

