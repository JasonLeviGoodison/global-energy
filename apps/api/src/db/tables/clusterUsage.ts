import { pgTable, timestamp, decimal } from "drizzle-orm/pg-core";
import { baseFields, foreignKeyRelationId, BaseId } from "../utils";
import { clusters } from "./clusters";

export type ClusterUsageId = BaseId<"cluster_usage">;

export const clusterUsage = pgTable("cluster_usage", {
  ...baseFields<"cluster_usage">(),
  clusterId: foreignKeyRelationId(clusters).notNull(),
  hourStart: timestamp("hour_start", { precision: 3, mode: "date" }).notNull(),
  hourEnd: timestamp("hour_end", { precision: 3, mode: "date" }).notNull(),
  controlPlaneCost: decimal("control_plane_cost", { precision: 10, scale: 4 }),
  workerNodeCost: decimal("worker_node_cost", { precision: 10, scale: 4 }),
  totalCost: decimal("total_cost", { precision: 10, scale: 4 }),
});



