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
      {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={`${glassStyles.input} w-full px-4 py-3 text-sm focus:outline-none ${
          error ? "border-red-500 focus:ring-red-200 focus:border-red-500" : ""
        } ${className || ""}`.trim()}
        {...props}
      />
      {helperText && !error && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
