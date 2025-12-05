"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Server } from "lucide-react";
import { navStyles, createButton, createText, createGlassCard } from "@/lib/designSystem";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col text-white">
      <nav className={navStyles.glass}>
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
              <span className="font-bold text-white text-lg">N</span>
            </div>
            <h1 className={createText("heading", "text-xl")}>NeoCloud</h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className={createButton("secondary", "px-4 py-2 text-sm")}>Sign In</button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className={createButton("primary", "px-4 py-2 text-sm")}>
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <button className={createButton("primary", "px-4 py-2 text-sm")}>
                  Go to Dashboard
                </button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 max-w-5xl">
          <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-7xl">
            The Infrastructure for{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              AI Native
            </span>{" "}
            Applications
          </h1>
          <p className={createText("bodySecondary", "mb-10 max-w-2xl mx-auto text-xl")}>
            Deploy models, manage API keys, and track usage across multiple providers with a single
            unified API.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className={createButton(
                  "primary",
                  "flex items-center justify-center gap-2 px-8 py-4 text-base"
                )}
              >
                Start Building <ArrowRight size={20} />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button
                className={createButton(
                  "primary",
                  "flex items-center justify-center gap-2 px-8 py-4 text-base"
                )}
              >
                Go to Dashboard <ArrowRight size={20} />
              </button>
            </Link>
          </SignedIn>
        </div>

        <div className="mt-32 grid max-w-6xl gap-6 sm:grid-cols-3">
          <div
            className={createGlassCard(
              "card",
              "flex flex-col items-center p-8 glass-reflection transition-all hover:scale-105"
            )}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/30">
              <Server size={32} className="text-blue-300" />
            </div>
            <h3 className={createText("heading", "mb-3 text-xl")}>Multi-Provider</h3>
            <p className={createText("bodyMuted", "text-sm leading-relaxed")}>
              Seamlessly switch between AWS Bedrock, Crusoe, and other providers without changing
              your code.
            </p>
          </div>

          <div
            className={createGlassCard(
              "card",
              "flex flex-col items-center p-8 glass-reflection transition-all hover:scale-105"
            )}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border border-emerald-400/30">
              <Shield size={32} className="text-emerald-300" />
            </div>
            <h3 className={createText("heading", "mb-3 text-xl")}>Secure Access</h3>
            <p className={createText("bodyMuted", "text-sm leading-relaxed")}>
              Enterprise-grade API key management and organization-level security controls.
            </p>
          </div>

          <div
            className={createGlassCard(
              "card",
              "flex flex-col items-center p-8 glass-reflection transition-all hover:scale-105"
            )}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 border border-cyan-400/30">
              <Zap size={32} className="text-cyan-300" />
            </div>
            <h3 className={createText("heading", "mb-3 text-xl")}>Real-time Analytics</h3>
            <p className={createText("bodyMuted", "text-sm leading-relaxed")}>
              Track token usage, costs, and latency across all your deployed models in real-time.
            </p>
          </div>
        </div>
      </main>

      <footer
        className={createGlassCard(
          "card",
          "border-t border-white/10 py-8 text-center rounded-none"
        )}
      >
        <p className={createText("bodyMuted", "text-sm")}>
          &copy; {new Date().getFullYear()} NeoCloud Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
