import { BaseRepository } from "./baseRepository.js";
import { prisma } from "../lib/prisma.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.usuario);
  }
}
