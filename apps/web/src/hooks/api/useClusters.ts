"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../useApiClient";
import type { Cluster, ClusterOptions, CreateClusterInput } from "@/types";

export function useClusters() {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["clusters"],
    queryFn: () => apiClient.get<Cluster[]>("/clusters"),
  });
}

export function useCluster(id: string) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["clusters", id],
    queryFn: () => apiClient.get<Cluster>(`/clusters/${id}`),
    enabled: !!id,
  });
}

export function useClusterOptions() {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["clusterOptions"],
    queryFn: () => apiClient.get<ClusterOptions>("/clusters/options"),
    staleTime: 1000 * 60 * 60,
  });
}

export function useCreateCluster() {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClusterInput) => apiClient.post<Cluster>("/clusters", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clusters"] });
    },
  });
}

export function useDeleteCluster() {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clusterId: string) => apiClient.delete(`/clusters/${clusterId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clusters"] });
    },
  });
}

export function useDownloadKubeconfig() {
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (clusterId: string) => {
      const response = await apiClient.getRaw(`/clusters/${clusterId}/kubeconfig`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${clusterId}-kubeconfig.yaml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
  });
}



