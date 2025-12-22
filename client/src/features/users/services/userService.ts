import { api } from "@/lib/api";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const userService = {
  async getAll(token: string): Promise<User[]> {
    return api.get<User[]>("/users", token);
  },
};

