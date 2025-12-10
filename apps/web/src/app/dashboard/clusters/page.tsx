"use client";

import { useState } from "react";
import { Plus, Container, Trash2, Download, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { createText, createGlassCard, badgeStyles } from "@/lib/designSystem";
import { Modal, Input, Select, Button } from "@/components";
import {
  useClusters,
  useClusterOptions,
  useCreateCluster,
  useDeleteCluster,
  useDownloadKubeconfig,
} from "@/hooks";
import type { Cluster, ClusterStatus } from "@/types";

const statusConfig: Record<ClusterStatus, { label: string; className: string; icon?: typeof CheckCircle }> = {
  provisioning: { label: "Provisioning", className: badgeStyles.warning, icon: RefreshCw },
  ready: { label: "Ready", className: badgeStyles.success, icon: CheckCircle },
  degraded: { label: "Degraded", className: badgeStyles.danger, icon: AlertCircle },
  deleting: { label: "Deleting", className: badgeStyles.warning, icon: RefreshCw },
  deleted: { label: "Deleted", className: badgeStyles.secondary },
  failed: { label: "Failed", className: badgeStyles.danger, icon: AlertCircle },
};

export default function ClustersPage() {
  const { data: clusters = [], isLoading, refetch } = useClusters();
  const { data: options } = useClusterOptions();
  const createCluster = useCreateCluster();
  const deleteCluster = useDeleteCluster();
  const downloadKubeconfig = useDownloadKubeconfig();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [newClusterName, setNewClusterName] = useState("");
  const [newK8sVersion, setNewK8sVersion] = useState("1.31");
  const [newWorkerCount, setNewWorkerCount] = useState(1);
  const [newGpuType, setNewGpuType] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCluster.mutateAsync({
      name: newClusterName,
      k8sVersion: newK8sVersion,
      workerNodeCount: newWorkerCount,
      gpuType: newGpuType || undefined,
    });
    setShowCreateModal(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!selectedCluster) return;
    if (!confirm("Are you sure you want to delete this cluster? This action cannot be undone.")) return;

    setIsDeleting(true);
    await deleteCluster.mutateAsync(selectedCluster.id);
    setSelectedCluster(null);
    setIsDeleting(false);
  };

  const handleDownloadKubeconfig = async () => {
    if (!selectedCluster) return;
    await downloadKubeconfig.mutateAsync(selectedCluster.id);
  };

  const resetForm = () => {
    setNewClusterName("");
    setNewK8sVersion("1.31");
    setNewWorkerCount(1);
    setNewGpuType("");
  };

  const StatusBadge = ({ status }: { status: ClusterStatus }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`${config.className} flex items-center gap-1.5`}>
        {Icon && <Icon size={12} className={status === "provisioning" || status === "deleting" ? "animate-spin" : ""} />}
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className={createText("body", "text-lg")}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h2 className={createText("eyebrow", "mb-2")}>INFRASTRUCTURE</h2>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={createText("heading", "text-2xl mb-2")}>Managed Kubernetes</h1>
            <p className={createText("bodyMuted", "text-sm")}>
              Provision and manage Kubernetes clusters with GPU support
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Plus size={16} />
              Create Cluster
            </Button>
          </div>
        </div>
      </div>

      <div className={createGlassCard("card", "overflow-hidden")}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>NAME</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>VERSION</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>WORKERS</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>GPU TYPE</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>ENDPOINT</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {clusters.map((cluster) => (
                <tr
                  key={cluster.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedCluster(cluster)}
                >
                  <td className={createText("heading", "px-6 py-4 text-sm font-medium")}>
                    {cluster.name}
                  </td>
                  <td className={createText("body", "px-6 py-4 text-sm font-mono")}>
                    v{cluster.k8sVersion}
                  </td>
                  <td className={createText("body", "px-6 py-4 text-sm")}>
                    {cluster.workerNodeCount} nodes
                  </td>
                  <td className={createText("body", "px-6 py-4 text-sm")}>
                    {cluster.gpuType || "—"}
                  </td>
                  <td className={createText("body", "px-6 py-4 text-sm font-mono text-xs")}>
                    {cluster.apiServerEndpoint ? (
                      <span className="truncate block max-w-[200px]" title={cluster.apiServerEndpoint}>
                        {cluster.apiServerEndpoint}
                      </span>
                    ) : (
                      <span className="text-slate-400">Pending...</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={cluster.status} />
                  </td>
                </tr>
              ))}
              {clusters.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <Container size={56} className="mx-auto mb-4 text-slate-300" />
                    <p className={createText("bodyMuted")}>No clusters yet.</p>
                    <p className={createText("bodyMuted", "text-sm mt-2")}>
                      Create your first Kubernetes cluster to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={createGlassCard("card", "mt-8 p-6")}>
        <h3 className={createText("heading", "text-lg mb-4")}>Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className={createText("eyebrow", "text-xs mb-2")}>CONTROL PLANE</p>
            <p className={createText("heading", "text-2xl")}>$0.10<span className="text-sm font-normal text-slate-500">/hour</span></p>
            <p className={createText("bodyMuted", "text-xs mt-2")}>Managed API server, etcd, scheduler</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className={createText("eyebrow", "text-xs mb-2")}>H100 GPU NODE</p>
            <p className={createText("heading", "text-2xl")}>$3.99<span className="text-sm font-normal text-slate-500">/hour</span></p>
            <p className={createText("bodyMuted", "text-xs mt-2")}>Per GPU worker node</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className={createText("eyebrow", "text-xs mb-2")}>A100 GPU NODE</p>
            <p className={createText("heading", "text-2xl")}>$2.49<span className="text-sm font-normal text-slate-500">/hour</span></p>
            <p className={createText("bodyMuted", "text-xs mt-2")}>Per GPU worker node</p>
          </div>
        </div>
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <h3 className={createText("heading", "mb-6 text-2xl")}>Create Kubernetes Cluster</h3>
        <form onSubmit={handleCreate} className="space-y-6">
          <Input
            label="Cluster Name"
            placeholder="my-production-cluster"
            value={newClusterName}
            onChange={(e) => setNewClusterName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
            helperText="Lowercase alphanumeric with hyphens only"
            required
          />

          <Select
            label="Kubernetes Version"
            value={newK8sVersion}
            onChange={(e) => setNewK8sVersion(e.target.value)}
          >
            {(options?.k8sVersions || ["1.31", "1.32", "1.33"]).map((version) => (
              <option key={version} value={version} className="bg-white">
                v{version}
              </option>
            ))}
          </Select>

          <div>
            <label className={createText("body", "block text-sm font-medium mb-2")}>
              Worker Nodes
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="20"
                value={newWorkerCount}
                onChange={(e) => setNewWorkerCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className={createText("heading", "w-12 text-center text-lg")}>{newWorkerCount}</span>
            </div>
            <p className={createText("bodyMuted", "text-xs mt-2")}>
              Number of GPU worker nodes to provision
            </p>
          </div>

          <Select
            label="GPU Type (Optional)"
            value={newGpuType}
            onChange={(e) => setNewGpuType(e.target.value)}
          >
            <option value="" className="bg-white">
              No GPU preference
            </option>
            {(options?.gpuTypes || ["nvidia-h100", "nvidia-a100", "nvidia-l40s"]).map((gpu) => (
              <option key={gpu} value={gpu} className="bg-white">
                {gpu.replace("nvidia-", "NVIDIA ").toUpperCase()}
              </option>
            ))}
          </Select>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className={createText("body", "text-sm text-emerald-700")}>
              <strong>Estimated Cost:</strong> ~${(0.10 + newWorkerCount * 2.49).toFixed(2)}/hour
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowCreateModal(false);
                resetForm();
              }}
              className="px-6 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-6 py-3"
              disabled={createCluster.isPending}
            >
              {createCluster.isPending ? "Creating..." : "Create Cluster"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!selectedCluster}
        onClose={() => setSelectedCluster(null)}
        className="max-w-2xl"
      >
        {selectedCluster && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={createText("heading", "text-2xl")}>{selectedCluster.name}</h3>
                <StatusBadge status={selectedCluster.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    Kubernetes Version
                  </span>
                  <p className={createText("body", "mt-1 font-mono")}>v{selectedCluster.k8sVersion}</p>
                </div>
                <div>
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    Worker Nodes
                  </span>
                  <p className={createText("body", "mt-1")}>{selectedCluster.workerNodeCount}</p>
                </div>
                <div>
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    GPU Type
                  </span>
                  <p className={createText("body", "mt-1")}>{selectedCluster.gpuType || "Not specified"}</p>
                </div>
                <div>
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    Created
                  </span>
                  <p className={createText("body", "mt-1")}>
                    {new Date(selectedCluster.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedCluster.apiServerEndpoint && (
                <div className="mb-6">
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    API Server Endpoint
                  </span>
                  <p className={createText("body", "mt-1 font-mono text-xs break-all")}>
                    {selectedCluster.apiServerEndpoint}
                  </p>
                </div>
              )}
            </div>

            {selectedCluster.status === "ready" && (
              <div className="border-t border-slate-200 pt-6 mb-6">
                <p className={createText("eyebrow", "text-xs mb-4")}>QUICK START</p>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto">
                  <p className="text-slate-400"># Download kubeconfig and set context</p>
                  <p className="mt-2">export KUBECONFIG=~/Downloads/{selectedCluster.id}-kubeconfig.yaml</p>
                  <p className="mt-2">kubectl get nodes</p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting || selectedCluster.status === "deleting"}
                className="px-6 py-3 flex items-center gap-2"
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Cluster
                  </>
                )}
              </Button>
              <div className="flex gap-3">
                {selectedCluster.status === "ready" && (
                  <Button
                    variant="secondary"
                    onClick={handleDownloadKubeconfig}
                    disabled={downloadKubeconfig.isPending}
                    className="px-6 py-3 flex items-center gap-2"
                  >
                    <Download size={18} />
                    {downloadKubeconfig.isPending ? "Downloading..." : "Download kubeconfig"}
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() => setSelectedCluster(null)}
                  className="px-6 py-3"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}



