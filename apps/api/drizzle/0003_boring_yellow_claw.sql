ALTER TABLE "organizations" RENAME TO "organization";--> statement-breakpoint
ALTER TABLE "api_keys" RENAME TO "api_key";--> statement-breakpoint
ALTER TABLE "deployed_models" RENAME TO "deployed_model";--> statement-breakpoint
ALTER TABLE "api_usage" RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
ALTER TABLE "api_key" DROP CONSTRAINT "api_keys_key_unique";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organizations_external_id_unique";--> statement-breakpoint
ALTER TABLE "api_key" DROP CONSTRAINT "api_keys_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "api_usage" DROP CONSTRAINT "api_usage_api_key_id_api_keys_id_fk";
--> statement-breakpoint
ALTER TABLE "api_usage" DROP CONSTRAINT "api_usage_deployed_model_id_deployed_models_id_fk";
--> statement-breakpoint
ALTER TABLE "deployed_model" DROP CONSTRAINT "deployed_models_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "updated_at" timestamp (3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "api_usage" ADD COLUMN "updated_at" timestamp (3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage" ADD CONSTRAINT "api_usage_api_key_id_api_key_id_fk" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_key"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage" ADD CONSTRAINT "api_usage_deployed_model_id_deployed_model_id_fk" FOREIGN KEY ("deployed_model_id") REFERENCES "public"."deployed_model"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deployed_model" ADD CONSTRAINT "deployed_model_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_key_unique" UNIQUE("key");--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_external_id_unique" UNIQUE("external_id");