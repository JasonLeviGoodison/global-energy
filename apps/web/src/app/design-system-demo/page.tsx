"use client";

import { useState } from "react";
import { GlassCard, Button, Text, Badge, Input, Select, Modal } from "@/components";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { navStyles } from "@/lib/designSystem";
import Link from "next/link";

export default function DesignSystemDemo() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("option1");

  return (
    <div className="min-h-screen text-slate-900">
      <nav className={navStyles.glass}>
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <span className="font-bold text-white text-lg">N</span>
            </div>
            <h1 className="text-xl font-semibold">Design System Demo</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary" className="px-4 py-2 text-sm">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto p-6 lg:p-8 space-y-12">
        <div className="text-center py-12">
          <Text variant="eyebrow" className="mb-4">
            PROFESSIONAL LIGHT GLASS
          </Text>
          <Text variant="heading" as="h1" className="text-5xl mb-4">
            Design System Showcase
          </Text>
          <Text variant="bodySecondary" className="text-lg max-w-2xl mx-auto">
            A comprehensive collection of all components and styles in the Professional Light Glass
            design system.
          </Text>
        </div>

        <section>
          <Text variant="eyebrow" className="mb-4">
            TYPOGRAPHY
          </Text>
          <GlassCard variant="card" className="p-8 space-y-6">
            <div>
              <Text variant="heading" as="h1" className="text-4xl mb-2">
                Heading 1 - 4xl
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                text-4xl font-semibold text-white
              </Text>
            </div>
            <div>
              <Text variant="heading" as="h2" className="text-3xl mb-2">
                Heading 2 - 3xl
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                text-3xl font-semibold text-white
              </Text>
            </div>
            <div>
              <Text variant="heading" as="h3" className="text-2xl mb-2">
                Heading 3 - 2xl
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                text-2xl font-semibold text-white
              </Text>
            </div>
            <div>
              <Text variant="eyebrow">EYEBROW LABEL</Text>
              <Text variant="bodyMuted" className="text-sm mt-2">
                text-sm uppercase tracking-[0.2em] text-white/60
              </Text>
            </div>
            <div>
              <Text variant="body" className="mb-1">
                Body text - 100% opacity
              </Text>
              <Text variant="bodySecondary" className="mb-1">
                Secondary text - 80% opacity
              </Text>
              <Text variant="bodyMuted">Muted text - 60% opacity</Text>
            </div>
          </GlassCard>
        </section>

        <section>
          <Text variant="eyebrow" className="mb-4">
            BUTTONS
          </Text>
          <GlassCard variant="card" className="p-8 space-y-6">
            <div>
              <Text variant="bodyMuted" className="text-sm mb-3">
                Primary Buttons
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" className="px-6 py-3">
                  Default
                </Button>
                <Button variant="primary" className="px-6 py-3 flex items-center gap-2">
                  With Icon <ArrowRight size={18} />
                </Button>
                <Button variant="primary" className="px-4 py-2 text-sm">
                  Small
                </Button>
              </div>
            </div>
            <div>
              <Text variant="bodyMuted" className="text-sm mb-3">
                Secondary Buttons
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="px-6 py-3">
                  Default
                </Button>
                <Button variant="secondary" className="px-6 py-3 flex items-center gap-2">
                  With Icon <Check size={18} />
                </Button>
                <Button variant="secondary" className="px-4 py-2 text-sm">
                  Small
                </Button>
              </div>
            </div>
            <div>
              <Text variant="bodyMuted" className="text-sm mb-3">
                Accent Buttons
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="accent" className="px-6 py-3">
                  Upgrade Now
                </Button>
                <Button variant="accent" className="px-6 py-3 flex items-center gap-2">
                  <Sparkles size={18} /> Premium
                </Button>
              </div>
            </div>
          </GlassCard>
        </section>

        <section>
          <Text variant="eyebrow" className="mb-4">
            GLASS CARDS
          </Text>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassCard variant="standard" className="p-6">
              <Text variant="heading" className="text-lg mb-2">
                Standard Glass
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                bg-white/5 with backdrop-blur-md
              </Text>
            </GlassCard>
            <GlassCard variant="highBlur" className="p-6">
              <Text variant="heading" className="text-lg mb-2">
                High Blur
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                bg-white/5 with backdrop-blur-[40px]
              </Text>
            </GlassCard>
            <GlassCard variant="accent" className="p-6">
              <Text variant="heading" className="text-lg mb-2">
                Accent Glass
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                Emerald-cyan gradient background
              </Text>
            </GlassCard>
            <GlassCard variant="card" withReflection className="p-6">
              <Text variant="heading" className="text-lg mb-2">
                With Reflection
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                Hover to see reflection effect
              </Text>
            </GlassCard>
            <GlassCard variant="card" withHover className="p-6">
              <Text variant="heading" className="text-lg mb-2">
                With Hover Scale
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                Hover to see scale effect
              </Text>
            </GlassCard>
            <GlassCard variant="card" withReflection withHover className="p-6">
              <Text variant="heading" className="text-lg mb-2">
                Combined Effects
              </Text>
              <Text variant="bodyMuted" className="text-sm">
                Both reflection and scale
              </Text>
            </GlassCard>
          </div>
        </section>

        <section>
          <Text variant="eyebrow" className="mb-4">
            BADGES
          </Text>
          <GlassCard variant="card" className="p-8">
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">Active</Badge>
              <Badge variant="success">Completed</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="info">New</Badge>
            </div>
          </GlassCard>
        </section>

        <section>
          <Text variant="eyebrow" className="mb-4">
            FORM CONTROLS
          </Text>
          <GlassCard variant="card" className="p-8 space-y-6">
            <Input
              label="Email Address"
              placeholder="you@example.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="We'll never share your email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error="Password must be at least 8 characters"
            />
            <Select
              label="Cloud Provider"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              helperText="Choose your preferred cloud provider"
            >
              <option value="option1" className="bg-white">
                AWS Bedrock
              </option>
              <option value="option2" className="bg-white">
                Crusoe Cloud
              </option>
              <option value="option3" className="bg-white">
                Google Cloud
              </option>
            </Select>
          </GlassCard>
        </section>

        <section>
          <Text variant="eyebrow" className="mb-4">
            MODAL
          </Text>
          <GlassCard variant="card" className="p-8">
            <Button variant="primary" className="px-6 py-3" onClick={() => setShowModal(true)}>
              Open Modal
            </Button>
          </GlassCard>
        </section>

        <section>
          <Text variant="eyebrow" className="mb-4">
            COLOR PALETTE
          </Text>
          <GlassCard variant="card" className="p-8 space-y-6">
            <div>
              <Text variant="bodyMuted" className="text-sm mb-3">
                Brand Accents
              </Text>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="h-20 rounded-2xl bg-emerald-500 mb-2"></div>
                  <Text variant="bodyMuted" className="text-xs">
                    Emerald-500
                  </Text>
                </div>
                <div>
                  <div className="h-20 rounded-2xl bg-cyan-500 mb-2"></div>
                  <Text variant="bodyMuted" className="text-xs">
                    Cyan-500
                  </Text>
                </div>
                <div>
                  <div className="h-20 rounded-2xl bg-teal-500 mb-2"></div>
                  <Text variant="bodyMuted" className="text-xs">
                    Teal-500
                  </Text>
                </div>
              </div>
            </div>
            <div>
              <Text variant="bodyMuted" className="text-sm mb-3">
                Gradient Example
              </Text>
              <div className="h-20 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-emerald-400/20 to-cyan-500/20 border border-emerald-400/30"></div>
            </div>
          </GlassCard>
        </section>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Text variant="heading" as="h3" className="text-2xl mb-4">
          Example Modal
        </Text>
        <Text variant="bodySecondary" className="mb-6">
          This is a modal with the Deep Ocean Glassmorphism design. It features high blur backdrop
          and proper glass styling.
        </Text>
        <div className="space-y-4">
          <Input label="Your Name" placeholder="Enter your name" />
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" className="px-6 py-3" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="px-6 py-3" onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
