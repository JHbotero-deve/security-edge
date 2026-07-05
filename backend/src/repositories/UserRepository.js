import { BaseRepository } from "./baseRepository.ts";
import { prisma } from "../lib/prisma";

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.usuario);
  }
}
