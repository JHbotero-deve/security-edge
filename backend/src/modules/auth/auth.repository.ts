import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class AuthRepository extends BaseRepository {
  constructor() {
    super(prisma.usuario);
  }
}
