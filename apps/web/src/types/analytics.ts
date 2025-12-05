export interface OverviewStats {
  totalRequests: number;
  totalTokens: number;
  uniqueModels: number;
  avgTokensPerRequest: number;
}

export interface TimeSeriesData {
  date: string;
  totalTokens: number;
  totalRequests: number;
}

export interface ModelBreakdown {
  modelName: string;
  modelId: string;
  totalTokens: number;
  totalRequests: number;
}

export interface OverviewAnalytics {
  stats: OverviewStats;
  timeSeries: TimeSeriesData[];
  modelBreakdown: ModelBreakdown[];
}

export interface ModelAnalytics {
  modelId: string;
  modelName: string;
  totalTokens: number;
  totalRequests: number;
  avgTokensPerRequest: number;
  timeSeries: TimeSeriesData[];
}
