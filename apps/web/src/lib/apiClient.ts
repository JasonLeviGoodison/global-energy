const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type TokenGetter = () => Promise<string | null>;

export class ApiClient {
  private tokenGetter?: TokenGetter;

  setTokenGetter(getter: TokenGetter) {
    this.tokenGetter = getter;
  }

  private async fetchWithAuth(path: string, options: RequestInit = {}) {
    const token = this.tokenGetter ? await this.tokenGetter() : null;

    console.log("Making API request:", {
      path,
      method: options.method || "GET",
      hasToken: !!token,
    });

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const errorMessage =
        errorData?.error || errorData?.message || `Request failed with status ${res.status}`;
      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        path,
        errorData,
        body: options.body,
      });
      throw new Error(errorMessage);
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

  async getRaw(path: string): Promise<Response> {
    const token = this.tokenGetter ? await this.tokenGetter() : null;

    const headers: HeadersInit = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res;
  }
}

export const apiClient = new ApiClient();
