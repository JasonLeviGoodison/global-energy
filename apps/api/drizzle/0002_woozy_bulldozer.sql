ALTER TABLE "organizations" RENAME COLUMN "clerk_id" TO "external_id";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_external_id_unique" UNIQUE("external_id");