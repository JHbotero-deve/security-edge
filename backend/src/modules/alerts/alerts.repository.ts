import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class AlertRepository extends BaseRepository {
  constructor() {
    super(prisma.alert);
  }
}
