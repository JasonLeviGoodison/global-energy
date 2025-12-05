import { ReactNode, HTMLAttributes } from "react";
import { createText } from "@/lib/designSystem";

type TextProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: "eyebrow" | "heading" | "body" | "bodySecondary" | "bodyMuted";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
};

export function Text({
  children,
  variant = "body",
  as: Component = "p",
  className,
  ...props
}: TextProps) {
  return (
    <Component className={createText(variant, className)} {...props}>
      {children}
    </Component>
  );
}
