import { UserRepository } from "./users.repository.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/errors.js";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers(filters: any) {
    const { role, status, search, page, limit } = filters;
    const where: any = {};

    if (role) where.role = role;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.repository.findManyPaged({ where, skip, take: limit }),
      this.repository.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }
    // Remove sensitive data
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async createUser(data: any) {
    const existingEmail = await this.repository.findOne({ email: data.email });
    if (existingEmail) {
      throw new AppError("El correo electrónico ya está registrado", 400);
    }

    const existingUsername = await this.repository.findOne({ username: data.username });
    if (existingUsername) {
      throw new AppError("El nombre de usuario ya está registrado", 400);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.repository.create(data);
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async updateUser(id: number, data: any) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    if (data.email) {
      const existingEmail = await this.repository.findOne({ email: data.email });
      if (existingEmail && existingEmail.id !== id) {
        throw new AppError("El correo electrónico ya está en uso por otro usuario", 400);
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.repository.update(id, data);
    const { password, ...userWithoutPassword } = updatedUser as any;
    return userWithoutPassword;
  }

  async deleteUser(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }
    return await this.repository.delete(id);
  }
}

