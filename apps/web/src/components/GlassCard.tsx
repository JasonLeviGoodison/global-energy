import { ReactNode } from "react";
import { createGlassCard } from "@/lib/designSystem";

type GlassCardProps = {
  children: ReactNode;
  variant?: "standard" | "highBlur" | "accent" | "card" | "modal";
  className?: string;
  withReflection?: boolean;
  withHover?: boolean;
};

export function GlassCard({
  children,
  variant = "standard",
  className,
  withReflection = false,
  withHover = false,
}: GlassCardProps) {
  const baseClasses = createGlassCard(variant, className);
  const reflectionClass = withReflection ? "glass-reflection" : "";
  const hoverClass = withHover ? "transition-all hover:scale-[1.02]" : "";

  return <div className={`${baseClasses} ${reflectionClass} ${hoverClass}`.trim()}>{children}</div>;
}
