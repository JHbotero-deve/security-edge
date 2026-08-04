import { BaseRepository } from "../../shared/base.repository";
import { prisma } from "../../lib/prisma";

export class AuthRepository extends BaseRepository {
  constructor() {
    super(prisma.usuario);
  }
};