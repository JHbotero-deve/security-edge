import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class SettingsRepository extends BaseRepository {
  constructor() {
    super(prisma.setting);
  }
}
