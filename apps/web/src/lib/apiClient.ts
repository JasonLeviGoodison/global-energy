const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface ApiClientConfig {
  token?: string | null;
}

export class ApiClient {
  private token?: string | null;

  constructor(config?: ApiClientConfig) {
    this.token = config?.token;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async fetchWithAuth(path: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  async get<T = any>(path: string): Promise<T> {
    return this.fetchWithAuth(path, { method: "GET" });
  }

  async post<T = any>(path: string, body?: any): Promise<T> {
    return this.fetchWithAuth(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T = any>(path: string, body?: any): Promise<T> {
    return this.fetchWithAuth(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T = any>(path: string): Promise<T> {
    return this.fetchWithAuth(path, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
