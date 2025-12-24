const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5182";

export class ApiError extends Error {
  public status: number;
  public errors: any;

  constructor(message: string, status: number, errors: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let errorData: any = { message: "An error occurred" };

    if (contentType?.includes("application/json")) {
      errorData = await response.json();
    } else {
      errorData.message = (await response.text()) || errorData.message;
    }

    throw new ApiError(
      errorData.title || errorData.message || "Request failed",
      response.status,
      errorData.errors || errorData
    );
  }

  return response.json();
}

export const api = {
  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    return handleResponse<T>(response);
  },
};
