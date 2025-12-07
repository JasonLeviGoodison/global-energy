"use client";

import { useEffect, useState } from "react";
import { useApi as useApiClient } from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { createText, createGlassCard, badgeStyles } from "@/lib/designSystem";
import { ChartTooltip, Select } from "@/components";
import { TrendingUp, Activity, Layers, Zap } from "lucide-react";

type TimeSeriesData = {
  date: string;
  totalTokens: number;
  totalRequests: number;
};

type OverviewStats = {
  totalRequests: number;
  totalTokens: number;
  uniqueModels: number;
  avgTokensPerRequest: number;
};

type ModelBreakdown = {
  modelName: string;
  modelId: string;
  totalTokens: number;
  totalRequests: number;
};

type OverviewAnalytics = {
  stats: OverviewStats;
  timeSeries: TimeSeriesData[];
  modelBreakdown: ModelBreakdown[];
};

type ModelAnalytics = {
  modelId: string;
  modelName: string;
  totalTokens: number;
  totalRequests: number;
  avgTokensPerRequest: number;
  timeSeries: TimeSeriesData[];
};

export default function AnalyticsPage() {
  const { user, isLoaded } = useUser();
  const api = useApiClient();

  const [overviewData, setOverviewData] = useState<OverviewAnalytics | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string>("all");
  const [modelAnalytics, setModelAnalytics] = useState<ModelAnalytics | null>(null);
  const [dateRange, setDateRange] = useState<number>(30);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchOverview();
  }, [isLoaded, user, dateRange]);

  useEffect(() => {
    if (selectedModelId !== "all") {
      fetchModelAnalytics(selectedModelId);
    }
  }, [selectedModelId, dateRange]);

  const fetchOverview = async () => {
    const data = await api.get(`/analytics/overview?days=${dateRange}`);
    setOverviewData(data);
  };

  const fetchModelAnalytics = async (modelId: string) => {
    const data = await api.get(`/analytics/models/${modelId}?days=${dateRange}`);
    setModelAnalytics(data);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!isLoaded || !overviewData)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className={createText("body", "text-lg")}>Loading...</div>
      </div>
    );

  const displayData = selectedModelId === "all" ? overviewData : modelAnalytics;
  const currentStats =
    selectedModelId === "all"
      ? overviewData.stats
      : modelAnalytics
      ? {
          totalRequests: modelAnalytics.totalRequests,
          totalTokens: modelAnalytics.totalTokens,
          uniqueModels: 1,
          avgTokensPerRequest: modelAnalytics.avgTokensPerRequest,
        }
      : overviewData.stats;

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h2 className={createText("eyebrow", "mb-2")}>INSIGHTS</h2>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={createText("heading", "text-2xl mb-2")}>Usage Analytics</h1>
            <p className={createText("bodyMuted", "text-sm")}>
              Track token usage and requests across your deployed models
            </p>
          </div>
          <div className="flex gap-3">
            <Select
              value={dateRange.toString()}
              onChange={(e) => setDateRange(parseInt(e.target.value))}
              className="w-32"
            >
              <option value="7" className="bg-white text-slate-900">
                Last 7 days
              </option>
              <option value="30" className="bg-white text-slate-900">
                Last 30 days
              </option>
              <option value="60" className="bg-white text-slate-900">
                Last 60 days
              </option>
              <option value="90" className="bg-white text-slate-900">
                Last 90 days
              </option>
            </Select>
            <Select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-48"
            >
              <option value="all" className="bg-white text-slate-900">
                All Models
              </option>
              {overviewData.modelBreakdown.map((model) => (
                <option
                  key={model.modelId}
                  value={model.modelId}
                  className="bg-white text-slate-900"
                >
                  {model.modelName}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className={createGlassCard("card", "p-6")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <Activity size={24} className="text-emerald-600" />
            </div>
            <span className={badgeStyles.default}>
              {selectedModelId === "all" ? "Total" : "Model"}
            </span>
          </div>
          <p className={createText("bodyMuted", "text-sm mb-1")}>Total Requests</p>
          <h3 className={createText("heading", "text-3xl")}>
            {formatNumber(currentStats.totalRequests)}
          </h3>
        </div>

        <div className={createGlassCard("card", "p-6")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-100">
              <TrendingUp size={24} className="text-cyan-600" />
            </div>
            <span className={badgeStyles.default}>
              {selectedModelId === "all" ? "Total" : "Model"}
            </span>
          </div>
          <p className={createText("bodyMuted", "text-sm mb-1")}>Total Tokens</p>
          <h3 className={createText("heading", "text-3xl")}>
            {formatNumber(currentStats.totalTokens)}
          </h3>
        </div>

        <div className={createGlassCard("card", "p-6")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
              <Zap size={24} className="text-purple-600" />
            </div>
            <span className={badgeStyles.default}>Average</span>
          </div>
          <p className={createText("bodyMuted", "text-sm mb-1")}>Tokens per Request</p>
          <h3 className={createText("heading", "text-3xl")}>
            {formatNumber(currentStats.avgTokensPerRequest)}
          </h3>
        </div>

        <div className={createGlassCard("card", "p-6")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
              <Layers size={24} className="text-orange-600" />
            </div>
            <span className={badgeStyles.default}>Active</span>
          </div>
          <p className={createText("bodyMuted", "text-sm mb-1")}>Models in Use</p>
          <h3 className={createText("heading", "text-3xl")}>{currentStats.uniqueModels}</h3>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className={createGlassCard("card", "p-6")}>
          <h4 className={createText("heading", "mb-6 text-lg")}>Requests Over Time</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData?.timeSeries || []}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={formatDate}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={formatNumber}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="totalRequests"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRequests)"
                  name="Requests"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={createGlassCard("card", "p-6")}>
          <h4 className={createText("heading", "mb-6 text-lg")}>Token Usage Over Time</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData?.timeSeries || []}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={formatDate}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={formatNumber}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="totalTokens"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTokens)"
                  name="Tokens"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {selectedModelId === "all" && (
        <div className={createGlassCard("card", "p-6")}>
          <h4 className={createText("heading", "mb-6 text-lg")}>Model Breakdown</h4>
          <div className="space-y-4">
            {overviewData.modelBreakdown.map((model) => (
              <div
                key={model.modelId}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedModelId(model.modelId)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className={createText("heading", "text-base")}>{model.modelName}</h5>
                  <span className={badgeStyles.success}>Active</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className={createText("bodyMuted", "text-xs mb-1")}>Requests</p>
                    <p className={createText("body", "text-lg font-semibold")}>
                      {formatNumber(model.totalRequests)}
                    </p>
                  </div>
                  <div>
                    <p className={createText("bodyMuted", "text-xs mb-1")}>Tokens</p>
                    <p className={createText("body", "text-lg font-semibold")}>
                      {formatNumber(model.totalTokens)}
                    </p>
                  </div>
                  <div>
                    <p className={createText("bodyMuted", "text-xs mb-1")}>Avg Tokens/Request</p>
                    <p className={createText("body", "text-lg font-semibold")}>
                      {formatNumber(
                        model.totalRequests > 0
                          ? Math.round(model.totalTokens / model.totalRequests)
                          : 0
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
