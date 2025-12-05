import { ReactNode } from "react";
import { badgeStyles } from "@/lib/designSystem";

type BadgeProps = {
  children: ReactNode;
  variant?: "success" | "warning" | "info";
  className?: string;
};

export function Badge({ children, variant = "info", className }: BadgeProps) {
  return <span className={`${badgeStyles[variant]} ${className || ""}`.trim()}>{children}</span>;
}
