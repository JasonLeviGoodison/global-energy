import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const glassStyles = {
  standard: cn("bg-white/5", "border border-white/10", "backdrop-blur-md", "rounded-3xl"),

  highBlur: cn("bg-white/5", "border border-white/10", "backdrop-blur-[40px]", "rounded-3xl"),

  accent: cn(
    "bg-gradient-to-br from-emerald-500/30 via-emerald-400/20 to-cyan-500/20",
    "border border-emerald-400/30",
    "backdrop-blur-md",
    "rounded-3xl"
  ),

  card: cn("bg-white/5", "border border-white/10", "backdrop-blur-md", "rounded-2xl"),

  input: cn(
    "bg-white/10",
    "border border-white/20",
    "backdrop-blur-sm",
    "rounded-2xl",
    "text-white",
    "placeholder:text-white/40"
  ),

  modal: cn("bg-white/5", "border border-white/10", "backdrop-blur-[40px]", "rounded-3xl"),
};

export const buttonStyles = {
  primary: cn(
    "bg-white",
    "text-black",
    "font-semibold",
    "rounded-2xl",
    "transition-all duration-200",
    "hover:bg-white/90",
    "active:scale-95"
  ),

  secondary: cn(
    "bg-white/10",
    "border border-white/20",
    "text-white",
    "font-medium",
    "rounded-2xl",
    "backdrop-blur-sm",
    "transition-all duration-200",
    "hover:bg-white/15",
    "active:scale-95"
  ),

  accent: cn(
    "bg-gradient-to-br from-emerald-500/70 via-emerald-400/60 to-cyan-500/60",
    "text-white",
    "font-semibold",
    "rounded-2xl",
    "transition-all duration-200",
    "hover:from-emerald-500/80 hover:via-emerald-400/70 hover:to-cyan-500/70",
    "active:scale-95"
  ),

  danger: cn(
    "bg-red-500/20",
    "border border-red-500/30",
    "text-red-300",
    "font-medium",
    "rounded-2xl",
    "backdrop-blur-sm",
    "transition-all duration-200",
    "hover:bg-red-500/30 hover:text-red-200",
    "active:scale-95"
  ),
};

export const textStyles = {
  eyebrow: cn("text-sm", "uppercase", "tracking-[0.2em]", "text-white/60", "font-medium"),

  heading: cn("text-white", "font-semibold"),

  body: cn("text-white"),

  bodySecondary: cn("text-white/80"),

  bodyMuted: cn("text-white/60"),
};

export const purchaseBannerStyles = cn(
  "sticky top-0 z-50",
  "bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-cyan-500/20",
  "border-b border-emerald-400/30",
  "backdrop-blur-xl"
);

export function createGlassCard(
  variant: keyof typeof glassStyles = "standard",
  className?: string
) {
  return cn(glassStyles[variant], className);
}

export function createButton(variant: keyof typeof buttonStyles = "primary", className?: string) {
  return cn(buttonStyles[variant], className);
}

export function createText(variant: keyof typeof textStyles = "body", className?: string) {
  return cn(textStyles[variant], className);
}

export const navStyles = {
  glass: cn("bg-white/5", "border-b border-white/10", "backdrop-blur-[40px]"),

  floating: cn("bg-white/5", "border-r border-white/10", "backdrop-blur-[40px]"),
};

export const badgeStyles = {
  default: cn(
    "bg-white/10",
    "border border-white/20",
    "text-white",
    "rounded-full",
    "px-3 py-1",
    "text-xs font-medium"
  ),

  success: cn(
    "bg-emerald-500/20",
    "border border-emerald-400/30",
    "text-emerald-300",
    "rounded-full",
    "px-3 py-1",
    "text-xs font-medium"
  ),

  warning: cn(
    "bg-amber-500/20",
    "border border-amber-400/30",
    "text-amber-300",
    "rounded-full",
    "px-3 py-1",
    "text-xs font-medium"
  ),

  info: cn(
    "bg-cyan-500/20",
    "border border-cyan-400/30",
    "text-cyan-300",
    "rounded-full",
    "px-3 py-1",
    "text-xs font-medium"
  ),
};
