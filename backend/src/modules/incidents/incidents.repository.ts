import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class IncidentRepository extends BaseRepository {
  constructor() {
    super(prisma.incident);
  }
}
