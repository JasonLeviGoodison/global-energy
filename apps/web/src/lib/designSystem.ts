import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const glassStyles = {
  standard: cn(
    "bg-slate-50/80",
    "border border-slate-200/60",
    "backdrop-blur-xl",
    "rounded-xl",
    "shadow-sm",
    "text-slate-900"
  ),

  highBlur: cn(
    "bg-slate-50/90",
    "border border-slate-200/60",
    "backdrop-blur-xl",
    "rounded-xl",
    "shadow-md",
    "text-slate-900"
  ),

  accent: cn(
    "bg-indigo-50/80",
    "border border-indigo-200/50",
    "backdrop-blur-xl",
    "rounded-xl",
    "shadow-sm",
    "text-slate-900"
  ),

  card: cn(
    "bg-slate-50/60",
    "border border-slate-200/60",
    "backdrop-blur-lg",
    "rounded-lg",
    "shadow-sm",
    "text-slate-900"
  ),

  input: cn(
    "bg-white",
    "border border-slate-300",
    "backdrop-blur-sm",
    "rounded-lg",
    "text-slate-900",
    "placeholder:text-slate-400",
    "focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
    "shadow-sm"
  ),

  modal: cn(
    "bg-white/95",
    "border border-slate-200",
    "backdrop-blur-2xl",
    "rounded-xl",
    "shadow-2xl",
    "text-slate-900"
  ),
};

export const buttonStyles = {
  primary: cn(
    "bg-indigo-600",
    "text-white",
    "font-semibold",
    "rounded-lg",
    "transition-all duration-200",
    "hover:bg-indigo-700",
    "active:scale-95",
    "shadow-sm",
    "hover:shadow-md"
  ),

  secondary: cn(
    "bg-white",
    "border border-slate-200",
    "text-slate-700",
    "font-medium",
    "rounded-lg",
    "backdrop-blur-sm",
    "transition-all duration-200",
    "hover:bg-slate-50",
    "hover:border-slate-300",
    "active:scale-95",
    "shadow-sm"
  ),

  accent: cn(
    "bg-blue-600",
    "text-white",
    "font-semibold",
    "rounded-lg",
    "transition-all duration-200",
    "hover:bg-blue-700",
    "active:scale-95",
    "shadow-sm",
    "hover:shadow-md"
  ),

  danger: cn(
    "bg-red-50",
    "border border-red-200",
    "text-red-600",
    "font-medium",
    "rounded-lg",
    "backdrop-blur-sm",
    "transition-all duration-200",
    "hover:bg-red-100",
    "active:scale-95"
  ),
};

export const textStyles = {
  eyebrow: cn("text-xs", "uppercase", "tracking-[0.1em]", "text-slate-500", "font-semibold"),

  heading: cn("text-slate-900", "font-semibold"),

  body: cn("text-slate-700"),

  bodySecondary: cn("text-slate-500"),

  bodyMuted: cn("text-slate-400"),
};

export const purchaseBannerStyles = cn(
  "sticky top-0 z-50",
  "bg-indigo-50/90",
  "border-b border-indigo-100",
  "backdrop-blur-xl",
  "text-slate-900"
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
  glass: cn("bg-white/80", "border-b border-slate-200", "backdrop-blur-xl"),

  floating: cn("bg-slate-100", "border-r border-slate-200", "backdrop-blur-xl"),
};

export const badgeStyles = {
  default: cn(
    "bg-slate-100",
    "border border-slate-200",
    "text-slate-700",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-medium"
  ),

  success: cn(
    "bg-emerald-50",
    "border border-emerald-200",
    "text-emerald-700",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-medium"
  ),

  warning: cn(
    "bg-amber-50",
    "border border-amber-200",
    "text-amber-700",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-medium"
  ),

  info: cn(
    "bg-blue-50",
    "border border-blue-200",
    "text-blue-700",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-medium"
  ),

  danger: cn(
    "bg-red-50",
    "border border-red-200",
    "text-red-700",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-medium"
  ),

  secondary: cn(
    "bg-slate-50",
    "border border-slate-200",
    "text-slate-500",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-medium"
  ),
};
