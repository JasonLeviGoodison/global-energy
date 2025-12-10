CREATE TABLE "organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"external_id" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "organization_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "api_key" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"key" text NOT NULL,
	"organization_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "api_key_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "deployed_model" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"provider" text NOT NULL,
	"provider_model_id" text NOT NULL,
	"organization_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"api_key_id" uuid NOT NULL,
	"deployed_model_id" uuid NOT NULL,
	"tokens_used" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cluster" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'provisioning' NOT NULL,
	"k8s_version" text NOT NULL,
	"worker_node_count" integer DEFAULT 1 NOT NULL,
	"gpu_type" text,
	"api_server_endpoint" text,
	"cluster_api_resource_name" text,
	"deleted_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "cluster_node" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"cluster_id" uuid NOT NULL,
	"node_type" text NOT NULL,
	"instance_id" text,
	"gpu_type" text,
	"status" text DEFAULT 'provisioning' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cluster_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"cluster_id" uuid NOT NULL,
	"hour_start" timestamp (3) NOT NULL,
	"hour_end" timestamp (3) NOT NULL,
	"control_plane_cost" numeric(10, 4),
	"worker_node_cost" numeric(10, 4),
	"total_cost" numeric(10, 4)
);
--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deployed_model" ADD CONSTRAINT "deployed_model_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage" ADD CONSTRAINT "api_usage_api_key_id_api_key_id_fk" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_key"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage" ADD CONSTRAINT "api_usage_deployed_model_id_deployed_model_id_fk" FOREIGN KEY ("deployed_model_id") REFERENCES "public"."deployed_model"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cluster" ADD CONSTRAINT "cluster_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cluster_node" ADD CONSTRAINT "cluster_node_cluster_id_cluster_id_fk" FOREIGN KEY ("cluster_id") REFERENCES "public"."cluster"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cluster_usage" ADD CONSTRAINT "cluster_usage_cluster_id_cluster_id_fk" FOREIGN KEY ("cluster_id") REFERENCES "public"."cluster"("id") ON DELETE no action ON UPDATE no action;