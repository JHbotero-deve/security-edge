import { Pool } from "pg";
import { BaseRepository } from "./base.repository";

export class userRepository extends BaseRepository<any> {
  constructor(pool: Pool) {
    super(pool, "users");
  }

  async findByEmail(email: string) {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }

  async findWithRoles(id: number) {
    const result = await this.pool.query(
      `SELECT u.*, r.* 
       FROM users u 
       LEFT JOIN user_roles ur ON u.id = ur.userId 
       LEFT JOIN roles r ON ur.roleId = r.id 
       WHERE u.id = $1`,
      [id]
    );
    return result.rows;
  }
}
