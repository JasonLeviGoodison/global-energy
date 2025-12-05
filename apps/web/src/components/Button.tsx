import { ReactNode, ButtonHTMLAttributes } from "react";
import { createButton } from "@/lib/designSystem";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={createButton(variant, className)} {...props}>
      {children}
    </button>
  );
}
