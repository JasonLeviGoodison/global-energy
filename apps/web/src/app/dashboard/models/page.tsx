"use client";

import { useState } from "react";
import { Plus, Server, Trash2 } from "lucide-react";
import { createButton, createText, createGlassCard, badgeStyles } from "@/lib/designSystem";
import { generateCodeSnippet } from "@/lib/codeSnippets";
import { Modal, Input, Select, Button, CodeBlock } from "@/components";
import { useModels, useModelCatalog, useDeployModel, useDeleteModel } from "@/hooks";
import type { DeployedModel, ModelCatalog } from "@/types";

export default function ModelsPage() {
  const { data: models = [], isLoading: modelsLoading } = useModels();
  const { data: catalog } = useModelCatalog();
  const deployModel = useDeployModel();
  const deleteModel = useDeleteModel();

  const [showDeployModal, setShowDeployModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<DeployedModel | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"javascript" | "go" | "bash">(
    "javascript"
  );
  const [newModelName, setNewModelName] = useState("");
  const [newModelProvider, setNewModelProvider] = useState("bedrock");
  const [newModelId, setNewModelId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setNewModelId(modelId);
    const allModels = [...(catalog?.bedrock || []), ...(catalog?.crusoe || [])];
    const selectedModelInfo = allModels.find((m) => m.id === modelId);
    if (selectedModelInfo && !newModelName) {
      setNewModelName(selectedModelInfo.name);
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    await deployModel.mutateAsync({
      name: newModelName,
      provider: newModelProvider,
      providerModelId: newModelId,
    });
    setShowDeployModal(false);
    setNewModelName("");
    setNewModelId("");
  };

  const handleDelete = async () => {
    if (!selectedModel) return;
    if (!confirm("Are you sure you want to delete this model? This action cannot be undone."))
      return;

    setIsDeleting(true);
    try {
      await deleteModel.mutateAsync(selectedModel.id);
      setSelectedModel(null);
    } catch (error) {
      console.error("Failed to delete model", error);
      alert("Failed to delete model");
    } finally {
      setIsDeleting(false);
    }
  };

  const getCodeSnippet = (model: DeployedModel, language: "javascript" | "go" | "bash") => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    return generateCodeSnippet(language, {
      modelId: model.id,
      apiUrl,
    });
  };

  if (modelsLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className={createText("body", "text-lg")}>Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h2 className={createText("eyebrow", "mb-2")}>INFRASTRUCTURE</h2>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={createText("heading", "text-2xl mb-2")}>Managed Inference</h1>
            <p className={createText("bodyMuted", "text-sm")}>
              Manage your AI model deployments across providers
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowDeployModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm"
          >
            <Plus size={16} />
            Deploy New Model
          </Button>
        </div>
      </div>

      <div className={createGlassCard("card", "overflow-hidden")}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>NAME</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>PROVIDER</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>MODEL ID</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>CREATED</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedModel(model)}
                >
                  <td className={createText("heading", "px-6 py-4 text-sm font-medium")}>
                    {model.name}
                  </td>
                  <td className={createText("body", "px-6 py-4 text-sm capitalize")}>
                    {model.provider}
                  </td>
                  <td className={createText("body", "px-6 py-4 text-sm font-mono")}>
                    {model.providerModelId}
                  </td>
                  <td className={createText("bodySecondary", "px-6 py-4 text-sm")}>
                    {new Date(model.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={badgeStyles.success}>Active</span>
                  </td>
                </tr>
              ))}
              {models.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Server size={56} className="mx-auto mb-4 text-slate-300" />
                    <p className={createText("bodyMuted")}>No models deployed yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showDeployModal} onClose={() => setShowDeployModal(false)}>
        <h3 className={createText("heading", "mb-6 text-2xl")}>Deploy New Model</h3>
        <form onSubmit={handleDeploy} className="space-y-6">
          <Select
            label="Provider"
            value={newModelProvider}
            onChange={(e) => {
              setNewModelProvider(e.target.value);
              setNewModelId("");
              setNewModelName("");
            }}
          >
            <option value="bedrock" className="bg-white">
              AWS Bedrock
            </option>
            <option value="crusoe" className="bg-white">
              Crusoe Cloud
            </option>
          </Select>

          <Select
            label="Model"
            value={newModelId}
            onChange={(e) => handleModelSelect(e.target.value)}
            required
          >
            <option value="" className="bg-white">
              Select a model...
            </option>
            {catalog &&
              catalog[newModelProvider as keyof ModelCatalog]?.map((model) => (
                <option key={model.id} value={model.id} className="bg-white">
                  {model.name} - {model.provider} ({model.contextLength.toLocaleString()} tokens)
                </option>
              ))}
          </Select>

          {newModelId && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className={createText("bodyMuted", "text-xs mb-2")}>Model Details</p>
              <p className={createText("body", "text-sm")}>
                {
                  catalog?.[newModelProvider as keyof ModelCatalog]?.find(
                    (m) => m.id === newModelId
                  )?.description
                }
              </p>
            </div>
          )}

          <Input
            label="Deployment Name"
            placeholder="My Production Model"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
            helperText="Give this deployment a friendly name for easy identification"
            required
          />
          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowDeployModal(false)}
              className="px-6 py-3"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="px-6 py-3">
              Deploy
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!selectedModel}
        onClose={() => {
          setSelectedModel(null);
          setSelectedLanguage("javascript");
        }}
        className="max-w-3xl"
      >
        {selectedModel && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={createText("heading", "text-2xl")}>{selectedModel.name}</h3>
                <span className={badgeStyles.success}>Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    Provider
                  </span>
                  <p className={createText("body", "mt-1")}>{selectedModel.provider}</p>
                </div>
                <div>
                  <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                    Deployed
                  </span>
                  <p className={createText("body", "mt-1")}>
                    {new Date(selectedModel.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <span className={createText("bodyMuted", "text-xs uppercase tracking-wider")}>
                  Model ID
                </span>
                <p className={createText("body", "mt-1 font-mono text-xs")}>
                  {selectedModel.providerModelId}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className={createText("eyebrow", "text-xs mb-4")}>IMPLEMENTATION CODE</p>

              <CodeBlock
                code={getCodeSnippet(selectedModel, selectedLanguage) || ""}
                language={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />

              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className={createText("body", "text-sm text-emerald-700")}>
                  <strong>Note:</strong> Replace YOUR_API_KEY with your actual API key. You can
                  create one in the API Keys section.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-3 flex items-center gap-2"
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Deployment
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedModel(null);
                  setSelectedLanguage("javascript");
                }}
                className="px-6 py-3"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
