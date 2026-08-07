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

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
      username: data.email.split("@")[0], // Generate username from email if not provided
    });

    return { id: user.id, email: user.email, name: user.name };
  }

  async login(data: any) {
    const user = await this.repository.findOne({ email: data.email });
    if (!user) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const token = jwt.sign({ id: user.id, role: user.role, status: user.status }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
