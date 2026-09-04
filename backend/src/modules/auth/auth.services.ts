import { AuthRepository } from "./auth.repository.js";
import { AppError } from "../../utils/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async register(data: any) {
    const existingUser = await this.repository.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError("El correo electrónico ya está registrado", 400);
    }

    if (data.username) {
      const existingUsername = await this.repository.findOne({ username: data.username });
      if (existingUsername) {
        throw new AppError("El nombre de usuario ya está registrado", 400);
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
      username: data.username || data.email.split("@")[0],
      role: "USER",
      status: "ACTIVE",
    });

    return { id: user.id, email: user.email, name: user.name, username: user.username };
  }

  async login(data: any) {
    const user = await this.repository.findOne({ email: data.email });
    if (!user || user.status !== "ACTIVE") {
      throw new AppError("Credenciales inválidas o cuenta inactiva", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, status: user.status },
<<<<<<< HEAD
      process.env.JWT_SECRET as string,
=======
      process.env.JWT_SECRET || "secret",
>>>>>>> origin/main
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

}
