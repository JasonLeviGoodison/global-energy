import { uuid, timestamp, PgTableWithColumns, PgColumn } from "drizzle-orm/pg-core";
import { getTableName } from "drizzle-orm";

export type BaseId<T extends string> = string & { readonly __brand: T };

export const baseFields = <T extends string>() => ({
  id: uuid("id").primaryKey().defaultRandom().$type<BaseId<T>>(),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
});

export const foreignKeyRelationId = <
  T extends PgTableWithColumns<{
    name: string;
    schema: undefined;
    columns: {
      id: PgColumn<{
        name: "id";
        tableName: string;
        dataType: "string";
        columnType: "PgUUID";
        data: string;
        driverParam: string;
        notNull: true;
        generated: undefined;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
      }>;
    };
    dialect: "pg";
  }>
>(
  table: T
) => {
  return uuid(`${getTableName(table)}_id`)
    .references(() => table.id)
    .$type<BaseId<T["_"]["name"]>>();
};
