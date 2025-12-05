export interface UsageStats {
  deployedModelId: string;
  totalTokens: number;
  totalRequests: number;
}

export interface TimeSeriesData {
  date: string;
  totalTokens: number;
  totalRequests: number;
}

export interface ModelTimeSeriesData extends TimeSeriesData {
  deployedModelId: string;
}

export interface OverviewStats {
  totalRequests: number;
  totalTokens: number;
  uniqueModels: number;
  avgTokensPerRequest: number;
}

export interface AnalyticsResult {
  modelName: string;
  modelId: string;
  totalTokens: number;
  totalRequests: number;
}

export interface OverviewAnalytics {
  stats: OverviewStats;
  timeSeries: TimeSeriesData[];
  modelBreakdown: AnalyticsResult[];
}

export interface ModelAnalytics {
  modelId: string;
  modelName: string;
  totalTokens: number;
  totalRequests: number;
  avgTokensPerRequest: number;
  timeSeries: TimeSeriesData[];
}
