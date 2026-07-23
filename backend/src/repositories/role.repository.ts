import { Pool } from "pg";
import { BaseRepository } from "./base.repository";

export class roleRepository extends BaseRepository<any> {
  constructor(pool: Pool) {
    super(pool, "roles");
  }

  async findByName(name: string) {
    const result = await this.pool.query(
      "SELECT * FROM roles WHERE name = $1",
      [name]
    );
    return result.rows[0] || null;
  }
}
