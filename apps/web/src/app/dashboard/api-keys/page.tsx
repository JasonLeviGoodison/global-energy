"use client";

import { useEffect, useState } from "react";
import { useApi as useApiClient } from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import { Plus, Key, Eye, EyeOff, Copy, Check, AlertTriangle } from "lucide-react";
import { createText, createGlassCard, badgeStyles } from "@/lib/designSystem";
import { Button, Modal, Input } from "@/components";

type ApiKey = {
  id: string;
  key: string;
  createdAt: string;
  isActive: boolean;
};

export default function ApiKeysPage() {
  const { user, isLoaded } = useUser();
  const api = useApiClient();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchApiKeys();
  }, [isLoaded, user]);

  const fetchApiKeys = async () => {
    const data = await api.get("/api-keys");
    setApiKeys(data);
  };

  const handleCreateKey = async () => {
    const data = await api.post("/api-keys", {});
    setNewlyCreatedKey(data.key);
    fetchApiKeys();
  };

  const toggleVisibility = (id: string) => {
    const newSet = new Set(visibleKeys);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setVisibleKeys(newSet);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewlyCreatedKey(null);
    setIsCopied(false);
  };

  if (!isLoaded)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className={createText("body", "text-lg")}>Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h2 className={createText("eyebrow", "mb-2")}>SECURITY</h2>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={createText("heading", "text-2xl mb-2")}>API Keys</h1>
            <p className={createText("bodyMuted", "text-sm")}>
              Manage your API keys for secure access to your models
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm"
          >
            <Plus size={16} />
            Create New Key
          </Button>
        </div>
      </div>

      <div className={createGlassCard("card", "overflow-hidden")}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>KEY</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>CREATED</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr
                  key={key.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-slate-900">
                    <div className="flex items-center gap-3">
                      <span>{visibleKeys.has(key.id) ? key.key : "sk_live_" + "•".repeat(24)}</span>
                      <button
                        onClick={() => toggleVisibility(key.id)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {visibleKeys.has(key.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </td>
                  <td
                    className={createText("bodySecondary", "whitespace-nowrap px-6 py-4 text-sm")}
                  >
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={key.isActive ? badgeStyles.success : badgeStyles.warning}>
                      {key.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {apiKeys.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center">
                    <Key size={56} className="mx-auto mb-4 text-slate-300" />
                    <p className={createText("bodyMuted")}>
                      No API keys found. Create one to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
        {!newlyCreatedKey ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mb-4 mx-auto">
              <Key className="text-emerald-500" size={24} />
            </div>
            <div className="text-center">
              <h3 className={createText("heading", "text-xl mb-2")}>Create new API key</h3>
              <p className={createText("bodyMuted")}>
                This will generate a new secret key for accessing the API.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={closeCreateModal} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateKey} className="flex-1">
                Create secret key
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mb-4 mx-auto">
              <Check className="text-emerald-500" size={24} />
            </div>
            <div className="text-center">
              <h3 className={createText("heading", "text-xl mb-2")}>API Key Created</h3>
              <p className={createText("bodyMuted", "mb-4")}>
                Please save this secret key somewhere safe and accessible. For security reasons, you
                won&apos;t be able to view it again through your account.
              </p>
            </div>

            <div className="relative">
              <div className="w-full bg-slate-100 border border-slate-200 rounded-xl p-4 pr-12 font-mono text-sm text-slate-900 break-all">
                {newlyCreatedKey}
              </div>
              <button
                onClick={() => copyToClipboard(newlyCreatedKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="text-amber-600 shrink-0" size={20} />
              <p className="text-sm text-amber-700">
                If you lose this key, you will need to generate a new one.
              </p>
            </div>

            <Button variant="primary" onClick={closeCreateModal} className="w-full">
              Done
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
