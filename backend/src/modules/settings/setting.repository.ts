import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class SettingRepository extends BaseRepository {
  constructor() {
    super(prisma.setting);
  }
}
