"use client";

import { useUser } from "@clerk/nextjs";
import { Plus, Box } from "lucide-react";
import { createText, createGlassCard } from "@/lib/designSystem";
import { Button } from "@/components";

export default function InstancesPage() {
  const { isLoaded } = useUser();

  if (!isLoaded)
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
            <h1 className={createText("heading", "text-4xl mb-2")}>Virtual Machines</h1>
            <p className={createText("bodyMuted", "text-lg")}>
              Create and manage one-off virtual machine instances
            </p>
          </div>
          <Button
            variant="primary"
            disabled
            className="flex items-center gap-2 px-6 py-3 opacity-50 cursor-not-allowed"
          >
            <Plus size={18} />
            Create Instance
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div
          className={createGlassCard(
            "card",
            "col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-white/20"
          )}
        >
          <Box size={56} className="mb-4 text-white/20" />
          <p className={createText("heading", "mb-2")}>Coming Soon</p>
          <p className={createText("bodyMuted")}>
            One-off VM instances will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}


