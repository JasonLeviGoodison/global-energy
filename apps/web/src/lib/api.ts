"use client";

import { useAuth } from "@clerk/nextjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * @deprecated Use React Query hooks from @/hooks instead
 *
 * Migration guide:
 * - useApi().get() -> useQuery with custom hooks (useModels, useApiKeys, etc.)
 * - useApi().post() -> useMutation with custom hooks (useDeployModel, useCreateApiKey, etc.)
 *
 * Benefits of React Query:
 * - Automatic caching and refetching
 * - Loading and error states
 * - Optimistic updates
 * - Request deduplication
 */
export function useApi() {
  const { getToken } = useAuth();

  const fetchWithAuth = async (path: string, options: RequestInit = {}) => {
    const token = await getToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
  };

  return {
    get: (path: string) => fetchWithAuth(path, { method: "GET" }),
    post: (path: string, body: any) =>
      fetchWithAuth(path, { method: "POST", body: JSON.stringify(body) }),
  };
}
