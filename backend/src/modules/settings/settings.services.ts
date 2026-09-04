import { SettingsRepository } from "./settings.repository.js";
import { AppError } from "../../utils/errors.js";

export class SettingsService {
  private repository: SettingsRepository;

  constructor() {
    this.repository = new SettingsRepository();
  }

  async getAllSettings() {
    return await this.repository.findAll();
  }

  async getSettingByKey(key: string) {
    const setting = await this.repository.findOne({ key });
    if (!setting) {
      throw new AppError("Configuración no encontrada", 404);
    }
    return setting;
  }

  async createSetting(data: { key: string; value: string }) {
    const existing = await this.repository.findOne({ key: data.key });
    if (existing) {
      throw new AppError("La clave de configuración ya existe", 400);
    }
    return await this.repository.create(data);
  }

  async updateSetting(id: number, data: { value: string }) {
    const setting = await this.repository.findById(id);
    if (!setting) {
      throw new AppError("Configuración no encontrada", 404);
    }
    return await this.repository.update(id, data);
  }
}
