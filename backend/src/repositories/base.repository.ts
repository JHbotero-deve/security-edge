import { Pool } from "pg";

export class BaseRepository<T> {
  protected pool: Pool;
  protected table: string;

  constructor(pool: Pool, table: string) {
    this.pool = pool;
    this.table = table;
  }

  async findAll(): Promise<T[]> {
    const result = await this.pool.query(`SELECT * FROM ${this.table}`);
    return result.rows;
  }

  async findById(id: number): Promise<T | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async create(fields: Record<string, any>): Promise<T> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

    const result = await this.pool.query(
      `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async update(id: number, fields: Record<string, any>): Promise<T | null> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");

    const result = await this.pool.query(
      `UPDATE ${this.table} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  }
}
