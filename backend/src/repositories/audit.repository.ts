import { Pool } from "pg";
import { BaseRepository } from "./base.repository";

export class auditRepository extends BaseRepository<any> {
  constructor(pool: Pool) {
    super(pool, "audits");
  }

  async findByUser(userId: number) {
    const result = await this.pool.query(
      "SELECT * FROM audits WHERE userId = $1",
      [userId]
    );
    return result.rows;
  }
}
