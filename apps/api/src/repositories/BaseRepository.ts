import { db } from "../db";
import { SQL } from "drizzle-orm";

export abstract class BaseRepository<T> {
  protected abstract table: any;
  protected abstract tableName: string;

  async findById(id: string): Promise<T | undefined> {
    return await db.query[this.tableName].findFirst({
      where: (table: any, { eq }: any) => eq(table.id, id)
    });
  }

  async findMany(where?: SQL): Promise<T[]> {
    if (where) {
      return await db.query[this.tableName].findMany({ where });
    }
    return await db.query[this.tableName].findMany();
  }

  async findFirst(where: SQL): Promise<T | undefined> {
    return await db.query[this.tableName].findFirst({ where });
  }

  async create(data: any): Promise<T> {
    const [result] = await db.insert(this.table).values(data).returning();
    return result as T;
  }

  async update(id: string, data: any): Promise<T> {
    const [result] = await db.update(this.table)
      .set(data)
      .where((table: any, { eq }: any) => eq(table.id, id))
      .returning();
    return result as T;
  }

  async delete(id: string): Promise<void> {
    await db.delete(this.table)
      .where((table: any, { eq }: any) => eq(table.id, id));
  }
}


