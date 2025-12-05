import { getTableColumns, sql, SQL } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

export const conflictUpdateSetAllColumns = <T extends PgTable>(
  table: T,
  except: (keyof T["$inferSelect"])[] = ["id", "createdAt"]
) => {
  const columns = getTableColumns(table);
  const updateColumns = Object.entries(columns).reduce((acc, [colName, column]) => {
    if (!except.includes(colName as any)) {
      // @ts-ignore - dynamic access
      acc[colName] = sql.raw(`excluded.${column.name}`);
    }
    return acc;
  }, {} as Record<string, SQL>);

  return updateColumns;
};

export function uniqBy<T>(arr: T[], key: (item: T) => string): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
