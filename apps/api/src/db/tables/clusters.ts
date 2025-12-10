import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { baseFields, foreignKeyRelationId, BaseId } from "../utils";
import { organizations } from "./organizations";

export type ClusterId = BaseId<"cluster">;

export const clusterStatusEnum = [
  "provisioning",
  "ready",
  "degraded",
  "deleting",
  "deleted",
  "failed",
] as const;

export type ClusterStatus = (typeof clusterStatusEnum)[number];

export const clusters = pgTable("cluster", {
  ...baseFields<"cluster">(),
  organizationId: foreignKeyRelationId(organizations).notNull(),
  name: text("name").notNull(),
  status: text("status").$type<ClusterStatus>().notNull().default("provisioning"),
  k8sVersion: text("k8s_version").notNull(),
  workerNodeCount: integer("worker_node_count").notNull().default(1),
  gpuType: text("gpu_type"),
  apiServerEndpoint: text("api_server_endpoint"),
  clusterApiResourceName: text("cluster_api_resource_name"),
  deletedAt: timestamp("deleted_at", { precision: 3, mode: "date" }),
});



