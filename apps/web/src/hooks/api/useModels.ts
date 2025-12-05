"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../useApiClient";
import type { DeployedModel, ModelCatalog } from "@/types";

export function useModels() {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["models"],
    queryFn: () => apiClient.get<DeployedModel[]>("/models"),
  });
}

export function useModelCatalog() {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["modelCatalog"],
    queryFn: () => apiClient.get<ModelCatalog>("/models/catalog"),
    staleTime: 1000 * 60 * 60,
  });
}

export function useDeployModel() {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; provider: string; providerModelId: string }) =>
      apiClient.post("/models", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
}
