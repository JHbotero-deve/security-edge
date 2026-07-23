import { SettingRepository } from "../settings/setting.repository";

export class SettingService {
  private repository: SettingRepository;

  constructor() {
    this.repository = new SettingRepository();
  }

  async getAllSettings() {
    return await this.repository.findAll();
  }

  async getSettingByKey(key: string) {
    const setting = await this.repository.findByKey(key);
    if (!setting) {
      throw new Error("Setting key not found");
    }
    return setting;
  }

  async createSetting(data: { key: string; value: string }) {
    const existing = await this.repository.findByKey(data.key);
    if (existing) {
      throw new Error("Setting key already exists");
    }
    return await this.repository.create(data);
  }

  async updateSetting(id: number, data: { value: string }) {
    const setting = await this.repository.findById(id);
    if (!setting) {
      throw new Error("Setting not found");
    }
    return await this.repository.update(id, data);
  }
}