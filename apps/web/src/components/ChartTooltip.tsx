import { createGlassCard, createText } from "@/lib/designSystem";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
};

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className={createGlassCard("modal", "p-4 min-w-[160px]")}>
      {label && <p className={createText("body", "text-sm font-medium mb-2")}>{label}</p>}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span className={createText("bodySecondary", "text-sm")}>{entry.name}:</span>
          </div>
          <span className={createText("body", "text-sm font-semibold")}>
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
