import { pgTable, text } from "drizzle-orm/pg-core";
import { baseFields, foreignKeyRelationId, BaseId } from "../utils";
import { clusters } from "./clusters";

export type ClusterNodeId = BaseId<"cluster_node">;

export const nodeTypeEnum = ["control-plane", "worker"] as const;
export type NodeType = (typeof nodeTypeEnum)[number];

export const nodeStatusEnum = ["provisioning", "ready", "not_ready", "terminated"] as const;
export type NodeStatus = (typeof nodeStatusEnum)[number];

export const clusterNodes = pgTable("cluster_node", {
  ...baseFields<"cluster_node">(),
  clusterId: foreignKeyRelationId(clusters).notNull(),
  nodeType: text("node_type").$type<NodeType>().notNull(),
  instanceId: text("instance_id"),
  gpuType: text("gpu_type"),
  status: text("status").$type<NodeStatus>().notNull().default("provisioning"),
});



