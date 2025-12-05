"use client";

import { useEffect, useState } from "react";
import { useApi as useApiClient } from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import { Plus, Key } from "lucide-react";
import { createText, createGlassCard, badgeStyles } from "@/lib/designSystem";
import { Button } from "@/components";

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

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchApiKeys();
  }, [isLoaded, user]);

  const fetchApiKeys = async () => {
    const data = await api.get("/api-keys");
    setApiKeys(data);
  };

  const handleCreateKey = async () => {
    await api.post("/api-keys", {});
    fetchApiKeys();
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
            <h1 className={createText("heading", "text-4xl mb-2")}>API Keys</h1>
            <p className={createText("bodyMuted", "text-lg")}>
              Manage your API keys for secure access to your models
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleCreateKey}
            className="flex items-center gap-2 px-6 py-3"
          >
            <Plus size={18} />
            Create New Key
          </Button>
        </div>
      </div>

      <div className={createGlassCard("card", "overflow-hidden")}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>KEY</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>CREATED</th>
                <th className={createText("eyebrow", "px-6 py-4 text-left text-xs")}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr
                  key={key.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-white">
                    {key.key}
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
                    <Key size={56} className="mx-auto mb-4 text-white/20" />
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
    </div>
  );
}
