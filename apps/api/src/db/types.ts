import { PgColumn, PgTable } from "drizzle-orm/pg-core";

export type TableColumns<T extends PgTable<any>> = keyof T["$inferSelect"];

export interface BaseRepositoryTable extends PgTable<any> {
  id: PgColumn<any, any, any>;
}

export interface BaseRepositoryTableWithOrganization extends BaseRepositoryTable {
  organizationId: PgColumn<any, any, any>;
}
