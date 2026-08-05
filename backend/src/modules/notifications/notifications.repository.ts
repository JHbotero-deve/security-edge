import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class NotificationRepository extends BaseRepository {
  constructor() {
    super(prisma.notification);
  }
}
