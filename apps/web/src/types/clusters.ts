export type ClusterStatus =
  | "provisioning"
  | "ready"
  | "degraded"
  | "deleting"
  | "deleted"
  | "failed";

export type Cluster = {
  id: string;
  name: string;
  status: ClusterStatus;
  k8sVersion: string;
  workerNodeCount: number;
  gpuType?: string;
  apiServerEndpoint?: string;
  createdAt: string;
  deletedAt?: string;
};

export type ClusterOptions = {
  k8sVersions: string[];
  gpuTypes: string[];
};

export type CreateClusterInput = {
  name: string;
  k8sVersion: string;
  workerNodeCount: number;
  gpuType?: string;
};



