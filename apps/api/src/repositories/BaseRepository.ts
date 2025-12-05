import { db } from "../db";
import { SQL, eq } from "drizzle-orm";
import { BaseRepositoryTable } from "../db/types";
import { PgTable } from "drizzle-orm/pg-core";

export class BaseRepository<T extends BaseRepositoryTable> {
  protected db = db;

  constructor(readonly table: T) {}

  async findById(id: T["$inferSelect"]["id"]): Promise<T["$inferSelect"] | undefined> {
    const [result] = await this.db
      .select()
      .from(this.table as PgTable)
      .where(eq(this.table.id, id))
      .limit(1);
    return result as T["$inferSelect"] | undefined;
  }

  async findMany(where?: SQL): Promise<T["$inferSelect"][]> {
    if (where) {
      return (await this.db
        .select()
        .from(this.table as PgTable)
        .where(where)) as T["$inferSelect"][];
    }
    return (await this.db.select().from(this.table as PgTable)) as T["$inferSelect"][];
  }

  async findFirst(where: SQL): Promise<T["$inferSelect"] | undefined> {
    const [result] = await this.db
      .select()
      .from(this.table as PgTable)
      .where(where)
      .limit(1);
    return result as T["$inferSelect"] | undefined;
  }

  async create(data: T["$inferInsert"]): Promise<T["$inferSelect"]> {
    const [result] = await this.db
      .insert(this.table as PgTable)
      .values(data)
      .returning();
    return result as T["$inferSelect"];
  }

  async update(
    id: T["$inferSelect"]["id"],
    data: Partial<T["$inferInsert"]>
  ): Promise<T["$inferSelect"]> {
    const [result] = await this.db
      .update(this.table as PgTable)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();
    return result as T["$inferSelect"];
  }

  async delete(id: T["$inferSelect"]["id"]): Promise<void> {
    await this.db.delete(this.table as PgTable).where(eq(this.table.id, id));
  }
}
