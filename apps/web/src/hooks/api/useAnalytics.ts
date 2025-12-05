"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApiClient";
import type { OverviewAnalytics, ModelAnalytics } from "@/types";

export function useOverviewAnalytics(days: number = 30) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["analytics", "overview", days],
    queryFn: () => apiClient.get<OverviewAnalytics>(`/analytics/overview?days=${days}`),
    staleTime: 1000 * 60 * 5,
  });
}

export function useModelAnalytics(modelId: string | null, days: number = 30) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["analytics", "model", modelId, days],
    queryFn: () => apiClient.get<ModelAnalytics>(`/analytics/models/${modelId}?days=${days}`),
    enabled: !!modelId,
    staleTime: 1000 * 60 * 5,
  });
}
