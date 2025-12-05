import { InputHTMLAttributes } from "react";
import { glassStyles } from "@/lib/designSystem";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

export function Input({ label, helperText, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-white/80">{label}</label>}
      <input
        className={`${
          glassStyles.input
        } w-full px-4 py-3 text-sm focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 ${
          error ? "border-red-400/50 focus:ring-red-400/30" : ""
        } ${className || ""}`.trim()}
        {...props}
      />
      {helperText && !error && <p className="mt-2 text-xs text-white/60">{helperText}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
