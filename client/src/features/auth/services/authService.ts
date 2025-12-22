import { api } from "@/lib/api";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
}

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role || "Buyer",
    });
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/login", {
      email: data.email,
      password: data.password,
    });
  },
};
