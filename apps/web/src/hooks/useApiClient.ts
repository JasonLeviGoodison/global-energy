"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { apiClient } from "@/lib/apiClient";

export function useApiClient() {
  const { getToken } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      const token = await getToken();
      apiClient.setToken(token);
    };

    updateToken();
  }, [getToken]);

  return apiClient;
}
